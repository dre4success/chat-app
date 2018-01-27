const socket = io();

function scrollToBottom() {
  // Selectors
  /*    let messages = document.querySelector('#messages')
  let newMessage = messages.children */
  let messages = $('#messages');
  let newMessage = messages.children('li:last-child');
  console.log(newMessage);
  // Heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', () => {
  let params = $.deparam(window.location.search);

  socket.emit('join', params, err => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});
socket.on('newMessage', message => {
  console.log('to new user', message);
});

socket.on('newMessage', message => {
  /*   
  // let li = $('<li></li>');
  let li = document.createElement('li');
  li.innerText = `${message.from} ${formattedTime}: ${message.text}`;
  // li.text(`${message.from}: ${message.text}`);
  document.querySelector('#messages').appendChild(li);
  // $('#messages').append(li); */

  //  let template = $('#message-template').html()
  //  $('#messages').append(html)
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = document.querySelector('#message-template').innerHTML;
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  document.querySelector('#messages').innerHTML += html;
  scrollToBottom();
});

socket.on('newLocationMessage', message => {
  /*   

let li = document.createElement('li');
let a = document.createElement('a');
li.innerText = `${message.from}: ${formattedTime} `;
let content = document.createTextNode('My current Location');
a.appendChild(content);
a.setAttribute('target', '_blank');
a.setAttribute('href', message.url);

li.appendChild(a);
document.querySelector('#messages').appendChild(li); */
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = document.querySelector('#location-message-template').innerHTML;
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  document.querySelector('#messages').innerHTML += html;
  scrollToBottom();
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('updateUserList', users => {
/*   let ol = document.createElement('ol');

  users.forEach(user => {
    let li = document.createElement('li');
    li.textContent = user;
    ol.appendChild(li);
  });
  console.log(ol);
  document.querySelector('#users').appendChild(ol); */
  let ol = $('<ol></ol>')
  users.forEach(user => {
    ol.append($('<li></li>').text(user))
  })
  $('#users').html(ol)
});

const message = document.querySelector('#message-form');

message.addEventListener('submit', function(e) {
  e.preventDefault();
  let messageTextbox = document.querySelector("input[name='message']");
  socket.emit(
    'createMessage',
    {
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
