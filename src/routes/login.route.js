import { Router } from 'express'
const router = Router()
import bcrypt from "bcrypt";
import mysql from 'mysql';

router.post('/login', (req, res) => {
    /*  
        #swagger.tags = ['Auth']
        
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                usuario: 'usuario',
                password: 'password'
            }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "userId": 1,
                "nombre": "Javier",
                "apellido": "Donoso",
                "mail": "Donoso.javier@gmail.com",
                "rol": 1,
                "estado": 1,
                "idCompany": 1
            }
        } 
    */
    try {

        let { usuario, password } = req.body;
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

                var queryString = "select  u.id,u.name,u.lastname,u.mail,u.id_rol,u.id_state as estado, u.password ,u.id_company, c.status from users u, companies c ";
                queryString += " where mail='" + usuario + "'";
                queryString += " and u.id_company = c.id";

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

                            if (results[0].status == 2 || results[0].estado == 2) {

                                const jsonResult = {
                                    "code": "ERROR",
                                    "mensaje": 'Empresa o usuario inactivo.'
                                }

                                res.json(jsonResult);

                            } else {
                                //Javi coloque esto porque estaba agregando a la contraseña espacios enblanco y no los podia controlar
                                const storedPasswordHash = results[0].password.trim();
                                const passwordResult = bcrypt.compareSync(password, storedPasswordHash);

                                if (passwordResult == true) {

                                    const jsonResult = {
                                        "code": "OK",
                                        "userId": results[0].id,
                                        "nombre": results[0].name,
                                        "apellido": results[0].lastname,
                                        "mail": results[0].mail,
                                        "rol": results[0].id_rol,
                                        "estado": results[0].id_state,
                                        "idCompany": results[0].id_company
                                    };

                                    res.json(jsonResult);

                                } else {

                                    const jsonResult = {
                                        "code": "ERROR",
                                        "mensaje": "Usuario o contraseña incorrecta."
                                    }

                                    res.json(jsonResult);

                                }

                            }



                        } else {

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

export default router