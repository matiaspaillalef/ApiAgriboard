import {Router} from 'express'
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

        mysqlConn.connect(function(err) {

            if (err) {

                console.error('error connecting: ' + err.sqlMessage);
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": err.sqlMessage
                }

                res.json(jsonResult);

            } else {

                var queryString = "select  u.id,u.nombre ,u.apellido,u.mail,u.rol,u.estado, u.password ,ue.id_company  from usuarios u , usuario_empresas ue";
                    queryString += " where mail='" + usuario + "'";
                    queryString += " and u.id = ue.id_user";
                    queryString += " limit 1";
                
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

                            //Javi coloque esto porque estaba agregando a la contraseña espacios enblanco y no los podia controlar
                            const storedPasswordHash = results[0].password.trim();
                            const passwordResult = bcrypt.compareSync(password, storedPasswordHash);

                            if(passwordResult == true) {

                                const jsonResult = {
                                    "code": "OK",
                                    "userId": results[0].id,
                                    "nombre": results[0].nombre,
                                    "apellido": results[0].apellido,
                                    "mail": results[0].mail,
                                    "rol": results[0].rol,
                                    "estado": results[0].estado,
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