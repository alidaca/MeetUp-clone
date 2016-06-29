define(['jquery'], function($){

  var modalCtrl = { 
    // init: function(){
    //   this.bindEvents();
    // },
    // bindEvents: function(){
    //   $('modal-trigger').on('click', this.hideMsg.bind(this));
    // },
    closeModal: function(modalId){
      console.log('closeModal fired');
      this.hideMsg();
      $('#lean_overlay').fadeOut(200);
      $(modalId).css({ 'display': 'none' });
      modalMain.showMainLogin();

    },
    hideMsg: function(){
      console.log('hideMsg fired');
      $('#message').hide();
    }
  };

  return modalCtrl;
});