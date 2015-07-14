// should be a collection
var rooms = [];

var Room = Backbone.Model.extend({
  initialize: function(message) {
    name: message.name
  },
});

var User = Backbone.Model.extend({
  initialize: function(message) {
    this.name = message.username;
    this.room = message.room;

    var newRoom = new Room(room);
    rooms.push(newRoom);  
  }
});

var Message = Backbone.Model.extend({
  initialize: function(message) {
    this.text = message.text;
    this.author = message.author;

    var messageView = new MessageView
  }
});

// helper functions
var postMessage = function(username, roomname, text) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify({
      username: username,
      roomname: roomname,
      text: text
    }),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      getMessages();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

var getMessages = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?where=' + encodeURIComponent('{"roomname":"koDonkeyWorld"}'),
    type: 'GET',
    contentType: 'application/json',
    success: receiveMessages
  });
};

var receiveMessages = function(data) {
  data.forEach(function(item) {
    // get real names
    new Message({text: item.text, author: item.author});
  });
};