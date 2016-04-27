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