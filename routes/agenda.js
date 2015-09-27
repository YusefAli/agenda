//File: routes/agenda.js
module.exports = function(app,ss) {

  var Agenda = require('../models/agenda.js');


  //POST - Insert a new Agenda in the DB
  addAgenda = function(req, res) {
    var fecha=new Date;
    var agenda = new Agenda({
      nif:    req.param('NIFMIO'),
      consulta:  req.param('consulta'),
      nombre:  req.param('nombre'),
      insertado: fecha.getTime()
    });
  
    if (isNaN(agenda.consulta) || !agenda.consulta) {
      switch (agenda.nombre)
            {
               case 'MMR_ILLES': agenda.consulta='1';
               break; 
               case 'FR_ILLES': agenda.consulta='1';
               break; 
               case 'VHE_ILLE': agenda.consulta='2';
               break;    
               case 'ALM_ILLE': agenda.consulta='2';
               break;
               case 'FAS_ILLE': agenda.consulta='2';
               break;
               case 'FGH_ILLE': agenda.consulta='2';
               break;
               case 'VM_ILLES': agenda.consulta='7';
               break;
               case 'LPI_ILLE': agenda.consulta='7';
               break;
               case 'PBP_ILLE': agenda.consulta='3';
               break;
               case 'EEM_ILLE': agenda.consulta='3';
               break;
               default:  agenda.consulta=''
            };
      
    };

    if(agenda.consulta==='0')
    {
      agenda.consulta='ATS'
    }

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