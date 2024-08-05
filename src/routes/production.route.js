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
                            "mensaje": "Registro actualizado correctamente."
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


//PRODUCCIÓN - CUARTELES
router.get('/configuracion/production/getSectorsBarracks/:companyID', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Production - Sectors Barracks']

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
                "sectors": [
                    {
                    "id": 1,
                    "name": "Sector 1",
                    "ground_id": 1,
                    "status": 1
                    }
                ]    
            }
        } 
    */
    try {

        let { companyID } = req.params;

        console.log(companyID);
        var sectors = [];

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

                var queryString = "SELECT * FROM sector s WHERE company_id = " + companyID;


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
                                    "ground": element.ground,
                                    "company_id": element.company_id,
                                    "status": element.status
                                }
                                sectors.push(jsonResult);
                            });

                            const jsonResult = {
                                "code": "OK",
                                "sectors": sectors
                            }

                            console.log('cuanto1', sectors);

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
                }

                );

                console.log('cuantos', sectors);


                mysqlConn.end();

            }
        });


    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/configuracion/production/updateSectorBarrack', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Sectors Barracks']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del sector',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Sector" }
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Sector actualizado correctamente."
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

                var queryString = "UPDATE sector SET name = '" + obj.name + "', ground = " + obj.ground + ", company_id = " + obj.company_id + ", status = " + obj.status + " WHERE id = " + obj.id;

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
                            "mensaje": "Registro actualizado correctamente."
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

router.post('/configuracion/production/deleteSectorBarrack', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Sectors Barracks']

       
        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID del Sector',
            required: true,
            type: "integer",
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro eliminado correctamente."
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

                var queryString = "DELETE FROM sector s WHERE id = " + id;


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

router.post('/configuracion/production/createSectorBarrack', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Sectors Barracks']
 
        #swagger.security = [{
            "apiKeyAuth": []
        }]
 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del sector',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Sector" }
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Sector creado correctamente."
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

                var queryString = "INSERT INTO sector (name, ground, company_id, status) VALUES ('" + obj.name + "', " + obj.ground + ", " + obj.company_id + ", " + obj.status + ")";

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


//PRODUCCIÓN - VARIETIES
router.get('/configuracion/production/getVarieties/:companyID', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Production - Varieties']

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
                "varieties": [
                    {
                    "id": 1,
                    "name": "Variedad 1",
                    "company_id": 1,
                    "status": 1
                    }
                ]    
            }
        } 
    */
    try {

        let { companyID } = req.params;

        console.log(companyID);
        var varieties = [];

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

                var queryString = "SELECT * FROM varieties v WHERE company_id = " + companyID;


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
                                    "company_id": element.company_id,
                                    "status": element.status
                                }
                                varieties.push(jsonResult);
                            });

                            const jsonResult = {
                                "code": "OK",
                                "varieties": varieties
                            }

                            console.log('varieties', varieties);

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
                }

                );

                mysqlConn.end();

            }
        });


    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/configuracion/production/updateVariety', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Varieties']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la variedad',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Variety" }
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Variedad actualizada correctamente."
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


                var queryString = "UPDATE varieties SET name = '" + obj.name + "', company_id = " + obj.company_id + ", status = " + obj.status + " WHERE id = " + obj.id;

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
                            "mensaje": "Registro actualizado correctamente."
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

router.post('/configuracion/production/deleteVariety', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Varieties']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID de la variedad',
            required: true,
            type: "integer",
        }  
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro eliminado correctamente."
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

                var queryString = "DELETE FROM varieties WHERE id = " + id;


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

router.post('/configuracion/production/createVariety', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Varieties']

        #swagger.security = [{
                "apiKeyAuth": []
          }]

        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la variedad',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Variety" }
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Variedad creada correctamente."
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

                var queryString = "INSERT INTO varieties (name, company_id, status) VALUES ('" + obj.name + "', " + obj.company_id + ", " + obj.status + ")";

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
        }
        );

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }

});


//PRODUCCIÓN - SPECIES

router.get('/configuracion/production/getSpecies/:companyID', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Production - Species']
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
                "species": [
                    {
                    "id": 1,
                    "name": "Especie 1",
                    "company_id": 1,
                    "status": 1,
                    "varieties": {}
                    }
                ]    
            }
        } 
    */
    try {
        let { companyID } = req.params;

        var species = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            var queryString = "SELECT * FROM species s WHERE company_id = ?";
            console.log(queryString);

            mysqlConn.query(queryString, [companyID], function (error, results) {
                if (error) {
                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });
                }

                if (results && results.length > 0) {
                    console.log('result', results);

                    results.forEach(element => {
                        species.push({
                            "id": element.id,
                            "name": element.name,
                            "varieties": element.varieties ? JSON.parse(element.varieties) : null ,
                            "status": element.status,
                        });
                    });

                    //console.log('species', species);

                    return res.json({
                        "code": "OK",
                        "species": species
                    });
                } else {
                    return res.json({
                        "code": "ERROR",
                        "mensaje": "No se encuentran registros."
                    });
                }
            });

            mysqlConn.end();
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }
});


