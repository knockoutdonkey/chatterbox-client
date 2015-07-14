$(function() {
  // var login = new LoginView();
  var user = new User({username: 'chiot', roomname: 'koDonkeyWorld'}); 
  new Room({name: 'koDonkeyWorld', user: user});
});