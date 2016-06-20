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

  require(['googlemaps','https://alidaca.github.io/MeetUp-clone/app/addEventForm'],function(GoogleMapsLoader,addEventForm){
    GoogleMapsLoader.done(function(){
      addEventForm.init();
    }).fail(function(){
      console.error("ERROR: Google maps library failed to load");
    });
  });

  // requirejs(['jquery'],function(modalCtrl){});

});