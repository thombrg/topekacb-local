angular.module('app').factory('mvIdentity', function($window) {
  var currentUser;
  if(!!$window.bootstrappedUserObject) {
    currentUser = {};
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  }
})