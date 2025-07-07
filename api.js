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
        const [rows] = await connection.execute('SELECT id, orden, fecha_orden FROM guantes WHERE orden = ?', [userId]);
        
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
