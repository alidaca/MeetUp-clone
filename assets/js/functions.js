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