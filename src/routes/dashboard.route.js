import { Router } from 'express'
const router = Router()
import validateToken from '../middleware/validateToken.js'
import queryAsync from '../utils/bd.js';

router.get('/filter/dashboard/dataKgDay/:companyID/:groundID', validateToken, async (req, res) => {
    /*
        #swagger.tags = ['Dashboard - Filter']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "kgDay": 1000
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */



    let { companyID, groundID } = req.params;

    try {

        var queryString = "SELECT SUM(kg_boxes) AS kg_boxes FROM harvest WHERE company_id  = ? AND ground = ? and date(harvest_date)  = CURDATE()";

        const results = await queryAsync(queryString, [companyID, groundID]);

        if (results && results.length > 0) {

            return res.json({
                "code": "OK",
                "data": results[0]
            });
        }
        else {

            return res.json({
                "code": "OK",
                "data": 0
            });
        }

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.get('/filter/dashboard/dataKgDayQlty/:companyID/:groundID/:qualityID', validateToken, async (req, res) => {
    /*
        #swagger.tags = ['Dashboard - Filter']

        #swagger.security = [{
               "apiKeyAuth": []
        }]

        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }

        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "kgDay": 1000
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */



    let { companyID, groundID, qualityID } = req.params;

    try {

        var queryString = "SELECT SUM(kg_boxes) AS kg_boxes FROM harvest WHERE company_id  = ? AND ground = ? AND quality = ? and date(harvest_date)  = CURDATE()";

        const results = await queryAsync(queryString, [companyID, groundID, qualityID]);

        if (results && results.length > 0) {

            return res.json({
                "code": "OK",
                "data": results[0]
            });
        }
        else {

            return res.json({
                "code": "OK",
                "data": 0
            });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


router.post('/filter/dashboard/dataKgSeason/:companyID/:groundID', validateToken, async (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "kg_boxes": 1000
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    try {

        // Validar que companyID y groundID sean números enteros válidos
        if (isNaN(companyID) || isNaN(groundID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa o ID del terreno inválidos"
            });
        }

        const queryString = `
            SELECT SUM(kg_boxes) AS kg_boxes
            FROM harvest
            WHERE company_id = ?
              AND ground = ?
              AND season = (
                SELECT MAX(season)
                FROM harvest
                WHERE company_id = ?
                  AND ground = ?
              )
        `;

        const results = await queryAsync(queryString, [companyID, groundID, companyID, groundID]);

        if (results && results.length > 0) {

            return res.json({
                "code": "OK",
                "data": results[0]
            });
        }
        else {

            return res.json({
                "code": "OK",
                "data": 0
            });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


router.post('/filter/dashboard/dataKgSeasonQlty/:companyID/:groundID/:qualityID', validateToken, async (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.parameters['qualityID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la calidad para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "kg_boxes": 1000
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID, qualityID } = req.params;

    try {


        // Validar que companyID, groundID y qualityID sean números enteros válidos
        if (isNaN(companyID) || isNaN(groundID) || isNaN(qualityID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa, ID del terreno o ID de la calidad inválidos"
            });
        }


        const queryString = `
            SELECT SUM(kg_boxes) AS kg_boxes
            FROM harvest
            WHERE company_id = ?
              AND ground = ?
              AND quality = ?
              AND season = (
                SELECT MAX(season)
                FROM harvest
                WHERE company_id = ?
                  AND ground = ?
                  AND quality = ?
              )
        `;

        const results = await queryAsync(queryString, [companyID, groundID, qualityID, companyID, groundID, qualityID]);

        if (results && results.length > 0) {

            return res.json({
                "code": "OK",
                "data": results[0]
            });
        }
        else {

            return res.json({
                "code": "OK",
                "data": 0
            });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


router.post('/filter/dashboard/dataWorkersCount/:companyID/:groundID', validateToken, async (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "workersCount": 100
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    try {

        // Validar que companyID y groundID sean números enteros válidos
        if (isNaN(companyID) || isNaN(groundID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa o ID del terreno inválidos"
            });
        }



        const queryString = `
            SELECT COUNT(DISTINCT worker) AS workersCount FROM harvest mh
            WHERE company_id = ?
            AND ground = ?
            AND season = (SELECT MAX(season) FROM harvest WHERE company_id = ? AND ground = ?)
            AND DATE(mh.harvest_date) = CURDATE()
        `;

        const results = await queryAsync(queryString, [companyID, groundID, companyID, groundID]);

        if (results && results.length > 0) {

            return res.json({
                "code": "OK",
                "data": results[0]
            });
        }
        else {

            return res.json({
                "code": "OK",
                "data": 0
            });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


router.post('/filter/dashboard/dataWorkersWeek/:companyID/:groundID', validateToken, async (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "workersWeek": 100
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    try {

        // Validar que companyID y groundID sean números enteros válidos
        if (isNaN(companyID) || isNaN(groundID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa o ID del terreno inválidos"
            });
        }

        const queryString = `
            SELECT count(*) cantidad from harvest h 
            WHERE DATE(h.harvest_date) = CURDATE()
            AND company_id = ? 
            AND ground = ?
        `;

        const results = await queryAsync(queryString, [companyID, groundID]);

        if (results && results.length > 0) {

            // Verificar si el resultado existe y es válido
            const weeksCount = results[0] && results[0].cantidad !== null ? results[0].cantidad : 0;

            const jsonResult = {
                code: "OK",
                data: {
                    workersWeek: weeksCount.toString()
                }
            };

            return res.json(jsonResult);

        } else {

            return res.json({
                "code": "OK",
                "data": 0
            });

        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


router.post('/filter/dashboard/dataVaritiesDay/:companyID/:groundID', validateToken, async (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "varietiesDay": 100
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    try {

        // Validar que companyID y groundID sean números enteros válidos
        if (isNaN(companyID) || isNaN(groundID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa o ID del terreno inválidos"
            });
        }



        const queryString = `
        SELECT 
            v.name AS variety,
            s.name AS specie,
            s2.name AS sector,
            SUM(mh.kg_boxes) AS cantidad, 
            SUM(mh.boxes) AS cajas 
        FROM 
            harvest mh
        JOIN 
            varieties v
            ON v.id = mh.variety
        JOIN 
            species s
            ON s.id = mh.specie 
        JOIN 
            sector s2 
            ON s2.id = mh.sector
        WHERE 
            DATE(mh.harvest_date) = CURDATE()
            AND mh.company_id = ?
            AND mh.ground = ?
        GROUP BY 
            v.name, s.name;`;

        const results = await queryAsync(queryString, [companyID, groundID]);

        if (results && results.length > 0) {

            return res.json({
                "code": "OK",
                "data": results
            });
        }
        else {

            return res.json({
                "code": "OK",
                "data": 0
            });
        }

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.post('/filter/dashboard/dataDispatchGuideDay/:companyID/:groundID', validateToken, async (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "dispatchGuide": 100
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    try {

        // Validar que companyID y groundID sean números enteros válidos
        if (isNaN(companyID) || isNaN(groundID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa o ID del terreno inválidos"
            });
        }

        const queryString = `
                            SELECT 
                    dg.correlative, 
                    ex.name AS exporter_name, 
                    dg.boxes, 
                    dg.kg, 
                    q.abbreviation 
                FROM 
                    dispatch_guide dg 
                JOIN 
                    exporters ex 
                ON 
                    dg.client = ex.id
                JOIN 
                    quality q 
                ON 
                    dg.quality = q.id
                WHERE 
                    DATE(dg.date) = CURDATE()
                    AND dg.company_id = ?
                    AND dg.ground = ?
                    `;

        const results = await queryAsync(queryString, [companyID, groundID]);

        if (results && results.length > 0) {

            return res.json({
                "code": "OK",
                "data": results[0]
            });

        }
        else {

            return res.json({
                "code": "OK",
                "data": 0
            });

        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});


router.post('/filter/dashboard/dataVarietySeasonPercentage/:companyID/:groundID', validateToken, async (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": [
                    {
                        "variety": "Nombre de la variedad",
                        "percentage": 100
                    }
                ]
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    try {

        // Validar que companyID y groundID sean números enteros válidos
        if (isNaN(companyID) || isNaN(groundID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa o ID del terreno inválidos"
            });
        }

        const queryString = `
            SELECT 
                v.name AS variety, 
                COUNT(*) AS cantidad
            FROM 
                harvest mh
            JOIN 
                varieties v 
            ON 
                v.id = mh.variety
            WHERE 
                mh.season = (
                    SELECT MAX(season)
                    FROM harvest
                    WHERE company_id = ?
                      AND ground = ?
                )
              AND mh.company_id = ?
              AND mh.ground = ?
            GROUP BY 
                v.name;
        `;


        const results = await queryAsync(queryString, [companyID, groundID, companyID, groundID]);

        if (results && results.length > 0) {

            return res.json({
                "code": "OK",
                "data": results[0]
            });

        }
        else {

            return res.json({
                "code": "OK",
                "data": 0
            });

        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.post('/filter/dashboard/dataHumidityTemperatureSeason/:companyID/:groundID', async (req, res) => {

    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "humidity": [100, 80, 60],
                    "temperature": [30, 25, 20],
                    "dates": ["20-12", "21-12", "22-12"]
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;


    try {

        // Validar que companyID y groundID sean números enteros válidos
        if (isNaN(companyID) || isNaN(groundID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa o ID del terreno inválidos"
            });
        }

        const queryString = `
            SELECT 
                DATE_FORMAT(date_register, '%d-%m') AS fecha, 
                AVG(wet) AS humedad, 
                AVG(temp) AS temperatura
            FROM 
                harvest
            WHERE 
                company_id = ?
                AND ground = ?
                AND season = (
                    SELECT MAX(season)
                    FROM harvest
                    WHERE company_id = ? AND ground = ?
                )
            GROUP BY 
                DATE_FORMAT(date_register, '%d-%m')
            ORDER BY 
                fecha;
        `;

        const results = await queryAsync(queryString, [companyID, groundID, companyID, groundID]);

        if (results && results.length > 0) {

            const data = {
                humedad: results.map(row => row.humedad),
                temperatura: results.map(row => row.temperatura),
                fechas: results.map(row => row.fecha)
            };

            return res.json({
                code: "OK",
                data
            });

        }
        else {

            return res.json({
                "code": "OK",
                "data": 0
            });

        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.post('/filter/dashboard/avgKgBoxes/:companyID/:groundID', validateToken, async (req, res) => {
    /*
        #swagger.tags = ['Dashboard - Filter']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['companyID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID de la empresa para filtrar los datos"
        }
        #swagger.parameters['groundID'] = {
            in: 'path',
            required: true,
            type: "integer",
            description: "ID del terreno para filtrar los datos"
        }
        #swagger.responses[200] = {
            schema: {
                "code": "OK",
                "data": {
                    "avgKgBoxes": 4.5
                }
            }
        }
        #swagger.responses[400] = {
            schema: {
                "code": "ERROR",
                "message": "Error al obtener los datos"
            }
        }
    */

    const { companyID, groundID } = req.params;

    try {


        if (isNaN(companyID) || isNaN(groundID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa o ID del terreno inválidos"
            });
        }

        const queryString = `
            SELECT 
                AVG(kg_boxes) AS avgKgBoxes
            FROM 
                harvest
            WHERE 
                company_id = ? AND 
                ground = ? AND 
                WEEK(harvest_date, 1) = WEEK(CURDATE(), 1) AND 
                YEAR(harvest_date) = YEAR(CURDATE())
        `;

        const results = await queryAsync(queryString, [companyID, groundID]);

        const avgKgBoxes = results[0]?.avgKgBoxes || 0;

        res.json({
            code: "OK",
            data: {
                avgKgBoxes: parseFloat(avgKgBoxes.toFixed(2))
            }
        });

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

router.post('/filter/dashboard/daysOfHarvest/:companyID/:groundID', validateToken, async (req, res) => {
    /*
    #swagger.tags = ['Management Crops - Harvest']
    #swagger.security = [{
        "apiKeyAuth": []
    }]
    #swagger.parameters['companyID'] = {
        in: 'path',
        required: true,
        type: "integer",
        description: "ID de la empresa para filtrar los datos"
    }
    #swagger.parameters['groundID'] = {
        in: 'path',
        required: true,
        type: "integer",
        description: "ID del terreno para filtrar los datos"
    }
    #swagger.responses[200] = {
        schema: {
            "code": "OK",
            "data": [
                {
                    "especie": "Palta",
                    "variedad": "Variedad A",
                    "dias_cosecha": 10
                },
                {
                    "especie": "Limón",
                    "variedad": "Variedad B",
                    "dias_cosecha": 5
                }
            ]
        }
    }
    #swagger.responses[400] = {
        schema: {
            "code": "ERROR",
            "message": "Error al obtener los datos"
        }
    }
    #swagger.responses[404] = {
        schema: {
            "code": "ERROR",
            "message": "No se encontraron datos"
        }
    }
    */

    const { companyID, groundID } = req.params;
    try {

        if (isNaN(companyID) || isNaN(groundID)) {
            return res.status(400).json({
                code: "ERROR",
                message: "ID de la empresa o ID del terreno inválidos"
            });
        }

        // Consulta SQL
        const queryString = `
            SELECT 
                s.name AS especie, 
                v.name AS variedad, 
                COUNT(DISTINCT DATE(mh.harvest_date)) AS dias_cosecha
            FROM 
                harvest mh
            JOIN 
                varieties v ON mh.variety = v.id
            JOIN 
                species s ON mh.specie = s.id
            JOIN 
                season sea ON mh.season = sea.id
            WHERE 
                mh.company_id = ? 
                AND mh.ground = ? 
                AND sea.company_id = ? 
                AND sea.id = (
                    SELECT MAX(id) 
                    FROM season 
                    WHERE company_id = mh.company_id 
                    AND NOW() BETWEEN sea.date_from AND sea.date_until
                )
                AND mh.harvest_date BETWEEN sea.date_from AND sea.date_until
            GROUP BY 
                s.name, v.name 
            ORDER BY 
                s.name, v.name;
        `;

        const results = await queryAsync(queryString, [companyID, groundID, companyID]);

        // Verificar si se encontraron resultados
        if (results && results.length > 0) {
            const data = results.map(row => ({
                especie: row.especie,
                variedad: row.variedad,
                dias_cosecha: row.dias_cosecha
            }));

            return res.json({
                code: "OK",
                data
            });
        } else {
            return res.status(404).json({
                code: "ERROR",
                message: "No se encontraron datos para los parámetros proporcionados"
            });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.json({ code: "ERROR", mensaje: error.message });
    }
});

export default router;

