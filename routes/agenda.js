//File: routes/agenda.js
module.exports = function(app,ss) {

  var Agenda = require('../models/agenda.js');

  //GET - Return all agenda in the DB
  findAllAgendas = function(req, res) {
  	Agenda.find(function(err, agenda) {
  		if(!err) {
        console.log('GET /agendas')
  			res.send(agenda);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

/*  //GET - Return a Agenda with specified ID
  findById = function(req, res) {
  	Agenda.findById(req.params.id, function(err, agenda) {
  		if(!err) {
        console.log('GET /agenda/' + req.params.id);
  			res.send(agenda);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };
*/
  //POST - Insert a new Agenda in the DB
  addAgenda = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

    var agenda = new Agenda({
      nif:    req.param('NIFMIO'),
      nombre:     req.param('nombre'),
      apellido1:     req.param('apellido1'),
      apellido2:     req.param('apellido2'),
      fecha:     req.param('fecha'),
      hora:     req.param('hora'),
      vinoold:     req.param('vinoold'),
      vino:     req.param('vino'),
      consulta:  req.param('consulta')
    });

    if (isNaN(agenda.consulta)) {
      agenda.consulta='';
    };

    ss.api.publish.all('newMessage', agenda);
    /*agenda.save(function(err) {
              if(!err) {
                console.log('Created'+agenda);

                 ss.api.publish.all('newMessage', agenda);

              } else {
                console.log('ERROR: ' + err);
              }
            });*/

    //comprobar que si vino pasa de null a S --->imprime
    //comprobar que si vino pasa de S a P --->muestra por pantalla

     /*Agenda.find({nif : agenda.nif, fecha : agenda.fecha, hora: agenda.hora, vino : agenda.vino}, function (err, docs) {
        if (docs.length){
           res.send(docs);
        }else{
            agenda.save(function(err) {
              if(!err) {
                console.log('Created'+agenda);
              } else {
                console.log('ERROR: ' + err);
              }
            });
        }
    });*/

 /*    var doc = new PDFDocument({margin:0});
    doc.fontSize(24);
    doc.text(agenda.nombre+"Hello World", {align: 'center'});

    // Use your printer URL here. It must support IPP
   var printURL = "http://localhost:9100";
    var printer = ipp.Printer(printURL);
    var buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', function () {
      var file = {
        "operation-attributes-tag":{
          "requesting-user-name": "User",
          "job-name": "Print Job",
          "document-format": "application/pdf"
        },
        data: Buffer.concat(buffers)
      };

      printer.execute("Print-Job", file, function (err, res) {
        console.log("Printed: "+res);
      });
    });

doc.end();*/
  	res.send(agenda);
  };

  /*//PUT - Update a register already exists
  updateAgenda = function(req, res) {
  	Agenda.findById(req.params.id, function(err, agenda) {
  		agenda.nombre   = req.body.nombre;
  		agenda.codigo    = req.body.codigo;
  		agenda.consulta = req.body.consulta;

  		agenda.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(agenda);
  		});
  	});
  }

  //DELETE - Delete a Agenda with specified ID
  deleteAgenda = function(req, res) {
  	Agenda.findById(req.params.id, function(err, agenda) {
  		agenda.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }
*/
  //Link routes and functions
  //app.get('/agendas', findAllAgendas);
  //app.get('/agenda/:id', findById);
  app.post('/agenda', addAgenda);

  app.get('/', function (req, res) {
        res.serve('main')}
    )
 //app.put('/agenda/:id', updateAgenda);
  //app.delete('/agenda/:id', deleteAgenda);

}