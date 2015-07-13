// YOUR CODE HERE:

var message = {
  username: 'KODonkey',
  text: 'welcome to donkeyWorld',
  roomname: 'KODonkeyWorld',
};

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });
// function encode_utf8(s) {
//   return unescape(encodeURIComponent(s));
// }

var responseHandler = function(data) {
  // $ make it not json (data);
  var messages = data.results; 
  console.log(messages[0]);
  messages.forEach(function(post) {
    $("body").append('<p>' + post.text + '</p>');
  })

};
var testData = JSON.stringify('where={"roomname"="KODonkeyWorld"}');
$.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox?where=' + encodeURIComponent('{"roomname":"koDonkeyWorld"}'),
  type: 'GET',
  contentType: 'application/json',
  success: responseHandler
});
