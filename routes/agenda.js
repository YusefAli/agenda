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
    agenda.centro='';
  
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
               case 'EEM': agenda.consulta='3';
               break;
               case 'EEM2': agenda.consulta='3';
               break;
               default:  agenda.consulta='';
            };
      
    };

    if(agenda.consulta==='0')
    {
      agenda.consulta='ATS'
    }

    //si contiene ILLE es ILLESCAS, sino parla
    if(agenda.nombre.indexOf('_ILLE') > -1)
    {
      agenda.centro='ILLESCAS';
    }
    else
    {
      switch (agenda.nombre)
            {
               case 'MMR2': agenda.centro='PARLA2';
               break; 
               case 'EEM2': agenda.centro='PARLA2';
               break;
               default:  agenda.centro='PARLA';
            };
    }


    //si contiene ILLE es ILLESCAS, sino parla
    if(agenda.nombre.indexOf('_ILLE') > -1)
    {
      agenda.centro='ILLESCAS';
      ss.api.publish.all('newMessage', agenda);
    }
    else if(agenda.centro.indexOf('PARLA2') > -1)
    {
      agenda.centro='PARLA2';
      ss.api.publish.all('newMessageParla2', agenda);
    }
    else
    {
      agenda.centro='PARLA';
      ss.api.publish.all('newMessageParla', agenda);
    }
  
    

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

    var centro=req.param('CENTRO');

    //si contiene ILLE es ILLESCAS, sino parla
    if(centro.indexOf('ILLESCAS') > -1)
    {
      ss.api.publish.all('reboot', 'reboot');
    }
    else if(centro.indexOf('PARLA2') > -1)
    {
      ss.api.publish.all('rebootParla2', 'rebootParla2');
    }
    else
    {
      ss.api.publish.all('rebootParla', 'rebootParla');
    }

    res.send(true);
  };

  app.post('/agenda', addAgenda);
  app.post('/reboot', rebootAgenda);


  app.get('/', function (req, res) {
        res.serve('main')}
    )

}