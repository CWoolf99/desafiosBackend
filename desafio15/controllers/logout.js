const { infoLogger } = require("../servicios/logger");

function getLogout (req,res) {
    let nombre = req.user.username
    req.logout(err => {
    if (!err) {
        const {url , method} = req
        infoLogger.info(`Ruta ${method} ${url} recibida`)
        res.render('logout', {nombre:nombre}) 
         
    } else {
        res.redirect('/login')
    }}); 
}

module.exports = { getLogout }