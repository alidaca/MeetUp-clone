define(['jquery', 'app/googleApi'],function($, googleApi){

  var currentDate = new Date();
  var addEventForm = {

    init: function(){
      this.cacheDom();
      googleApi.init();
      this.bindEvents();
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
      this.$continueBtn = this.$eventForm.find('#continueBtn');
    },

    bindEvents: function(){
      this.$eventName.on('keyup blur');
      this.$eventDate.on('keyup blur click', this.validateDate.bind(this));
      this.$eventEnd.on('change', this.validateTime.bind(this));
    },

    validateDate: function(){
      var inputDate = Date.parse(this.$eventDate.val());
      console.log(inputDate);
      if(inputDate >= currentDate){
        console.log('dateis future');
        this.renderValidation(addEventForm.$eventDate, true);
        return true;
      }else{
        console.log('dateis past')
        this.renderValidation(addEventForm.$eventDate, false);
        return false;
      }
    },

    validateEventName: function(){
      if(this.$eventName.val()){
        this.renderValidation(addEventForm.$eventName, true);
      }else{
        this.renderValidation(addEventForm.$eventName, false);
      }
    },
    validateTime: function(){
      console.log('validateTime fired');
      if(this.$eventEnd.val()>this.$eventStart.val()){
        this.renderValidation(this.$eventEnd, true);
      }else{
        this.renderValidation(this.$eventEnd, false);
      };
    },
    renderValidation: function(field, value){
      if(value === true){
        console.log('date is valid');
        field.removeClass('invalid');
        field.addClass('valid');
      }else{
        console.log('dateis invalid');
        field.removeClass('invalid');
        field.addClass('invalid');
      }
    }
  };

  return addEventForm;
});
