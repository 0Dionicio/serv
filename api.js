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
        const [rows] = await connection.execute("SELECT `orden`, `deporte`, `modelo`, `posicion`, `medida`, `lanzador`, `modelo-canasta`, `modelo-palma`, `modelo-logo`, `latigo-dividido`,`latigo`, `pieza-2-dividida`, `pieza-1`, `textura-pieza-1`, `pieza-2`, `textura-pieza-2`, `pieza-2-2`, `textura-pieza-2-2`, `pieza-3`, `textura-pieza-3`, `pieza-4`, `textura-pieza-4`, `pieza-5`, `textura-pieza-5`, `pieza-6`, `textura-pieza-6`, `pieza-7`, `textura-pieza-7`, `pieza-8`, `textura-pieza-8`, `pieza-9`, `textura-pieza-9`, `pieza-10`, `textura-pieza-10`, `pieza-11`, `textura-pieza-11`, `color-canasta`, `vivos`, `vivos-palma`, `ribete`, `latiguillos`, `hilos`, `correa-lateral`, `correa-interna`, `correa-latigo`, `correa-dedos`, `correa-canasta`, `palma`, `palma-interior`, `contorno-logo`, `logo`, `logo-detalle` FROM gloves WHERE codigo = ?", [userId]);
        
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

app.get('/orders/:id',async (req, res) => {
    const userId = req.params.id;

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT `orden`, `deporte`, `modelo`, `posicion`, `medida`, `lanzador`, `modelo-canasta`, `modelo-palma`, `modelo-logo`, `latigo-dividido`,`latigo`, `pieza-2-dividida`, `pieza-1`, `textura-pieza-1`, `pieza-2`, `textura-pieza-2`, `pieza-2-2`, `textura-pieza-2-2`, `pieza-3`, `textura-pieza-3`, `pieza-4`, `textura-pieza-4`, `pieza-5`, `textura-pieza-5`, `pieza-6`, `textura-pieza-6`, `pieza-7`, `textura-pieza-7`, `pieza-8`, `textura-pieza-8`, `pieza-9`, `textura-pieza-9`, `pieza-10`, `textura-pieza-10`, `pieza-11`, `textura-pieza-11`, `color-canasta`, `vivos`, `vivos-palma`, `ribete`, `latiguillos`, `hilos`, `correa-lateral`, `correa-interna`, `correa-latigo`, `correa-dedos`, `correa-canasta`, `palma`, `palma-interior`, `contorno-logo`, `logo`, `logo-detalle`, `codigo`, `Image-1` FROM gloves WHERE client_id = ?", [userId]);
        
        if (rows.length === 0){
            return res.status(404).json({error: 'usuario no encontrado'});
        }
        res.set('Cache-Control', 'no-store');
        res.json(rows);
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
