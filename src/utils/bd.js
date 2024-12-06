import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit: 20,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    acquireTimeout: 30000,
    timeout: 30000
});

// Función para hacer reintentos en caso de error
const queryAsync = (query, params, retries = 3, delay = 1000) => {
    return new Promise((resolve, reject) => {
        const attemptQuery = (attempt) => {
            pool.query(query, params, (error, results) => {
                if (error) {
                    // Manejo de errores específicos de conexión al pool
                    if (error.code === 'ECONNREFUSED') {
                        console.error('Error: Conexión rechazada. Verifica el estado de la base de datos.');
                    } else if (error.code === 'ER_CON_COUNT_ERROR') {
                        console.error('Error: Límite de conexiones excedido en el pool.');
                    }

                    // Si es un error "Packets out of order" o queremos reintentar
                    if ((error.code === 'PROTOCOL_PACKETS_OUT_OF_ORDER' || error.code === 'ER_CON_COUNT_ERROR') && attempt < retries) {
                        console.log(`Error: ${error.code}. Intentando nuevamente (intento ${attempt + 1} de ${retries})`);
                        setTimeout(() => attemptQuery(attempt + 1), delay);
                    } else {
                        // Si no es un error recuperable, rechazamos la promesa
                        reject(error);
                    }
                } else {
                    // Si la consulta es exitosa, resolvemos la promesa
                    resolve(results);
                }
            });
        };

        // Iniciar el primer intento
        attemptQuery(0);
    });
};

// Configurar un listener para errores generales del pool de conexiones
pool.on('error', (error) => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Error: La conexión con la base de datos se ha perdido.');
    } else if (error.code === 'ECONNREFUSED') {
        console.error('Error: Conexión rechazada por el servidor de la base de datos.');
    } else if (error.code === 'ER_CON_COUNT_ERROR') {
        console.error('Error: Se ha excedido el número máximo de conexiones permitidas.');
    } else {
        console.error('Error desconocido en el pool de conexiones:', error);
    }
});

export default queryAsync;