var LoginView = Backbone.View.extend({
  initialize: function() {
    this.render();
    // where does this event listener go?
    $('.login').click(function() {
      var username = $('.loginuser').val();
      var roomname = $('.loginroom').val();
      var user = new User({name: username, roomname: room}); // what do i do with this?
      var room = new Room({name: roomname, user: user}); 
      rooms.push(room);
      // var roomView = new RoomView({model: room});
    });
  },

  render: function() {
    var html = [
    '<div class=login>',
      'Username: <input class="loginuser" type="text" placeholder="username">',
      'Room: <input class="loginroom" type="text" placeholder="room">',
      '<button class="login">Go To Room</button>',
    '</div>'
    ].join('');

    this.$el.html(html);
    return this.$el;
  }
});

var RoomView = Backbone.View.extend({
  initialize: function() {
    this.render(this.model.name);
    setInterval(function(){getMessages();}, 500);
  },

  render: function() {
    $('body').empty();

    var html = [
      '<div class="container">',
        '<div class="roomheader">Super Awesome Donkey Chat</div>',
        '<div class="chatdisplay">',
          '<ul class="chats">',
          '</ul>',
        '</div>',
        '<form class="sendchat" onsubmit="postMessage">', 
          '<input class="sendchattext" placeholder="say something!">',
          '<button class="sendchatbutton">SendChat</button>',
        '</form>',  
      '</div>'
    ].join("");

    this.$el.html(html);

    $('body').append(this.$el);

    $('.sendchat').submit(function(event) {
      event.preventDefault();
      postMessage(this.model.user.name, this.model.name, $('.sendchattext').val());
      $('.sendchattext').val('');
    }.bind(this));
  }
});

var MessageView = Backbone.View.extend({
  initialize: function() {
    this.render(this.model);
  },

  render: function() {
    var html = [
      '<li class="chat">',
        '<span class="chatauthor"></span>: ',
        '<span class="chattext"></span>',
      '</li>'
    ].join("");

    var textNode = document.createTextNode(this.model.text);
    var authorNode = document.createTextNode(this.model.username);

    this.$el.html(html);
    this.$el.find('.chatauthor').append(authorNode);
    this.$el.find('.chattext').append(textNode);
    // $('body').append(this.$el);
    $('.chatdisplay').append(this.$el);  
  }
});
