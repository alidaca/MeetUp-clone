requirejs(['jquery', 'leanModal'],function($, leanModal){

  requirejs(['https://alidaca.github.io/MeetUp-clone/app/modal-main'],function(modalMain){
    modalMain.init();
  });

  requirejs(['https://alidaca.github.io/MeetUp-clone/app/modal-reg'], function(modalReg){
    modalReg.init();
  });

  requirejs(['https://alidaca.github.io/MeetUp-clone/app/firebase-auth'], function(firebaseAuth){
    firebaseAuth.init();
  });

  require(['https://alidaca.github.io/MeetUp-clone/app/confirmEventPage'], function(confirmEvent){
  confirmEvent.init();
});

  // requirejs(['jquery'],function(modalCtrl){});

});