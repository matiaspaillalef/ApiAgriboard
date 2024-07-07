import { Router } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import mysql from 'mysql';

//Management People - Positions

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

            } else {

                var queryString = "SELECT id, name, status FROM positions";

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }

                        res.json(jsonResult);

                    } else {

                        if (results && results.length > 0) {

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

                        } else {

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

            } else {

                var queryString = "UPDATE positions SET name = '" + name + "', status = " + status + " WHERE id = " + id;

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);

                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }

                        res.json(jsonResult);

                    } else {

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

//Management People - Contractors
router.get('/management-people/contractors/getContractors', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Contractors']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "id": 1,
                "rut": "12345678-9",
                "name": "Juan",
                "lastname": "Perez",
                "giro": "Agricultura",
                "phone": "12345678",
                "email": "mail@mail.com",
                "state": "Maule",
                "city": "Talca",
                "status": 1
            }
        } 
    */
    try {

        var contractors = [];

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

                var queryString = "SELECT id, rut, name, lastname, giro, phone, email, state, city, status FROM contractors";

                //console.log(queryString);
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
                                    "rut": element.rut,
                                    "name": element.name,
                                    "lastname": element.lastname,
                                    "giro": element.giro,
                                    "phone": element.phone,
                                    "email": element.email,
                                    "state": element.state,
                                    "city": element.city,
                                    "status": element.status,
                                };
                                contractors.push(jsonResult);
                            });

                            const jsonResult = {
                                "code": "OK",
                                "contractors": contractors
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
}

);

router.post('/management-people/contractors/updateContractor', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Contractors']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Contractor',
            required: true,
            schema: {id: 1, rut: "12345678-9", name: "Juan", lastname: "Perez", giro: "Agricultura", phone: "12345678", email: "contacto@mail.com", state: "Maule", city: "Talca", status: 1}
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro actualizado"
            }
        }
    */

    try {

        const { id, rut, name, lastname, giro, phone, email, state, city, status } = req.body;

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

                var queryString = "UPDATE contractors SET rut = '" + rut + "', name = '" + name + "', lastname = '" + lastname + "', giro = '" + giro + "', phone = '" + phone + "', email = '" + email + "', state = '" + state + "', city = '" + city + "', status = " + status + " WHERE id = " + id;

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

router.post('/management-people/contractors/deleteContractor', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Contractors']

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

                var queryString = "DELETE FROM contractors WHERE id = " + id;

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

router.post('/management-people/contractors/createContractor', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Contractors']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Contractor',
            required: true,
            schema: {rut: "12345678-9", name: "Juan", lastname: "Perez", giro: "Agricultura", phone: "12345678", email: "contacto@mail.com", state: "Maule", city: "Talca", status: 1}
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro creado"
            }
        }
    */

    try {

        const { rut, name, lastname, giro, phone, email, state, city, status } = req.body;

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

                var queryString = "INSERT INTO contractors (rut, name, lastname, giro, phone, email, state, city, status) VALUES ('" + rut + "', '" + name + "', '" + lastname + "', '" + giro + "', '" + phone + "', '" + email + "', '" + state + "', '" + city + "', " + status + ")";

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

//Management People - Groups

//Alert , la palabra groups, est una palabra reservada de MYSQL, por lo que se debe usar comillas invertidas para que no de error

router.get('/management-people/groups/getGroups', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Groups']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "id": 1,
                "name": "Grupo 1",
                "status": 1
            }
        } 
    */
    try {
        var groups = [];

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
                var queryString = "SELECT id, name, status FROM `groups`";
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
                        if (results && results.length > 0) {
                            results.forEach(element => {
                                const jsonResult = {
                                    "id": element.id,
                                    "name": element.name,
                                    "status": element.status,
                                };
                                groups.push(jsonResult);
                            });

                            const jsonResult = {
                                "code": "OK",
                                "groups": groups
                            }
                            res.json(jsonResult);
                        } else {
                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "No se encontraron registros"
                            }
                            res.json(jsonResult);
                        }
                    }
                    // Terminar la conexión después de manejar los resultados
                    mysqlConn.end();
                });
            }
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/management-people/groups/updateGroup', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Groups']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Group',
            required: true,
            schema: {id: 1, name: "Grupo 1", status: 1}
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

                var queryString = "UPDATE `groups` SET name = '" + name + "', status = " + status + " WHERE id = " + id;

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

