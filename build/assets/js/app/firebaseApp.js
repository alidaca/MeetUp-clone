define(['firebase'], function(firebase){
  var firebaseAuth = {
    firebase: {},
    user: {
      name: '',
      email: ''
    },
    init: function(){
      this.cacheDom();
      this.firebase = new Firebase('https://meetappplnr.firebaseio.com/');
      this.firebase.onAuth(this.authChanges);
      console.log(firebaseAuth);
      console.log(this);
    },
    cacheDom: function(){
      this.$loginStatus = $('.login');
      console.log(this.$loginStatus);
      this.$displayLoginStatus = this.$loginStatus.find('a');
      console.log(this.$displayLoginStatus);
    },
    authChanges: function(authData){
      if(authData){
        console.log(this);
        firebaseAuth.$displayLoginStatus.text('Login or register');
      }else{
        firebaseAuth.$displayLoginStatus.text('Hi, '+ this.userName);
      }
    },
    facebookLogin: function(){
      console.log('facebookLogin fired');
      this.firebase.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        this.user.name = authData.facebook.displayName;
        this.user.email = authData.facebook.email;
        modalMain.closeModal('#modal');
      }

    },{scope: 'email'});
    },
  };
  return firebaseAuth;
})