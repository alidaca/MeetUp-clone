//INDEX

$('.modal-trigger').leanModal({overlay: 0.6, closeButton: '.modal-close'});


//MODAL MAIN LOGIN
(function(){

  var mainLogin = {
    init: function(){
      this.cacheDom();
      this.bindEvents();
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
      //buttons
      this.$loginBtn = this.$el.find('#modal-btn-login');
      this.$signupBtn = this.$el.find('#modal-btn-signUp');
      this.$backBtn = this.$el.find('.modal-btn-back');
      this.$closeBtn = this.$el.find('.modal-close');
    },

    bindEvents: function(){
      this.$loginBtn.on('click', this.showEmailLogin.bind(this));
      this.$signupBtn.on('click', this.showSignupForm.bind(this));
      this.$backBtn.on('click', this.showMainLogin.bind(this));
      this.$closeBtn.on('click', this.showMainLogin.bind(this));
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

  }; //mainLogin{}

  mainLogin.init();

})();//modal main login

//REGISTRATION FORM
(function(){
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
      //password instructions
      this.$promptLength = this.$signup.find('#pwd-length');
      this.$promptSymbol = this.$signup.find('#pwd-symbol');
      this.$promptNumber = this.$signup.find('#pwd-number');
      this.$promptLowercase = this.$signup.find('#pwd-lowercase');
      this.$promptUppercase = this.$signup.find('#pwd-uppercase');
    },
    bindEvents: function(){
      this.$inputPwd.on('keyup blur',this.$inputPwd,this.validatePwd.bind(this));
    },
    validatePwd: function(){
      // console.log('validatePwd fired');
      var password = this.$inputPwd.val();
      console.log(password);
      
      if(!this.validLength(password)){
        this.renderValidation(this.$inputPwd,this.$promptLength,'invalid');
        console.log('password is invalid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptLength +' '+'invalid');
      }else{
        this.renderValidation(this.$inputPwd,this.$promptLength, 'valid');
        console.log('password is valid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptLength +' '+'invalid');
      }

      if(!this.includesNumber(password)){
        this.renderValidation(this.$inputPwd,this.$promptNumber,'invalid');
        console.log('password is invalid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptNumber +' '+'invalid');
      }else{
        this.renderValidation(this.$inputPwd,this.$promptNumber, 'valid');
        console.log('password is valid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptNumber +' '+'invalid');
      }

      if(!this.includesSymbol(password) || !this.noIllegal(password)){
        this.renderValidation(this.$inputPwd,this.$promptSymbol,'invalid');
        console.log('password is invalid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptSymbol +' '+'invalid');
      }else{
        this.renderValidation(this.$inputPwd,this.$promptSymbol, 'valid');
        console.log('password is valid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptSymbol +' '+'invalid');
      }

      if(!this.includesLowercase(password)){
        this.renderValidation(this.$inputPwd,this.$promptLowercase,'invalid');
        console.log('password is invalid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptLowercase +' '+'invalid');
      }else{
        this.renderValidation(this.$inputPwd,this.$promptLowercase, 'valid');
        console.log('password is valid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptLowercase +' '+'invalid');
      }

      if(!this.includesUppercase(password)){
        this.renderValidation(this.$inputPwd,this.$promptUppercase,'invalid');
        console.log('password is invalid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptUppercase +' '+'invalid');
      }else{
        this.renderValidation(this.$inputPwd,this.$promptUppercase, 'valid');
        console.log('password is valid');
        console.log('renderValidation params are: '+ this.$inputPwd +' '+ this.$promptUppercase +' '+'invalid');
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
    renderValidation: function(element,prompt,value){
      console.log('renderValidation fired');
      console.log('params are: '+ element + ' '+ prompt +' '+ value);
      if(value === "invalid"){
        element.removeClass('valid');
        element.addClass('invalid');
        prompt.removeClass('valid');
        prompt.addClass('invalid');
        prompt.children('check').addClass('hidden');
        prompt.children('arrow').removeClass('hidden');
      }else if(value === "valid"){
        element.removeClass('invalid');
        element.addClass('valid');
        prompt.removeClass('invalid');
        prompt.addClass('valid')
        prompt.children('arrow').addClass('hidden');
        prompt.children('check').removeClass('hidden');
      }
    }

  }//regForm{}

  regForm.init();
})();//regForm Module





// password Confirmation
// $('#confirm-pwd').on('keyup',function(){
//   var firstPwd = $('#pwd-reg').val();
//   var secondPwd = $('#confirm-pwd').val();
//   // console.log(firstPwd);
//   // console.log(secondPwd);
//   // console.log(firstPwd===secondPwd);
//   if (firstPwd !== undefined && firstPwd !== secondPwd){
//     $('#confirm-pwd').addClass('invalid');
//   }else{
//     $('#confirm-pwd').removeClass('invalid');
//     $('#confirm-pwd').addClass('valid');    
//   }
// });

//  //Overall form validation
//   $('input').change(function(){
//     // console.log('onchange function fired')
//     // console.log('#name is valid: ' + $('#name')[0].checkValidity());
//     // console.log('#email-reg is valid: ' + $('#email-reg')[0].checkValidity());
//     // console.log('#pwd-reg is valid: ' + $('#pwd-reg').hasClass('valid'));
//     // console.log('#confirm-pwd is valid: ' + $('#confirm-pwd').hasClass('valid'));
//     if($('#name')[0].checkValidity() === true && $('#email-reg')[0].checkValidity() === true && $('#pwd-reg').hasClass('valid') && $('#confirm-pwd').hasClass('valid')){
//       $('#modal-btn-register').removeAttr('disabled');
//     }
//   });//input.onChange


