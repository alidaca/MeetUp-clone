// define(['jquery', 'app/modal-main.js'], function($,modalMain){
define(['jquery'], function($){

  var modalCtrl = { 
    closeModal: function(modalId){
      $('#lean_overlay').fadeOut(200);
      $(modalId).css({ 'display': 'none' });
      // modalMain.showMainLogin();
    }
  };

  return modalCtrl;
});