router.post('/configuracion/production/updateSpecies', validateToken, (req, res) => {
    /*
        #swagger.tags = ['Production - Species']
        #swagger.security = [{
               "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la especie',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Species" }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Especie actualizada correctamente."
            }
        } 
    */
    try {
        let obj = req.body;

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            var queryString = "UPDATE species SET name = ?, varieties = ?, company_id = ?, status = ? WHERE id = ?";
            console.log(queryString);
            mysqlConn.query(queryString, [obj.name, JSON.stringify(obj.varieties), obj.company_id, obj.status, obj.id], function (error) {
                if (error) {
                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });
                }

                return res.json({
                    "code": "OK",
                    "mensaje": "Registro actualizado correctamente."
                });
            });

            mysqlConn.end();
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }
});

router.post('/configuracion/production/deleteSpecies', validateToken, (req, res) => {
    /*
        #swagger.tags = ['Production - Species']
        #swagger.security = [{
               "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID de la especie',
            required: true,
            type: "integer",
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro eliminado correctamente."
            }
        } 
    */
    try {
        let { id } = req.body;

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            var queryString = "DELETE FROM species WHERE id = ?";
            mysqlConn.query(queryString, [id], function (error, results) {
                if (error) {
                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });
                }

                if (results && results.affectedRows != 0) {
                    return res.json({
                        "code": "OK",
                        "mensaje": "Registro eliminado correctamente."
                    });
                } else {
                    return res.json({
                        "code": "ERROR",
                        "mensaje": "No se pudo eliminar el registro."
                    });
                }
            });

            mysqlConn.end();
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }
}
    
    );

router.post('/configuracion/production/createSpecies', validateToken, (req, res) => {
    /*
        #swagger.tags = ['Production - Species']
        #swagger.security = [{
                "apiKeyAuth": []
          }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la especie',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Species" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Especie creada correctamente."
            }
        }
    */
    try {
        let obj = req.body;

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            var queryString = "INSERT INTO species (name, varieties, company_id, status) VALUES (?, ?, ?, ?)";
            console.log(queryString);
            mysqlConn.query(queryString, [obj.name, JSON.stringify(obj.varieties), obj.company_id, obj.status], function (error, results) {
                if (error) {
                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });
                }

                if (results && results.insertId != 0) {
                    return res.json({
                        "code": "OK",
                        "mensaje": "Registro creado correctamente."
                    });
                } else {
                    return res.json({
                        "code": "ERROR",
                        "mensaje": "No se pudo crear el registro."
                    });
                }
            });

            mysqlConn.end();
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }
});


router.get('/configuracion/production/getSeasons/:companyID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Seasons']
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
                "seasons": [
                    {
                    "id": 1,
                    "name": "Temporada 1",
                    "period": "Anual",
                    "date_from": "2021-01-01 00:00:00",
                    "date_until": "2021-12-31 00:00:00",
                    "shifts": [1, 2, 3],
                    "company_id": 1,
                    "status": 1
                    }
                ]    
            }
        } 
    */

        try {
            let { companyID } = req.params;

            console.log(companyID);
    
            var seasons = [];
    
            var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));
    
            mysqlConn.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": err.message
                    });
                }
    
                var queryString = "SELECT * FROM season s WHERE company_id = ?";
                console.log('query',queryString);
    
                mysqlConn.query(queryString, [companyID], function (error, results) {
                    if (error) {
                        console.error('error ejecutando query: ' + error.message);
                        return res.json({
                            "code": "ERROR",
                            "mensaje": error.message
                        });
                    }
    
                    if (results && results.length > 0) {
                        console.log('result', results);
    
                        results.forEach(element => {
                            seasons.push({
                                "id": element.id,
                                "name": element.name,
                                "period": element.period,
                                "date_from": element.date_from,
                                "date_until": element.date_until,
                                "shifts": element.shifts ? JSON.parse(element.shifts) : null,
                                "company_id": element.company_id,
                                "status": element.status
                            });
                        });
    
                        console.log('seasons', seasons);
    
                        return res.json({
                            "code": "OK",
                            "seasons": seasons
                        });
                    } else {
                        return res.json({
                            "code": "ERROR",
                            "mensaje": "No se encuentran registros."
                        });
                    }
                });
    
                mysqlConn.end();
            });
        } catch (e) {
            console.log(e);
            res.json({ error: e.message });
        }

});

