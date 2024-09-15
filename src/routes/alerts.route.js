import { Router } from 'express';
import mysql from 'mysql';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const router = Router();

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Función para enviar el reporte por correo
async function enviarReportePorCorreo(email, nombre, datos) {

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reporte Diario de Pesaje</title>
            <style>
                body {
                    font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                    color: #0b1437;
                }
                .container {
                    width: 650px;
                    margin: 0 auto;
                    background-color: #ffffff;
                }
                .header {
                    text-align: center;
                    margin-bottom: 0;
                    background-color: #f7f7f7;
                }
                .header img {
                    width: 100%;
                    height: auto;
                }
                .content {
                    padding: 75px 45px;
                }
                .footer {
                    background-color: #0b1437;
                    color: #ffffff;
                    text-align: center;
                    padding: 20px;
                }
                .footer img {
                    height: 90px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                    box-shadow: 0px 3px 15px 0px #00000029;
                    border-radius: 8px;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                    color: #0b1537;
                }
                th {
                    background-color: #f5f7ff;
                }
                p {
                    color: #0b1537;
                }
            </style>
        </head>
        <body>
         <div dir="ltr" style="background-color:#f7f7f7;margin:0;padding:15px 0;width:100%">
            <div class="container">
                <div class="header">
                    <img src="https://brandis.cl/banner-agrisoft.png" alt="Agrisoft">
                </div>
                <div class="content">
                    <h3 style="font-size: 20px; color: #0b1537;">Hola ${nombre},</h3>
                    <p>Aquí tienes el reporte diario de pesaje:</p>
                    
                    ${datos.map(({ ground, total_kg, total_boxes }) => `
                    <h4 style="font-weight:bold;color: #0b1537;">Campo ${ground}</h4>
                    <table>
                        <thead>
                            <tr>
                                <th style="border-radius: 8px 0 0 0;">Total Kg</th>
                                <th style="border-radius: 0 8px 0 0;">Total Cajas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border: 1px solid #f7f7f7;border-top: none;border-radius: 8px;">
                                <td>${total_kg}</td>
                                <td>${total_boxes}</td>
                            </tr>
                        </tbody>
                    </table>
                    `).join('')}
                    
                    <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                </div>
                <div class="footer">
                    <p>
                        <img src="https://brandis.cl/agrisoft_logo_b.png" alt="Logo Agrisoft">
                    </p>
                    <p style="color: white;">Agrisoft Software S.A. Todos los derechos reservados</p>
                </div>
            </div>
            </div>
        </body>
        </html>
    `;

    await transporter.sendMail({
        from: '"Sistema de Pesaje" <noreply@agrisoft.cl.com>',
        to: email,
        subject: `Reporte Diario de Pesaje - ${nombre} - ${new Date().toLocaleString()}`,
        html: htmlContent
    });

    console.log("Correo enviado a: %s", email);
}

// Configura el cron para ejecutar la función a las 23:59 cada día
cron.schedule('59 23 * * *', () => {
    generarYEnviarReportesDiarios();
});

// Función para generar y enviar reportes diarios
async function generarYEnviarReportesDiarios() {
    const query = `
         SELECT 
            w.email AS worker_email,
            w.phone AS worker_phone,
            w.name AS worker_first_name,
            w.lastname AS worker_last_name,
            h.worker, 
            h.ground AS ground_id,
            g.name AS ground_name,
            SUM(h.kg_boxes) AS total_kg,
            SUM(h.boxes) AS total_boxes,
            DATE(h.harvest_date) AS date
        FROM 
            harvest h
        JOIN 
            season s ON h.season = s.id
        JOIN
            workers w ON h.worker = w.id
        JOIN 
            ground g ON h.ground = g.id
        WHERE 
            s.status = 1 -- solo temporadas abiertas
            AND DATE(h.harvest_date) =  CURDATE() -- Solo los pesajes del día actual
        GROUP BY 
            w.email, 
            w.phone,
            w.name,
            w.lastname,
            h.worker, 
            h.ground, 
            g.name,
            DATE(h.harvest_date)
        ORDER BY 
            w.email, g.name;
    `;

    // Crear conexión dentro de la función
    const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

    try {
        // Promesa para ejecutar la consulta
        const results = await new Promise((resolve, reject) => {
            mysqlConn.query(query, (error, results) => {
                if (error) {
                    console.error('Error ejecutando query:', error.sqlMessage);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (results.length === 0) {
            console.log("No hay datos para enviar.");
            return;
        }

        // Consolidar datos por trabajador
        const reportesPorTrabajador = results.reduce((acc, result) => {
            const { worker_email, worker_phone, worker_first_name, worker_last_name, ground_name, total_kg, total_boxes, date } = result;

            if (!acc[worker_email]) {
                acc[worker_email] = {
                    email: worker_email,
                    phone: worker_phone,
                    first_name: worker_first_name,
                    last_name: worker_last_name,
                    date: format(new Date(date), 'd MMMM yyyy', { locale: es }),
                    datos: []
                };
            }

            acc[worker_email].datos.push({ ground: ground_name, total_kg, total_boxes });

            return acc;
        }, {});

        // Enviar reportes por correo
        for (let [email, { phone, first_name, last_name, datos, date }] of Object.entries(reportesPorTrabajador)) {
            await enviarReportePorCorreo(email, `${first_name} ${last_name}`, datos);
            //await enviarReportePorWhatsApp(phone, `${first_name} ${last_name}`, { date, datos });
        }
    } catch (error) {
        console.error('Error en la generación o envío de reportes:', error);
    } finally {
        // Cierre de la conexión a la base de datos
        mysqlConn.end((err) => {
            if (err) {
                console.error('Error al cerrar la conexión:', err);
            } else {
                console.log('Conexión cerrada correctamente.');
            }
        });
    }
}



router.post('/notificationScale', async (req, res) => {
    try {
      const { company_id, name, messageContent } = req.body;
  
      // Define el contenido HTML del correo
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reporte Diario de Pesaje</title>
            <style>
                body {
                    font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                    color: #0b1437;
                }
                .container {
                    width: 650px;
                    margin: 0 auto;
                    background-color: #ffffff;
                }
                .header {
                    text-align: center;
                    margin-bottom: 0;
                    background-color: #f7f7f7;
                }
                .header img {
                    width: 100%;
                    height: auto;
                }
                .content {
                    padding: 75px 45px;
                }
                .footer {
                    background-color: #0b1437;
                    color: #ffffff;
                    text-align: center;
                    padding: 20px;
                }
                .footer img {
                    height: 90px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                    box-shadow: 0px 3px 15px 0px #00000029;
                    border-radius: 8px;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                    color: #0b1537;
                }
                th {
                    background-color: #f5f7ff;
                }
                p {
                    color: #0b1537;
                }
            </style>
        </head>
        <body>
         <div dir="ltr" style="background-color:#f7f7f7;margin:0;padding:15px 0;width:100%">
            <div class="container">
                <div class="header">
                    <img src="https://brandis.cl/banner-agrisoft.png" alt="Agrisoft">
                </div>
                <div class="content">
                    <h3 style="font-size: 20px; color: #0b1537;">Hola Administrador,</h3>
                    <p>El cliente ${company_id}, ha detactado un problema en la pesa ${name}, acá el mensaje que te envía:</p>
                    <p>${messageContent}</p>
                </div>
                <div class="footer">
                    <p>
                        <img src="https://brandis.cl/agrisoft_logo_b.png" alt="Logo Agrisoft">
                    </p>
                    <p style="color: white;">Agrisoft Software S.A. Todos los derechos reservados</p>
                </div>
            </div>
            </div>
        </body>
        </html>
      `;
  
      // Configura el correo
      const mailOptions = {
        from: 'noreply@agrisoft.cl',
        to: 'gerardo@agrisoft.cl, m.paillalef.c@gmail.com, donoso.javier@gmail.com', //TODO : Hay que definir quienes recibiran estos mails
        subject: `Mensaje sobre la pesa ${name} de la empresa ${company_id}`,
        html: htmlContent,
      };
  
      // Envía el correo
      const info = await transporter.sendMail(mailOptions);
  
      console.log('Correo enviado:', info.response);
  
      // Envía una respuesta exitosa
      res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      // Envía una respuesta de error
      res.status(500).json({ message: 'Error al enviar el correo' });
    }
  });
  





export default router;
