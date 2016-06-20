requirejs(['jquery', 'leanModal'],function($, leanModal){

  requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/modal-main.js'],function(modalMain){
    modalMain.init();
  });

  requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/modal-reg.js'], function(modalReg){
    modalReg.init();
  });

  requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/firebase-auth.js'], function(firebaseAuth){
    firebaseAuth.init();
  });

  requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/home-events.js'],function(homeEvents){
    homeEvents.init();
  });

  // requirejs(['jquery'],function(modalCtrl){});

});