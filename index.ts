const express = require('express')

interface DecodeBody {
  b64: string
}

const app = express()

app.use(express.json())

app.get('/', (_req: any, res: any) => {
  res.send('API REST desplegada en Render.com!!')
})

app.post('/decode', (req: any, res: any) => {
  const { tokenDocument } = req.body
  
  if (!tokenDocument || typeof tokenDocument !== 'string') {
    return res.status(400).json({ error: 'Falta el campo "b64" o no es una cadena' })
  }

  try {
    const decoded = Buffer.from(tokenDocument, 'base64').toString('utf-8')
    return res.json({ decoded })
  } catch {
    return res.status(400).json({ error: 'Base64 inválido' })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`)
})