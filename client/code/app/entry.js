'use strict';
// This file automatically gets called first by SocketStream and must always exist
var sesion=Math.random();
// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
	console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  
  var d = new Date();
  console.log('Connection back up :-)'+sesion);
  
  ss.rpc('demo.sendMessage', sesion);

 
});

ss.server.on('ready', function(){
 
  // Wait for the DOM to finish loading
  jQuery(function(){
    
    // Load app
    require('/app');

  });


  ss.rpc('auth.authenticate', sesion);
 

});
