define(['jquery','firebase'], function($,firebase){
  var firebaseData = new Firebase('https://meetappplnr.firebaseio.com/');
  var $loginStatus, $displayLoginStatus;
  function cacheDom(){
    $loginStatus = $('.login');
    console.log(this.$loginStatus);
    $displayLoginStatus = this.$loginStatus.find('a');
    console.log(this.$displayLoginStatus);
  }
  
  return  {
    firebaseData: firebaseData,
    displayLoginStatus: $displayLoginStatus,
    loginStatus: $loginStatus,
    init: function(){
      cacheDom();
      firebaseData.onAuth(this.authChanges);
      // console.log(firebaseAuth);
      console.log('firebaseData');
      console.log(firebaseData);
    },
    authChanges: function(authData){
      if(authData){
        console.log(this);
        this.displayLoginStatus.text('Login or register');
      }else{
        this.displayLoginStatus.text('Hi, '+ this.userName);
      }
    },
    facebookLogin: function(){
      console.log('facebookLogin fired');
      firebaseData.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('user loffed in');
        // this.user.name = authData.facebook.displayName;
        // this.user.email = authData.facebook.email;
        // modalMain.closeModal('#modal');
      }

      },{scope: 'email'});
    }
  };
});