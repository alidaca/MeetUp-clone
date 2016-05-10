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
    isNewUser: function(){
      
    }

  };



  return firebaseAuth;

});



// var isNewUser = true;
// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// ref.onAuth(function(authData) {
//   if (authData && isNewUser) {
//     // save the user's profile into the database so we can list users,
//     // use them in Security and Firebase Rules, and show profiles
//     ref.child("users").child(authData.uid).set({
//       provider: authData.provider,
//       name: getName(authData)
//     });
//   }
// });
// // find a suitable name based on the meta info given by each provider
// function getName(authData) {
//   switch(authData.provider) {
//      case 'password':
//        return authData.password.email.replace(/@.*/, '');
//      case 'twitter':
//        return authData.twitter.displayName;
//      case 'facebook':
//        return authData.facebook.displayName;
//   }
// }