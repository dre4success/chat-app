const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newMessage', message => {
    console.log('to new user', message);
  });
});

socket.on('newMessage', message => {
  console.log('New Message ', message);
  // let li = $('<li></li>');
  let li = document.createElement('li')
  li.innerText = `${message.from}: ${message.text}`
  // li.text(`${message.from}: ${message.text}`);
  document.querySelector('#messages').appendChild(li)
  // $('#messages').append(li);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

/* jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
}) */
const message = document.querySelector('#message-form');

message.addEventListener('submit', function(e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: document.querySelector("input[name='message']").value
    },
    () => {}
  );
});
