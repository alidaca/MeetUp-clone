define(['jquery','firebase'], function($,firebase){
  var firebaseDatabase = new Firebase('https://meetappplnr.firebaseio.com/');

  var firebaseAuth = {
    firebaseData: firebaseDatabase,
    user: {
      name:'',
      email: ''
    },

    init: function(){
      this.cacheDom();
      this.authChanges('true');
      this.firebaseData.onAuth(this.authChanges);
    },

    cacheDom: function(){
      this.$loginStatus = $('.login');
      this.$displayLoginStatus = this.$loginStatus.find('a');
    },

    authChanges: function(authData){
      console.log('authChanges fired');
      if(authData){
        firebaseAuth.$displayLoginStatus.text('Hi, '+ firebaseAuth.user.name);
      }else{
        firebaseAuth.$displayLoginStatus.text('Login or register');
      }
    },
  };

  return firebaseAuth;

});