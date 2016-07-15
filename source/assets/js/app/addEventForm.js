define(['jquery', 'https://alidaca.github.io/MeetUp-clone/assets/js/app/googleApi.js', 'https://alidaca.github.io/MeetUp-clone/assets/js/app/firebase-auth.js','https://alidaca.github.io/MeetUp-clone/assets/js/app/firebase-event.js'],function($, googleApi,firebaseAuth, firebaseEvent){

// define(['jquery', '/assets/js/app/googleApi.js', '/assets/js/app/firebase-auth.js','/assets/js/app/firebase-event.js'],function($, googleApi,firebaseAuth, firebaseEvent){

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
      this.$eventType = this.$eventForm.find('#eventType');
      this.$eventName = this.$eventForm.find('#eventName');
      // this.$eventDate = this.$eventForm.find('#eventDate');
      this.$eventStart = this.$eventForm.find('#eventStart');
      // this.$eventDateEnd = this.$eventForm.find('#eventDateEnd');
      this.$eventEnd = this.$eventForm.find('#eventEnd');
      this.$eventLocation = this.$eventForm.find('#eventLocation');
      this.$eventHost = this.$eventForm.find('#hostName');
      this.$eventDetails = this.$eventForm.find('#eventDetails');
      this.$continueBtn = $('#continueBtn');
    },

    bindEvents: function(){
      this.$eventType.on('blur change keyup', {field: addEventForm.$eventType}, this.isEmpty);
      this.$eventName.on('blur change keyup', {field: addEventForm.$eventName}, this.isEmpty);
      this.$eventStart.on('change blur', this.validateStart.bind(this));
      this.$eventEnd.on('keyup blur', this.validateEnd.bind(this));
      this.$eventLocation.on('blur change',{field: addEventForm.$eventLocation}, this.isEmpty);
      this.$eventHost.on('blur change keyup', {field: addEventForm.$eventHost}, this.isEmpty);
      $('input, textarea').on('change keyup',this.validateForm.bind(this));
      this.$continueBtn.on('click', this.saveEvent.bind(this));
    },

    validateStart: function(){
      console.log('validateDateStart fired');
      console.log(this.$eventStart.val());
      var inputDate = Date.parse(this.$eventStart.val());
      console.log('currentDate: ' + currentDate);
      console.log('inpuDate: ' + inputDate);
      console.log('dateStart condition is: ' + inputDate > currentDate);
      switch(isNaN(inputDate)){
        case true:
          console.log('eventStart is empty');
          addEventForm.renderValidation(addEventForm.$eventStart, false);
          this.$eventStart.parent().find('.errMsg').text('Please, provide a start date and time').show();
          break;
        default:
          console.log('Date condition is:' + inputDate > currentDate);
          if(inputDate > currentDate){
            addEventForm.renderValidation(addEventForm.$eventStart, true);
            this.$eventStart.parent().find('.errMsg').hide();
            return true;
          }else{
            addEventForm.renderValidation(addEventForm.$eventStart, false);
            this.$eventStart.parent().find('.errMsg').text('Your event must start after today').show();
            return false;
          }
          break;
      }
    },

    validateEnd: function(){
      var inputDateStart = Date.parse(this.$eventStart.val());
      var inputDateEnd = Date.parse(this.$eventEnd.val());
      console.log(inputDateEnd);
      switch(isNaN(inputDateEnd)){
        case true:
          this.renderValidation(addEventForm.$eventEnd, false);
          this.$eventEnd.parent().find('.errMsg').text('Please, provide an end date').show();
          break;
        default:
          if(inputDateEnd >= inputDateStart){
            this.renderValidation(addEventForm.$eventEnd, true);
            this.$eventEnd.parent().find('.errMsg').hide();
          }else{
            this.renderValidation(addEventForm.$eventEnd, false);
            this.$eventEnd.parent().find('.errMsg').text('Your event must end after the start date and time');
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
        inputField.parent().find('.errMsg').show();
        // console.log(inputField.parent().find('.errMsg'));
      }else{
        addEventForm.renderValidation(inputField, true);
        inputField.parent().find('.errMsg').hide();
        console.log(inputField.val());
      }
    },
    validateForm: function(){
      if(this.$eventType.hasClass('valid') && 
        this.$eventName.hasClass('valid')&&
        // this.$eventDate.hasClass('valid') && 
        // this.$eventDateEnd.hasClass('valid')&&
        this.$eventStart.hasClass('valid') && 
        this.$eventEnd.hasClass('valid')&&
        this.$eventLocation.hasClass('valid') && 
        this.$eventHost.hasClass('valid')){
          this.$continueBtn.removeAttr('disabled');
      }
    },
    saveEvent:function(){
      console.log(this.$continueBtn.prop('disabled'));
      if(this.$continueBtn.prop('disabled')!== undefined){
        var eventStart = this.$eventStart.val().split('T');
        var eventEnd = this.$eventEnd.val().split('T');
        firebaseEvent.newEvent.name = this.$eventName.val();
        firebaseEvent.newEvent.date = this.formatDate(eventStart[0]);
        firebaseEvent.newEvent.dateEnd = this.formatDate(eventEnd[0]);
        // firebaseEvent.newEvent.date = this.$eventDate.val();
        firebaseEvent.newEvent.start = this.formatTime(eventStart[1]);
        firebaseEvent.newEvent.end = this.formatTime(eventEnd[1]);
        firebaseEvent.newEvent.location = this.$eventLocation.val();
        firebaseEvent.newEvent.host = this.$eventHost.val();
        firebaseEvent.newEvent.details = this.$eventDetails.val();
        // console.log(firebaseAuth);
        firebaseEvent.newEvent.author = firebaseAuth.user.id;
        // console.log(firebaseEvent.newEvent);
        // this.cacheandContinue();
        firebaseEvent.createEvent(this.goTo('addGuests.html'));
        // firebaseEvent.updateEvent(firebaseEvent.newEvent, this.cacheAndContinue);
      }
      
    },
    refreshForm: function(){
      $('input').each(function(){
        $('this').val('');
        // console.log(this);
      });
      //this.$eventDate.val('');
      this.$eventStart.val('');
      this.$eventEnd.val('');
    },
    goTo: function(page){
      window.open(page,'_self');
    },
    formatDate: function(value){
      var date = new Date(Date.parse(value));
      var months = ['January','February','March','April','May','June','July','August','Spetember','October','November','December'];
      var month = months[date.getMonth()];
      var day = date.getDate();
      var year = date.getFullYear();
      var fullDate = month + ' ' + day + ', ' + year;
      // console.log(fullDate);
      return fullDate;
    },
    formatTime: function(value){
      var formattedTime =  '';
      if(value !== ''){
        var timeArr = value.split(':');
        var ampm,h;
        var m = timeArr[1];
        if(timeArr[0] > 12){
          h = timeArr[0] - 12;
          ampm = 'PM';
        }else{
          h = timeArr[0];
          ampm = 'AM';
        }
        formattedTime = h+':'+m+' '+ampm;
      }
      return formattedTime;
    }
  };

  return addEventForm;
});
