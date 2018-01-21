const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const generateMessage = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('New User connected');

  socket.emit('newUser', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newUser', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', message => {
    console.log('message', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from user');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`listening on port ${3000}`);
});
