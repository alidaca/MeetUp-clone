define(['jquery', 'app/googleApi', 'app/firebase-auth','app/firebase-event'],function($, googleApi,firebaseAuth, firebaseEvent){

  var currentDate = Date.now();
 
  var addEventForm = {

    // newEvent: {
    //   name: '',
    //   date: '',
    //   start:'',
    //   end: '',
    //   location: '',
    //   host: '',
    //   details: '',
    //   author: '',
    //   guests:[]
    // },

    init: function(){
      this.cacheDom();
      googleApi.init();
      this.bindEvents();
      this.refreshForm();
    },

    cacheDom: function(){
      this.$eventForm = $('#eventForm');
      this.$eventName = this.$eventForm.find('#eventType');
      this.$eventDate = this.$eventForm.find('#eventDate');
      this.$eventStart = this.$eventForm.find('#eventStart');
      this.$eventEnd = this.$eventForm.find('#eventEnd');
      this.$eventLocation = this.$eventForm.find('#eventLocation');
      this.$eventHost = this.$eventForm.find('#hostName');
      this.$eventDetails = this.$eventForm.find('#eventDetails');
      this.$continueBtn = $('#continueBtn');
    },

    bindEvents: function(){
      // this.$eventName.on('keyup blur');
      this.$eventDate.on('change', this.validateDate.bind(this));
      this.$eventEnd.on('keyup click', this.validateTime.bind(this));
      this.$eventName.on('blur change', {field: addEventForm.$eventName}, this.isEmpty);
      // this.$eventDate.on('change',{field: addEventForm.$eventDate}, this.isEmpty);
      this.$eventLocation.on('blur change',{field: addEventForm.$eventLocation}, this.isEmpty);
      $('input, textarea').on('change keyup',this.validateForm.bind(this));
      this.$continueBtn.on('click', this.saveEvent.bind(this));
    },

    validateDate: function(){
      var inputDate = Date.parse(this.$eventDate.val());
      console.log(currentDate);
      console.log(inputDate);
      console.log(inputDate >= currentDate);
      if(inputDate >= currentDate){
        console.log('condition is true');
        this.renderValidation(addEventForm.$eventDate, true);
        return true;
      }else{
        console.log('condition is false');
        this.renderValidation(addEventForm.$eventDate, false);
        return false;
      }
    },

    validateEventName: function(){
      if(this.$eventName.val()){
        this.renderValidation(addEventForm.$eventName, true);
        return true;
      }else{
        this.renderValidation(addEventForm.$eventName, false);
        return false;
      }
    },
    validateTime: function(){
      if(this.$eventStart.val()){
        if(this.$eventEnd.val()>this.$eventStart.val()){
          this.renderValidation(this.$eventEnd, true);
          return true;
        }else{
          this.renderValidation(this.$eventEnd, false);
          return false;
        }
      }
    },
    renderValidation: function(field, value){
      if(value === true){
        console.log('added valid');
        field.removeClass('invalid');
        field.addClass('valid');
      }else{
        console.log('added invalid');
        field.removeClass('valid');
        field.addClass('invalid');
      }
    },
    isEmpty: function(event){
      var inputField = event.data.field;
      if(inputField.val() === ''){
        addEventForm.renderValidation(inputField, false);
      }else{
        addEventForm.renderValidation(inputField, true);
      }
    },
    validateForm: function(){
      // console.log('validateForm fired');
      // console.log('eventName is:'+ this.$eventName.hasClass('valid'));
      // console.log('eventDate is:' + this.$eventDate.hasClass('valid'));
      // console.log('eventStart is:' + this.$eventStart[0].checkValidity());
      // console.log('eventLocation is: '+ this.$eventLocation.hasClass('valid'));
      // console.log('eventEnd is: '+ this.$eventEnd.hasClass('valid'));
      if(this.$eventName.hasClass('valid') && this.$eventDate.hasClass('valid') && this.$eventStart[0].checkValidity() && this.$eventLocation.hasClass('valid') && this.$eventEnd.hasClass('valid')){
        this.$continueBtn.removeAttr('disabled');
      }
    },
    saveEvent:function(){
      // this.newEvent.name = this.$eventName.val();
      // this.newEvent.date = this.$eventDate.val();
      // this.newEvent.start = this.$eventStart.val();
      // this.newEvent.end = this.$eventEnd.val();
      // this.newEvent.location = this.$eventLocation.val();
      // this.newEvent.host = this.$eventLocation.val();
      // this.newEvent.details = this.$eventDetails.val();
      firebaseEvent.newEvent.name = this.$eventName.val();
      firebaseEvent.newEvent.date = this.$eventDate.val();
      firebaseEvent.newEvent.start = this.$eventStart.val();
      firebaseEvent.newEvent.end = this.$eventEnd.val();
      firebaseEvent.newEvent.location = this.$eventLocation.val();
      firebaseEvent.newEvent.host = this.$eventLocation.val();
      firebaseEvent.newEvent.details = this.$eventDetails.val();
      console.log(firebaseAuth);
      firebaseEvent.newEvent.author = firebaseAuth.user.id;
      console.log(firebaseEvent.newEvent);
      // this.cacheandContinue();
      firebaseEvent.createEvent(this.goTo('addGuests.html'));
      // firebaseEvent.updateEvent(firebaseEvent.newEvent, this.cacheAndContinue);
    },
    refreshForm: function(){
      $('input').each(function(){
        $('this').val('');
        // console.log(this);
      });
      this.$eventDate.val('');
      this.$eventStart.val('');
      this.$eventEnd.val('');
    },
    goTo: function(page){
      window.open(page, '_self');
    }
  };

  return addEventForm;
});
