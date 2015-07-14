var AppView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    var html = [
    '<form class=login>',
      'Username: <input class="loginuser" type="text" placeholder="username">',
      'Room: <input class="loginroom" type="text" placeholder="room">',
      '<button class="loginbutton">Go To Room</button>',
    '</form>'
    ].join('');

    this.$el.html(html);
    $('body').append(html);

    $('.login').submit(function(event) {
      event.preventDefault();
      var username = $('.loginuser').val() || 'anonymous';
      var roomname = $('.loginroom').val();
      var user = new User({name: username, roomname: roomname});  
      var room = new Room({name: roomname, user: user});
      console.log(this);
      this.model.set('user', user);
      this.model.set('room', room);
    }.bind(this));
  }
});

var RoomView = Backbone.View.extend({
  initialize: function() {
    // this.interval = setInterval(function(){ getMessages( this.model.get("name") );}.bind(this), 500);
    this.render();
    
    this.model.on('change', function(){
      if (this.interval !== undefined) {
        clearInterval(this.interval);
      }

      if(this.model.get('name') !== ""){
        this.render(this.model.get("name"));
        this.interval = setInterval(function(){ 
          getMessages(this.model.get("name"));
          getFriends(this.model.get('user'));
        }.bind(this), 500);
      }
    }.bind(this));
  },

  render: function() {
    $('body').empty();
    var html = [
      '<div class="container">',
        '<div class="roomheader">',
        'Welcome to ',
        this.model.get('name'),
        '</div>',
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
      postMessage(window.app.get('user').get('name'), this.model.get("name"), $('.sendchattext').val());
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

    var textNode = document.createTextNode(this.model.get('text'));
    var authorNode = document.createTextNode(this.model.get("username"));
    
    this.$el.html(html);
    this.$el.find('.chatauthor').append(authorNode);
    this.$el.find('.chattext').append(textNode);
    $('.chatdisplay').append(this.$el);
    
    $(".chatauthor").click(function(event) {
        console.log('hello');
      if ($(".chatauthor").hasClass(".friend")) {
        // send delete request
      } else {
        postFriend( app.get('user'),$(".chatauthor").text());
      }
      getFriends();
    });

    // $('body').append(this.$el);
  }
});
