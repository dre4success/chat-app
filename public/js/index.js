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
  let li = document.createElement('li');
  li.innerText = `${message.from}: ${message.text}`;
  // li.text(`${message.from}: ${message.text}`);
  document.querySelector('#messages').appendChild(li);
  // $('#messages').append(li);
});

socket.on('newLocationMessage', message => {

  let li = document.createElement('li');
  let a = document.createElement('a');
  li.innerText = `${message.from}: `;
  let content = document.createTextNode('My current Location');
  a.appendChild(content);
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);

  li.appendChild(a);
  document.querySelector('#messages').appendChild(li);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

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

const locationButton = document.querySelector('#send-location');

locationButton.addEventListener('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(
    postion => {
      socket.emit('createLocationMessage', {
        latitude: postion.coords.latitude,
        longitude: postion.coords.longitude
      });
    },
    () => {
      alert('Unable to fetch location');
    }
  );
});
