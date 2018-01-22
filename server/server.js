const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('New User connected');

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app')
  );
  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user joined')
  );

  socket.on('createMessage', (message, callback) => {
    console.log('message', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', coords => {
    io.emit(
      'newLocationMessage',
      generateLocationMessage('Admin', coords.latitude, coords.longitude)
    );
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from user');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`listening on port ${3000}`);
});
