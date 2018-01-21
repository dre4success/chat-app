const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User connected')


  socket.on('createMessage', (message) => {
    console.log('message', message)
    // io emits event to all subscribed connections
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from user')
  })
})


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`listening on port ${3000}`);
});
