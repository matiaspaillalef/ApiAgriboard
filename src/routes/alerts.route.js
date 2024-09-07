import { Router } from 'express';
import mysql from 'mysql';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
//import qrcode from 'qrcode-terminal';
//import pkg from 'whatsapp-web.js';
//const { Client, LocalAuth } = pkg;

const router = Router();

// Configuración de conexión a la base de datos MySQL
const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

mysqlConn.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.sqlMessage);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Configuración del cliente de WhatsApp
/*const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 60000 // Aumenta el tiempo de espera a 60 segundos
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente de WhatsApp está listo.');
});

client.on('auth_failure', () => {
    console.error('Error de autenticación. Asegúrate de escanear el QR correctamente.');
});

client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
    // Intenta reiniciar el cliente
    client.initialize();
});

client.initialize();*/

// Función para enviar el reporte por correo
async function enviarReportePorCorreo(email, nombre, datos) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

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
        //subject: "Reporte Diario de Pesaje",
        subject: `Reporte Diario de Pesaje - ${nombre} - ${new Date().toLocaleString()}`, // Asunto único
        html: htmlContent
    });

    console.log("Correo enviado a: %s", email);
}

// Función para enviar el reporte por WhatsApp
/*async function enviarReportePorWhatsApp(phone, nombre, datos) {
    // Verifica si el cliente está listo
    if (!client.info || !client.info.wid) {
        console.log('Cliente no está listo. Esperando...');
        return;
    }

    const numeroWhatsApp = `${phone}@c.us`; // Formato para WhatsApp Web

    let mensaje = `
        *Reporte Diario de Pesaje*\n
        *Fecha*: ${datos.date}\n
        *Trabajador*: ${nombre}\n\n
    `;

    datos.datos.forEach(({ ground, total_kg, total_boxes }) => {
        mensaje += `
            *Campo*: ${ground}\n
            *Total Kg*: ${total_kg}\n
            *Total Cajas*: ${total_boxes}\n\n
        `;
    });

    try {
        await client.sendMessage(numeroWhatsApp, mensaje);
        console.log('Mensaje de WhatsApp enviado a: %s', phone);
    } catch (error) {
        console.error('Error al enviar mensaje de WhatsApp:', error);
    }
}*/

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
            AND DATE(h.harvest_date) =  '2024-08-06' -- CURDATE() -- Solo los pesajes del día actual
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

    mysqlConn.query(query, async (error, results) => {
        if (error) {
            console.error('Error ejecutando query:', error.sqlMessage);
            return;
        }

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

        for (let [email, { phone, first_name, last_name, datos, date }] of Object.entries(reportesPorTrabajador)) {
            await enviarReportePorCorreo(email, `${first_name} ${last_name}`, datos);
            //await enviarReportePorWhatsApp(phone, `${first_name} ${last_name}`, { date, datos });
        }
    });
}

//generarYEnviarReportesDiarios();

// Exportar el router para su uso en la aplicación
export default router;
