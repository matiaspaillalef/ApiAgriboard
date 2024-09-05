import { Router } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import mysql from 'mysql';
import bcrypt from 'bcrypt';

router.get('/filter/dashboard/dataKgDay/:companyID/:groundID', validateToken, (req, res) => {
    /*
        #swagger.tags = ['Dashboard - Filter']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "kgDay": 1000
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */



    let { companyID, groundID } = req.params;
    var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {

        if (err) {

            console.error('error connecting: ' + err.sqlMessage);
            const jsonResult = {
                "code": "ERROR",
                "mensaje": err.sqlMessage
            }

            res.json(jsonResult);

        } else {

            var queryString = "SELECT SUM(kg_boxes) AS kg_boxes FROM harvest WHERE company_id  = " + companyID + " AND ground = " + groundID;
            //var queryString = "SELECT SUM(kg_boxes) AS kg_boxes FROM harvest WHERE company_id  = " + companyID + " AND ground = " + groundID + " AND season = (SELECT MAX(season) FROM harvest WHERE company_id = " + companyID + " AND ground = " + groundID + ")";

            mysqlConn.query(queryString, function (error, results, fields) {

                if (error) {
                    console.error('error ejecutando query: ' + error.sqlMessage);
                    const jsonResult = {
                        "code": "ERROR",
                        "mensaje": error.sqlMessage
                    }
                    res.json(jsonResult);
                } else {

                    const jsonResult = {
                        "code": "OK",
                        "data": results[0]
                    }
                    res.json(jsonResult);
                }

            });

        }

    });
});

router.get('/filter/dashboard/dataKgDayQlty/:companyID/:groundID/:qualityID', validateToken, (req, res) => {
    /*
        #swagger.tags = ['Dashboard - Filter']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "kgDay": 1000
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */



    let { companyID, groundID, qualityID } = req.params;
    var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {

        if (err) {

            console.error('error connecting: ' + err.sqlMessage);
            const jsonResult = {
                "code": "ERROR",
                "mensaje": err.sqlMessage
            }

            res.json(jsonResult);

        } else {

            var queryString = "SELECT SUM(kg_boxes) AS kg_boxes FROM harvest WHERE company_id  = " + companyID + " AND ground = " + groundID + " AND quality = " + qualityID;

            mysqlConn.query(queryString, function (error, results, fields) {

                if (error) {
                    console.error('error ejecutando query: ' + error.sqlMessage);
                    const jsonResult = {
                        "code": "ERROR",
                        "mensaje": error.sqlMessage
                    }
                    res.json(jsonResult);
                } else {
                    const jsonResult = {
                        "code": "OK",
                        "data": results[0]
                    }
                    res.json(jsonResult);
                }

            });

        }

    });
});


router.post('/filter/dashboard/dataKgSeason/:companyID/:groundID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "kg_boxes": 1000
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    // Validar que companyID y groundID sean números enteros válidos
    if (isNaN(companyID) || isNaN(groundID)) {
        return res.status(400).json({
            code: "ERROR",
            message: "ID de la empresa o ID del terreno inválidos"
        });
    }

    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.sqlMessage);
            return res.status(500).json({
                code: "ERROR",
                message: "Error de conexión a la base de datos"
            });
        }

        const queryString = `
            SELECT SUM(kg_boxes) AS kg_boxes
            FROM harvest
            WHERE company_id = ?
              AND ground = ?
              AND season = (
                SELECT MAX(season)
                FROM harvest
                WHERE company_id = ?
                  AND ground = ?
              )
        `;

        mysqlConn.query(queryString, [companyID, groundID, companyID, groundID], function (error, results) {


            mysqlConn.end(); // Asegúrate de cerrar la conexión

            if (error) {
                console.error('Error ejecutando query: ' + error.sqlMessage);
                return res.status(500).json({
                    code: "ERROR",
                    message: "Error al ejecutar la consulta"
                });
            }

            const jsonResult = {
                code: "OK",
                data: results[0]
            };
            res.json(jsonResult);
        });
    });
});


router.post('/filter/dashboard/dataKgSeasonQlty/:companyID/:groundID/:qualityID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.parameters['qualityID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la calidad para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "kg_boxes": 1000
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID, qualityID } = req.params;

    // Validar que companyID, groundID y qualityID sean números enteros válidos
    if (isNaN(companyID) || isNaN(groundID) || isNaN(qualityID)) {
        return res.status(400).json({
            code: "ERROR",
            message: "ID de la empresa, ID del terreno o ID de la calidad inválidos"
        });
    }

    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.sqlMessage);
            return res.status(500).json({
                code: "ERROR",
                message: "Error de conexión a la base de datos"
            });
        }

        const queryString = `
            SELECT SUM(kg_boxes) AS kg_boxes
            FROM harvest
            WHERE company_id = ?
              AND ground = ?
              AND quality = ?
              AND season = (
                SELECT MAX(season)
                FROM harvest
                WHERE company_id = ?
                  AND ground = ?
                  AND quality = ?
              )
        `;

        mysqlConn.query(queryString, [companyID, groundID, qualityID, companyID, groundID, qualityID], function (error, results) {


            mysqlConn.end(); // Asegúrate de cerrar la conexión

            if (error) {
                console.error('Error ejecutando query: ' + error.sqlMessage);
                return res.status(500).json({
                    code: "ERROR",
                    message: "Error al ejecutar la consulta"
                });
            }

            const jsonResult = {
                code: "OK",
                data: results[0]
            };
            res.json(jsonResult);
        });
    }
    );

}
);


