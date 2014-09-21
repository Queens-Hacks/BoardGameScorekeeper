// Configuration on the client for Meteor
if (Meteor.isClient) {
  // Get the scopes when you log in! Woo!
  var scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.circles.read'];
  Accounts.ui.config({'requestPermissions': {'google':scopes}, 'requestOfflineToken': {'google': true}});
}
