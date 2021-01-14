//lidar com arquivos de sistema
const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'users.json') //arquivo que vai armazenar usuarios

const getUsers = () => {
    const data = fs.existsSync(filePath)//testar se o arquivo existe
        ?fs.readFileSync(filePath)//retorno positivo
        :[]//retorno negativo

        try {
            return JSON.parse(data)
        } catch (error) {
            return []
        }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

//funções
const userRoute = (app) => {
    app.route('/users/:id?')
        .get((rew, res) => {
            const users = getUsers()

            res.send({users})
        })
}

module.exports = userRoute