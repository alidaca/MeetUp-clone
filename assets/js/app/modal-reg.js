//REGISTRATION FORM
define(['jquery', 'https://alidaca.github.io/MeetUp-clone/app/firebase-auth'], function($,firebaseAuth){
  var regForm = {
    init: function(){
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function(){
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
      //validates password while user types
      this.$inputPwd.on('keyup blur',this.$inputPwd,this.validatePwd.bind(this));
      //validates confirmation password while user types
      this.$confirmPwd.on('keyup',this.matchPwd.bind(this));
      //validates entire form and enables registration when valid
      this.$input.on('keyup', this.validateForm.bind(this));
      this.$regBtn.on('click', this.emailSignup.bind(this));
    },
    validatePwd: function(){
      // console.log('validatePwd fired');
      var password = this.$inputPwd.val();
      
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
      }else{
        this.markInputPwd('invalid');
      }

    },
    matchPwd: function(){
      if(this.$inputPwd.val() !== undefined && this.$inputPwd.val() === this.$confirmPwd.val()){
        this.renderConfirmPwdValidation('valid');
      }else{
        this.renderConfirmPwdValidation('invalid');
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
    renderConfirmPwdValidation: function(validation){
      if(validation === 'valid'){
        this.$confirmPwd.removeClass('invalid').addClass('valid');
      }else{
        this.$confirmPwd.removeClass('valid').addClass('invalid');
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
              break;
            case 'INVALID_EMAIL':
              console.log('The specified email is not a valid email.');
              break;
            default:
              console.log('Error creating user:', err);
          }
        }else {
          console.log('Successfully created user account with uid:', userData.uid);
          console.log(userData.uid,regForm.$inputName.val(),regForm.$inputEmail.val());
          firebaseAuth.addUser(userData.uid,regForm.$inputName.val(),regForm.$inputEmail.val(),'password', firebaseAuth.emailLogin(regForm.$inputEmail.val(), regForm.$inputPwd.val() ));
        }
      });
      return false;
    },

  };//regForm{}

  return regForm;
});//regForm Module
