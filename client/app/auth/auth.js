// Auth controller
// ---------------
//
// This feature is not finished yet. Current target is not to implement actual authorization, but simply to link users to ideas (and eventually comments).

angular.module('glint.auth', [])

.controller('AuthCtrl', function(Auth, $scope, $window, $location){ 
  var self = this;
  self.user = {};
  // for displaying the login error message
  self.loginUsernameFailure = false;
  self.loginPasswordFailure = false;
  self.userNameExists = false;

  // Allow user to declare who they are to the system.
  self.signin = function() {
    self.user.username = self.user.username;
    self.user.password = self.user.password;
    var user = JSON.stringify(self.user);

    Auth.signin(user)
    .then(function (res){
      self.loginUsernameFailure = false;
      self.loginPasswordFailure = false;
      token = res.data;
      console.log(token)
      $window.localStorage.setItem('com.glint', JSON.stringify(token));
      $location.path('/');
    })
    .catch(function (error){
      //render error happens in Auth.signin service
      if (error.status === 401 && error.status === 404) {
        self.loginUsernameFailure = true;
        self.loginPasswordFailure = true;
      }
      else if (error.status === 401) {
        self.loginUsernameFailure = false;
        self.loginPasswordFailure = true;
      }
      else if (error.status === 404) {
        self.loginPasswordFailure = false;
        self.loginUsernameFailure = true;
      }
    });
  };

  // Allow user to first-time identify themselves to the system.
  self.signup = function() {
    self.user.username = self.user.username;
    self.user.password = self.user.password;
    var user = JSON.stringify(self.user);

    Auth.signup(user)
    .then(function (res){
      self.userNameExists = false;
      token = res.data;
      console.log(token);
      $window.localStorage.setItem('com.glint', JSON.stringify(token));
      $location.path('/');
    })
    .catch(function (error){
      console.error('signup error', error);
      self.userNameExists = true;
    });
  };

  self.signout = function() {
    Auth.signout()
  };


});