router.post('/configuracion/production/updateSeason', validateToken, (req, res) => {
    
        /*
            #swagger.tags = ['Production - Seasons']
            #swagger.security = [{
                "apiKeyAuth": []
            }]
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Datos de la temporada',
                required: true,
                type: "object",
                schema: { $ref: "#/definitions/Season" }
            }  
            #swagger.responses[200] = {
                schema: {
                    "code": "OK",
                    "mensaje": "Temporada actualizada correctamente."
                }
            } 
        */
    
        try {
            let obj = req.body;
    
            var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));
    
            mysqlConn.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": err.message
                    });
                }
    
                var queryString = "UPDATE season SET name = ?, period = ?, date_from = ?, date_until = ?, shifts = ?, company_id = ?, status = ? WHERE id = ?";
                console.log(queryString);
                mysqlConn.query(queryString, [obj.name, obj.period, obj.date_from, obj.date_until, JSON.stringify(obj.shifts), obj.company_id, obj.status, obj.id], function (error) {
                    if (error) {
                        console.error('error ejecutando query: ' + error.message);
                        return res.json({
                            "code": "ERROR",
                            "mensaje": error.message
                        });
                    }
    
                    return res.json({
                        "code": "OK",
                        "mensaje": "Registro actualizado correctamente."
                    });
                });
    
                mysqlConn.end();
            });
        } catch (e) {
            console.log(e);
            res.json({ error: e.message });
        }
    });

router.post('/configuracion/production/deleteSeason', validateToken, (req, res) => {
    
        /*
            #swagger.tags = ['Production - Seasons']
            #swagger.security = [{
                "apiKeyAuth": []
            }]
            #swagger.parameters['id'] = {
                in: 'body',
                description: 'ID de la temporada',
                required: true,
                type: "integer",
            }  
            #swagger.responses[200] = {
                schema: {
                    "code": "OK",
                    "mensaje": "Registro eliminado correctamente."
                }
            } 
        */
    
        try {
            let { id } = req.body;
    
            var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));
    
            mysqlConn.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": err.message
                    });
                }
    
                var queryString = "DELETE FROM season WHERE id = ?";
                mysqlConn.query(queryString, [id], function (error, results) {
                    if (error) {
                        console.error('error ejecutando query: ' + error.message);
                        return res.json({
                            "code": "ERROR",
                            "mensaje": error.message
                        });
                    }
    
                    if (results && results.affectedRows != 0) {
                        return res.json({
                            "code": "OK",
                            "mensaje": "Registro eliminado correctamente."
                        });
                    } else {
                        return res.json({
                            "code": "ERROR",
                            "mensaje": "No se pudo eliminar el registro."
                        });
                    }
                });
    
                mysqlConn.end();
            });
        } catch (e) {
            console.log(e);
            res.json({ error: e.message });
        }
    });

    router.post('/configuracion/production/createSeason', validateToken, (req, res) => {
        /*
            #swagger.tags = ['Production - Seasons']
            #swagger.security = [{
                "apiKeyAuth": []
            }]
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Datos de la temporada',
                required: true,
                type: "object",
                schema: { $ref: "#/definitions/Season" }
            }
            #swagger.responses[200] = {
                schema: {
                    "code": "OK",
                    "mensaje": "Temporada creada correctamente."
                }
            }
        */
        
        try {
            let obj = req.body;
    
            // Convertir las fechas ISO 8601 a formato DATETIME de MySQL
            let date_from = new Date(obj.date_from).toISOString().slice(0, 19).replace('T', ' ');
            let date_until = new Date(obj.date_until).toISOString().slice(0, 19).replace('T', ' ');
    
            // Preparar el valor de shifts como una cadena JSON
            let shifts = JSON.stringify(obj.shifts);
    
            var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));
    
            mysqlConn.connect(function (err) {
                if (err) {
                    console.error('Error al conectar: ' + err.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": err.message
                    });
                }
    
                var queryString = "INSERT INTO season (name, period, date_from, date_until, shifts, company_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)";

                mysqlConn.query(queryString, [obj.name, obj.period, date_from, date_until, shifts, obj.company_id, obj.status], function (error, results) {
                    if (error) {
                        console.error('Error al ejecutar la consulta: ' + error.message);
                        return res.json({
                            "code": "ERROR",
                            "mensaje": error.message
                        });
                    }
    
                    if (results && results.insertId) {
                        return res.json({
                            "code": "OK",
                            "mensaje": "Registro creado correctamente."
                        });
                    } else {
                        return res.json({
                            "code": "ERROR",
                            "mensaje": "No se pudo crear el registro."
                        });
                    }
                });
    
                mysqlConn.end();
            });
        } catch (e) {
            console.log(e);
            res.json({ error: e.message });
        }
    });
    
    

export default router