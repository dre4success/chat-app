const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newMessage', message => {
    console.log('to new user', message);
  });
});

socket.on('newMessage', message => {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  // let li = $('<li></li>');
  let li = document.createElement('li');
  li.innerText = `${message.from} ${formattedTime}: ${message.text}`;
  // li.text(`${message.from}: ${message.text}`);
  document.querySelector('#messages').appendChild(li);
  // $('#messages').append(li);
});

socket.on('newLocationMessage', message => {
  let formattedTime = moment(message.createdAt).format('h:mm a');

  let li = document.createElement('li');
  let a = document.createElement('a');
  li.innerText = `${message.from}: ${formattedTime} `;
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
  let messageTextbox = document.querySelector("input[name='message']");
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageTextbox.value
    },
    () => {
      messageTextbox.value = '';
    }
  );
});

const locationButton = document.querySelector('#send-location');

locationButton.addEventListener('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  locationButton.setAttribute('disabled', 'disabled');
  locationButton.innerText = 'Sending Location...';

  navigator.geolocation.getCurrentPosition(
    postion => {
      locationButton.removeAttribute('disabled');
      locationButton.innerText = 'Send Location';

      socket.emit('createLocationMessage', {
        latitude: postion.coords.latitude,
        longitude: postion.coords.longitude
      });
    },
    () => {
      locationButton.removeAttribute('disabled');
      locationButton.innerText = 'Send Location';
      alert('Unable to fetch location');
    }
  );
});
