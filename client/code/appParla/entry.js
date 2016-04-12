'use strict';
// This file automatically gets called first by SocketStream and must always exist
// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
	console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  
  console.log('Connection back up :-)');
    console.log('PARLA');
    ss.rpc('demo.sendMessage', 'PARLA');

 
});

ss.server.on('ready', function(){
 
  // Wait for the DOM to finish loading
  jQuery(function(){
    
    // Load app
    require('/app');

  });


//var vid = document.getElementById('video');

//vid.addEventListener('ended',myHandlerVideo,false);
  //  function myHandlerVideo(e) {
   //     document.getElementById('video').currentTime=0;
  //      document.getElementById('video').play();
  //  }
//  vid.play();
  
  //ss.rpc('auth.authenticate', document.cookie);
    console.log('PARLA');
    ss.rpc('demo.sendMessage', 'PARLA');

 

});
