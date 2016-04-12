var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var agendaSchema = new Schema({
	//_id: 			{ type: Number },
	nif: 			{ type: String },
	nombre: 		{ type: String },
	apellido1: 		{ type: String },
	apellido2: 		{ type: String },
	fecha: 			{ type: String },
	hora: 			{ type: String },
	vinoold: 		{ type: String },
	vino: 			{ type: String },
	consulta: 		{ type: String },
	centro: 		{ type: String },
	insertado: 		{ type: Number }
	
});


module.exports = mongoose.model('Agenda', agendaSchema);
