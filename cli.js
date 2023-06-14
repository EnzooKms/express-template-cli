const inquirer = require('inquirer');
const fs = require('fs')

inquirer.prompt([
    {
        type: 'input',
        message: 'Quel est le nom de la route à créer ?',
        name: 'route'
    },
    {
        type: 'input',
        message: 'Quel est le nom de la view à créer ?',
        name: 'view'
    }
]).then(answer => {

    if (answer.view.includes('/') || answer.view.includes('\\')) {
        throw new Error('la view ne peut pas avoir le caractère "/" ou "\\"')
    }


    else {
        const folder = answer.route.split('/')[0]
        try {
            fs.mkdirSync(`./routers/${folder}`)
        }
        catch { }

        try {
            fs.mkdirSync(`./resources/css/${folder}`)
        }
        catch { }

        try {
            fs.mkdirSync(`./resources/js/${folder}`)
        }
        catch { }

        try {
            fs.mkdirSync(`./resources/views/${folder}`)
        }
        catch { }

        fs.open(`./routers/${folder}/${answer.view}.js`, (err) => {

            if (!err) {
                throw new Error(`le ficher ${__dirname}/routers/${folder}/${answer.view}.js existe deja !`)
            }

            fs.open(`./resources/css/${folder}/${answer.view}.css`, (err) => {

                if (!err) {
                    throw new Error(`le ficher ${__dirname}/resources/css/${folder}/${answer.view}.css existe deja !`)
                }


                fs.open(`./resources/js/${folder}/${answer.view}.js`, (err) => {

                    if (!err) {
                        throw new Error(`le ficher ${__dirname}/resources/css/${folder}/${answer.view}.js existe deja !`)
                    }

                    fs.open(`./resources/views/${folder}/${answer.view}.ejs`, (err) => {

                        if (!err) {
                            throw new Error(`le ficher ${__dirname}/resources/views/${folder}/${answer.view}.ejs existe deja !`)
                        }

                        const data = `const { Router } = require('express');
const router = Router()

router.get('${answer.route}', (req, res) => {

res.render('${answer.view}', {})

})

module.exports = { router }
            `

                        fs.writeFileSync(`./routers/${folder}/${answer.view}.js`, data)
                        fs.writeFileSync(`./resources/css/${folder}/${answer.view}.css`, '')
                        fs.writeFileSync(`./resources/js/${folder}/${answer.view}.js`, '')
                        fs.writeFileSync(`./resources/views/${folder}/${answer.view}.ejs`, '')

                        console.log('fichier créer');
                    })
                })
            })
        })


    }

})
