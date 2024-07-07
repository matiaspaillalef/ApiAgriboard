import { Router } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import mysql from 'mysql';
import bcrypt from 'bcrypt';

//CONFIGURACIÓN USUARIOS

router.get('/configuracion/usuarios/getUsuarios', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Usuarios']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "userId": 1,
                "nombre": "Javier",
                "apellido": "Donoso",
                "mail": "Donoso.javier@gmail.com",
                "password": "demo123",
                "rol": 1,
                "rol_descripcion": "superadmin",
                "estado": 1
            }
        } 
    */
    try {

        var usuarios = [];

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

                //var queryString = "select id,nombre ,apellido,mail,id_rol, r.descripcion as rol , estado  from usuarios u, roles r , estado e";
                var queryString = "SELECT id, nombre, apellido, mail, id_rol, r.descripcion AS rol, estado, password FROM usuarios u, roles r, estado e";
                queryString += " where u.rol = r.id_rol";
                queryString += " and u.estado = e.id_estado";


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
                        if (results && results.length > 0) {

                            results.forEach(element => {
                                const jsonResult = {
                                    "userId": element.id,
                                    "nombre": element.nombre,
                                    "apellido": element.apellido,
                                    "mail": element.mail,
                                    "password": element.password,
                                    "id_rol": element.id_rol,
                                    "rol_descripcion": element.rol,
                                    "estado": element.estado,
                                };
                                usuarios.push(jsonResult);
                            });

                            const jsonResult = {
                                "code": "OK",
                                "usuarios": usuarios
                            }
                            res.json(jsonResult);
                        }
                        else {
                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "Usuario o contraseña incorrecta."
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

router.post('/configuracion/usuarios/crearUsuarios', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Usuarios']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                name: "javier",
                lastName: "Donoso",
                userEmail: "donoso.javier@gmail.com",
                menuRol: 1,
                userPassword: "Mierda123",
                menuState: 1,
            }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Usuario creado correctamente."
            }
        } 
    */
    try {

        let { name, lastName, userEmail, menuRol, userPassword, menuState } = req.body;
        const saltRounds = 10;
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

                //valido que usuario no exista

                var queryString = "select id,nombre ,apellido,mail,rol,estado,password  from usuarios u where mail='" + userEmail + "'";

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (error) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }
                        res.json(jsonResult);

                    }
                    else {

                        if (results && results.length > 0) {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "El usuario " + userEmail + " ya existe en el sistema."
                            }

                            res.json(jsonResult);

                        }
                        else {

                            const saltRounds = 10;
                            userPassword = userPassword.trim();
                            const hashedPassword = bcrypt.hashSync(userPassword, saltRounds);

                            var queryString = "INSERT INTO usuarios";
                            queryString += " (nombre, apellido, mail, rol, password, estado)";
                            queryString += "VALUES('" + name + "' , '" + lastName + "', '" + userEmail + "'," + menuRol + ", '" + hashedPassword + "'," + menuState + ")";

                            mysqlConn.query(queryString, function (error, resultsInsert, fields) {
                                console.log("error", error);
                                console.log("resultsInsert", resultsInsert);
                                console.log("fields", fields);
                                if (error) {

                                    console.error('error ejecutando query: ' + error.sqlMessage);
                                    const jsonResult = {
                                        "code": "ERROR",
                                        "mensaje": err.sqlMessage
                                    }
                                    res.json(jsonResult);

                                }
                                else {
                                    console.log("resultsInsert", resultsInsert);
                                    if (resultsInsert.insertId != 0) {

                                        const jsonResult = {
                                            "code": "OK",
                                            "usuarios": "usuario creado correctamente."
                                        }
                                        res.json(jsonResult);

                                    } else {

                                        const jsonResult = {
                                            "code": "ERROR",
                                            "mensaje": "no se pudo eliminar el usuario seleccionado."
                                        }
                                        res.json(jsonResult);

                                    }
                                }
                            });

                        }
                    }
                });

                // mysqlConn.end();

            }
        });


    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

