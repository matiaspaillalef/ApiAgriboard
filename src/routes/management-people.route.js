import { Router } from 'express'
const router = Router()
//import Usuario from '../models/usuario.model.js'
import validateToken from '../middleware/validateToken.js'
import mysql from 'mysql';
import bcrypt from 'bcrypt';

//CONFIGURACIÓN Management People

router.get('/management-people/positions/getPositions', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Positions']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "id": 1,
                "name": "Harvesters",
                "status": 1
            }
        } 
    */
    try {

        var positions = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }
                res.json(jsonResult);

            }
            else {

                var queryString = "SELECT id, name, status FROM positions";

                console.log(queryString);
                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }
                        res.json(jsonResult);

                    }
                    else {
                        if (results.length > 0) {

                            results.forEach(element => {
                                const jsonResult = {
                                    "id": element.id,
                                    "name": element.name,
                                    "status": element.status,
                                };
                                positions.push(jsonResult);
                            });

                            const jsonResult = {
                                "code": "OK",
                                "positions": positions
                            }
                            res.json(jsonResult);
                        }
                        else {
                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "No se encontraron registros"
                            }
                            res.json(jsonResult);
                        }

                    }
                });

                mysqlConn.end();

            }
        });


    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/management-people/positions/updatePosition', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Positions']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Position',
            required: true,
            schema: {id: 1, name: "Harvesters", status: 1}
        }
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro actualizado"
            }
        } 
    */
    try {

        const { id, name, status } = req.body;

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }
                res.json(jsonResult);

            }
            else {

                var queryString = "UPDATE positions SET name = '" + name + "', status = " + status + " WHERE id = " + id;

                console.log(queryString);
                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }
                        res.json(jsonResult);

                    }
                    else {
                        const jsonResult = {
                            "code": "OK",
                            "mensaje": "Registro actualizado"
                        }
                        res.json(jsonResult);
                    }
                });

                mysqlConn.end();

            }
        });

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/management-people/positions/deletePosition', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Positions']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
       #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                id: 1,
            }
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro eliminado"
            }
        } 
    */
    try {

        let { id } = req.body;

        console.log(id);

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }
                res.json(jsonResult);

            }
            else {

                var queryString = "DELETE FROM positions WHERE id = " + id;

                console.log(queryString);
                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }
                        res.json(jsonResult);

                    }
                    else {
                        const jsonResult = {
                            "code": "OK",
                            "mensaje": "Registro eliminado"
                        }
                        res.json(jsonResult);
                    }
                });

                mysqlConn.end();

            }
        });

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/management-people/positions/createPosition', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Positions']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Position',
            required: true,
            schema: {name: "Harvesters", status: 1}
        }
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro creado"
            }
        } 
    */
    try {

        const { name, status } = req.body;

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }
                res.json(jsonResult);

            }
            else {

                var queryString = "INSERT INTO positions (name, status) VALUES ('" + name + "', " + status + ")";

                console.log(queryString);
                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }
                        res.json(jsonResult);

                    }
                    else {
                        const jsonResult = {
                            "code": "OK",
                            "mensaje": "Registro creado"
                        }
                        res.json(jsonResult);
                    }
                });

                mysqlConn.end();

            }
        });

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
}); 



export default router