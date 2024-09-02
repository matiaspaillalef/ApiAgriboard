import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import compression from 'compression';
import helmet from 'helmet';
import fs from 'fs';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Configurar middlewares
app.use(cors({
    origin: '*', // Permitir todas las solicitudes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.json());
app.use(compression());
app.use(helmet());

// Importar rutas
import tokenRouter from './routes/auth.route.js';
import configurationRouter from './routes/configuration.route.js';
import managementPeopleRouter from './routes/management-people.route.js';
import loginRouter from './routes/login.route.js';
import menuRouter from './routes/menu.route.js';
import productionRouter from './routes/production.route.js';
import dashboardRouter from './routes/dashboard.route.js';

// Configurar rutas
app.use('/api/v1', tokenRouter);
app.use('/api/v1', loginRouter);
app.use('/api/v1', menuRouter);
app.use('/api/v1', configurationRouter);
app.use('/api/v1', managementPeopleRouter);
app.use('/api/v1', productionRouter);
app.use('/api/v1', dashboardRouter);

// Configurar Swagger
const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Iniciar el servidor HTTP
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});
