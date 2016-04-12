var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var citaSchema = new Schema({
	numAge:			{ type: String },
	acto:			{ type: String },
	medico:			{ type: String },
	fecha: 			{ type: String },
	hora: 			{ type: String },
	vino: 			{ type: String }
	
});

module.exports = mongoose.model('Cita', citaSchema);

var pacienteSchema = new Schema({
	nif: 			{ type: String },
	nombre: 		{ type: String },
	apellido1: 		{ type: String },
	apellido2: 		{ type: String },
	domicilio: 		{ type: String },
	telefono: 		{ type: String },
	mutua: 			{ type: String },
	dni: 			{ type: String },
    citas: 			[citaSchema],
    numCitas: 		{ type: Number }
});

pacienteSchema.path('citas').set(function(value) {
	this.citas = value;
    this.numCitas = this.numCitas + 1;
    return value;
});

module.exports = mongoose.model('Paciente', pacienteSchema);
