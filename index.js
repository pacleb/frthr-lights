const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

const express = require("express");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/console", (req, res) => {
  res.sendFile(__dirname + "/console.html");
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at port ${port}/`);
});
