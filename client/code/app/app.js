'use strict';
/* QUICK CHAT DEMO */

// Delete this file once you've seen how the demo works

// Listen out for newMessage events coming from the server
ss.event.on('newMessage', function(message) {

  // Example of using the Hogan Template in client/templates/chat/message.jade to generate HTML for each message
  var html ;
  
  document.getElementById('audio').currentTime=0;
  document.getElementById('audio').play();

  if($('#tablaEspera tr').size() % 2==0)
  {
    html = ss.tmpl['chat-message'].render({
        message: message
      });
  }
  else
  {
      html = ss.tmpl['chat-message2'].render({
        message: message
      });
  }

  //numero de pacientes que aparecen en pantalla siempre impar
  if($('#tablaEspera tr').size() > 7)
  {
   // $('#tablaEspera tr').slice(1,2).slideUp(500);
    $('#tablaEspera tr').slice(1,2).remove();
  }


  // Append it to the #chatlog div and show effect
  return $(html).appendTo('#chatlog');
});


// Show the chat form and bind to the submit action
$('#demo').on('submit', function() {

  // Grab the message from the text box
  var text = $('#myMessage').val();

  // Call the 'send' funtion (below) to ensure it's valid before sending to the server
  return exports.send(text, function(success) {
    if (success) {
      return $('#myMessage').val('');
    } else {
      return alert('Oops! Unable to send message');
    }
  });
});

// Demonstrates sharing code between modules by exporting function
exports.send = function(text, cb) {
  if (valid(text)) {
    return ss.rpc('demo.sendMessage', text, cb);
  } else {
    return cb(false);
  }
};  

// Private functions

function timestamp() {
  var d = new Date();
  return d.getHours() + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
}

function pad2(number) {
  return (number < 10 ? '0' : '') + number;
}

function valid(text) {
  return text && text.length > 0;
}
