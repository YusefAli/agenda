'use strict';
// Server-side Code

var Agenda = require('../../models/agenda.js');

// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  //req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    sendMessage: function(message) {
      //req.session.setUserId(message);
      console.log('sendMessage: '+message);
      Agenda.find({}, function(err, agendas) {
        if(!err) {
          var fecha = new Date();
          agendas.forEach(function(agenda) {
            //5 minutos
            if(agenda.insertado > fecha.getTime() - 300000)
            {
              //ss.publish.user(message,'newMessage', agenda);  
              ss.publish.all('newMessage', agenda);
            }
            else
            {
              //console.log('borramos'+agenda);
              agenda.remove();
            }
            //console.log(agenda);
          });
          return res(true);  
        } else {
          console.log('ERROR: ' + err);
          return res(false);
        }
      });
    }

  };

};