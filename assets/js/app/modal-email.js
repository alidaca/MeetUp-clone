define(['jquery', 'firebase', 'https://alidaca.github.io/MeetUp-clone/assets/js/app/modal-controls.js'], function($,firebase, modalControls){

// define(['jquery', 'firebase', '/assets/js/app/modal-controls.js'], function($,firebase, modalControls){
   var modalEmail = {

    init: function(){
      console.log('modalEmail init fired');
      this.cacheDom();
      this.bindEvents();
      modalControls.hideMsg();
    },

    cacheDom: function(){
      this.$emailLogin = $('.email-login');
      this.$emailInput = this.$emailLogin.find('#email-login');
      this.$pwdInput = this.$emailLogin.find('#pwd-login');
      this.$loginBtn = this.$emailLogin.find('.button.modal-btn-signIn');
      this.$loginBack = this.$emailLogin.find('.button.modal-btn-back');
      this.$message = $('#message');
    },

    bindEvents: function(){
      this.$loginBtn.on('click', this.checkAuth.bind(this));
      this.$emailInput.on('change keyup', this.validateInput.bind(this));
      this.$pwdInput.on('change keyup',this.validateInput.bind(this));
      this.$loginBack.on('click',modalControls.hideMsg);
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
      var message = '';
      var ref = new Firebase("https://meetappplnr.firebaseio.com/");
      ref.authWithPassword({
        email    : this.$emailInput.val(),
        password : this.$pwdInput.val()
      }, function(error, authData) {
        if (error) {
          message = 'Your email or password was incorrect. Please try again.';
          modalEmail.$message.find('p').text(message);
          modalEmail.$message.show();
        } else {
          console.log("Authenticated successfully with email:", authData);
          modalEmail.$message.hide();
        }
      });
    }

   };
   return modalEmail;
});