router.post('/management-people/groups/deleteGroup', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Groups']

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

                var queryString = "DELETE FROM `groups` WHERE id = " + id;

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

router.post('/management-people/groups/createGroup', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Groups']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Group',
            required: true,
            schema: {name: "Grupo 1", status: 1}
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

                var queryString = "INSERT INTO `groups` (name, status) VALUES ('" + name + "', " + status + ")";

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

// Management People - Shifts

router.get('/management-people/shifts/getShifts', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Shifts']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "shifts": [
                    {
                        "id": 1,
                        "name": "Mañana",
                        "monday_opening_time": "10:00:00",
                        "monday_closing_time": "12:00:00",
                        "tuesday_opening_time": "10:00:00",
                        "tuesday_closing_time": "12:00:00",
                        "wednesday_opening_time": "10:00:00",
                        "wednesday_closing_time": "12:00:00",
                        "thursday_opening_time": "10:00:00",
                        "thursday_closing_time": "12:00:00",
                        "friday_opening_time": "10:00:00",
                        "friday_closing_time": "12:00:00",
                        "saturday_opening_time": "10:00:00",
                        "saturday_closing_time": "12:00:00",
                        "sunday_opening_time": "10:00:00",
                        "sunday_closing_time": "12:00:00",
                        "status": 1
                    },
                    {
                        "id": 2,
                        "name": "Tarde",
                        "monday_opening_time": "14:00:00",
                        "monday_closing_time": "18:00:00",
                        "tuesday_opening_time": "14:00:00",
                        "tuesday_closing_time": "18:00:00",
                        "wednesday_opening_time": "14:00:00",
                        "wednesday_closing_time": "18:00:00",
                        "thursday_opening_time": "14:00:00",
                        "thursday_closing_time": "18:00:00",
                        "friday_opening_time": "14:00:00",
                        "friday_closing_time": "18:00:00",
                        "saturday_opening_time": "14:00:00",
                        "saturday_closing_time": "18:00:00",
                        "sunday_opening_time": "14:00:00",
                        "sunday_closing_time": "18:00:00",
                        "status": 1
                        },
                ]
            }
        } 
    */
    try {
        var shifts = [];

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('Error de conexión: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }
                res.json(jsonResult);
            } else {
                var queryString = "SELECT id, name, monday_opening_time, monday_closing_time, tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, status FROM shifts";
                console.log(queryString);

                mysqlConn.query(queryString, function (error, results, fields) {
                    if (error) {
                        console.error('Error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }
                        res.json(jsonResult);
                    } else {
                        if (results && results.length > 0) {
                            results.forEach(element => {
                                const shift = {
                                    "id": element.id,
                                    "name": element.name,
                                    "monday_opening_time": element.monday_opening_time,
                                    "monday_closing_time": element.monday_closing_time,
                                    "tuesday_opening_time": element.tuesday_opening_time,
                                    "tuesday_closing_time": element.tuesday_closing_time,
                                    "wednesday_opening_time": element.wednesday_opening_time,
                                    "wednesday_closing_time": element.wednesday_closing_time,
                                    "thursday_opening_time": element.thursday_opening_time,
                                    "thursday_closing_time": element.thursday_closing_time,
                                    "friday_opening_time": element.friday_opening_time,
                                    "friday_closing_time": element.friday_closing_time,
                                    "saturday_opening_time": element.saturday_opening_time,
                                    "saturday_closing_time": element.saturday_closing_time,
                                    "sunday_opening_time": element.sunday_opening_time,
                                    "sunday_closing_time": element.sunday_closing_time,
                                    "status": element.status
                                };
                                shifts.push(shift);
                            });

                            const jsonResult = {
                                "code": "OK",
                                "shifts": shifts
                            }
                            res.json(jsonResult);
                        } else {
                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "No se encontraron registros"
                            }
                            res.json(jsonResult);
                        }
                    }
                    // Terminar la conexión después de manejar los resultados
                    mysqlConn.end();
                });
            }
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/management-people/shifts/updateShift', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Shifts']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Actualizar Turno',
            required: true,
            schema: {
                id: 1, 
                name: "Mañana",
                monday_opening_time: "08:00:00",
                monday_closing_time: "12:00:00",
                tuesday_opening_time: "08:00:00",
                tuesday_closing_time: "12:00:00",
                wednesday_opening_time: "08:00:00",
                wednesday_closing_time: "12:00:00",
                thursday_opening_time: "08:00:00",
                thursday_closing_time: "12:00:00",
                friday_opening_time: "08:00:00",
                friday_closing_time: "12:00:00",
                saturday_opening_time: "08:00:00",
                saturday_closing_time: "12:00:00",
                sunday_opening_time: "08:00:00",
                sunday_closing_time: "12:00:00",
                status: 1
            }
        }
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro actualizado"
            }
        } 
    */
    try {
        const { id, name, monday_opening_time, monday_closing_time, tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, status } = req.body;

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('Error de conexión: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }
                res.json(jsonResult);
            } else {
                var queryString = `
                    UPDATE shifts 
                    SET 
                        name = ?, 
                        monday_opening_time = ?, monday_closing_time = ?, 
                        tuesday_opening_time = ?, tuesday_closing_time = ?, 
                        wednesday_opening_time = ?, wednesday_closing_time = ?, 
                        thursday_opening_time = ?, thursday_closing_time = ?, 
                        friday_opening_time = ?, friday_closing_time = ?, 
                        saturday_opening_time = ?, saturday_closing_time = ?, 
                        sunday_opening_time = ?, sunday_closing_time = ?, 
                        status = ?
                    WHERE id = ?`;

                var queryValues = [name, monday_opening_time, monday_closing_time, tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, status, id];
                
                mysqlConn.query(queryString, queryValues, function (error, results, fields) {
                    if (error) {
                        console.error('Error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }
                        res.json(jsonResult);
                    } else {
                        const jsonResult = {
                            "code": "OK",
                            "mensaje": "Registro actualizado"
                        }
                        res.json(jsonResult);
                    }
                    // Terminar la conexión después de manejar los resultados
                    mysqlConn.end();
                });
            }
        });

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/management-people/shifts/deleteShift', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Shifts']

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
                console.error('Error de conexión: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }
                res.json(jsonResult);
            } else {
                var queryString = "DELETE FROM shifts WHERE id = " + id;
                console.log(queryString);

                mysqlConn.query(queryString, function (error, results, fields) {
                    if (error) {
                        console.error('Error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }
                        res.json(jsonResult);
                    } else {
                        const jsonResult = {
                            "code": "OK",
                            "mensaje": "Registro eliminado"
                        }
                        res.json(jsonResult);
                    }
                    // Terminar la conexión después de manejar los resultados
                    mysqlConn.end();
                });
            }
        });

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/management-people/shifts/createShift', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Shifts']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Crear Turno',
            required: true,
            schema: {
                name: "Mañana", 
                monday_opening_time: "08:00:00",
                monday_closing_time: "12:00:00",
                tuesday_opening_time: "08:00:00",
                tuesday_closing_time: "12:00:00",
                wednesday_opening_time: "08:00:00",
                wednesday_closing_time: "12:00:00",
                thursday_opening_time: "08:00:00",
                thursday_closing_time: "12:00:00",
                friday_opening_time: "08:00:00",
                friday_closing_time: "12:00:00",
                saturday_opening_time: "08:00:00",
                saturday_closing_time: "12:00:00",
                sunday_opening_time: "08:00:00",
                sunday_closing_time: "12:00:00",
                status: 1
            }
        }
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro creado"
            }
        } 
    */
    try {
        const { name, monday_opening_time, monday_closing_time, tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, status } = req.body;

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('Error de conexión: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }
                res.json(jsonResult);
            } else {
                var queryString = `
                    INSERT INTO shifts (name, monday_opening_time, monday_closing_time, tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                var queryValues = [name, monday_opening_time, monday_closing_time, tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, status];
                
                mysqlConn.query(queryString, queryValues, function (error, results, fields) {
                    if (error) {
                        console.error('Error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }
                        res.json(jsonResult);
                    } else {
                        const jsonResult = {
                            "code": "OK",
                            "mensaje": "Registro creado"
                        }
                        res.json(jsonResult);
                    }
                    // Terminar la conexión después de manejar los resultados
                    mysqlConn.end();
                });
            }
        });

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});


//Management People - Workers
router.get('/management-people/workers/getWorkers', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Workers']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "workers": [
                    {
                        "id": 1,
                        "rut": "12345678-9",
                        "name": "Juan",
                        "lastname": "Perez",
                        "lastname2": "Perez",
                        "born_date": "1990-01-01",
                        "gender": "Masculino",
                        "state_civil": "Soltero",
                        "state": "Maule",
                        "city": "Talca",
                        "address": "Calle 123",
                        "phone": "12345678",
                        "phone_company": "12345678",
                        "date_admission": "2021-01-01",
                        "status": 1
                    },
                    {
                        "id": 2,
                        "rut": "12345678-9",
                        "name": "Juan",
                        "lastname": "Perez",
                        "lastname2": "Perez",
                        "born_date": "1990-01-01",
                        "gender": "Masculino",
                        "state_civil": "Soltero",
                        "state": "Maule",
                        "city": "Talca",
                        "address": "Calle 123",
                        "phone": "12345678",
                        "phone_company": "12345678",
                        "date_admission": "2021-01-01",
                        "status": 1
                    }
                ]
            }
        }
    */
    try {
        var workers = [];
        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect((err) => {
            if (err) {
                console.error('Error de conexión: ' + err.sqlMessage);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                });
            }

            const queryString = "SELECT id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status FROM workers";
            console.log(queryString);

            mysqlConn.query(queryString, (error, results) => {
                if (error) {
                    console.error('Error ejecutando query: ' + error.sqlMessage);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.sqlMessage
                    });
                }

                if (results.length > 0) {
                    results.forEach(element => {
                        workers.push({
                            "id": element.id,
                            "rut": element.rut,
                            "name": element.name,
                            "lastname": element.lastname,
                            "lastname2": element.lastname2,
                            "born_date": element.born_date,
                            "gender": element.gender,
                            "state_civil": element.state_civil,
                            "state": element.state,
                            "city": element.city,
                            "address": element.address,
                            "phone": element.phone,
                            "phone_company": element.phone_company,
                            "date_admission": element.date_admission,
                            "status": element.status
                        });
                    });

                    res.json({
                        "code": "OK",
                        "workers": workers
                    });
                } else {
                    res.json({
                        "code": "ERROR",
                        "mensaje": "No se encontraron registros"
                    });
                }

                // Terminar la conexión después de manejar los resultados
                mysqlConn.end();
            });
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }
});

router.post('/management-people/workers/updateWorker', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Workers']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Actualizar Trabajador',
            required: true,
            schema: {
                id: 1,
                rut: "12345678-9",
                name: "Juan",
                lastname: "Perez",
                lastname2: "Perez",
                born_date: "1990-01-01",
                gender: "Masculino",
                state_civil: "Soltero",
                state: "Maule",
                city: "Talca",
                address: "Calle 123",
                phone: "12345678",
                phone_company: "12345678",
                date_admission: "2021-01-01",
                status: 1
            }
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro actualizado"
            }
        }
    */
    try {
        const { id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status } = req.body;

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect((err) => {
            if (err) {
                console.error('Error de conexión: ' + err.sqlMessage);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                });
            }

            const queryString = `
                UPDATE workers 
                SET 
                    rut = ?, 
                    name = ?, 
                    lastname = ?, 
                    lastname2 = ?, 
                    born_date = ?,
                    gender = ?,
                    state_civil = ?,
                    state = ?,
                    city = ?,
                    address = ?,
                    phone = ?,
                    phone_company = ?,
                    date_admission = ?,
                    status = ?
                WHERE id = ?`;

            const queryValues = [rut, name, lastname, lastname, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, id];
            console.log(queryString);

            mysqlConn.query(queryString, queryValues, (error, results) => {
                if (error) {
                    console.error('Error ejecutando query: ' + error.sqlMessage);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.sqlMessage
                    });
                }

                res.json({
                    "code": "OK",
                    "mensaje": "Registro actualizado"
                });

                // Terminar la conexión después de manejar los resultados
                mysqlConn.end();
            });
        }
        );
    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }
});

router.post('/management-people/workers/deleteWorker', validateToken, (req, res) => {

    /*
        #swagger.tags = ['Management People - Workers']

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

        mysqlConn.connect((err) => {
            if (err) {
                console.error('Error de conexión: ' + err.sqlMessage);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                });
            }

            const queryString = "DELETE FROM workers WHERE id = ?";
            console.log(queryString);

            mysqlConn.query(queryString, [id], (error, results) => {
                if (error) {
                    console.error('Error ejecutando query: ' + error.sqlMessage);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.sqlMessage
                    });
                }

                res.json({
                    "code": "OK",
                    "mensaje": "Registro eliminado"
                });

                // Terminar la conexión después de manejar los resultados
                mysqlConn.end();
            });
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }
});

router.post('/management-people/workers/createWorker', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Workers']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Crear Trabajador',
            required: true,
            schema: {
                rut: "12345678-9",
                name: "Juan",
                lastname: "Perez",
                lastname2: "Perez",
                born_date: "1990-01-01",
                gender: "Masculino",
                state_civil: "Soltero",
                state: "Maule",
                city: "Talca",
                address: "Calle 123",
                phone: "12345678",
                phone_company: "12345678",
                date_admission: "2021-01-01",
                status: 1
            }
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Registro creado"
            }
        }
    */
    try {
        const { rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status } = req.body;

        console.log(req.body);

        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect((err) => {
            if (err) {
                console.error('Error de conexión: ' + err.sqlMessage);
                return res.json({
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                });
            }

            const queryString = `
                INSERT INTO workers (rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            const queryValues = [rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status];
            console.log(queryString);

            mysqlConn.query(queryString, queryValues, (error, results) => {
                if (error) {
                    console.error('Error ejecutando query: ' + error.sqlMessage);
                    return res.json({
                        "code": "ERROR",
                        "mensaje": error.sqlMessage
                    });
                }

                res.json({
                    "code": "OK",
                    "mensaje": "Registro creado"
                });

                // Terminar la conexión después de manejar los resultados
                mysqlConn.end();
            });
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e.message });
    }
});

