const express = require('express')
const app = express()
const port = 3000 //localhost

app.get('/', (req, res) => res.send('Olá mundo express'))

app.listen(port, () => console.log('Api rodando na porta 3000'))