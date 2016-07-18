define(['jquery', 'https://alidaca.github.io/MeetUp-clone/assets/js/app/addEventForm.js', 'https://alidaca.github.io/MeetUp-clone/assets/js/app/firebase-event.js'],function($, addEventForm, firebaseEvent){

// define(['jquery', '/assets/js/app/addEventForm.js', '/assets/js/app/firebase-event.js'],function($, addEventForm, firebaseEvent){

  var list = [];
  var validEmails = [];
  var invalidEmails = [];
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
      this.$emailInput.on('blur change keyup', this.validateInput.bind(this));
      this.$addBtn.on('click', this.parseList.bind(this));
      this.$continueBtn.on('click', {field: list}, this.addToList.bind(this));
    },
    validateInput: function(){
      console.log('validateInput fired');
      console.log(list.length === 0 && this.$emailInput.val() === '');
      if(list.length === 0 && this.$emailInput.val() === ''){
        this.$emailInput.addClass('invalid');
        this.$emailInput.removeClass('valid');
        this.$emailInput.parent().find('.errMsg').show();
        return false;
      }else{
        this.$emailInput.addClass('valid');
        this.$emailInput.removeClass('invalid');
        this.$emailInput.parent().find('.errMsg').hide();
        return true;
      }
    },
    parseList: function(){
      if(this.validateInput){
        console.log('parselist fired');
        console.log(this.$emailInput.val());
        if (this.$emailInput.val() !== ''){ 
          var tempArray = this.$emailInput.val().replace(/ /g,'').split(',');
          tempArray.forEach(this.validateEmails);
          console.log('tempArray= '+ tempArray);
          console.log('validEmails= '+ validEmails);
          console.log('invalidEmails= '+invalidEmails);
          this.addToDisplayed(validEmails);
        }
      }
    },
    validateEmails: function(element){
       var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          if(re.test(element)){
            validEmails.push(element);
          }else{
            invalidEmails.push(element);
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
      if(invalidEmails.length !== 0){
        console.log('invalidEmails: '+invalidEmails);
        console.log('found invalid addresses');
        this.$emailInput.parent().find('.errMsg').text('The following addresses are invalid and were not added: '+invalidEmails.join()).show();
      }else{
        console.log('invalidEmails: '+invalidEmails);
        console.log('no invalid addresses');
        this.$emailInput.parent().find('.errMsg').hide();
      }
      validEmails = [];
      invalidEmails = [];
    },
    addToList: function(event){
      if(this.$emailInput.hasClass('valid')){
        var array = event.data.field;
        for(var i=0; i<array.length; i++){
          firebaseEvent.newEvent.guests = array;
        }
        firebaseEvent.updateEvent(firebaseEvent.goTo('confirmEvent.html'));
        console.log(firebaseEvent.newEvent);
      }
      }
      
  };

  return addGuestForm;
});