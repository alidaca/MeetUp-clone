$(document).ready(function() {

 
}); //document.ready


//functions for modal login
$('#modal-btn-login').on('click', function(){
  $('.main-login').hide();
  $('.email-login').show();
  $('.modal-title').text('Login with your email');
});

$('#modal-btn-signUp').on('click', function(){
  $('.main-login').hide();
  $('.signup-form').show();
  $('.modal-title').text('Register');
});

$('.modal-btn-back').on('click', function(){
  $('.email-login').hide();
  $('.signup-form').hide();
  $('.main-login').show();
  $('.modal-title').text('Login to create an event');
});

$('.modal-trigger').leanModal({overlay: 0.6, closeButton: '.modal-close'});

//password validation
$('#pwd-reg').on('keyup',function(){
  var password = $('#pwd-reg').val();
  if(passwordLength(password) === true && includesSymbol(password) === true && includesNumber(password) === true && includesLowercase(password) === true && includesUppercase(password) === true && includesIllegal(password) === false){
    $('#pwd-reg').addClass('valid');
  }
});

//visual validation for password
$('#pwd-reg').on('keyup blur',function(){
  var password = $('#pwd-reg').val();
  if(!passwordLength(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-length').addClass('invalid');
    $('#pwd-length-arrow').removeClass('hidden');
    $('#pwd-length-check').addClass('hidden');
  }else{
    $('#pwd-length').removeClass('invalid');
    $('#pwd-reg').removeClass('invalid');
    $('#pwd-length-arrow').addClass('hidden');
    $('#pwd-length-check').removeClass('hidden');
  }
  if(!includesSymbol(password) && includesIllegal(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-symbol').addClass('invalid');
    $('#pwd-symbol-arrow').removeClass('hidden');
    $('#pwd-symbol-check').addClass('hidden');
  }else{
    $('#pwd-symbol').removeClass('invalid');
    $('#pwd-reg').removeClass('invalid');
    $('#pwd-symbol-arrow').addClass('hidden');
    $('#pwd-symbol-check').removeClass('hidden');
  }
  if(!includesNumber(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-number').addClass('invalid');
    $('#pwd-number-arrow').removeClass('hidden');
    $('#pwd-number-check').addClass('hidden');
  }else{
    $('#pwd-number').removeClass('invalid');
    $('#pwd-reg').removeClass('invalid');
    $('#pwd-number-arrow').addClass('hidden');
    $('#pwd-number-check').removeClass('hidden');
  }
  if(!includesLowercase(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-lowercase').addClass('invalid');
    $('#pwd-lowercase-arrow').removeClass('hidden');
    $('#pwd-lowercase-check').addClass('hidden');
  }else{
    $('#pwd-lowercase').removeClass('invalid');
    $('#pwd-reg').removeClass('invalid');
    $('#pwd-lowercase-arrow').addClass('hidden');
    $('#pwd-lowercase-check').removeClass('hidden');
  }
  if(!includesUppercase(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-uppercase').addClass('invalid');
    $('#pwd-uppercase-arrow').removeClass('hidden');
    $('#pwd-uppercase-check').addClass('hidden');
  }else{
    $('#pwd-uppercase').removeClass('invalid');
    $('#pwd-reg').removeClass('invalid');
    $('#pwd-uppercase-arrow').addClass('hidden');
    $('#pwd-uppercase-check').removeClass('hidden');
  }
});



//check if password is confirmed correctly
$('#confirm-pwd').on('keyup',function(){
  var firstPwd = $('#pwd-reg').val();
  var secondPwd = $('#confirm-pwd').val();
  // console.log(firstPwd);
  // console.log(secondPwd);
  // console.log(firstPwd===secondPwd);
  if (firstPwd !== undefined && firstPwd !== secondPwd){
    $('#confirm-pwd').addClass('invalid');
  }else{
    $('#confirm-pwd').removeClass('invalid');
    $('#confirm-pwd').addClass('valid');    
  }
});

 //registration form validation
  $('input').change(function(){
    // console.log('onchange function fired')
    // console.log('#name is valid: ' + $('#name')[0].checkValidity());
    // console.log('#email-reg is valid: ' + $('#email-reg')[0].checkValidity());
    // console.log('#pwd-reg is valid: ' + $('#pwd-reg').hasClass('valid'));
    // console.log('#confirm-pwd is valid: ' + $('#confirm-pwd').hasClass('valid'));
    if($('#name')[0].checkValidity() === true && $('#email-reg')[0].checkValidity() === true && $('#pwd-reg').hasClass('valid') && $('#confirm-pwd').hasClass('valid')){
      $('#modal-btn-register').removeAttr('disabled');
    }
  });//input.onChange


function passwordLength(password){
  var psw = password;
  if (psw.length >= 8){
    return true;
  }else{
    return false;
  }
}

function includesSymbol(password){
  var psw = password;
  if (psw.match(/[\!\@\#\$\%\^\&\*]/g)){
    return true;
  }else{
    return false;
  }
}

function includesNumber(password){
  var psw = password;
  if(psw.match(/\d/g)){
    return true;
  }else{
    return false;
  }
}

function includesLowercase(password){
  var psw = password;
  if(psw.match(/[a-z]/g)){
    return true;
  }else{
    return false;
  }
}

function includesUppercase(password){
  var psw = password;
  if(psw.match(/[A-Z]/g)){
    return true;
  }else{
    return false;
  }
}

function includesIllegal(password){
  var psw = password;
  if(psw.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)){
    return true;
  }else{
    return false;
  }
}