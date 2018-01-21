const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newUser', message => {
    console.log('to new user', message);
  });
});

socket.on('newMessage', message => {
  console.log('New Message ', message);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
