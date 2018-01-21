const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'fiona',
    text: '1234 testing mike 12'
  })
}); 

socket.on('newMessage', (message) => {
  console.log('New Message ', message)
})

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});


