import { Router } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import bcrypt from 'bcryptjs';
import queryAsync from '../utils/bd.js';

//CONFIGURACIÓN USUARIOS

router.get('/configuracion/usuarios/getUsuarios', validateToken, async (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Usuarios']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "usuarios": [
                    {
                    "userId": 1,
                    "nombre": "Matias",
                    "apellido": "Paillalef",
                    "mail": "m.paillalef.c@gmail.com",
                    "password": "$2a$12$g/81By6B6mSMpPsVo/Pameann1cD0om6TfAJTqaVaHsLrJryRlM.W",
                    "id_rol": 1,
                    "rol_descripcion": "Superadmin",
                    "id_company": 1,
                    "company_name": "Agrisosft"
                    }
                ]    
            }
        } 
    */
    try {

        var usuarios = [];


        //var queryString = "select id,nombre ,apellido,mail,id_rol, r.descripcion as rol , estado  from usuarios u, roles r , estado e";
        var queryString = "SELECT u.id, u.name, u.lastname, u.mail, r.id_rol, r.descripcion AS rol, u.id_state, u.password , u.id_company , c.name_company as company FROM users u, roles r, states e , companies c ";
        queryString += " where u.id_rol = r.id_rol";
        queryString += " and u.id_state = e.id_estado";
        queryString += " and u.id_company  = c.id ";
        queryString += " order by  u.id asc";

        //console.log(queryString);
        const results = await queryAsync(queryString);


        if (results && results.length > 0) {

            results.forEach(element => {
                const jsonResult = {
                    "id": element.id,
                    "name": element.name,
                    "lastname": element.lastname,
                    "mail": element.mail,
                    "password": element.password,
                    "id_rol": element.id_rol,
                    "rol_descripcion": element.rol,
                    "id_company": element.id_company,
                    "company_name": element.company,
                    "id_state": element.id_state,
                };
                usuarios.push(jsonResult);
            });

            const jsonResult = {
                "code": "OK",
                "usuarios": usuarios
            }
            return res.json(jsonResult);
        }
        else {
            const jsonResult = {
                "code": "ERROR",
                "mensaje": "No se encuentran usuarios disponibles."
            }
            return res.json(jsonResult);
        }

    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.post('/configuracion/usuarios/crearUsuarios', validateToken, async (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Usuarios']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                "name": "Javier",
                "lastname": "Donoso",
                "mail": "donoso.javier@gmail.com",
                "password": "Mierda123",
                "id_company": "1",
                "id_rol": "1",
                "id_state": "2",
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

        let { name, lastname, mail, id_rol, password, id_state, id_company } = req.body;

        //valido que usuario no exista

        var queryString = "select id,name ,lastname,mail,id_rol,id_state,id_company,password  from users u where mail=?";

        let results = await queryAsync(queryString, [mail]);

        if (results && results.length > 0) {

            const jsonResult = {
                "code": "ERROR",
                "mensaje": "El usuario " + mail + " ya existe en el sistema."
            }

            return res.json(jsonResult);

        }
        else {

            const saltRounds = 10;
            password = password.trim();
            const hashedPassword = bcrypt.hashSync(password, saltRounds);

            var insertQuery = "INSERT INTO users";
            insertQuery += " (name, lastname, mail, id_rol, password, id_state, id_company)";
            insertQuery += "VALUES(?,?,?,?,?,?,?)";

            const insertResult = await queryAsync(insertQuery, [name, lastname, mail, id_rol, hashedPassword, id_state, id_company]);

            if (insertResult && insertResult.affectedRows != 0) {

                const jsonResult = {
                    "code": "OK",
                    "usuarios": "Usuario creado correctamente."
                }
                return res.json(jsonResult);

            } else {

                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": "No se pudo crear el usuario seleccionado."
                }
                return res.json(jsonResult);

            }
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.post('/configuracion/usuarios/actualizarUsuarios', validateToken, async (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Usuarios']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                "id": "31",
                "name": "Javier",
                "lastname": "Donosos",
                "mail": "donoso.javier2@gmail.com",
                "id_rol": "2",
                "password": "$2a$10$IzQtd..rT6TmT8Rvpbpfk.i4ETW1MbExpepsNxRo5Nbu3LS8rUOKe",
                "id_state": "1",
                "id_company": "1"
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


        let { id, name, lastname, mail, id_rol, password, id_company, id_state } = req.body;

        // obtengo password
        let results = await queryAsync("SELECT password FROM users WHERE id = ?", [id]);

        if (results && results.length > 0) {
            let currntPassword = results[0].password;

            var updateQuery = '';

            if (currntPassword == password) {

                updateQuery = "UPDATE users";
                updateQuery += " SET name='" + name + "', lastname='" + lastname + "', mail='" + mail + "', id_rol=" + id_rol + ", id_state=" + id_state + ", id_company=" + id_company;
                updateQuery += " WHERE id=" + id;

            }
            else {

                const saltRounds = 10;
                password = password.trim();
                const hashedPassword = bcrypt.hashSync(password, saltRounds);

                updateQuery = "UPDATE users";
                updateQuery += " SET name='" + name + "', lastname='" + lastname + "', mail='" + mail + "', id_rol=" + id_rol + ", password='" + hashedPassword + "', id_state=" + id_state + ", id_company=" + id_company;
                updateQuery += " WHERE id=" + id;

            }

            let updateResults = await queryAsync(updateQuery);

            if (updateResults && updateResults.affectedRows != 0) {

                const jsonResult = {
                    "code": "OK",
                    "mensaje": "Registro actualizado correctamente."
                }

                return res.json(jsonResult);

            } else {

                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": "No se pudo actualizar  el registro."
                }

                return res.json(jsonResult);
            }

        } else {


            const jsonResult = {
                "code": "ERROR",
                "mensaje": "No se logro encontrar el usuario."
            }

            return res.json(jsonResult);

        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


router.post('/configuracion/usuarios/eliminarUsuarios', validateToken, async (req, res) => {
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
                "mensaje": "Usuario eliminado correctamente."
            }
        } 
    */
    try {

        let { id } = req.body;

        var deleteQuery = "delete from users where id = ?";

        const results = await queryAsync(deleteQuery, [id]);

        if (results && results.affectedRows == 1) {

            const jsonResult = {
                "code": "OK",
                "mensaje": "Usuario eliminado correctamente."
            }

            return res.json(jsonResult);

        } else {

            const jsonResult = {
                "code": "ERROR",
                "mensaje": "No se pudo eliminar el usuario seleccionado."
            }

            return res.json(jsonResult);

        }

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

//Roles

router.get('/configuracion/usuarios/getRoles', validateToken, async (req, res) => {
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

        var queryString = "select  * from roles";

        const results = await queryAsync(queryString);

        if (results && results.length > 0) {

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

            return res.json(jsonResult);

        } else {

            const jsonResult = {
                "code": "ERROR",
                "mensaje": "no se encontraron datos disponibles."
            }

            return res.json(jsonResult);

        }

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

// CONFIGURACIÓN EMPRESAS

router.get('/configuracion/empresas/getEmpresas', validateToken, async (req, res) => {
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
                        "logo": "logo1.jpg",
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
                        "system_representative_name": "Representante 2",
                        "system_representative_rut": "98765432-1",
                        "system_representative_phone": "987654321",
                        "system_representative_email": "representante1@empresa1.com",
                        "status": 1
                    }
                ]
            }
        } 
    */
    try {

        var companies = [];


        var queryString = "SELECT id, logo, name_company, rut, giro, state, city, address, phone, web, compensation_box, ";
        queryString += "legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status , system_representative_name,system_representative_rut,system_representative_phone,system_representative_email ";
        queryString += "FROM companies";

        const results = await queryAsync(queryString);

        if (results && results.length > 0) {

            results.forEach(element => {
                const jsonResult = {
                    "id": element.id,
                    "logo": element.logo,
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
                    "system_representative_name": element.system_representative_name,
                    "system_representative_rut": element.system_representative_rut,
                    "system_representative_phone": element.system_representative_phone,
                    "system_representative_email": element.system_representative_email,
                    "status": element.status
                };

                companies.push(jsonResult);

            });

            const jsonResult = {
                "code": "OK",
                "companies": companies
            };

            return res.json(jsonResult);

        } else {

            const jsonResult = {
                "code": "ERROR",
                "mensaje": "No se encontraron empresas."
            };

            return res.json(jsonResult);
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.post('/configuracion/empresas/createCompany', validateToken, async (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Empresas']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                "id": 1,
                "logo": "logo1.jpg",
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
                "system_representative_name": "Representante 2",
                "system_representative_rut": "98765432-1",
                "system_representative_phone": "987654321",
                "system_representative_email": "representante1@empresa1.com",
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
        let { logo, name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, system_representative_name, system_representative_rut, system_representative_phone, system_representative_email } = req.body;


        // Verificar que la empresa no exista
        var queryString = "SELECT id FROM companies WHERE rut=?";

        const results = await queryAsync(queryString, [rut]);


        if (results && results.length > 0) {
            const jsonResult = {
                "code": "ERROR",
                "mensaje": "La empresa con RUT " + rut + " ya existe en el sistema."
            }

            return res.json(jsonResult);

        } else {

            let logoValue;

            if (logo) {

                logoValue = logo;
            }
            else {
                logoValue = "";
            }

            // Construir la consulta SQL para insertar la empresa
            var insertQuery = `INSERT INTO companies 
                                                (name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut,
                                                legal_representative_phone, legal_representative_email, status , system_representative_name, system_representative_rut,
                                                system_representative_phone,system_representative_email, logo) 
                                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

            var insertValues = [name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, system_representative_name, system_representative_rut, system_representative_phone, system_representative_email, logoValue];


            const insertResult = await queryAsync(insertQuery, insertValues);



            if (insertResult && insertResult.affectedRows != 0) {
                const jsonResult = {
                    "code": "OK",
                    "mensaje": "Empresa creada correctamente."
                }
                return res.json(jsonResult);
            } else {
                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": "No se pudo crear la empresa."
                }
                return res.json(jsonResult);
            }
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


router.post('/configuracion/empresas/updateCompany', validateToken, async (req, res) => {
    /*  
        #swagger.tags = ['Configuración - Empresas']

        #swagger.security = [{
               "apiKeyAuth": []
        }]
        
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                "id": "13",
                "logo": "",
                "name_company": "Empresa 2",
                "rut": "12345678-9",
                "giro": "Comercio",
                "state": "I",
                "city": "Iquique",
                "address": "Dirección 1",
                "phone": "123456789",
                "web": "https://www.empresa1.com",
                "compensation_box": "1",
                "legal_representative_name": "Representante 1",
                "legal_representative_rut": "98765432-1",
                "legal_representative_phone": "987654321",
                "legal_representative_email": "representante1@empresa1.com",
                "system_representative_name": "Representante 2",
                "system_representative_rut": "98765432-1",
                "system_representative_phone": "987654321",
                "system_representative_email": "representante1@empresa1.com",
                "status": "1"
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

        let { id, logo, name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, system_representative_name, system_representative_rut, system_representative_phone, system_representative_email } = req.body;

        var updateQuery = `UPDATE companies
                                    SET logo=?, name_company=?, rut=?, giro=?, state=?, city=?, address=?, phone=?, web=?, compensation_box=?,
                                    legal_representative_name=?, legal_representative_rut=?, legal_representative_phone=?, legal_representative_email=?,
                                    status=?,system_representative_name=?, system_representative_rut=?, system_representative_phone=?, system_representative_email=?
                                    WHERE id=?`;

        //console.log(updateQuery);
        const updateValues = [logo, name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, system_representative_name, system_representative_rut, system_representative_phone, system_representative_email, id];

        const updateResults = await queryAsync(updateQuery, updateValues);

        if (updateResults && updateResults.affectedRows != 0) {

            const jsonResult = {
                "code": "OK",
                "mensaje": "Empresa actualizada correctamente."
            }

            return res.json(jsonResult);

        } else {

            const jsonResult = {
                "code": "ERROR",
                "mensaje": "No se pudo actualizar la empresa seleccionada."
            }

            return res.json(jsonResult);
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.post('/configuracion/empresas/deleteCompany', validateToken, async (req, res) => {
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


        var queryString = "delete from companies where id = ?";

        const results = await queryAsync(queryString, [id]);


        if (results && results.affectedRows == 1) {

            const jsonResult = {
                "code": "OK",
                "companies": "Empresa eliminada correctamente."
            }

            return res.json(jsonResult);

        } else {

            const jsonResult = {
                "code": "ERROR",
                "mensaje": "No se pudo eliminar la empresa seleccionada."
            }

            return res.json(jsonResult);

        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

export default router