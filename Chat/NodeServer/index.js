//node server which will handle socket io connection at the port 80000
const io = require("socket.io")(8000);
const users = {};
//io.on is instance of socket .io
io.on("connection", (socket) => {
  //When a user joins infoming the new user joined to the server..
  socket.on("new-user-joined", (name) => {
    //console.log(name)
    users[socket.id] = name;
    //to brodast msg to othhers  that a user-joined
    socket.broadcast.emit("user-joined", name);
  });
  ///When a user sends a msg form we brodcast msg from server to all users except one who sended it
  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });
  //When someone leaves the chat the user is informed.
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
