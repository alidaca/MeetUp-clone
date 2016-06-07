define(['jquery', 'app/googleApi', 'app/firebase-auth'],function($, googleApi,firebaseAuth){

  var currentDate = new Date();
 
  var addEventForm = {

    newEvent: {
      name: '',
      date: '',
      start:'',
      end: '',
      location: '',
      host: '',
      details: '',
      author: '',
      guests:''
    },

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
      this.$eventDate.on('blur change',{field: addEventForm.$eventDate}, this.isEmpty);
      this.$eventLocation.on('blur change',{field: addEventForm.$eventLocation}, this.isEmpty);
      $('input, textarea').on('change keyup',this.validateForm.bind(this));
      this.$continueBtn.on('click', this.saveEvent.bind(this));
    },

    validateDate: function(){
      var inputDate = Date.parse(this.$eventDate.val());
      if(inputDate >= currentDate){
        this.renderValidation(addEventForm.$eventDate, true);
        // addEventForm.$eventDate.set;
        return true;
      }else{
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
        field.removeClass('invalid');
        field.addClass('valid');
      }else{
        field.removeClass('invalid');
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
      newEvent.name = this.$eventName.val();
      newEvent.date = this.$eventDate.val();
      newEvent.start = this.$eventStart.val();
      newEvent.end = this.$eventEnd.val();
      newEvent.location = this.$eventLocation.val();
      newEvent.host = this.$eventLocation.val();
      newEvent.details = this.$eventDetails.val();
      console.log(firebaseAuth);
      newEvent.author = firebaseAuth.user.id;
      console.log(newEvent);
    },
    refreshForm: function(){
      $('input').each(function(){
        $('this').val('');
        // console.log(this);
      });
      this.$eventDate.val('');
      this.$eventStart.val('');
      this.$eventEnd.val('');
    }
  };

  return addEventForm;
});
