var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var agendaSchema = new Schema({
	nif: 		{ type: String },
	nombre: 		{ type: String },
	apellido1: 		{ type: String },
	apellido2: 		{ type: String },
	fecha: 		{ type: String },
	hora: 		{ type: String },
	vinoold: 		{ type: String },
	vino: 		{ type: String },
	consulta: 		{ type: String }
	
});


module.exports = mongoose.model('Agenda', agendaSchema);