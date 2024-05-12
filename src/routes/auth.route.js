/*import { Router } from 'express'
const router = Router()
//import Usuario from '../models/usuario.model.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

router.post('/signin', (req, res) => {
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
                    token: 'asdgaetjsfdf',
                    error: 'Usuario o Password incorrectos.'
                }
        } 
    */
    /*try {
        let { usuario, password } = req.body;
        const token = jwt.sign({ uid: "test" }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        res.json({ token });

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});


export default router*/

import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dataUsers  } from '../data/dataUsers.js';

const router = Router();

router.post('/signin', async (req, res) => {
    /* #swagger.tags = ['Auth']
       #swagger.parameters['obj'] = {
           in: 'body',
           schema: { usuario: 'usuario', password: 'password' }
       }
       #swagger.responses[200] = {
           schema: { token: 'asdgaetjsfdf', error: 'Usuario o Password incorrectos.' }
       }
    */
   console.log(req.body);
 
    try {
        const { username, password } = req.body;

        const user = dataUsers.find(user => user.username === username || user.email === username);

        console.log(user);

        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        passwordMatch ? console.log('Contraseña correcta.') : console.log('Contraseña incorrecta.');

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta.' });
        }

        const dataUser = { id: user.id, username: user.username, email: user.email, name: user.name, lastName: user.lastName, rol: user.rol, state: user.state};

        const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.json({ token, dataUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un problema al procesar la solicitud.' });
    }
});

export default router;
