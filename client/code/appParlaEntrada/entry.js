'use strict';

// This file automatically gets called first by SocketStream and must always exist
// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
  console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)');
    console.log('AppParlaEntrada');

});

ss.server.on('ready', function(){
 
  // Wait for the DOM to finish loading
  jQuery(function(){
    
    // Load app
    require('/app');

  });

  document.getElementById('lectorTarjeta').addEventListener("input", function(e) {
          console.log('input');
          var caracter=this.value.slice(-1);
          //return alert(caracter);
          if(caracter.match(/\r\n|\r|\n/) || caracter=='_')
          {
            
            ss.rpc('checkPaciente.find', this.value, function(data) {
               console.log(data);
              if (data !== 'ERROR') {
                var html = ss.tmpl['appEntrada-cita'].render({
                      message: data
                    });
                jQuery('#contenedor').html(html);
              }
              else
              {

                var html = ss.tmpl['appEntrada-usuarioNoEncontrado'].render({
                      message: data
                    });
                jQuery('#contenedor').html(html);
              }
              document.getElementById('lectorTarjeta').value="";
              
            });
            
          } 
        
  }, false);

});


