import { Router } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import mysql from 'mysql';
import bcrypt from 'bcrypt';

router.get('/filter/dashboard/dataKgDay/:companyID/:groundID', validateToken, (req, res) => {
    /*
        #swagger.tags = ['Dashboard - KG Day']

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

            var queryString = "SELECT SUM(kg_boxes) AS kg_boxes FROM manual_harvesting WHERE company_id  = " + companyID + " AND ground = " + groundID;
            //var queryString = "SELECT SUM(kg_boxes) AS kg_boxes FROM manual_harvesting WHERE company_id  = " + companyID + " AND ground = " + groundID + " AND season = (SELECT MAX(season) FROM manual_harvesting WHERE company_id = " + companyID + " AND ground = " + groundID + ")";

            console.log(queryString);
            mysqlConn.query(queryString, function (error, results, fields) {

                if (error) {
                    console.error('error ejecutando query: ' + error.sqlMessage);
                    const jsonResult = {
                        "code": "ERROR",
                        "mensaje": error.sqlMessage
                    }
                    res.json(jsonResult);
                } else {
                    console.log(results);
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
        #swagger.tags = ['Dashboard - IQF KG Day']

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

            var queryString = "SELECT SUM(kg_boxes) AS kg_boxes FROM manual_harvesting WHERE company_id  = " + companyID + " AND ground = " + groundID + " AND quality = " + qualityID;

            mysqlConn.query(queryString, function (error, results, fields) {

                if (error) {
                    console.error('error ejecutando query: ' + error.sqlMessage);
                    const jsonResult = {
                        "code": "ERROR",
                        "mensaje": error.sqlMessage
                    }
                    res.json(jsonResult);
                } else {
                    console.log(results);
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
        #swagger.tags = ['Dashboard - KG Season']
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
            FROM manual_harvesting
            WHERE company_id = ?
              AND ground = ?
              AND season = (
                SELECT MAX(season)
                FROM manual_harvesting
                WHERE company_id = ?
                  AND ground = ?
              )
        `;

        mysqlConn.query(queryString, [companyID, groundID, companyID, groundID], function (error, results) {

            console.log('queryString:', queryString)

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
        #swagger.tags = ['Dashboard - IQF KG Season']
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
            FROM manual_harvesting
            WHERE company_id = ?
              AND ground = ?
              AND quality = ?
              AND season = (
                SELECT MAX(season)
                FROM manual_harvesting
                WHERE company_id = ?
                  AND ground = ?
                  AND quality = ?
              )
        `;

        mysqlConn.query(queryString, [companyID, groundID, qualityID, companyID, groundID, qualityID], function (error, results) {

            console.log('queryString:', queryString)

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

export default router
