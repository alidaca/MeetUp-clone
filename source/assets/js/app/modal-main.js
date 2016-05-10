
//MODAL MAIN LOGIN
define(['jquery','app/firebase-auth'], function($, firebaseAuth){
  var firebase = firebaseAuth.firebaseData;

  var modalMain = {
    init: function(){
      this.cacheDom();
      this.bindEvents();
      // console.log(firebaseAuth);
    },

    cacheDom: function(){
      //container
      this.$el = $('.modal-body');
      this.$header = this.$el.prev();
      this.$modalTitle = this.$header.find('.modal-title');
      this.$closeBtn = this.$header.find('modal-close');
      //forms
      this.$mainLogin = this.$el.find('.main-login');
      this.$emailLogin = this.$el.find('.email-login');
      this.$signupForm = this.$el.find('.signup-form');
      this.$signupEmail = this.$signupForm.find('#email-reg');
      this.$signupPwd = this.$signupForm.find('#pwd-reg');
      this.$signupName = this.$signupForm.find('#name');
      //buttons
      this.$loginBtn = this.$el.find('#modal-btn-login');
      this.$signupBtn = this.$el.find('#modal-btn-signUp');
      this.$backBtn = this.$el.find('.modal-btn-back');
      this.$closeBtn = this.$el.find('.modal-close');
      this.$googleLogin = this.$el.find('#google-login');
      this.$facebookLogin = this.$el.find('#facebook-login');
      this.$emailSignup = this.$el.find('#modal-btn-register');
    },

    bindEvents: function(){
      this.$loginBtn.on('click', this.showEmailLogin.bind(this));
      this.$signupBtn.on('click', this.showSignupForm.bind(this));
      this.$backBtn.on('click', this.showMainLogin.bind(this));
      this.$closeBtn.on('click', this.showMainLogin.bind(this));
      this.$facebookLogin.on('click', this.facebookLogin.bind(this));
      this.$googleLogin.on('click',this.googleLogin.bind(this));
      this.$emailSignup.on('click', this.emailSignup.bind(this));
      // console.log('firebaseAuth is:');
      // console.log(firebaseAuth);
    },

    showEmailLogin: function(){
      this.$mainLogin.hide();
      this.$emailLogin.show();
      this.$modalTitle.text('Login with your email');
    },

    showMainLogin: function(){
      this.$emailLogin.hide();
      this.$signupForm.hide();
      this.$mainLogin.show();
      this.$modalTitle.text('Login to create an event');
    },

    showSignupForm: function(){
      this.$mainLogin.hide();
      this.$signupForm.show();
      this.$modalTitle.text('Register');
    },

    facebookLogin: function(){
      console.log('facebookLogin fired');
      firebaseAuth.firebaseData.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('user loffed in');
        firebaseAuth.user.name = authData.facebook.displayName;
        firebaseAuth.user.email = authData.facebook.email;
        firebaseAuth.authChanges('true');
        modalMain.closeModal('#modal');
      }
      },{scope: 'email'});
    },

    googleLogin: function(){
      console.log('facebookLogin fired');
      firebaseAuth.firebaseData.authWithOAuthPopup('google', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('user loffed in');
        firebaseAuth.user.name = authData.google.displayName;
        firebaseAuth.user.email = authData.google.email;
        firebaseAuth.authChanges('true');
        modalMain.closeModal('#modal');
      }
      },{scope: 'email'});
    },

    emailSignup: function(){
      // e.preventDefault();
      firebaseAuth.firebaseData.createUser({
        email: modalMain.$signupEmail.val(),
        password: modalMain.$signupPwd.val()
      }, function(err, userData){
        if (err) {
          switch (err.code) {
            case 'EMAIL_TAKEN':
              console.log('The new user account cannot be created because the email is already in use.');
              break;
            case 'INVALID_EMAIL':
              console.log('The specified email is not a valid email.');
              break;
            default:
              console.log('Error creating user:', err);
          }
        }else {
          console.log('Successfully created user account with uid:', userData.uid);
          this.emailLogin;
        }
      });
      return false;
    },

    emailLogin: function(){
      firebaseAuth.firebaseData.authWithPassword({
        email: modalMain.$signupEmail.val(),
        password: modalMain.$signupPwd.val(),
        userName: modalMain.$signupName.val()
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
            firebaseAuth.user.name = emailLogin.userName;
            firebaseAuth.user.email = email.username;
          }
        });
    },

    closeModal: function(modalId){
       $('#lean_overlay').fadeOut(200);
       $(modalId).css({ 'display': 'none' });
    }

  }; //mainLogin{}

  return modalMain;

});//modal main login


// ref.authWithPassword({
//   email    : "bobtony@firebase.com",
//   password : "correcthorsebatterystaple"
// }, function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }





