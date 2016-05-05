//REGISTRATION FORM
define(['jquery'], function($){
  var regForm = {
    init: function(){
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function(){
      this.$signup = $('.signup-form');
      //inputs for signup-form
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
    },
    validatePwd: function(){
      // console.log('validatePwd fired');
      var password = this.$inputPwd.val();
      console.log(password);
      
      if(!this.validLength(password)){
        this.renderPwdValidation(this.$inputPwd,this.$promptLength,'invalid');
        console.log('password is invalid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptLength +' '+'invalid');
      }else{
        this.renderPwdValidation(this.$inputPwd,this.$promptLength, 'valid');
        console.log('password is valid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptLength +' '+'invalid');
      }

      if(!this.includesNumber(password)){
        this.renderPwdValidation(this.$inputPwd,this.$promptNumber,'invalid');
        console.log('password is invalid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptNumber +' '+'invalid');
      }else{
        this.renderPwdValidation(this.$inputPwd,this.$promptNumber, 'valid');
        console.log('password is valid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptNumber +' '+'invalid');
      }

      if(!this.includesSymbol(password) || !this.noIllegal(password)){
        this.renderPwdValidation(this.$inputPwd,this.$promptSymbol,'invalid');
        console.log('password is invalid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptSymbol +' '+'invalid');
      }else{
        this.renderPwdValidation(this.$inputPwd,this.$promptSymbol, 'valid');
        console.log('password is valid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptSymbol +' '+'invalid');
      }

      if(!this.includesLowercase(password)){
        this.renderPwdValidation(this.$inputPwd,this.$promptLowercase,'invalid');
        console.log('password is invalid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptLowercase +' '+'invalid');
      }else{
        this.renderPwdValidation(this.$inputPwd,this.$promptLowercase, 'valid');
        console.log('password is valid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptLowercase +' '+'invalid');
      }

      if(!this.includesUppercase(password)){
        this.renderPwdValidation(this.$inputPwd,this.$promptUppercase,'invalid');
        console.log('password is invalid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptUppercase +' '+'invalid');
      }else{
        this.renderPwdValidation(this.$inputPwd,this.$promptUppercase, 'valid');
        console.log('password is valid');
        console.log('renderPwdValidation params are: '+ this.$inputPwd +' '+ this.$promptUppercase +' '+'invalid');
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
      console.log('checking symbols');
      if (password.match(/[\!\@\#\$\%\^\&\*]/g)){
        return true;
      }else{
        return false;
      }
    },
    includesLowercase: function(password){
      console.log('checking lowercase');
      if(password.match(/[a-z]/g)){
        return true;
      }else{
        return false;
      }
    },

    includesUppercase: function(password){
      console.log('checking uppercase');
      if(password.match(/[A-Z]/g)){
        return true;
      }else{
        return false;
      }
    },

    noIllegal: function(password){
      console.log('checking illegal chars');
      if(password.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)){
        return false;
      }else{
        return true;
      }
    },
    validateForm: function(){
      console.log(this.$inputName[0].checkValidity());
      console.log(this.$inputEmail[0].checkValidity());
      console.log(this.$inputPwd.hasClass('valid'));
      console.log(this.$confirmPwd.hasClass('valid'));
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
      console.log('renderPwdValidation fired');
      console.log('params are: '+ element + ' '+ prompt +' '+ value);
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
    }

  };//regForm{}

  return regForm;
});//regForm Module
