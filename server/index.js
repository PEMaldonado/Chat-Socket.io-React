import express from "express";
import { createServer } from "node:http";
import { Server as SocketServer } from "socket.io";

const app = express();

const server = createServer(app);

const io = new SocketServer(server);

io.on("connect", (socket) => {
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });
});

server.listen(4000);
console.log("Server on port", 4000);
