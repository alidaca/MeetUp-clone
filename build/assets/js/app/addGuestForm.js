define(['jquery', 'https://alidaca.github.io/MeetUp-clone/assets/js/app/addEventForm.js', 'https://alidaca.github.io/MeetUp-clone/assets/js/app/firebase-event.js'],function($, addEventForm, firebaseEvent){

  var list = [];
  var addGuestForm = {
    init: function(){
      console.log(addEventForm.newEvent);
      this.cacheDom();
      this.bindEvents();
      console.log(this.$addBtn);
      console.log(this.$addGuests);
    },
    cacheDom: function(){
      this.$addGuests = $('.container-addGuests');
      this.$emailInput = this.$addGuests.find('#guests');
      this.$addBtn = this.$addGuests.find('#addBtn');
      this.$guestList = this.$addGuests.find('#guestList');
      this.$continueBtn = this.$addGuests.find('#continue');
    },
    bindEvents: function(){
      this.$addBtn.on('click', this.parseList.bind(this));
      this.$continueBtn.on('click', {field: list}, this.addToList.bind(this));
    },
    parseList: function(){
      console.log('parselist fired');
      console.log(this.$emailInput.val());
      if (this.$emailInput.val() !== ''){
        var tempArray = this.$emailInput.val().replace(/ /g,'').split(',');
        console.log('tempArray='+tempArray);
        this.addToDisplayed(tempArray);
      }
    },
    addToDisplayed: function(array){
      for(var i=0; i<array.length; i++){
        list.push(array[i]);
        var newAddress = '<li>'+ array[i] +'</li>';
        this.$guestList.append(newAddress);
        this.$continueBtn.removeAttr('disabled');
      }
      this.$emailInput.val('');
    },
    addToList: function(event){
      var array = event.data.field;
      for(var i=0; i<array.length; i++){
        firebaseEvent.newEvent.guests = array;
      }
      firebaseEvent.updateEvent(firebaseEvent.goTo('confirmEvent.html'));
      console.log(firebaseEvent.newEvent);
    }
  };

  return addGuestForm;
});