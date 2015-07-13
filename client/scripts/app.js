// YOUR CODE HERE:

var message = {
  username: 'KODonkey',
  roomname: 'koDonkeyWorld',
};

var postMessage = function(text) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify({
      username: 'KODonkey',
      roomname: 'koDonkeyWorld',
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

var responseHandler = function(data) {
  // $ make it not json (data);
  var messages = data.results; 
  $(".messagedisplay").empty();
  messages.forEach(function(post) {
    var paragraph = $(".messagedisplay").append('<p></p>');
    paragraph.append(document.createTextNode(post.text));


  })
};

var getMessages = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?where=' + encodeURIComponent('{"roomname":"koDonkeyWorld"}'),
    type: 'GET',
    contentType: 'application/json',
    success: responseHandler
  });
};

// setInterval(getMessages, 500);
getMessages();
$(function() {
  $('.posttweet').click(function() {
    var msg = $('.newmessagetext').val();
    postMessage(msg);
  });
});