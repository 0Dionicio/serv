const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 8080;

const dbConfig = {
    host: 'bylg9utjl36jxfpo71qm-mysql.services.clever-cloud.com',
    user: 'uecwd0t1gq9b6nd7',
    password: '0t93rN07YnDpJRPmTBlq',
    database: 'bylg9utjl36jxfpo71qm'
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin. X-Requested-Whith. Content-Type. Accept');
    res.header('X-Powered-By', 'Node.js Express API');
    next();
});

app.get('/orden/:id',async (req, res) => {
    const userId = req.params.id;

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT `orden`, `version`, `modelo`, `posicion`, `medida`, `lanzador`, `modelo_canasta`, `modelo_palma`, `modelo_logo_latigo`, `latigo_separado`, `pieza_2_separada`, `pieza-1`, `txtura_piza_1`, `pieza-2`, `textura_pieza_2`, `pieza-2-2`, `textura_pieza_2_2`, `pieza_3`, `textura_pieza_3`, `pieza_4`, `textura_pieza_4`, `pieza_5`, `textura_pieza_5`, `pieza_6`, `textura_pieza_6`, `pieza_7`, `textura_pieza_7`, `pieza_8`, `textura_pieza_8`, `pieza_9`, `textura_piza_9`, `piza_10`, `textura_pieza_10`, `pieza_11`, `textura_pieza_11`, `color_canasta`, `vivos`, `vivos_palma`, `ribete`, `latiguillos`, `hilos`, `correa_lateral`, `correa_interna`, `correa_latigo`, `correa_dedos`, `correa_canasta`, `palma`, `palma_interna`, `contorno_logo`, `logo`, `logo_detalle` FROM guantes WHERE code = ?", [userId]);
        
        if (rows.length === 0){
            return res.status(404).json({error: 'usuario no encontrado'});
        }
        res.set('Cache-Control', 'no-store');
        res.json(rows[0]);
    } catch (error){
        console.error('Error BD:',error);
        res.status(500).json({error: 'Error interno del servidor' });
    }finally{
        if (connection){
            await connection.end();
        }
    }

});

app.get('/', (req, res)=>{
    res.send('API RES Node.js con MySQL y encabezados HTTP personalizados');
});

app.listen(PORT, () =>{
    console.log(`API ejecutandose en el puerto:${PORT}`);
});