router.post('/configuracion/usuarios/actualizarUsuarios', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Usuarios']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                id: "1",
                name: "javier",
                lastName: "Donoso",
                userEmail: "donoso.javier@gmail.com",
                menuRol: 1,
                userPassword: "Mierda123",
                menuState: 1,
            }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Usuario actualizado correctamente."
            }
        } 
    */
    try {

        let { id, name, lastName, userEmail, menuRol, userPassword, menuState } = req.body;
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

                var queryString = "UPDATE usuarios";
                queryString += " SET nombre='" + name + "', apellido='" + lastName + "', mail='" + userEmail + "', rol=" + menuRol + ", password='" + userPassword + "', estado=" + menuState;
                queryString += " WHERE id=" + id;

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }

                        res.json(jsonResult);

                    } else {

                        if (results  && results.affectedRows != 0) {

                            const jsonResult = {
                                "code": "OK",
                                "usuarios": "usuario actualizado correctamente."
                            }

                            res.json(jsonResult);

                        } else {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "no se pudo actualizar el usuario seleccionado."
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

router.post('/configuracion/usuarios/eliminarUsuarios', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Usuarios']

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
                "mensaje": "Usuario borrado correctamente"
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

            } else {

                var queryString = "delete from usuarios where id = " + id;

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }

                        res.json(jsonResult);

                    } else {

                        if (results  && results.affectedRows == 1) {

                            const jsonResult = {
                                "code": "OK",
                                "usuarios": "usuario eliminado correctamente."
                            }

                            res.json(jsonResult);

                        } else {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "no se pudo eliminar el usuario seleccionado."
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

router.get('/configuracion/usuarios/getRoles', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Usuarios']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "roles": [
                    {
                        "id_rol": 4,
                        "descripcion": "Cosecheros"
                    }
                ]
            }
        } 
    */
    try {

        var roles = [];
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

                var queryString = "select  * from roles";

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }
                        res.json(jsonResult);

                    } else {

                        if (results  && results.length > 0) {

                            results.forEach(element => {
                                
                                const jsonResult = {
                                    "id_rol": element.id_rol,
                                    "descripcion": element.descripcion,
                                };

                                roles.push(jsonResult);

                            });

                            const jsonResult = {
                                "code": "OK",
                                "roles": roles
                            }

                            res.json(jsonResult);

                        } else {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "no se encontraron datos disponibles."
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

router.get('/configuracion/usuarios/getEstados', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Usuarios']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "estados": [
                    {
                        "id_estado": 1,
                        "descripcion": "ACTIVO"
                    }
                ]
            }
        } 
    */
    try {

        var estados = [];
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

                var queryString = "select  * from estado";

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);

                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }

                        res.json(jsonResult);

                    } else {

                        if (results  && results.length > 0) {

                            results.forEach(element => {
                                const jsonResult = {
                                    "id_rol": element.id_rol,
                                    "descripcion": element.descripcion,
                                };

                                estados.push(jsonResult);

                            });

                            const jsonResult = {
                                "code": "OK",
                                "estados": estados
                            }

                            res.json(jsonResult);

                        } else {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "no se encontraron datos disponibles."
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

// CONFIGURACIÓN EMPRESAS

router.get('/configuracion/empresas/getEmpresas', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Empresas']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "companies": [
                    {
                        "id": 1,
                        "name_company": "Empresa 1",
                        "rut": "12345678-9",
                        "giro": "Comercio",
                        "state": "Estado 1",
                        "city": "Ciudad 1",
                        "address": "Dirección 1",
                        "phone": "123456789",
                        "web": "www.empresa1.com",
                        "compensation_box": "Caja 1",
                        "legal_representative_name": "Representante 1",
                        "legal_representative_rut": "98765432-1",
                        "legal_representative_phone": "987654321",
                        "legal_representative_email": "representante1@empresa1.com",
                        "status": 1
                    }
                ]
            }
        } 
    */
    try {

        var companies = [];
        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('error connecting: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                };

                res.json(jsonResult);

            } else {

                var queryString = "SELECT id, name_company, rut, giro, state, city, address, phone, web, compensation_box, ";
                queryString += "legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status ";
                queryString += "FROM companies";

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (error) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        };

                        res.json(jsonResult);

                    } else {

                        if (results  && results.length > 0) {

                            results.forEach(element => {
                                const jsonResult = {
                                        "id": element.id,
                                        "name_company": element.name_company,
                                        "rut": element.rut,
                                        "giro": element.giro,
                                        "state": element.state,
                                        "city": element.city,
                                        "address": element.address,
                                        "phone": element.phone,
                                        "web": element.web,
                                        "compensation_box": element.compensation_box,
                                        "legal_representative_name": element.legal_representative_name,
                                        "legal_representative_rut": element.legal_representative_rut,
                                        "legal_representative_phone": element.legal_representative_phone,
                                        "legal_representative_email": element.legal_representative_email,
                                        "status": element.status
                                };

                                companies.push(jsonResult);

                            });

                            const jsonResult = {
                                "code": "OK",
                                "companies": companies
                            };

                            res.json(jsonResult);

                        } else {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "No se encontraron empresas."
                            };

                            res.json(jsonResult);
                        }
                    }
                });

                mysqlConn.end();
            }
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/configuracion/empresas/createCompany', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Empresas']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                "id": 1,
                "name_company": "Empresa 1",
                "rut": "12345678-9",
                "giro": "Comercio",
                "state": "Estado 1",
                "city": "Ciudad 1",
                "address": "Dirección 1",
                "phone": "123456789",
                "web": "www.empresa1.com",
                "compensation_box": "Caja 1",
                "legal_representative_name": "Representante 1",
                "legal_representative_rut": "98765432-1",
                "legal_representative_phone": "987654321",
                "legal_representative_email": "representante1@empresa1.com",
                "status": 1
            }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Empresa creada correctamente."
            }
        } 
    */
    try {

        let { name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status } = req.body;
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
                // Verificar que la empresa no exista
                var queryString = "SELECT id FROM companies WHERE rut='" + rut + "'";

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (error) {
                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }

                        res.json(jsonResult);

                    } else {

                        if (results  && results.length > 0) {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "La empresa con RUT " + rut + " ya existe en el sistema."
                            }

                            res.json(jsonResult);

                        } else {

                            var queryString = "INSERT INTO companies (name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status)";
                            queryString += " VALUES('" + name_company + "', '" + rut + "', '" + giro + "', '" + state + "', '" + city + "', '" + address + "', '" + phone + "', '" + web + "', '" + compensation_box + "', '" + legal_representative_name + "', '" + legal_representative_rut + "', '" + legal_representative_phone + "', '" + legal_representative_email + "', " + status + ")";

                            mysqlConn.query(queryString, function (error, resultsInsert, fields) {

                                if (error) {

                                    console.error('error ejecutando query: ' + error.sqlMessage);
                                    const jsonResult = {
                                        "code": "ERROR",
                                        "mensaje": error.sqlMessage
                                    }

                                    res.json(jsonResult);

                                } 
                                else {

                                    if (resultsInsert  && resultsInsert.insertId != 0) {

                                        const jsonResult = {
                                            "code": "OK",
                                            "mensaje": "Empresa creada correctamente."
                                        }

                                        res.json(jsonResult);

                                    } else {

                                        const jsonResult = {
                                            "code": "ERROR",
                                            "mensaje": "No se pudo crear la empresa."
                                        }

                                        res.json(jsonResult);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });

    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/configuracion/empresas/updateCompany', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Empresas']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                "id": 1,
                "name_company": "Empresa 1",
                "rut": "12345678-9",
                "giro": "Comercio",
                "state": "Estado 1",
                "city": "Ciudad 1",
                "address": "Dirección 1",
                "phone": "123456789",
                "web": "www.empresa1.com",
                "compensation_box": "Caja 1",
                "legal_representative_name": "Representante 1",
                "legal_representative_rut": "98765432-1",
                "legal_representative_phone": "987654321",
                "legal_representative_email": "representante1@empresa1.com",
                "status": 1
            }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "Empresa actualizada correctamente."
            }
        } 
    */
    try {

        let { id, name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status } = req.body;
        var mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        mysqlConn.connect(function (err) {

            if (err) {

                console.error('Error al conectar con la base de datos: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }

                res.json(jsonResult);

            } else {

                var queryString = "UPDATE companies";
                queryString += " SET name_company='" + name_company + "', rut='" + rut + "', giro='" + giro + "', state='" + state + "', city='" + city + "', address='" + address + "', phone='" + phone + "', web='" + web + "', compensation_box='" + compensation_box + "', legal_representative_name='" + legal_representative_name + "', legal_representative_rut='" + legal_representative_rut + "', legal_representative_phone='" + legal_representative_phone + "', legal_representative_email='" + legal_representative_email + "', status=" + status;
                queryString += " WHERE id=" + id;

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (error) {

                        console.error('Error al ejecutar la consulta: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": error.sqlMessage
                        }

                        res.json(jsonResult);

                    } else {

                        if (results  && results.affectedRows != 0) {

                            const jsonResult = {
                                "code": "OK",
                                "mensaje": "Empresa actualizada correctamente."
                            }

                            res.json(jsonResult);

                        } else {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "No se pudo actualizar la empresa seleccionada."
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
        res.json({ error: e });
    }
});

router.post('/configuracion/empresas/deleteCompany', validateToken, (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Empresas']

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
                "mensaje": "Empresa borrada correctamente"
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

            } else {

                var queryString = "delete from companies where id = " + id;

                mysqlConn.query(queryString, function (error, results, fields) {

                    if (err) {

                        console.error('error ejecutando query: ' + error.sqlMessage);
                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": err.sqlMessage
                        }

                        res.json(jsonResult);

                    } else {

                        if (results  && results.affectedRows == 1) {

                            const jsonResult = {
                                "code": "OK",
                                "companies": "empresa eliminada correctamente."
                            }

                            res.json(jsonResult);

                        } else {

                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "no se pudo eliminar la empresa seleccionada."
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