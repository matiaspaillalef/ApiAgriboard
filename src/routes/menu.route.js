import { Router, json } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import queryAsync from '../utils/bd.js';

// MENÚ

router.get('/getMenubyRol/:rolId', validateToken, async (req, res) => {
    /*  
        #swagger.tags = ['Auth']

        #swagger.security = [{
            "apiKeyAuth": []
        }]
        
        #swagger.parameters['rolId'] = {
            in: 'path',
            required: true,
            type: "integer",
        }  
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "menus": [
                    {
                        "name": "Configuración",
                        "url": "/dashboard/enviroment",
                        "icon": "Cog8ToothIcon",
                        "children": [
                            {
                            "name": "Empresa",
                            "url": "/dashboard/enviroment/company",
                            "children": [
                                {
                                "name": "Datos de la empresa",
                                "url": "/dashboard/enviroment/company/data"
                                },
                                {
                                "name": "Usuarios",
                                "url": "/dashboard/enviroment/company/users"
                                }
                            ]
                            }
                        ]
                    }
                ]
            }
        } 
    */
    try {

        let { rolId } = req.params;
        let menus = [];
        let menuChildren = [];
        let menuGrandSon = [];


        var queryString = `select  m.id,m.name,m.icon,m.url from menu m , menu_rol mr
                                    where mr.id_rol  =?
                                    and m.id = mr.id_menu`;

        const results = await queryAsync(queryString, [rolId]);

        if (results && results.length > 0) {


            for (const row of results) {

                menuChildren = [];

                var menuQueryString = `select  *  from children_menu cm
                                            where cm.id_menu  = ?
                                            order by id asc`;

                const childRows = await queryAsync(menuQueryString, [row.id]);

                if (childRows && childRows.length > 0) {

                    for (const childRow of childRows) {

                        menuGrandSon = [];

                        var menuGrandSonQueryString = `select  *  from grand_son_menu gsm
                                                                where gsm.id_children_menu  =?
                                                                order by id asc`;

                        const grandSonRows = await queryAsync(menuGrandSonQueryString, [childRow.id]);

                        if (grandSonRows && grandSonRows.length > 0) {

                            for (const grandSonRow of grandSonRows) {

                                const grandSon = {
                                    "id": grandSonRow.id,
                                    "name": grandSonRow.name,
                                    "url": grandSonRow.url
                                };

                                menuGrandSon.push(grandSon);

                            }
                        }

                        const item = {
                            "id": childRow.id,
                            "name": childRow.name,
                            "url": childRow.url
                        };

                        if (menuGrandSon.length > 0) {
                            item.children = menuGrandSon;
                        }

                        menuChildren.push(item);

                    }
                }
                const menu = {
                    "id": row.id,
                    "name": row.name,
                    "url": row.url,
                    "icon": row.icon,
                };

                if (menuChildren.length > 0) {
                    menu.children = menuChildren;
                }

                menus.push(menu);

            };

            const jsonResult = {
                "code": "OK",
                "menus": menus
            }

            return res.json(jsonResult);
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});
export default router