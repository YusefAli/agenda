'use strict';




ss.event.on('rebootParla', function(message) {

  location.reload();
  return;

});

// Listen out for newMessage events coming from the server
ss.event.on('newMessageParla', function(message) {

  //si existe la agenda no lo notificamos
  if(document.getElementById(message._id))
  {
    return;
  }

  // Example of using the Hogan Template in client/templates/chat/message.jade to generate HTML for each message
  var html ;
  
  document.getElementById('audio').currentTime=0;
  document.getElementById('audio').play();

  if($('#chatlog tr').size() % 2==0)
  {
    html = ss.tmpl['chat-message2'].render({
        message: message
      });
  }
  else
  {
      html = ss.tmpl['chat-message'].render({
        message: message
      });
  }

  //numero de pacientes que aparecen en pantalla siempre impar
  if($('#chatlog tr').size() > 7)
  {
   // $('#tablaEspera tr').slice(1,2).slideUp(500);
    $('#chatlog tr').slice(0,1).remove();
  }

  $(html).appendTo('#chatlog');

  if(document.getElementById(message._id))
  {
     setTimeout(function(){
        if(document.getElementById(message._id))
        {
          document.getElementById(message._id).remove();
        }
    }, 3600000 );

  }


  // Append it to the #chatlog div and show effect
  return ;
});