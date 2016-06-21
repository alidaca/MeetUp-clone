define(['jquery', 'firebase'], function($,firebase){
   var modalEmail = {

    init: function(){
      console.log('modalEmail init fired');
      this.cacheDom();
      this.bindEvents();
    },

    cacheDom: function(){
      this.$emailLogin = $('.email-login');
      this.$emailInput = this.$emailLogin.find('#email-login');
      this.$pwdInput = this.$emailLogin.find('#pwd-login');
      this.$loginBtn = this.$emailLogin.find('#modal-btn-signIn');
      this.$loginBack = this.$emailLogin.find('#button.modal-btn-back');
    },

    bindEvents: function(){
      this.$loginBtn.on('click', this.checkAuth.bind(this));
      this.$emailInput.on('change keyup', this.validateInput.bind(this));
      this.$pwdInput.on('change keyup',this.validateInput.bind(this));
    },

    validateInput: function(){
      console.log('validating input');
      console.log(this.$emailInput[0].checkValidity());
      console.log(this.$pwdInput[0].checkValidity());
      if (this.$emailInput[0].checkValidity() && this.$pwdInput[0].checkValidity()){
        console.log('all inputs provided');
        this.$loginBtn.removeAttr('disabled');
      }
    },

    checkAuth: function(){
      var ref = new Firebase("https://meetappplnr.firebaseio.com/");
      ref.authWithPassword({
        email    : this.emailInput.val(),
        password : this.pwdInput.val()
      }, function(error, authData) {
        if (error) {
          switch (error.code) {
            case "INVALID_EMAIL":
              console.log("The specified user account email is invalid.");
              break;
            case "INVALID_PASSWORD":
              console.log("The specified user account password is incorrect.");
              break;
            case "INVALID_USER":
              console.log("The specified user account does not exist.");
              break;
            default:
              console.log("Error logging user in:", error);
          }
        } else {
          console.log("Authenticated successfully with email:", authData);
        }
      });
    }

   };
   return modalEmail;
});