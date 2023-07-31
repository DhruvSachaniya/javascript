const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');


  socket.on('create-something', (msg) => {
    console.log('create-something: ' + msg);
    
  });
  
  socket.on('disconnect', (msg) => {
    console.log('user disconnected');
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
