//REGISTRATION FORM
// define(['jquery', 'https://alidaca.github.io/MeetUp-clone/assets/js/app/firebase-auth.js','https://alidaca.github.io/MeetUp-clone/assets/js/app/modal-controls.js'], function($,firebaseAuth, modalControls){


define(['jquery', '/assets/js/app/firebase-auth.js','/assets/js/app/modal-controls.js'], function($,firebaseAuth,modalControls){
  var regForm = {
    init: function(){
      this.cacheDom();
      this.bindEvents();
      modalControls.hideMsg();
    },
    cacheDom: function(){
      this.$message = $('#message');
      this.$signup = $('.signup-form');
      //inputs for signup-form
      // this.$signupEmail = this.$signupForm.find('#email-reg');
      // this.$signupPwd = this.$signupForm.find('#pwd-reg');
      // this.$signupName = this.$signupForm.find('#name');
      this.$inputName = this.$signup.find('#name');
      this.$inputEmail = this.$signup.find('#email-reg');
      this.$inputPwd = this.$signup.find('#pwd-reg');
      this.$confirmPwd = this.$signup.find('#confirm-pwd');
      this.$input = this.$signup.find('input');
      //password instructions
      this.$promptLength = this.$signup.find('#pwd-length');
      this.$promptSymbol = this.$signup.find('#pwd-symbol');
      this.$promptNumber = this.$signup.find('#pwd-number');
      this.$promptLowercase = this.$signup.find('#pwd-lowercase');
      this.$promptUppercase = this.$signup.find('#pwd-uppercase');
      //Buttons
      // this.$emailSignup = this.$el.find('#modal-btn-register');
      this.$regBtn = this.$signup.find('#modal-btn-register');
      this.$backBtn = this.$signup.find('.modal-btn-back');

    },
    bindEvents: function(){
      this.$inputName.on('keyup blur', this.validateName.bind(this));
      this.$inputEmail.on('keyup blur', this.validateEmail.bind(this));
      //validates password while user types
      this.$inputPwd.on('keyup blur',this.$inputPwd,this.validatePwd.bind(this));
      //validates confirmation password while user types
      this.$confirmPwd.on('keyup blur',this.matchPwd.bind(this));
      //validates entire form and enables registration when valid
      this.$input.on('keyup', this.validateForm.bind(this));
      this.$regBtn.on('click', this.emailSignup.bind(this));
      this.$backBtn.on('click',modalControls.hideMsg);
    },
    validateName: function(){
      if (this.$inputName.val().length === 0){
        this.renderValidation(this.$inputName,'invalid');
        this.$inputName.parent().find('.errMsg').text('A name is required to register').show();
      }else{
        this.renderValidation(this.$inputName,'valid');
        this.$inputName.parent().find('.errMsg').hide();
      }
    },
    validateEmail: function(){
      console.log('validateEmail fired');
      if(this.$inputEmail.val().length === 0){
        console.log('inputEmail empty');
        this.renderValidation(this.$inputEmail,'invalid');
        this.$inputEmail.parent().find('.errMsg').text('An email address is required to register').show();
      }else if(this.$inputEmail[0].checkValidity() === false){
        console.log('inputEmail is invalid');
        this.renderValidation(this.$inputEmail,'invalid');
        this.$inputEmail.parent().find('.errMsg').text('Please provide a valid email address').show();
      }else{
        console.log('inputEmail is valid');
        this.renderValidation(this.$inputEmail,'valid');
        this.$inputEmail.parent().find('.errMsg').hide();
      }
    },
    validatePwd: function(){
      // console.log('validatePwd fired');
      var password = this.$inputPwd.val();
      if (password.length === 0){
        this.$inputPwd.parent().find('.errMsg').show();
        this.renderPwdValidation(this.$inputPwd,this.$promptLength,'invalid');
      }else{
          if(!this.validLength(password)){
          this.renderPwdValidation(this.$inputPwd,this.$promptLength,'invalid');
        }else{
          this.renderPwdValidation(this.$inputPwd,this.$promptLength, 'valid');
        }

        if(!this.includesNumber(password)){
          this.renderPwdValidation(this.$inputPwd,this.$promptNumber,'invalid');
        }else{
          this.renderPwdValidation(this.$inputPwd,this.$promptNumber, 'valid');
        }

        if(!this.includesSymbol(password) || !this.noIllegal(password)){
          this.renderPwdValidation(this.$inputPwd,this.$promptSymbol,'invalid');
        }else{
          this.renderPwdValidation(this.$inputPwd,this.$promptSymbol, 'valid');
        }

        if(!this.includesLowercase(password)){
          this.renderPwdValidation(this.$inputPwd,this.$promptLowercase,'invalid');
        }else{
          this.renderPwdValidation(this.$inputPwd,this.$promptLowercase, 'valid');
        }

        if(!this.includesUppercase(password)){
          this.renderPwdValidation(this.$inputPwd,this.$promptUppercase,'invalid');
        }else{
          this.renderPwdValidation(this.$inputPwd,this.$promptUppercase, 'valid');
        }

        if(this.validLength(password) && this.includesNumber(password) && this.includesSymbol(password) && this.includesLowercase(password) && this.includesUppercase(password) && this.noIllegal(password)){
          this.markInputPwd('valid');
          this.$inputPwd.parent().find('.errMsg').hide();
        }else{
          this.markInputPwd('invalid');
          this.$inputPwd.parent().find('.errMsg').text("Your password doesn't meet the criteria.Please try again.").show();
        }
      }
    },
    matchPwd: function(){
      switch(this.$confirmPwd.val().length){
        case 0:
          this.$confirmPwd.parent().find('.errMsg').text("Please, confirm the password").show();
          this.renderValidation(this.$confirmPwd, 'invalid');
          break;
        default:
          if(this.$inputPwd.val() !== undefined && this.$inputPwd.val() === this.$confirmPwd.val()){
            this.renderValidation(this.$confirmPwd, 'valid');
            this.$confirmPwd.parent().find('.errMsg').hide();
          }else{
            this.renderValidation(this.$confirmPwd, 'invalid');
            this.$confirmPwd.parent().find('.errMsg').text("The passwords don't match, please try again.").show();
          }
      }
    },
    validLength: function(password){
      if (password.length >= 8){
        return true;
      }else{
        return false;
      }
    },
    includesNumber: function(password){
      if(password.match(/\d/g)){
        return true;
      }else{
        return false;
      }
    },
    includesSymbol: function(password){
      if (password.match(/[\!\@\#\$\%\^\&\*]/g)){
        return true;
      }else{
        return false;
      }
    },
    includesLowercase: function(password){
      if(password.match(/[a-z]/g)){
        return true;
      }else{
        return false;
      }
    },

    includesUppercase: function(password){
      if(password.match(/[A-Z]/g)){
        return true;
      }else{
        return false;
      }
    },

    noIllegal: function(password){
      if(password.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)){
        return false;
      }else{
        return true;
      }
    },
    validateForm: function(){
      if(this.$inputName[0].checkValidity() === true && this.$inputEmail[0].checkValidity() === true && this.$inputPwd.hasClass('valid') && this.$confirmPwd.hasClass('valid')){
        this.enableRegBtn();
      }
    },
    markInputPwd: function(value){
      if(value === 'valid'){
        this.$inputPwd.removeClass('invalid'). addClass('valid');
      }else if(value === 'invalid'){
        this.$inputPwd.removeClass('valid').addClass('invalid');
      }
    },
    renderPwdValidation: function(element,prompt,value){
      if(value === "invalid"){
        element.removeClass('valid').addClass('invalid');
        prompt.removeClass('valid').addClass('invalid');
        prompt.children('check').addClass('hidden');
        prompt.children('arrow').removeClass('hidden');
      }else if(value === "valid"){
        element.removeClass('invalid').addClass('valid');
        prompt.removeClass('invalid').addClass('valid');
        prompt.children('arrow').addClass('hidden');
        prompt.children('check').removeClass('hidden');
      }
    },
    renderValidation: function(field, validation){
      if(validation === 'valid'){
        field.removeClass('invalid').addClass('valid');
      }else{
        field.removeClass('valid').addClass('invalid');
      }
    },
    enableRegBtn: function(){
      this.$regBtn.removeAttr('disabled');
    },

    emailSignup: function(){
      // e.preventDefault();
      firebaseAuth.firebaseData.createUser({
        email: regForm.$inputEmail.val(),
        password: regForm.$inputPwd.val(),
        name: regForm.$inputName.val()
      }, function(err, userData){
        if (err) {
          switch (err.code) {
            case 'EMAIL_TAKEN':
              console.log('The new user account cannot be created because the email is already in use.');
              regForm.$message.find('p').text('There is already an account for this email. Please register with a new email');
              regForm.$message.show();
              break;
            case 'INVALID_EMAIL':
              console.log('The specified email is not a valid email.');
              regForm.$message.find('p').text('The specified email is not a valid email.');
              regForm.$message.show();
              break;
            default:
              console.log('Error creating user:', err);
              regForm.$message.find('p').text('Something went wrong. Please try again');
              regForm.$message.show();
          }
        }else {
          console.log('Successfully created user account with uid:', userData.uid);
          regForm.$message.hide();
          console.log(userData.uid,regForm.$inputName.val(),regForm.$inputEmail.val());
          firebaseAuth.addUser(userData.uid,regForm.$inputName.val(),regForm.$inputEmail.val());
          firebaseAuth.emailLogin(regForm.$inputEmail.val(), regForm.$inputPwd.val());
        }
      });
      return false;
    },

  };//regForm{}

  return regForm;
});//regForm Module
