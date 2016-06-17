requirejs(['jquery', 'leanModal'],function($, leanModal){

  requirejs(['app/modal-main'],function(modalMain){
    modalMain.init();
  });

  requirejs(['app/modal-reg'], function(modalReg){
    modalReg.init();
  });

  requirejs(['app/firebase-auth'], function(firebaseAuth){
    firebaseAuth.init();
  });

  requirejs(['app/home-events.js'],function(homeEvents){
    homeEvents.init();
  });

  // requirejs(['jquery'],function(modalCtrl){});

});