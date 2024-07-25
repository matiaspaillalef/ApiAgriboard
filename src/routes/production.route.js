import { Router } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import mysql from 'mysql';
import bcrypt, { compareSync } from 'bcrypt';


//PRODUCCIÓN - CAMPOS

router.get('/configuracion/production/getGround/:companyID', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Production - Grounds']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

         #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "grounds": [
                    {
                    "id": 1,
                    "name": "Campo 1",
                    "state": "XVI",
                    "city": "Santiago",
                    "address": "Av. Providencia 123",
                    "latitude": -33.433,
                    "longitude": -70.633,
                    "zone": "Zona 1",
                    "company_id": 2,
                    "status": 1
                    }
                ]    
            }
        } 
    */
    try {

        let { companyID } = req.params;

        console.log(companyID);
        var grounds = [];

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

                var queryString = "SELECT * FROM ground g where company_id = " + companyID;


                console.log(queryString);
                mysqlConn.query(queryString, function (error, results, fields) {

                    if (error) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }
                        res.json(jsonResult);

                    }
                    else {
                        if (results && results.length > 0) {

                            console.log('result', results);

                            results.forEach(element => {
                                const jsonResult = {
                                    "id": element.id,
                                    "name": element.name,
                                    "state": element.state,
                                    "city": element.city,
                                    "address": element.address,
                                    "latitude": element.latitude,
                                    "longitude": element.longitude,
                                    "zone": element.zone,
                                    "company_id": element.company_id,
                                    "status": element.status
                                }
                                grounds.push(jsonResult);
                            });

                            const jsonResult = {
                                "code": "OK",
                                "grounds": grounds
                            }

                            console.log('cuanto1', grounds);

                            res.json(jsonResult);
                        }
                        else {
                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "No se encuentran registros."
                            }
                            res.json(jsonResult);
                        }

                    }
                });

                console.log('cuantos', grounds);

                mysqlConn.end();

            }
        });


    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/configuracion/production/updateGround', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Grounds']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del campo',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Ground" }
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Campo actualizado correctamente."
            }
        } 
    */

    try {

        let obj = req.body;

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

                console.log(obj.latitude);

                var queryString = "UPDATE ground SET name = '" + obj.name + "', state = '" + obj.state + "', city = '" + obj.city + "', address = '" + obj.address + "', latitude = " + (obj.latitude == null ? 'NULL' : '') + ", longitude = " + (obj.longitude == null ? 'NULL' : '') + ", zone = '" + obj.zone + "', company_id = " + obj.company_id + ", status = " + obj.status + " WHERE id = " + obj.id;

                console.log(queryString);
                mysqlConn.query(queryString, function (error, results, fields) {

                    if (error) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }
                        res.json(jsonResult);

                    }
                    else {

                        const jsonResult = {
                            "code": "OK",
                            "mensaje": "Campo actualizado correctamente."
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

router.post('/configuracion/production/deleteGround', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Grounds']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID del campo',
            required: true,
            type: "integer",
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Campo eliminado correctamente."
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

                var queryString = "DELETE FROM ground WHERE id = " + id;


                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }
                        res.json(jsonResult);

                    }
                    else {

                        if (results && results.affectedRows != 0) {

                            const jsonResult = {
                                "code": "OK",
                                "mensaje": "Registro eliminado correctamente."
                            }

                            res.json(jsonResult);

                        } else {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "No se pudo elmiminar el registro ."
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

router.post('/configuracion/production/createGround', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Grounds']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del campo',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Ground" }
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Campo creado correctamente."
            }
        } 
    */

    try {

        let obj = req.body;

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

                var queryString = "INSERT INTO ground (name, state, city, address, latitude, longitude, zone, company_id, status) VALUES ('" + obj.name + "', '" + obj.state + "', '" + obj.city + "', '" + obj.address + "', " + (obj.latitude == null ? 'NULL' : obj.latitude) + ", " + (obj.longitude == null ? 'NULL' : obj.longitude) + ", '" + obj.zone + "', " + obj.company_id + ", " + obj.status + ")";

                console.log(queryString);
                mysqlConn.query(queryString, function (error, results, fields) {

                    if (error) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }
                        res.json(jsonResult);

                    }
                    else {

                        if (results && results.insertId != 0) {

                            const jsonResult = {
                                "code": "OK",
                                "mensaje": "Registro creado correctamente."
                            }

                            res.json(jsonResult);

                        } else {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "No se pudo crear el registro ."
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


export default router