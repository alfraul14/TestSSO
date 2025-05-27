"use strict";
const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (_req, res) => {
    res.send('API REST desplegada en Render.com!!');
});
app.post('/decode', (req, res) => {
    const { tokenDocument } = req.body;
    if (!tokenDocument || typeof tokenDocument !== 'string') {
        return res.status(400).json({ error: 'Falta el campo "b64" o no es una cadena' });
    }
    try {
        const decoded = Buffer.from(tokenDocument, 'base64').toString('utf-8');
        return res.json({ decoded });
    }
    catch (_a) {
        return res.status(400).json({ error: 'Base64 inválido' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
