import {response, Router} from 'express'
const router = Router()
import * as dotenv from 'dotenv'
import jwt from "jsonwebtoken";
dotenv.config()

router.get('/getToken', async (req, res) => {
    /*  
        #swagger.tags = ['Auth']
        
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ1c3VhcmlvIiwiaWF0IjoxNzE2MTcwMzUzLCJleHAiOjE3MTYyMDAzNTN9.iRXYwJK1rHsmg2vS5hR7ZBbUb8ZxppOavQxWwPKX8qg"
            }
        } 
    */
    try {     

        var auth = "Token";
        let jsonResult = {};

        const token = jwt.sign({ uid: auth }, process.env.JWT_SECRET, {
            expiresIn: 30000
        });

        if(token != '') {

            jsonResult = {
                "code": "OK",
                "token": token
            };

        } else {

            jsonResult = {
                "code": "ERROR",
                "token": "Ocurrio un error al generar el token."
            };
        }

        res.json(jsonResult);

    } catch (e) {

        return res.json({ error: e.toString() })
    }
});

export default router