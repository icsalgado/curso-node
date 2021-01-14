const express = require('express')
const userRoute = require('./routes/userRoute') //modularização - importando a route
const app = express()
const port = 3000 //localhost

userRoute(app)

app.get('/', (req, res) => res.send('Olá mundo express'))

app.listen(port, () => console.log('Api rodando na porta 3000'))