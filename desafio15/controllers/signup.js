const { infoLogger } = require("../servicios/logger");

function signup (req,res) { res.redirect('/login')}

function getSignup (req,res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('signUp.hbs')
}

function getErrorSignup (req,res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('errorSignUp')
}

module.exports = { signup , getSignup , getErrorSignup }