router.post('/filter/dashboard/dataWorkersCount/:companyID/:groundID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "workersCount": 100
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    // Validar que companyID y groundID sean números enteros válidos
    if (isNaN(companyID) || isNaN(groundID)) {
        return res.status(400).json({
            code: "ERROR",
            message: "ID de la empresa o ID del terreno inválidos"
        });
    }

    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.sqlMessage);
            return res.status(500).json({
                code: "ERROR",
                message: "Error de conexión a la base de datos"
            });
        }

        const queryString = `
            SELECT COUNT(DISTINCT worker) AS workersCount FROM harvest mh
            WHERE company_id = ?
            AND ground = ?
            AND season = (SELECT MAX(season) FROM harvest WHERE company_id = ? AND ground = ?)
        `;

        mysqlConn.query(queryString, [companyID, groundID, companyID, groundID], function (error, results) {

            mysqlConn.end(); // Asegúrate de cerrar la conexión

            if (error) {
                console.error('Error ejecutando query: ' + error.sqlMessage);
                return res.status(500).json({
                    code: "ERROR",
                    message: "Error al ejecutar la consulta"
                });
            }

            // Cambiar la propiedad 'workersCount' en el objeto de resultado
            const jsonResult = {
                code: "OK",
                data: {
                    workersCount: results[0].workersCount.toString()
                }
            };

            res.json(jsonResult);

        });
    });
});


router.post('/filter/dashboard/dataWorkersWeek/:companyID/:groundID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "workersWeek": 100
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    // Validar que companyID y groundID sean números enteros válidos
    if (isNaN(companyID) || isNaN(groundID)) {
        return res.status(400).json({
            code: "ERROR",
            message: "ID de la empresa o ID del terreno inválidos"
        });
    }

    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.message);
            return res.status(500).json({
                code: "ERROR",
                message: "Error de conexión a la base de datos"
            });
        }

        const queryString = `
            SELECT 
                TIMESTAMPDIFF(WEEK, 
                    (SELECT date_from 
                     FROM season 
                     WHERE date_from <= CURDATE() 
                       AND date_until >= CURDATE()
                       AND id = (
                         SELECT MAX(season)
                         FROM harvest
                         WHERE company_id = ? 
                           AND ground = ?
                       )
                     LIMIT 1
                    ),
                    CURDATE()
                ) AS semanas
        `;

        mysqlConn.query(queryString, [companyID, groundID], function (error, results) {

            mysqlConn.end(); // Asegúrate de cerrar la conexión

            if (error) {
                console.error('Error ejecutando query: ' + error.message);
                return res.status(500).json({
                    code: "ERROR",
                    message: "Error al ejecutar la consulta"
                });
            }

            // Verificar si el resultado existe y es válido
            const weeksCount = results[0] && results[0].semanas !== null ? results[0].semanas : 0;

            const jsonResult = {
                code: "OK",
                data: {
                    workersWeek: weeksCount.toString()
                }
            };

            res.json(jsonResult);

        });
    });
});


router.post('/filter/dashboard/dataVaritiesDay/:companyID/:groundID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "varietiesDay": 100
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    // Validar que companyID y groundID sean números enteros válidos
    if (isNaN(companyID) || isNaN(groundID)) {
        return res.status(400).json({
            code: "ERROR",
            message: "ID de la empresa o ID del terreno inválidos"
        });
    }

    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.sqlMessage);
            return res.status(500).json({
                code: "ERROR",
                message: "Error de conexión a la base de datos"
            });
        }

        const queryString = `
        SELECT 
            v.name, 
            SUM(mh.kg_boxes) AS cantidad, 
            SUM(mh.boxes) AS cajas 
        FROM 
            harvest mh
        JOIN 
            varieties v 
        ON 
            v.id = mh.variety
        WHERE 
            DATE(mh.harvest_date) = CURDATE()
            AND mh.company_id = ?
            AND mh.ground = ?
        GROUP BY 
            v.name;
    `;
        mysqlConn.query(queryString, [companyID, groundID], function (error, results) {

            mysqlConn.end(); // Asegúrate de cerrar la conexión

            if (error) {
                console.error('Error ejecutando query: ' + error.sqlMessage);
                return res.status(500).json({
                    code: "ERROR",
                    message: "Error al ejecutar la consulta"
                });
            }

            const jsonResult = {
                code: "OK",
                data: results
            };
            res.json(jsonResult);
        });
    }
    );

}
);

