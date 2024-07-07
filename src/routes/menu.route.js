import { Router, json } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import mysql from 'mysql';
import util from 'util';

// MENÚ

router.get('/getMenubyRol/:rolId', validateToken, (req, res) => {
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


        const mysqlConn = mysql.createConnection(JSON.parse(process.env.DBSETTING));

        // node native promisify
        const query = util.promisify(mysqlConn.query).bind(mysqlConn);

        (async () => {

            try {

                var queryString = "select  m.id,m.name,m.icon,m.url from menu m , menu_rol mr ";
                queryString += " where mr.id_rol  = " + rolId;
                queryString += " and m.id = mr.id_menu ";

                const rows = await query(queryString);

                if (rows.length > 0) {


                    for (const row of rows) {

                        menuChildren = [];

                        var menuQueryString = "select  *  from children_menu cm ";
                        menuQueryString += " where cm.id_menu  = " + row.id;
                        menuQueryString += " order by id asc";

                        const childRows = await query(menuQueryString);

                        if (childRows.length > 0) {

                            for (const childRow of childRows) {

                                menuGrandSon = [];

                                var menuGrandSonQueryString = "select  *  from grand_son_menu gsm ";
                                menuGrandSonQueryString += " where gsm.id_children_menu  = " + childRow.id;
                                menuGrandSonQueryString += " order by id asc";

                                const grandSonRows = await query(menuGrandSonQueryString);

                                if (grandSonRows.length > 0) {

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
                }
            }
            finally {

                mysqlConn.end();

                const jsonResult = {
                    "code": "OK",
                    "menus": menus
                }

                res.json(jsonResult);

            }


        })()

    } catch (e) {
        console.log(e);

        const jsonResult = {
            "code": "ERROR",
            "mensaje": "Error al cargar el menú."
        }

        res.json(jsonResult);
    }
});

export default router