requirejs(['jquery', 'leanModal'],function($, leanModal){

  requirejs(['/assets/js/app/modal-main.js'],function(modalMain){
    modalMain.init();
  });

  requirejs(['/assets/js/app/modal-reg.js'], function(modalReg){
    modalReg.init();
  });

  requirejs(['/assets/js/app/firebase-auth.js'], function(firebaseAuth){
    firebaseAuth.init();
  });

  require(['googlemaps','/assets/js/app/addEventForm.js'],function(GoogleMapsLoader,addEventForm){
    GoogleMapsLoader.done(function(){
      addEventForm.init();
    }).fail(function(){
      console.error("ERROR: Google maps library failed to load");
    });
  });

  // requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/modal-main.js'],function(modalMain){
  //   modalMain.init();
  // });

  // requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/modal-reg.js'], function(modalReg){
  //   modalReg.init();
  // });

  // requirejs(['https://alidaca.github.io/MeetUp-clone/assets/js/app/firebase-auth.js'], function(firebaseAuth){
  //   firebaseAuth.init();
  // });

  // require(['googlemaps','https://alidaca.github.io/MeetUp-clone/assets/js/app/addEventForm.js'],function(GoogleMapsLoader,addEventForm){
  //   GoogleMapsLoader.done(function(){
  //     addEventForm.init();
  //   }).fail(function(){
  //     console.error("ERROR: Google maps library failed to load");
  //   });
  // });

});