// REQUIRE EXPRESS
var express = require("express");

// REQUIRE SOCKET.IO
var socket = require("socket.io");

// EXPRESS SETUP
var app = express();
var server = app.listen(4000, function(){
  console.log("Listening to requests on port 4000");
});

// SOCKET.IO SETUP
var io = socket(server);

// STATIC FILES
app.use(express.static("public"));


// LISTENS FOR THE EVENT "CONNECTION"
io.on("connection", function(socket){
  console.log("Made Socket Connection", socket.id);

  // HANDLE CHAT EVENT
  socket.on("chat", function(data){
    io.sockets.emit("chat", data);
  });

  // HANDLE TYPING EVENT
  socket.on("typing", function(data){
    socket.broadcast.emit("typing", data);
  });

});
