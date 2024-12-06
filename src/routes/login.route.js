import { Router } from 'express';
const router = Router();
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import queryAsync from '../utils/bd.js';


// Función para generar el token de restablecimiento
function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Función para enviar el correo de restablecimiento
async function sendPasswordResetEmail(to, url, nombre) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Usa `true` solo si el puerto es 465
        auth: {
            user: "agrisoftAws@gmail.com",
            pass: "Agr1S0ft.24"
        }
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mail reset Password</title>
    </head>
    <body>
        <div dir="ltr" style="background-color:#f7f7f7;margin:0;padding:15px 0;width:100%">
            <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                <tbody>
                    <tr>
                        <td align="center" valign="top">
                            <div style="width:650px;background-color:#ffffff;">
                                <div style="margin: 0 auto;background-color:#f7f7f7;padding:0">
                                <div style="text-align:center;">
                                    <img src="https://brandis.cl/banner-agrisoft.png" alt="Agrisoft"
                                        style="height:auto;width: 100%;">
                                </div>
                            </div>
                                <div style="padding:75px 40px 75px 40px;color:#0b1437;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:14px;line-height:150%;text-align:left;">
                                    <div style="margin: 0 auto;background-color:#ffffff;width:100%;padding:25px 40px;color:#0b1437;border-bottom:1px solid #b6b6b6; padding-top: 25px;">
                                        <div style="text-align:left;">
                                            <div style="vertical-align: baseline;">
                                                <h3 style="text-align:left;font-size:25px">Hola ${nombre}.</h3>
                                                <p style="font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:16px;line-height:20px;font-weight:900;text-align:left;">
                                                    Haz clic en el siguiente enlace para restablecer tu contraseña
                                                </p>
                                                <p style="line-height:normal;text-decoration:none;">
                                                    <a href="http://${url}" style="background-color: #0b1437;padding:15px 25px; border-radius: 8px;display:block;color: white; text-align: center;text-transform: uppercase;font-weight: bold;text-decoration: none;width: 250px;margin: 0 auto;" >
                                                        Restablece tu contraseña
                                                    </a>
                                                </p>
                                                 <p style="text-align:center;margin-top:15px; font-size: 16px;">Si no has solicitado este restablecimiento de la contraseña, omite el mensaje.</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:#0b1437;color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;text-align:center;padding-top:50px;">
                                    <p
                                    style="font-size:15px;line-height:22px;border-bottom: 1px solid #FFFFFF;padding: 0 40px 15px 40px;width: 25%;margin: 0 auto;">
                                    <img src="https://brandis.cl/agrisoft_logo_b.png" alt="Logo Agrisoft"
                                        width="auto" height="90" />
                                    </p>
                                    <p style="text-align:center;font-size:11px;margin-top:30px;padding-bottom:50px;">
                                        Agrisoft Software S.A. Todos los derechos reservados
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    </html>
    `;

    let info = await transporter.sendMail({
        from: '"Soporte" <soporte@agrisoft.com>', // Remitente
        to, // Receptor
        //subject: "Restablecimiento de contraseña - Agrisoft", // Asunto
        subject: `Restablecimiento de contraseña - ${nombre} - ${new Date().toLocaleString()}`, // Asunto único
        html: htmlContent
    });

    console.log("Mensaje enviado: %s", info.messageId);
}


router.post('/login', async (req, res) => {
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

        var queryString = "select  u.id,u.name,u.lastname,u.mail,u.id_rol,u.id_state as estado, u.password ,u.id_company, c.status from users u, companies c ";
        queryString += " where mail='" + usuario + "'";
        queryString += " and u.id_company = c.id";

        let results = await queryAsync(queryString);

        if (results && results.length > 0) {

            if (results[0].status == 2 || results[0].estado == 2) {

                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": 'Empresa o usuario inactivo.'
                }

                res.json(jsonResult);

            } else {
                //Javi coloque esto porque estaba agregando a la contraseña espacios enblanco y no los podia controlar
                const passwordMatch = await bcrypt.compare(password.trim(), results[0].password.trim());

                if (passwordMatch == true) {

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
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

// Ruta para solicitar el restablecimiento de contraseña
router.post('/auth/forgot-password', async (req, res) => {
    /*  
        #swagger.tags = ['Autenticación']
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                userEmail: "user@example.com"
            }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "message": "Correo enviado para restablecer contraseña."
            }
        } 
    */
    try {
        const { userEmail } = req.body;

        // Usar parámetros en lugar de concatenar valores directamente
        const query = "SELECT id, name, lastname FROM users WHERE mail = ?";
        const results = await queryAsync(query, [userEmail]);

        if (results.length === 0) {

            const jsonResult = {
                "code": "ERROR",
                "mensaje": "Correo no encontrado."
            }

            return res.json(jsonResult);

        }

        const userId = results[0].id;
        const nombre = results[0].name;
        const apellido = results[0].lastname;
        const userNameFull = nombre + ' ' + apellido;

        const token = generateResetToken(); // Función que genera un token
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

        const insertQuery = "INSERT INTO password_resets (user_id, token, expires) VALUES (?, ?, ?)";

        const insertResult = await queryAsync(insertQuery, [userId, token, expires]);

        if (insertResult && insertResult.affectedRows != 0) {

            const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`;

            try {

                await sendPasswordResetEmail(userEmail, resetUrl, userNameFull); // Función que envía el correo
                return res.json({ code: "OK", message: "Correo enviado para restablecer contraseña." });

            } catch (emailError) {

                console.error('Error enviando el correo: ' + emailError.message);
                return res.json({ code: "ERROR", mensaje: "No se pudo enviar el correo." });
            }
        }
        else {
            const jsonResult = {
                "code": "ERROR",
                "mensaje": "Ocurrio un error al recuperar contraseña."
            }

            return res.json(jsonResult);
        }

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

// Ruta para restablecer la contraseña
router.post('/auth/reset-password', async (req, res) => {
    /*  
        #swagger.tags = ['Autenticación']
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                token: "token-de-ejemplo",
                password: "NuevaContraseña123"
            }
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "message": "Contraseña actualizada correctamente."
            }
        } 
    */
    try {
        const { token, password } = req.body;

        // Consulta para obtener el user_id y la fecha de expiración


        const results = await queryAsync("SELECT user_id, expires FROM password_resets WHERE token = ?", [token]);

        if (results.length === 0 || new Date(results[0].expires) < new Date()) {

            console.log('Token inválido o expirado.');
            return res.json({ code: "ERROR", message: "Token inválido o expirado." });
        }

        const userId = results[0].user_id;

        const hashedPassword = await bcrypt.hash(password.trim(), 10); // Hashea la nueva contraseña

        // Actualiza la contraseña en la base de datos

        const updateQuery = await queryAsync("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);


        if (updateQuery && updateQuery.affectedRows != 0) {


            const deleteQuery = await queryAsync("DELETE FROM password_resets WHERE token = ?", [token]);

            if (deleteQuery && deleteQuery.affectedRows != 0) {

                return res.json({ code: "OK", message: "Contraseña actualizada correctamente." });

            }

        }
        else {

            return res.json({ code: "ERROR", message: "Error al actualizar contraseña." });

        }

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


export default router