//Management People - Squads

router.get('/management-people/squads/getSquads', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Management People - Squads']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "id": 1,
                "name": "cuadrilla 1",
                "group": 1,
                "status": 1
            }
        } 
    */
    try {
        let squads = [];

        let mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {
            if (err) {
                console.error('Error al conectar: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }
                return res.json(jsonResult);
            }

            let queryString = "SELECT id, name, `group`, status FROM squads";
            console.log(queryString);

            mysqlConn.query(queryString, function (error, results, fields) {
                if (error) {
                    console.error('Error ejecutando query: ' + error.sqlMessage);
                    const jsonResult = {
                        "code": "ERROR",
                        "mensaje": error.sqlMessage
                    }
                    return res.json(jsonResult);
                }

                if (results && results.length > 0) {
                    results.forEach(element => {
                        const jsonResult = {
                            "id": element.id,
                            "name": element.name,
                            "group": element.group,
                            "status": element.status,
                        };
                        squads.push(jsonResult);
                    });

                    const jsonResult = {
                        "code": "OK",
                        "squads": squads
                    }
                    res.json(jsonResult);

                } else {
                    const jsonResult = {
                        "code": "ERROR",
                        "mensaje": "No se encontraron registros"
                    }
                    res.json(jsonResult);
                }

                // Terminar la conexión después de manejar los resultados
                mysqlConn.end();
            });
        });
    } catch (e) {
        console.error(e);
        res.json({ error: e.message });
    }
});



export default router