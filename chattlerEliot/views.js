var LoginView = Backbone.View.extend({
  initialize: function() {
    this.render();
    // where does this event listener go?
    $('.login').click(function() {
      var username = $('.loginuser').val();
      var roomname = $('.loginroom').val();
      var user = new User(username, roomname); // what do i do with this?
      var room = new Room(roomname); 
      var roomView = new RoomView({model: room});
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
  },

  render: function() {
    $('body').empty();

    var html = [
      '<div class="container">',
        '<div class="roomheader">Super Awesome Donkey Chat</div>',
        '<div class="chatdisplay">',
          '<ul class="chats">',
          '</ul>',
          '<form class="sendchat">', 
            '<input class="sendchattext" placeholder="say something!">',
            '<button class="sendchatbutton">SendChat</button>',
          '</form>',  
        '</div>',
      '</div>'
    ];

    this.$el.html(html);

    $('body').append(this.$el);

    // best way to call for new tweets?????
    // setTimeout?

      // serialize should return an array with the text from the input as the first element
      // from this page: http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
      
      // send chat to server
    $('.sendchat').submit(function(event) {
      postMessages(// need to pass user and room name $(this).serialize()[0]);
    });
  }
});

var MessageView = Backbone.View.extend({
  initialize: function() {
    this.render(this.model);
  },

  render: function(message) {
    var html = [
      '<li class="chat">'
        '<span class="chatauthor">' + message.author +': </span>',
        '<span class="chattext">' + message.text + '</span>,
      </li>'
    ];

    this.$el.html(html);

    $('.chatdisplay').append(this.$el);  
  }
});
