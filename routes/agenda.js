//File: routes/agenda.js
module.exports = function(app,ss) {

  var Agenda = require('../models/agenda.js');


  //POST - Insert a new Agenda in the DB
  addAgenda = function(req, res) {
    var fecha=new Date;
    var agenda = new Agenda({
      nif:    req.param('NIFMIO'),
      consulta:  req.param('consulta'),
      insertado: fecha.getTime()
    });

    if (isNaN(agenda.consulta)) {
      agenda.consulta='';
    };

  //  agenda._id=agenda.nif + agenda.consulta;
    ss.api.publish.all('newMessage', agenda);
    

    agenda.save(function(err) {
      if(!err) {
        console.log('Created'+agenda);
      } else {
        console.log('ERROR: ' + err);
      }
    });

  	res.send(agenda);
  };


  rebootAgenda = function(req, res) {
   
    ss.api.publish.all('reboot', 'reboot');

    res.send(true);
  };

  app.post('/agenda', addAgenda);
  app.post('/reboot', rebootAgenda);

  app.get('/', function (req, res) {
        res.serve('main')}
    )

}