define(['jquery','firebase','app/modal-main', 'app/modal-controls'], function($,firebase,modalMain,modalCtrl){
  var firebaseDatabase = new Firebase('https://meetappplnr.firebaseio.com/');

  var firebaseAuth = {
    firebaseData: firebaseDatabase,
    user: {
      name:'',
      email: '',
      provider:'',
      id:''
    },

    init: function(){
      this.cacheDom();
      this.firebaseData.onAuth(function(authData){
        firebaseAuth.updateHeader(authData);
      });
      console.log(firebaseAuth.user);
    },

    cacheDom: function(){
      this.$loginStatus = $('.login');
      this.$displayLoginStatus = this.$loginStatus.find('a');
      console.log(modal);
    },
   
    updateHeader: function(authData){
      console.log('authChanges fired');
      if(authData){
        if(firebaseAuth.user.name === ""){
          var userId = firebaseAuth.getId(authData);
          var ref = new Firebase ('https://meetappplnr.firebaseio.com/users/' + userId);
          return ref.once('value', function(snapshot){
            firebaseAuth.user.name=(snapshot.val().name);
            firebaseAuth.user.email=(snapshot.val().email);
            firebaseAuth.user.provider=(snapshot.val().provider);
            firebaseAuth.user.id = userId;
            firebaseAuth.$displayLoginStatus.text('Hi, '+ firebaseAuth.user.name);
          });
        }else{
          firebaseAuth.$displayLoginStatus.text('Hi, '+ firebaseAuth.user.name);
        }
      }else{
        firebaseAuth.$displayLoginStatus.text('Login or register');
      }
    },
    // getEmail: function(authData){
    //   switch(authData.provider){
    //     case 'password':
    //       return $('#email-reg').val();
    //     case 'google':
    //       return authData.google.email;
    //     case 'facebook':
    //       return authData.facebook.email;
    //   }
    // },
    // getName: function(authData){
    //   switch(authData.provider){
    //     case 'password':
    //       return $('#name').val();
    //     case 'google':
    //       return authData.google.displayName;
    //     case 'facebook':
    //       return authData.facebook.displayName;
    //   }
    // },

    getId: function(authData){
      console.log(authData)
      switch(authData.provider){
        case 'password':
          return authData.uid;
        case 'google':
          return authData.google.id;
        case 'facebook':
          return authData.facebook.id;
      }
    },
    facebookLogin: function(){
      firebaseDatabase.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('user loffed in');
        firebaseAuth.saveUserData(authData);
        // firebaseAuth.user.name = authData.facebook.displayName;
        // firebaseAuth.user.email = authData.facebook.email;
        // firebaseAuth.authChanges('true');
        modalCtrl.closeModal('#modal');        }
      },{scope: 'email'});
    },

    googleLogin: function(){
      firebaseDatabase.authWithOAuthPopup('google', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('user logged in');
        firebaseAuth.saveUserData(authData);
        modalCtrl.closeModal('#modal');
      }
      },{scope: 'email'});
    },

    emailLogin: function(email, password){
      firebaseDatabase.authWithPassword({
        email: email,
        password: password,
      },function(err, authData) {
        if (err) {
          switch (err.code) {
            case 'INVALID_EMAIL':
              console.log('The specified user account email is invalid.');
              break;
            case 'INVALID_PASSWORD':
              console.log('The specified user account password is incorrect.');
              break;
            case 'INVALID_USER':
              console.log('The specified user account does not exist.');
              break;
            default:
              console.log('Error logging user in:', err);
          }
        }else{
            console.log('Authenticated successfully with payload:', authData);
            firebaseAuth.user.name = authData.userName;
            firebaseAuth.user.email = authData.password.email;
            firebaseAuth.user.id = authData.uid;
            firebaseAuth.user.provider = 'password';
            modalCtrl.closeModal('#modal');
        }
        });
    },
    //collects user information in an object to perform db serach and, if needed create a new user
    saveUserData: function(authData){
      switch(authData.provider){
        case('google'):
          firebaseAuth.user.name = authData.google.displayName;
          firebaseAuth.user.email = authData.google.email;
          firebaseAuth.user.provider = authData.provider;
          firebaseAuth.user.id = authData.google.id;
          firebaseAuth.isNewUser();

          break;
        case('facebook'):
          firebaseAuth.user.name = authData.facebook.displayName;
          firebaseAuth.user.email = authData.facebook.email;
          firebaseAuth.user.provider = authData.provider;
          firebaseAuth.user.id = authData.facebook.id;
          firebaseAuth.isNewUser();
          break;
        default:
          console.log('unable to identify provider');
      }
    },
    //checks if user is already in the db. if new adds it to the db
    isNewUser: function(){
      var userId = firebaseAuth.user.id;
      var url = 'https://meetappplnr.firebaseio.com/users/' + userId;
      var ref = new Firebase(url);
      //calls the database to check if uid already exists
      return ref.once('value', function(snapshot){
        console.log(snapshot.val());
        if(snapshot.val() === null){
          console.log('user is new');
          firebaseDatabase.child('users').child(firebaseAuth.user.id).set({
          email: firebaseAuth.user.email,
          provider: firebaseAuth.user.provider,
          name: firebaseAuth.user.name

          });
          console.log('new user added to db')
        }else{
          console.log('there is already an account with that email');
          // newUser = false;
          // return false
        }
      });
    },

  };

  return firebaseAuth;

});

