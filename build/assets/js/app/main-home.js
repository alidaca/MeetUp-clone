requirejs(['jquery', 'leanModal'],function($, leanModal){
  $('.modal-trigger').leanModal({overlay: 0.6, closeButton: '.modal-close'});

  requirejs(['app/modal-main'],function(modalMain){
    modalMain.init();
  });

  requirejs(['app/modal-reg'], function(modalReg){
    modalReg.init();
  });

  requirejs(['app/firebase-auth'], function(firebaseAuth){
    firebaseAuth.init();
  });

  // requirejs(['jquery'],function(modalCtrl){});

});