import { Router } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import queryAsync from '../utils/bd.js';


//METODOS PARA LA APP

router.post('/app/createHarvest/', validateToken, async (req, res) => {
    /*  
        #swagger.tags = ['APP']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                "groundId" : 1,
                "sectorId" : 1,
                "speciesId" : 1,
                "varietyId" : 1,
                "worker" : "15.099.034-3",
                "qualityId" : 1,
                "formatId" : 1,
                "batch" : 1,
                "boxes" : 1,
                "weight" : 1,
                "temperature" : 17,
                "humidity" : 16,
                "date" : "2024-08-06 10:00:00",
                "dateUtc" : "2024-08-06 10:00:00" ,
                "userId" : 1,
                "seasonId" : 1,
                "companyId" : 1,
                "isManual" :  0,
            }
        }  

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "registro creado correctamente."
            }
        } 
    */

    try {


        let {
            groundId,
            sectorId,
            speciesId,
            varietyId,
            worker,
            qualityId,
            formatId,
            batch,
            boxes,
            weight,
            temperature,
            humidity,
            date,
            dateUtc,
            userId,
            seasonId,
            companyId,
            isManual
        } = req.body;

        let zone, workerId, squad, squadLeader, contractorId;



        // Obtener zone de ground
        let results = await queryAsync("SELECT zone FROM ground WHERE id = ?", [groundId]);
        if (results && results.length > 0) {
            zone = results[0].zone;
        }

        // workerId de workers
        results = await queryAsync("SELECT id,contractor,squad FROM workers WHERE rut = ? AND company_id = ?", [worker, companyId]);
        if (results && results.length > 0) {

            workerId = results[0].id;
            contractorId = results[0].contractor;
            squad = results[0].squad;
            console.log("squad", squad);
            //  squad de workerID

            results = await queryAsync("SELECT id FROM squads WHERE FIND_IN_SET(?, REPLACE(REPLACE(REPLACE(REPLACE(workers, '[', ''), ']', ''), ' ', ''), ',', ','))", [workerId]);
            if (results && results.length > 0) {

                squad = results[0].id;

                //  squad_leader de squad
                results = await queryAsync("select  id  from workers w where squad = ? and leader_squad  = 1 ", [squad]);
                if (results && results.length > 0) {
                    squadLeader = results[0].id;
                }
                else {
                    squadLeader = null;
                }
            }
        }
        console.log("zone", zone);
        console.log("workerId", workerId);
        console.log("squad", squad);
        console.log("squadLeader", squadLeader);
        console.log("contractorId", contractorId);

        if (zone != null && workerId != null && squad != null && squad != 0 && contractorId != null) {

            // 4. Insertar datos en la tabla harvest
            const insertQuery = `INSERT INTO agrisoft.harvest
                                    (zone, ground, sector, squad, squad_leader, batch, worker, worker_rut, harvest_date, specie, variety, boxes, kg_boxes, quality, hilera,
                                    harvest_format, weigher_rut, sync, sync_date, season, turns, date_register, temp, wet, contractor, source, company_id)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const insertValues = [
                zone, groundId, sectorId, squad, squadLeader, batch, workerId, worker, date, speciesId, varietyId, boxes, weight, qualityId,
                null, formatId, userId, userId, dateUtc, seasonId, null, dateUtc, temperature, humidity, contractorId, isManual, companyId
            ];

            const insertResult = await queryAsync(insertQuery, insertValues);

            if (insertResult && insertResult.affectedRows != 0) {

                const jsonResult = {
                    "code": "OK",
                    "mensaje": "Registro creado correctamente."
                }

                res.json(jsonResult);

            } else {

                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": "No se pudo crear el registro."
                }

                res.json(jsonResult);
            }

        } else {

            if (zone == null || zone == 0) {

                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": "No se pudo obtener la zona del trabajador."
                }

                res.json(jsonResult);
            }
            else {

                if (workerId == null || workerId == 0) {

                    const jsonResult = {
                        "code": "ERROR",
                        "mensaje": "no se pudo obtener el ID del trabajador."
                    }

                    res.json(jsonResult);

                } else {

                    if (squad == null || squad == 0) {


                        const jsonResult = {
                            "code": "ERROR",
                            "mensaje": "no se pudo obtener la cuadrilla  del trabajador."
                        }

                        res.json(jsonResult);
                    }
                    else {

                        if (contractorId == null || contractorId == 0) {


                            const jsonResult = {
                                "code": "ERROR",
                                "mensaje": "no se pudo obtener el contratiste   del trabajador."
                            }

                            res.json(jsonResult);
                        }

                    }

                }

            }
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


router.post('/app/syncFromApp/', validateToken, async (req, res) => {
    /*  
        #swagger.tags = ['APP']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                "rut" : "15.099.034-3",
                "name" : "javier",
                "lastname" : "Donoso",
                "lastname2" : "Rendich",
                "wristband" : "123456789", 
                "email" : "prueba@prueba.cl",
                "contractor" : 1,
                "squad" : 1,
                "last_update" : "2024-08-06 10:00:00",
                "company_id" : 1
            }
        }  

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "mensaje": "registro creado correctamente."
            }
        } 
    */

    try {


        let {
            rut,
            name,
            lastname,
            lastname2,
            wristband,
            email,
            contractor,
            squad,
            company_id
        } = req.body;

        let id;
        let results;

        results = await queryAsync("SELECT id FROM workers WHERE rut = ? AND company_id = ?", [rut, company_id]);

        if (results && results.length > 0) {

            id = results[0].id;

            if (id != null) {

                const updateResults = await queryAsync("UPDATE workers SET wristband = ? WHERE id = ?", [wristband, id]);

                if (updateResults && updateResults.affectedRows != 0) {

                    const jsonResult = {
                        "code": "OK",
                        "mensaje": "Registro actualizado correctamente."
                    }

                    res.json(jsonResult);

                } else {

                    const jsonResult = {
                        "code": "ERROR",
                        "mensaje": "No se pudo actualizar  el registro."
                    }

                    res.json(jsonResult);
                }

            }
            else {

                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": "el usuario existe pero no se pudo obtener el id del registro."
                }

                res.json(jsonResult);
            }

        }
        else {

            const insertQuery = `
                    INSERT INTO agrisoft.workers
                    (rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, position, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id, email)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)
                `;
            const insertValues = [rut, name, lastname, lastname2, null, null, null, null, null, null, null, null, null, 1, null, contractor, squad, null, null, wristband, null, null, null, null,
                null, null, company_id, email
            ];

            const insertResult = await queryAsync(insertQuery, insertValues);

            if (insertResult && insertResult.affectedRows != 0) {

                const jsonResult = {
                    "code": "OK",
                    "mensaje": "Registro creado correctamente."
                }

                res.json(jsonResult);

            } else {

                const jsonResult = {
                    "code": "ERROR",
                    "mensaje": "No se pudo crear el registro."
                }

                res.json(jsonResult);
            }
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.get('/app/getAttributesSector/:companyID', validateToken, async (req, res) => {
    /*  
        #swagger.tags = ['APP']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "attributes": [
                    {
                        "id": 1,
                        "season": 1,
                        "sector": 1,
                        "specie": 1,
                        "variety": 1,
                        "year_harvest": 2024,
                        "ha_productivas": 100,
                        "on_ha": 500,
                        "between_ha": 100,
                        "quantity_plants_ha": 10000,
                        "company_id": 1,

                    }
                ]
            }
        }
    */

    try {


        let { companyID } = req.params;

        var attributes = [];

        let results = await queryAsync("select  *  from sector_attr sa where season  = (select  id  from season s where status = 1 and company_id  = ?)", [companyID]);

        if (results && results.length > 0) {


            results.forEach(element => {
                attributes.push({
                    "id": element.id,
                    "season": element.season,
                    "sector": element.sector,
                    "specie": element.specie,
                    "variety": element.variety,
                    "year_harvest": element.year_harvest,
                    "ha_productivas": element.ha_productivas,
                    "on_ha": element.on_ha,
                    "between_ha": element.between_ha,
                    "quantity_plants_ha": element.quantity_plants_ha,
                    "company_id": element.company_id,
                });
            });

            const jsonResult = {
                "code": "OK",
                "attributes": attributes
            };
            res.json(jsonResult);
        }
        else {

            const jsonResult = {
                "code": "ERROR",
                "mensaje": "No se encuentran registros."
            }
            res.json(jsonResult);
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

export default router
