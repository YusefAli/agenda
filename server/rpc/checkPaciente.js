'use strict';
// Server-side Code

var Agenda = require('../../models/agenda.js');
//var Cita = require('../../models/cita.js');
var Paciente = require('../../models/paciente.js');


var sql = require('mssql'); 
 
var config = {
    user: 'apirest',
    password: '04051984',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance 
    database: 'ROMEXIS',
    
    options: {
        encrypt: false // Use this if you're on Windows Azure 
    }
}
 


// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  //req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    find: function(message) {
      //req.session.setUserId(message);
      console.log('checkPaciente: '+message);
      
      try{

          //var re = /¡(.[^¡]*)¡/; 
          var re = /[¡|\^](.[^¡^\^]*)[¡|\^]/; 

          var messageResult = re.exec(message); 

          console.log('messageResult: '+messageResult);
          
          
          if(messageResult && messageResult.length===2 && messageResult[1].length>4)
          {
       
          
            //console.log('Pattern:'+messageResult[1]);
            //console.log('Pattern:'+messageResult[1].replace(/\s/g, '%'));

            var connection = new sql.Connection(config, function(err) {              
                var request = new sql.Request(connection); // or: var request = connection.request(); 
                request.query('select * from IDDPAC where nombre+apellido1+apellido2 like \'%'+messageResult[1].replace(/\s/g, '%')+'%\'', function(err, recordset) {

                    if(recordset && recordset.length ===1)
                    {
                      //console.log('AGENDA0: '+recordset[0]);
                      //console.log('AGENDA01: '+recordset[0].NIF);

                        var paciente = new Paciente({
                          nif:          recordset[0].NIF,
                          nombre:       recordset[0].NOMBRE,
                          apellido1:    recordset[0].APELLIDO1,
                          apellido2:    recordset[0].APELLIDO2,
                          domicilio:    recordset[0].DOMICILIO,
                          telefono:     recordset[0].TELPART,
                          mutua:        recordset[0].COBERTURAP,
                          dni:          recordset[0].DNI
                        });

                        //console.log('paciente: '+paciente);

                        request.query('select * from IDDAGE where nif='+paciente.nif+' and DateDiff(day, DateAdd(day, fecha -4, \'1801-01-01\'), GETDATE()) > 0', function(err, recordset2) {

                            if(recordset2 && recordset2.length > 0)
                            {
                              for (var i = 0; i < recordset2.length; i++) {
                                console.log('recordset2: '+recordset2[i].MEDICO);
                                paciente.citas.push({
                                    numAge:       recordset2[i].NUMAGE,
                                    acto:         recordset2[i].ACTO,
                                    medico:       recordset2[i].MEDICO,
                                    fecha:        recordset2[i].FECHA,
                                    hora:         recordset2[i].HORA,
                                    vino:         recordset2[i].VINO
                                  });
                              }
                              paciente.numCitas=recordset2.length;
                            }
                            console.log('paciente: '+paciente);
                            //console.log('pacientecita: '+paciente.citas[0].medico);
                            
                            return res(paciente); 
                        });
                    }
                    else
                    {
                      return res('ERROR');     
                    }
                    
                });
                
                
            });
             
            connection.on('error', function(err) {
                // ... error handler 
                console.log('error: mssql');
                return res('ERROR');
            });

          }
          else
          {
            return res('ERROR');
          }
        }
        catch(err)
        {
          console.log(err.message);
          return res('ERROR');
        }
      
    },

    confirmarLlegada: function(message) {
      //req.session.setUserId(message);
      console.log('confirmarLlegada: '+message);
      
      try{

            var connection = new sql.Connection(config, function(err) {              
                var request = new sql.Request(connection); // or: var request = connection.request(); 
                request.query('UPDATE IDDAGE SET vino=S, horae=DATEDIFF(second,0,CONVERT(TIME,GETDATE())) where NUMAGE = '+message, function(err, recordset) {

                    if(recordset)
                    {
                      console.log('UPDATED: '+recordset);
                      //console.log('AGENDA01: '+recordset[0].NIF);
                      return res('OK');
                        
                    }
                    else
                    {
                      return res('ERROR');     
                    }
                    
                });
                
                
            });
             
            connection.on('error', function(err) {
                // ... error handler 
                console.log('error: mssql');
                return res('ERROR');
            });
        }
        catch(err)
        {
          console.log(err.message);
          return res('ERROR');
        }
      
    }

  };

};


