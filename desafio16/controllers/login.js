const { infoLogger } = require("../servicios/logger");

function login (req,res) {res.redirect('/')}

function getLogin (req,res) {
    if(req.isAuthenticated()){
        res.redirect('/')
    } else {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('formLogin')
}
}

function getErrorLogIn (req,res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('errorLogIn')
}

module.exports={ login , getLogin  , getErrorLogIn }