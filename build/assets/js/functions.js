$(document).ready(function() {

  // Get started!

});


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
//visual validation if password is valid
$('#pwd-reg').on('keyup',function(){
  var password = $('#pwd-reg').val();
  if(!passwordLength(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-length').addClass('invalid');
  }else{
    $('#pwd-length').removeClass('invalid');
    $('#pwd-reg').removeClass('invalid');
    $('#pwd-length-arrow').addClass('hidden');
    $('#pwd-length-check').removeClass('hidden');
  }
  if(!includesSymbol(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-symbol').addClass('invalid');
  }else{
    $('#pwd-symbol').removeClass('invalid');
    $('#pwd-reg').removeClass('invalid');
    $('#pwd-symbol-arrow').addClass('hidden');
    $('#pwd-symbol-check').removeClass('hidden');
  }
  if(!includesNumber(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-number').addClass('invalid');
  }else{
    $('#pwd-number').removeClass('invalid');
    $('#pwd-reg').removeClass('invalid');
    $('#pwd-number-arrow').addClass('hidden');
    $('#pwd-number-check').removeClass('hidden');
  }
  if(!includesLowercase(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-lowercase').addClass('invalid');
  }else{
    $('#pwd-lowercase').removeClass('invalid');
    $('#pwd-reg').removeClass('invalid');
    $('#pwd-lowercase-arrow').addClass('hidden');
    $('#pwd-lowercase-check').removeClass('hidden');
  }
  if(!includesUppercase(password)){
    $('#pwd-reg').addClass('invalid');
    $('#pwd-uppercase').addClass('invalid');
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
  console.log(firstPwd);
  console.log(secondPwd);
  console.log(firstPwd===secondPwd);
  if (firstPwd !== secondPwd){
    $('#confirm-pwd').addClass('invalid');
  }else{
    $('#confirm-pwd').removeClass('invalid');
  }
});

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