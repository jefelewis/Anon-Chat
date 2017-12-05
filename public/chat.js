// MAKE A CONNECTION
var socket = io.connect("http://localhost:4000");

// QUERY DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


// EMIT EVENTS
button.addEventListener("click", function(){
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

// TYPING EVENT
message.addEventListener("keypress", function(){
  socket.emit("typing", handle.value);
});


// LISTEN FOR EVENTS
socket.on("chat", function(data){
  // RESETS THE MESSAGE FIELD
  feedback.innerHTML = "";
  output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function(data){
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
