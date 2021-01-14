//lidar com arquivos de sistema
const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'users.json') //arquivo que vai armazenar usuarios

const getUsers = () => {
    const data = fs.existsSync(filePath)//testar se o arquivo existe
        ? fs.readFileSync(filePath)//retorno positivo
        : []//retorno negativo

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
        .get((req, res) => {
            const users = getUsers()

            res.send({ users })
        })
        .post((req, res) => {
            const users = getUsers()

            users.push(req.body)//corpo da requisição
            saveUser(users)

            res.status(201).send('ok usuario criado')//retorno
        }) //criar usuario
        .put((req, res) => {//atualizar
            const users = getUsers()

            saveUser(users.map(user => {
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }

                return user
            }))
            res.status(200).send('ok usuario atualizado')
        })
        .delete((req, res) => {//removendo usuarios
            const users = getUsers()

            saveUser(users.filter(user => user.id !== req.params.id))

            res.status(200).send('ok usuario deletado')
        })
}

module.exports = userRoute