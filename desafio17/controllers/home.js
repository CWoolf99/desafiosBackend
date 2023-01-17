const { fork } = require('child_process');

const { infoLogger } = require("../servicios/logger");

function getHome (req,res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('logged', {nombre:req.user.username})
    
};

function getInfo (req, res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
	res.json({
		argumentos_de_entrada: process.argv.slice(2),
		nombre_sistema_operativo: process.platform,
		version_node: process.version,
		memoria_total_reservada: process.memoryUsage().rss,
		path_de_ejecucion: process.execPath,
		process_id: process.pid,
		carpeta_del_proyecto: process.cwd()
	});
}
function getRandoms (req, res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
	const forked = fork('./servicios/randoms.js');

	let { cantidad } = req.query;
	let obj = {};
	cantidad
		? forked.send({ cantidad, obj })
		: forked.send({ cantidad: 500000000, obj });
	forked.on('message', msg => res.json(msg));
};

module.exports = { getHome , getInfo , getRandoms } 