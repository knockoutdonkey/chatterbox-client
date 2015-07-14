// should be a collection
var rooms = [];

var Room = Backbone.Model.extend({
  initialize: function(message) {
    this.name = message.name;
    this.user = message.user;
    this.roomView = new RoomView({model: this});
  },
});

var User = Backbone.Model.extend({
  initialize: function(message) {
    console.log(message);
    this.name = message.name;
    this.roomname = message.roomname;
    this.friends = [];
    console.log(this);
  }
});

var Message = Backbone.Model.extend({
  initialize: function(message) {
    if (message !== undefined) {
      this.text = message.text;
      this.username = message.username;
      this.messageView = new MessageView({model: this});
    }
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
      getMessages(roomname);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

var getMessages = function(roomname) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?where=' + encodeURIComponent('{"roomname":"' + roomname + '"}'),
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
      receiveMessages(data);
    }
  });
};

var receiveMessages = function(data) {
  console.log(data);
  $('.chatdisplay').empty();
  data.results.forEach(function(item) {
    // get real names
    new Message({text: item.text, username: item.username});
  });
};