router.post('/filter/dashboard/dataDispatchGuideDay/:companyID/:groundID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "dispatchGuide": 100
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    // Validar que companyID y groundID sean números enteros válidos
    if (isNaN(companyID) || isNaN(groundID)) {
        return res.status(400).json({
            code: "ERROR",
            message: "ID de la empresa o ID del terreno inválidos"
        });
    }

    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.sqlMessage);
            return res.status(500).json({
                code: "ERROR",
                message: "Error de conexión a la base de datos"
            });
        }

        const queryString = `
            SELECT 
    dg.correlative, 
    ex.name AS exporter_name, 
    dg.boxes, 
    dg.kg, 
    q.abbreviation 
FROM 
    dispatch_guide dg 
JOIN 
    exporters ex 
ON 
    dg.client = ex.id
JOIN 
    quality q 
ON 
    dg.quality = q.id
WHERE 
    DATE(dg.date) = CURDATE()
    AND dg.company_id = ?
    AND dg.ground = ?
    `;
        mysqlConn.query(queryString, [companyID, groundID], function (error, results) {

            mysqlConn.end(); // Asegúrate de cerrar la conexión

            if (error) {
                console.error('Error ejecutando query: ' + error.sqlMessage);
                return res.status(500).json({
                    code: "ERROR",
                    message: "Error al ejecutar la consulta"
                });
            }

            const jsonResult = {
                code: "OK",
                data: results
            };
            res.json(jsonResult);
        });
    }
    );

}
);


router.post('/filter/dashboard/dataVarietySeasonPercentage/:companyID/:groundID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": [
                    {
                        "variety": "Nombre de la variedad",
                        "percentage": 100
                    }
                ]
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    // Validar que companyID y groundID sean números enteros válidos
    if (isNaN(companyID) || isNaN(groundID)) {
        return res.status(400).json({
            code: "ERROR",
            message: "ID de la empresa o ID del terreno inválidos"
        });
    }

    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.sqlMessage);
            return res.status(500).json({
                code: "ERROR",
                message: "Error de conexión a la base de datos"
            });
        }

        const queryString = `
            SELECT 
                v.name AS variety, 
                COUNT(*) AS cantidad
            FROM 
                harvest mh
            JOIN 
                varieties v 
            ON 
                v.id = mh.variety
            WHERE 
                mh.season = (
                    SELECT MAX(season)
                    FROM harvest
                    WHERE company_id = ?
                      AND ground = ?
                )
              AND mh.company_id = ?
              AND mh.ground = ?
            GROUP BY 
                v.name;
        `;

        mysqlConn.query(queryString, [companyID, groundID, companyID, groundID], function (error, results) {
            mysqlConn.end(); // Asegúrate de cerrar la conexión

            if (error) {
                console.error('Error ejecutando query: ' + error.sqlMessage);
                return res.status(500).json({
                    code: "ERROR",
                    message: "Error al ejecutar la consulta"
                });
            }

            // Calcular el porcentaje de cada variedad
            const totalCantidad = results.reduce((acc, curr) => acc + curr.cantidad, 0);
            const data = results.map(item => ({
                variety: item.variety,
                percentage: totalCantidad > 0 ? (item.cantidad / totalCantidad) * 100 : 0
            }));

            const jsonResult = {
                code: "OK",
                data
            };
            res.json(jsonResult);
        });
    });
});



router.post('/filter/dashboard/dataHumidityTemperatureSeason/:companyID/:groundID', (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "humidity": [100, 80, 60],
                    "temperature": [30, 25, 20],
                    "dates": ["20-12", "21-12", "22-12"]
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    // Validar que companyID y groundID sean números enteros válidos
    if (isNaN(companyID) || isNaN(groundID)) {
        return res.status(400).json({
            code: "ERROR",
            message: "ID de la empresa o ID del terreno inválidos"
        });
    }

    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.message); // Cambiado a err.message para un mensaje más claro
            return res.status(500).json({
                code: "ERROR",
                message: "Error de conexión a la base de datos"
            });
        }

        const queryString = `
            SELECT 
                DATE_FORMAT(date_register, '%d-%m') AS fecha, 
                AVG(wet) AS humedad, 
                AVG(temp) AS temperatura
            FROM 
                harvest
            WHERE 
                company_id = ?
                AND ground = ?
                AND season = (
                    SELECT MAX(season)
                    FROM harvest
                    WHERE company_id = ? AND ground = ?
                )
            GROUP BY 
                DATE_FORMAT(date_register, '%d-%m')
            ORDER BY 
                fecha;
        `;

        mysqlConn.query(queryString, [companyID, groundID, companyID, groundID], function (error, results) {
            mysqlConn.end(); // Asegúrate de cerrar la conexión

            if (error) {
                console.error('Error ejecutando query: ' + error.message); // Cambiado a error.message para un mensaje más claro
                return res.status(500).json({
                    code: "ERROR",
                    message: "Error al ejecutar la consulta"
                });
            }

            // Verifica que `results` tenga los datos esperados
            /*console.log('Query Results:', results);*/

            const data = {
                humedad: results.map(row => row.humedad),
                temperatura: results.map(row => row.temperatura),
                fechas: results.map(row => row.fecha)
            };

            res.json({
                code: "OK",
                data
            });
        });
    });
});


export default router;

