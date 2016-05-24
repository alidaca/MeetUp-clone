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

  require(['googlemaps','app/addEventForm'],function(GoogleMapsLoader,addEventForm){
    GoogleMapsLoader.done(function(){
      addEventForm.init();
    }).fail(function(){
      console.error("ERROR: Google maps library failed to load");
    });
  });


  // requirejs(['jquery'],function(modalCtrl){});

});