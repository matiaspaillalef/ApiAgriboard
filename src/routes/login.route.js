import {response, Router} from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import * as dotenv from 'dotenv'
dotenv.config()


router.post('/login', async (req, res) => {
    /*  
        #swagger.tags = ['login']

        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                mail: 'ejemplo@ejemplo.cl',
                password : 'pass'
            }
        }  
        #swagger.responses[200] = {
            schema: {
                "menu": [
                    {
                        "id": 1,
                        "name": "Configuración del sistema",
                        "url": "/enviroment",
                        "children": [
                            {
                                "id": 1,
                                "name": "Empresa",
                                "url": "/enviroment/company"
                            },
                            {
                                "id": 1,
                                "name": "Control de acceso",
                                "url": "/enviroment/access"
                            },
                            {
                                "id": 1,
                                "name": "Ubicación Geográfica",
                                "url": "/enviroment/location"
                            },
                            {
                                "id": 1,
                                "name": "Instituciones Previsionales",
                                "url": "/enviroment/AFP"
                            }
                        ],
                        "icon": "Cog8ToothIcon"
                    }
                ]
            }
        } 
    */
    try {     


        res.json({
            "menu": [
                {
                    "id": 1,
                    "name": "Configuración del sistema",
                    "url": "/enviroment",
                    "children": [
                        {
                            "id": 1,
                            "name": "Empresa",
                            "url": "/enviroment/company"
                        },
                        {
                            "id": 1,
                            "name": "Control de acceso",
                            "url": "/enviroment/access"
                        },
                        {
                            "id": 1,
                            "name": "Ubicación Geográfica",
                            "url": "/enviroment/location"
                        },
                        {
                            "id": 1,
                            "name": "Instituciones Previsionales",
                            "url": "/enviroment/AFP"
                        }
                    ],
                    "icon": "Cog8ToothIcon"
                },
                {
                    "id": 2,
                    "name": "produccion",
                    "url": "/production",
                    "children": [
                        {
                            "id": 1,
                            "name": "Parametrización de Campo",
                            "url": "/enviroment/pamaremeters-field"
                        },
                        {
                            "id": 1,
                            "name": "Parametrización de Producción",
                            "url": "/enviroment/pamaremeters-production"
                        },
                        {
                            "id": 1,
                            "name": "Operaciones",
                            "url": "/enviroment/operations"
                        }
                    ],
                    "icon": "Cog8ToothIcon"
                }
            ]
        });

    } catch (e) {
        return res.json({ error: e })
    }
});

export default router