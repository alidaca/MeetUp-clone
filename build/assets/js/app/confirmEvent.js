requirejs(['jquery', 'leanModal'],function($, leanModal){

//     requirejs(['/assets/js/app/modal-main.js'],function(modalMain){
//     modalMain.init();
//   });

//   requirejs(['/assets/js/app/modal-reg.js'], function(modalReg){
//     modalReg.init();
//   });

//   requirejs(['/assets/js/app/firebase-auth.js'], function(firebaseAuth){
//     firebaseAuth.init();
//   });

//   require(['/assets/js/app/confirmEventPage.js'], function(confirmEvent){
//   confirmEvent.init();
// });

  requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/modal-main.js'],function(modalMain){
    modalMain.init();
  });

  requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/modal-reg.js'], function(modalReg){
    modalReg.init();
  });

  requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/firebase-auth.js'], function(firebaseAuth){
    firebaseAuth.init();
  });

  require(['https://alidaca.github.io/MeetUp-clone/assets/js/app/confirmEventPage.js'], function(confirmEvent){
  confirmEvent.init();
});


// });