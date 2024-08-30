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

                //console.log(queryString);
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

                //console.log(queryString);
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

        //console.log(companyID);
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


                //console.log(queryString);

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

                            //console.log('varieties', varieties);

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

                //console.log(queryString);
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

                //console.log(queryString);
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
            //console.log(queryString);

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
                            "varieties": element.varieties ? JSON.parse(element.varieties) : null,
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
            //console.log(queryString);
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
            //console.log(queryString);
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


//PRODUCCIÓN TEMPORADAS

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

        //console.log(companyID);

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
            console.log('query', queryString);

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
            //console.log(queryString);
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

//PRODUCCIÓN - TIPO DE RECOLECCIÓN

router.get('/configuracion/production/getCollectionType/:companyID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Collection Type']
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
                "collections": [
                    {
                    "id": 1,
                    "name": "Manual",
                    "company_id": 1,
                    "status": 1
                    }
                ]    
            }
        } 
    */

    try {
        let { companyID } = req.params;

        //console.log(companyID);

        var collections = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            var queryString = "SELECT * FROM type_collection tc WHERE company_id = ?";

            mysqlConn.query(queryString, [companyID], function (error, results) {
                if (error) {
                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });
                }

                if (results && results.length > 0) {

                    results.forEach(element => {
                        collections.push({
                            "id": element.id,
                            "name": element.name,
                            "company_id": element.company_id,
                            "status": element.status
                        });
                    });

                    return res.json({
                        "code": "OK",
                        "collections": collections
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

router.post('/configuracion/production/updateCollectionType', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Collection Type']
        #swagger.security = [{
               "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del tipo de recolección',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/CollectionType" }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Tipo de recolección actualizado correctamente."
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

            var queryString = "UPDATE type_collection SET name = ?, company_id = ?, status = ? WHERE id = ?";

            mysqlConn.query(queryString, [obj.name, obj.company_id, obj.status, obj.id], function (error) {
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

router.post('/configuracion/production/deleteCollectionType', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Collection Type']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID del tipo de recolección',
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

            var queryString = "DELETE FROM type_collection WHERE id = ?";

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

router.post('/configuracion/production/createCollectionType', validateToken, (req, res) => {
    /*
        #swagger.tags = ['Production - Collection Type']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del tipo de recolección',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/CollectionType" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Tipo de recolección creado correctamente."
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

            var queryString = "INSERT INTO type_collection (name, company_id, status) VALUES (?, ?, ?)";

            mysqlConn.query(queryString, [obj.name, obj.company_id, obj.status], function (error, results) {
                if (error) {
                    console.error('error ejecutando query: ' + error.message);
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
}
);

//PRODUCCIÓN - CALIDAD
router.get('/configuracion/production/getQuality/:companyID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Quality']
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
                "qualities": [
                    {
                    "id": 1,
                    "name": "Calidad 1",
                    "abbreviation": "C1",
                    "company_id": 1,
                    "status": 1
                    }
                ]    
            }
        } 
    */

    try {
        let { companyID } = req.params;

        //console.log(companyID);

        var qualities = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            var queryString = "SELECT * FROM quality q WHERE company_id = ?";

            mysqlConn.query(queryString, [companyID], function (error, results) {
                if (error) {
                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });
                }

                if (results && results.length > 0) {

                    results.forEach(element => {
                        qualities.push({
                            "id": element.id,
                            "name": element.name,
                            "abbreviation": element.abbreviation,
                            "company_id": element.company_id,
                            "status": element.status
                        });
                    });

                    return res.json({
                        "code": "OK",
                        "qualities": qualities
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

}
);

router.post('/configuracion/production/updateQuality', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Quality']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la calidad',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Quality" }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Calidad actualizada correctamente."
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

            var queryString = "UPDATE quality SET name = ?, abbreviation = ?, company_id = ?, status = ? WHERE id = ?";

            mysqlConn.query(queryString, [obj.name, obj.abbreviation, obj.company_id, obj.status, obj.id], function (error) {
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
}
);

router.post('/configuracion/production/deleteQuality', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Quality']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID de la calidad',
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

            var queryString = "DELETE FROM quality WHERE id = ?";

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

router.post('/configuracion/production/createQuality', validateToken, (req, res) => {
    /*
        #swagger.tags = ['Production - Quality']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la calidad',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Quality" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Calidad creada correctamente."
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

            var queryString = "INSERT INTO quality (name, abbreviation, company_id, status) VALUES (?, ?, ?, ?)";

            mysqlConn.query(queryString, [obj.name, obj.abbreviation, obj.company_id, obj.status], function (error, results) {
                if (error) {
                    console.error('error ejecutando query: ' + error.message);
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
}
);


//PRODUCCIÓN - BALANZAS
router.get('/configuracion/production/getScale/:companyID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Scale']
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
                "scales": [
                    {
                    "id": 1,
                    "name": "Balanza 1",
                    "location": "Ubicación 1",
                    "company_id": 1,
                    "status": 1
                    }
                ]    
            }
        } 
    */

    try {

        let { companyID } = req.params;

        //console.log(companyID);

        var scales = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "SELECT * FROM scale s WHERE company_id = ?";

            mysqlConn.query(queryString, [companyID], function (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });

                }

                if (results && results.length > 0) {

                    results.forEach(element => {
                        scales.push({
                            "id": element.id,
                            "name": element.name,
                            "location": element.location,
                            "company_id": element.company_id,
                            "status": element.status
                        });
                    });

                    return res.json({
                        "code": "OK",
                        "scales": scales
                    });

                } else {

                    return res.json({
                        "code": "ERROR",
                        "mensaje": "No se encuentran registros."
                    });

                }

            });

            mysqlConn.end();

        }
        );

    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }

});

router.post('/configuracion/production/updateScale', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Scale']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la balanza',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Scale" }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Balanza actualizada correctamente."
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

            var queryString = "UPDATE scale SET name = ?, location = ?, company_id = ?, status = ? WHERE id = ?";

            mysqlConn.query(queryString, [obj.name, obj.location, obj.company_id, obj.status, obj.id], function (error) {

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

router.post('/configuracion/production/deleteScale', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Scale']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID de la balanza',
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

            var queryString = "DELETE FROM scale WHERE id = ?";

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

router.post('/configuracion/production/createScale', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Scale']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la balanza',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Scale" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Balanza creada correctamente."
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

            var queryString = "INSERT INTO scale (name, location, company_id, status) VALUES (?, ?, ?, ?)";

            mysqlConn.query(queryString, [obj.name, obj.location, obj.company_id, obj.status], function (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
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

//PRODUCCIÓN - SCALE REGISTER

router.get('/configuracion/production/getScaleRegister/:companyID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Scale Register']
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
                "registers": [
                    {
                    "id": 1,
                    "scale": "1",
                    "quality": "1",
                    "date": "2021-01-01 00:00:00",
                    "boxes": 100,
                    "kg_boxes": 20,
                    "specie": "1",
                    "variety": "1",
                    "season": 1,
                    "company_id": 1,
                    }
                ]    
            }
        } 
    */

    try {

        let { companyID } = req.params;

        //console.log(companyID);

        var registers = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "SELECT * FROM scale_register sr WHERE company_id = ?";

            mysqlConn.query(queryString, [companyID], function (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });

                }

                if (results && results.length > 0) {

                    results.forEach(element => {
                        registers.push({
                            "id": element.id,
                            "scale": element.scale,
                            "quality": element.quality,
                            "date": element.date,
                            "boxes": element.boxes,
                            "kg_boxes": element.kg_boxes,
                            "specie": element.specie,
                            "variety": element.variety,
                            "season": element.season,
                            "company_id": element.company_id
                        });
                    });

                    return res.json({
                        "code": "OK",
                        "registers": registers
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

}
);

router.post('/configuracion/production/updateScaleRegister', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Scale Register']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del registro de balanza',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/ScaleRegister" }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro de balanza actualizado correctamente."
            }
        } 
    */

    try {

        let obj = req.body;

        // Convertir la fecha ISO 8601 a formato DATETIME de MySQL
        let date = new Date(obj.date).toISOString().slice(0, 19).replace('T', ' ');

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "UPDATE scale_register SET scale = ?, quality = ?, date = ?, boxes = ?, kg_boxes = ?, specie = ?, variety = ?, season = ?, company_id = ? WHERE id = ?";

            mysqlConn.query(queryString, [obj.scale, obj.quality, date, obj.boxes, obj.kg_boxes, obj.specie, obj.variety, obj.season, obj.company_id, obj.id], function (error) {

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

}
);

router.post('/configuracion/production/deleteScaleRegister', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Scale Register']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID del registro de balanza',
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

            var queryString = "DELETE FROM scale_register WHERE id = ?";

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

router.post('/configuracion/production/createScaleRegister', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Scale Register']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del registro de balanza',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/ScaleRegister" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro de balanza creado correctamente."
            }
        }
    */

    try {

        let obj = req.body;

        //console.log(obj);

        // Convertir la fecha ISO 8601 a formato DATETIME de MySQL
        let date = new Date(obj.date).toISOString().slice(0, 19).replace('T', ' ');

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "INSERT INTO scale_register (scale, quality, date, boxes, kg_boxes, specie, variety, season, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            mysqlConn.query(queryString, [obj.scale, obj.quality, date, obj.boxes, obj.kg_boxes, obj.specie, obj.variety, obj.season, obj.company_id], function (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
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

            }
            );

            mysqlConn.end();

        });

    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }

});

//PRODUCCIÓN - HARVEST FORMAT

router.get('/configuracion/production/getHarvestFormat/:companyID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Harvest Format']
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
                "formats": [
                    {
                    "id": 1,
                    "name": "Formato 1",
                    "tara_base": 1,
                    "specie": 1,
                    "min_weight": 1,
                    "max_weight": 1,
                    "average_weight": 1,
                    "quantity_trays": 1,
                    "collection": 1,
                    "status": 1,
                    "company_id": 1
                    }
                ]    
            }
        } 
    */

    try {

        let { companyID } = req.params;

        //console.log(companyID);

        var formats = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "SELECT * FROM harvest_format hf WHERE company_id = ?";

            mysqlConn.query(queryString, [companyID], function (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });

                }

                if (results && results.length > 0) {

                    results.forEach(element => {
                        formats.push({
                            "id": element.id,
                            "name": element.name,
                            "tara_base": element.tara_base,
                            "specie": element.specie,
                            "min_weight": element.min_weight,
                            "max_weight": element.max_weight,
                            "average_weight": element.average_weight,
                            "quantity_trays": element.quantity_trays,
                            "collection": element.collection,
                            "status": element.status,
                            "company_id": element.company_id
                        });
                    });

                    return res.json({
                        "code": "OK",
                        "formats": formats
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

router.post('/configuracion/production/updateHarvestFormat', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Harvest Format']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del formato de cosecha',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/HarvestFormat" }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Formato de cosecha actualizado correctamente."
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

            var queryString = "UPDATE harvest_format SET name = ?, tara_base = ?, specie = ?, min_weight = ?, max_weight = ?, average_weight = ?, quantity_trays = ?, collection = ?, status = ?, company_id = ? WHERE id = ?";

            mysqlConn.query(queryString, [obj.name, obj.tara_base, obj.specie, obj.min_weight, obj.max_weight, obj.average_weight, obj.quantity_trays, obj.collection, obj.status, obj.company_id, obj.id], function (error) {

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


router.post('/configuracion/production/deleteHarvestFormat', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Harvest Format']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID del formato de cosecha',
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

            var queryString = "DELETE FROM harvest_format WHERE id = ?";

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

router.post('/configuracion/production/createHarvestFormat', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Harvest Format']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del formato de cosecha',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/HarvestFormat" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Formato de cosecha creado correctamente."
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

            var queryString = "INSERT INTO harvest_format (name, tara_base, specie, min_weight, max_weight, average_weight, quantity_trays, collection, status, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            mysqlConn.query(queryString, [obj.name, obj.tara_base, obj.specie, obj.min_weight, obj.max_weight, obj.average_weight, obj.quantity_trays, obj.collection, obj.status, obj.company_id], function (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
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

//PRODUCCIÓN - DEALS
router.get('/configuracion/production/getDeals/:companyID', validateToken, (req, res) => {


    /*
        #swagger.tags = ['Production - Deals']
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
                "deals": [
                    {
                    "id": 1,
                    "name": "Negocio 1",
                    "harvest_format": 1,
                    "quality": 1,
                    "price": 100,
                    "status": 1
                    "company_id": 1,
                    }
                ]    
            }
        } 
    */

    try {

        let { companyID } = req.params;

        //console.log(companyID);

        var deals = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "SELECT * FROM deals d WHERE company_id = ?";

            mysqlConn.query(queryString, [companyID], function (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });

                }

                if (results && results.length > 0) {

                    results.forEach(element => {
                        deals.push({
                            "id": element.id,
                            "name": element.name,
                            "harvest_format": element.harvest_format,
                            "quality": element.quality,
                            "price": element.price,
                            "status": element.status,
                            "company_id": element.company_id
                        });
                    });

                    return res.json({
                        "code": "OK",
                        "deals": deals
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

router.post('/configuracion/production/updateDeal', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Deals']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del negocio',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Deal" }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Negocio actualizado correctamente."
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

            var queryString = "UPDATE deals SET name = ?, harvest_format = ?, quality = ?, price = ?, status = ? WHERE id = ?";

            mysqlConn.query(queryString, [obj.name, obj.harvest_format, obj.quality, obj.price, obj.status, obj.id], function (error) {

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

    }
    catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }

});

router.post('/configuracion/production/deleteDeal', validateToken, (req, res) => {
    try {
        let { id } = req.body;

        if (!id) {
            return res.status(400).json({
                "code": "ERROR",
                "mensaje": "ID no proporcionado."
            });
        }

        const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));
        mysqlConn.connect(function (err) {
            if (err) {
                console.error('Error al conectar a la base de datos:', err.message);
                return res.status(500).json({
                    "code": "ERROR",
                    "mensaje": "Error al conectar con la base de datos."
                });
            }

            const queryString = "DELETE FROM deals WHERE id = ?";
            mysqlConn.query(queryString, [id], function (error, results) {
                mysqlConn.end();  // Cierra la conexión después de ejecutar la consulta

                if (error) {
                    console.error('Error al ejecutar la consulta:', error.message);
                    return res.status(500).json({
                        "code": "ERROR",
                        "mensaje": "Error al ejecutar la consulta."
                    });
                }

                if (results.affectedRows > 0) {
                    return res.json({
                        "code": "OK",
                        "mensaje": "Registro eliminado correctamente."
                    });
                } else {
                    return res.status(404).json({
                        "code": "ERROR",
                        "mensaje": "No se encontró el registro con el ID proporcionado."
                    });
                }
            });
        });

    } catch (e) {
        console.error('Error en el servidor:', e.message);
        res.status(500).json({ error: "Error interno del servidor: " + e.message });
    }
});

router.post('/configuracion/production/createDeal', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Deals']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del negocio',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Deal" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Negocio creado correctamente."
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

            var queryString = "INSERT INTO deals (name, harvest_format, quality, price, status, company_id) VALUES (?, ?, ?, ?, ?, ?)";

            mysqlConn.query(queryString, [obj.name, obj.harvest_format, obj.quality, obj.price, obj.status, obj.company_id], function


                (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
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

            }
            );

            mysqlConn.end();

        });

    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }

});


//PRODUCCIÓN - EXPORTERS
router.get('/configuracion/production/getExporters/:companyID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Exporters']
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
                "exporters": [
                    {
                    "id": 1,
                    "name": "Exportador 1",
                    "rut": "12345678-9",
                    "giro": "Giro 1",
                    "state": "Región 1",
                    "city": "Ciudad 1",
                    "address": "Dirección 1",
                    "phone": "123456789",
                    "web": "www.exportador1.cl",
                    "legal_representative_name": "Representante 1",
                    "legal_representative_rut": "12345678-9",
                    "legal_representative_phone": "123456789",
                    "legal_representative_email": "email@email.com"
                    "status": 1,
                    "company_id": 1
                    }
                ]    
            }
        } 
    */

    try {

        let { companyID } = req.params;

        //console.log(companyID);

        var exporters = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "SELECT * FROM exporters e WHERE company_id = ?";

            mysqlConn.query(queryString, [companyID], function (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });

                }

                if (results && results.length > 0) {

                    results.forEach(element => {
                        exporters.push({
                            "id": element.id,
                            "rut": element.rut,
                            "name": element.name,
                            "giro": element.giro,
                            "state": element.state,
                            "city": element.city,
                            "address": element.address,
                            "phone": element.phone,
                            "web": element.web,
                            "legal_representative_rut": element.legal_representative_rut,
                            "legal_representative_name": element.legal_representative_name,
                            "legal_representative_phone": element.legal_representative_phone,
                            "legal_representative_email": element.legal_representative_email,
                            "status": element.status,
                            "company_id": element.company_id
                        });
                    });

                    return res.json({
                        "code": "OK",
                        "exporters": exporters
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

router.post('/configuracion/production/updateExporter', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Exporters']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del exportador',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Exporter" }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Exportador actualizado correctamente."
            }
        } 
    */

    try {

        let obj = req.body;

        //console.log(obj);

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "UPDATE exporters SET name = ?, rut = ?, giro = ?, state = ?, city = ?, address = ?, phone = ?, web = ?, legal_representative_name = ?, legal_representative_rut = ?, legal_representative_phone = ?, legal_representative_email = ?, status = ? WHERE id = ?";

            mysqlConn.query(queryString, [obj.name, obj.rut, obj.giro, obj.state, obj.city, obj.address, obj.phone, obj.web, obj.legal_representative_name, obj.legal_representative_rut, obj.legal_representative_phone, obj.legal_representative_email, obj.status, obj.id], function (error) {

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

router.post('/configuracion/production/deleteExporter', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Exporters']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID del exportador',
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

            var queryString = "DELETE FROM exporters WHERE id = ?";

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

router.post('/configuracion/production/createExporter', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Exporters']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos del exportador',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/Exporter" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Exportador creado correctamente."
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

            //console.log(obj);

            var queryString = "INSERT INTO exporters (name, rut, giro, state, city, address, phone, web, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, company_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

            mysqlConn.query(queryString, [obj.name, obj.rut, obj.giro, obj.state, obj.city, obj.address, obj.phone, obj.web, obj.legal_representative_name, obj.legal_representative_rut, obj.legal_representative_phone, obj.legal_representative_email, obj.status, obj.company_id], function (error, results) {

                if (error) {
                    console.error('error ejecutando query: ' + error.message);
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


//PRODUCCIÓN - CARGA MANUAL
router.get('/configuracion/production/getManualHarvesting/:companyID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Manual Harvesting']
        #swagger.security
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "manualHarvesting": [
                    {
                    "id": 1,
                    "zone": "Zona 1",
                    "ground": "Suelo 1",
                    "sector": "Sector 1",
                    "squad": "Escuadra 1",
                    "squad_leader": "Jefe 1",
                    "batch": "Lote 1",
                    "worker": 1,
                    "worker_rut": "12345678-9",
                    "harvest_date": "2021-01-01 00:00:00",
                    "specie": 1,
                    "variety": 1,
                    "boxes": 100,
                    "kg_boxes": 20,
                    "quality": 1,
                    "row": 1,
                    "harvest_format": 1,
                    company_id: 1
                    }
                ]    
            }
        }
    */



    try {

        let { companyID } = req.params;

        //console.log(companyID);

        var manualHarvesting = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "SELECT * FROM manual_harvesting mh WHERE company_id = ?";

            mysqlConn.query(queryString, [companyID], function (error, results) {

                if (error) {

                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });

                }

                if (results && results.length > 0) {

                    results.forEach(element => {
                        manualHarvesting.push({
                            "id": element.id,
                            "ground": element.ground,
                            "sector": element.sector,
                            "squad": element.squad,
                            "squad_leader": element.squad_leader,
                            "batch": element.batch,
                            "zone": element.zone,
                            "worker": element.worker,
                            "worker_rut": element.worker_rut,
                            "harvest_date": element.harvest_date,
                            "quality": element.quality,
                            "boxes": element.boxes,
                            "kg_boxes": element.kg_boxes,
                            "hilera": element.hilera,
                            "specie": element.specie,
                            "variety": element.variety,
                            "harvest_format": element.harvest_format,
                            "weigher_rut": element.weigher_rut,
                            "sync": element.sync,
                            "sync_date": element.sync_date,
                            "season": element.season,
                            "turns": element.turns,
                            "date_register": element.date_register,
                            "temp": element.temp,
                            "wet": element.wet,
                            "contractor": element.contractor,
                            "company_id": element.company_id
                        });
                    });

                    return res.json({
                        "code": "OK",
                        "manualHarvesting": manualHarvesting
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

    }

    catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }

});

router.post('/configuracion/production/updateManualHarvesting', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Manual Harvesting']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la cosecha manual',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/ManualHarvesting" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Cosecha manual actualizada correctamente."
            }
        }
    */

    try {

        let obj = req.body;

        //(obj);

        // Convertir la fecha ISO 8601 a formato DATETIME de MySQL
        let date = new Date(obj.harvest_date).toISOString().slice(0, 19).replace('T', ' ');

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });

            }

            var queryString = "UPDATE manual_harvesting SET zone = ?, ground = ?, sector = ?, squad = ?, squad_leader = ?, batch = ?, worker = ?, worker_rut = ?, harvest_date = ?, specie = ?, variety = ?, boxes = ?, kg_boxes = ?, quality = ?, hilera = ?, harvest_format = ?, company_id = ? WHERE id = ?";

            mysqlConn.query(queryString, [obj.zone, obj.ground, obj.sector, obj.squad, obj.squad_leader, obj.batch, obj.worker, obj.worker_rut, date, obj.specie, obj.variety, obj.boxes, obj.kg_boxes, obj.quality, obj.hilera, obj.harvest_format, obj.company_id, obj.id], function (error) {

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

router.post('/configuracion/production/deleteManualHarvesting', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Manual Harvesting']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID de la cosecha manual',
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

            var queryString = "DELETE FROM manual_harvesting WHERE id = ?";

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

router.post('/configuracion/production/createManualHarvesting', validateToken, (req, res) => {

    try {

        let obj = req.body;

        //console.log(obj);

        // Convertir la fecha ISO 8601 a formato DATETIME de MySQL
        let date = new Date(obj.harvest_date).toISOString().slice(0, 19).replace('T', ' ');

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            // Asegúrate de que la cantidad de columnas coincida con la cantidad de valores
            var queryString = `
                INSERT INTO manual_harvesting 
                (zone, ground, sector, squad, squad_leader, batch, worker, worker_rut, harvest_date, specie, variety, boxes, kg_boxes, quality, hilera, harvest_format, company_id) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;

            mysqlConn.query(queryString, [
                obj.zone, obj.ground, obj.sector, obj.squad, obj.squad_leader, obj.batch,
                obj.worker, obj.worker_rut, date, obj.specie, obj.variety, obj.boxes,
                obj.kg_boxes, obj.quality, obj.hilera, obj.harvest_format, obj.company_id
            ], function (error, results) {

                if (error) {
                    console.error('error ejecutando query: ' + error.message);
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


// PRODUCTION - DISPATCH GUIDE

router.get('/configuracion/production/getDispatchGuide/:companyID', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Dispatch Guide']
        #swagger.security
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "dispatchGuide": [
                    {
                    "id": 1,
                    "client": "Cliente 1",
                    "date": "2021-01-01 00:00:00",
                    "season": 1,
                    "correlative": 1,
                    "boxes": 100,
                    "kg": 20.5,
                    "quality": 1,
                    "company_id": 1
                    }
                ]
            }

        }
    */

    try {

        let { companyID } = req.params;

        //console.log(companyID);

        var dispatchGuide = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            var queryString = "SELECT * FROM dispatch_guide dg WHERE company_id = ?";

            mysqlConn.query(queryString, [companyID], function (error, results) {

                if (error) {
                    console.error('error ejecutando query: ' + error.message);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.message
                    });
                }

                //console.log(results);

                if (results && results.length > 0) {

                    results.forEach(element => {
                        dispatchGuide.push({
                            "id": element.id,
                            "client": element.client,
                            "date": element.date,
                            "season": element.season,
                            "correlative": element.correlative,
                            "boxes": element.boxes,
                            "kg": element.kg,
                            "quality": element.quality,
                            "company_id": element.company_id
                        });
                    });

                    return res.json({
                        "code": "OK",
                        "dispatchGuide": dispatchGuide
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


router.post('/configuracion/production/updateDispatchGuide', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Dispatch Guide']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la guía de despacho',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/DispatchGuide" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Guía de despacho actualizada correctamente."
            }
        }
    */


    try {

        let obj = req.body;

        //console.log(obj);

        // Convertir la fecha ISO 8601 a formato DATETIME de MySQL
        let date = new Date(obj.date).toISOString().slice(0, 19).replace('T', ' ');

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            var queryString = "UPDATE dispatch_guide SET client = ?, date = ?, season = ?, correlative = ?, boxes = ?, kg = ?, quality = ? WHERE id = ?";

            mysqlConn.query(queryString, [obj.client, date, obj.season, obj.correlative, obj.boxes, obj.kg, obj.quality, obj.id], function (error) {

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

}

);

router.post('/configuracion/production/deleteDispatchGuide', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Dispatch Guide']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'ID de la guía de despacho',
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

            var queryString = "DELETE FROM dispatch_guide WHERE id = ?";

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

    }
    catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }
});


router.post('/configuracion/production/createDispatchGuide', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Production - Dispatch Guide']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Datos de la guía de despacho',
            required: true,
            type: "object",
            schema: { $ref: "#/definitions/DispatchGuide" }
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Guía de despacho creada correctamente."
            }
        }
    */

    try {
        let obj = req.body;

        // Convertir la fecha ISO 8601 a formato DATETIME de MySQL
        let date = new Date(obj.date).toISOString().slice(0, 19).replace('T', ' ');

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {
                console.error('error connecting: ' + err.message);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.message
                });
            }

            // Asegúrate de que la cantidad de columnas coincida con la cantidad de valores
            var queryString = `
                    INSERT INTO dispatch_guide 
                    (client, date, season, correlative, boxes, kg, quality, company_id) 
                    VALUES (?,?,?,?,?,?,?,?)
                `;

            mysqlConn.query(queryString, [
                obj.client, date, obj.season, obj.correlative, obj.boxes, obj.kg, obj.quality, obj.company_id
            ], function (error, results) {

                if (error) {
                    console.error('error ejecutando query: ' + error.message);
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

    }

    catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }

});



router.post('/configuracion/production/filterResults/:companyID', validateToken, (req, res) => {
    const { companyID } = req.params;
    const filters = req.body; // Los filtros enviados desde el frontend

    let queryString = 'SELECT * FROM manual_harvesting WHERE company_id = ?';
    const queryValues = [companyID];

    if (filters.from) {
        queryString += ` AND DATE(harvest_date) >= ?`;
        queryValues.push(filters.from);
    }

    if (filters.to) {
        queryString += ` AND DATE(harvest_date) <= ?`;
        queryValues.push(filters.to);
    }

    for (const [key, value] of Object.entries(filters)) {
        if (value !== null && value !== '' && value !== undefined && key !== 'from' && key !== 'to') {

            if (key === 'date_register') {
                // Si el filtro es para la fecha, usa DATE() en la consulta
                queryString += ` AND DATE(${mysql.escapeId(key)}) = ?`;
            } else {
                queryString += ` AND ${mysql.escapeId(key)} = ?`;
            }
            queryValues.push(value);
        }
    }

    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    mysqlConn.connect(err => {
        if (err) {
            console.error('Error connecting: ' + err.message);
            return res.status(500).json({
                code: "ERROR",
                mensaje: err.message
            });
        }

        mysqlConn.query(queryString, queryValues, (error, results) => {
            mysqlConn.end(); // Cerrar la conexión

            if (error) {
                console.error('Error executing query: ' + error.message);
                return res.status(500).json({
                    code: "ERROR",
                    mensaje: error.message
                });
            }

            if (results.length > 0) {
                return res.status(200).json({
                    code: "OK",
                    results
                });
            } else {
                return res.status(404).json({
                    code: "ERROR",
                    mensaje: "No se encuentran registros."
                });
            }
        });
    });
});


export default router



