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
      this.$eventDate = this.$eventForm.find('#eventDate');
      this.$eventStart = this.$eventForm.find('#eventStart');
      this.$eventDateEnd = this.$eventForm.find('#eventDateEnd');
      this.$eventEnd = this.$eventForm.find('#eventEnd');
      this.$eventLocation = this.$eventForm.find('#eventLocation');
      this.$eventHost = this.$eventForm.find('#hostName');
      this.$eventDetails = this.$eventForm.find('#eventDetails');
      this.$continueBtn = $('#continueBtn');
    },

    bindEvents: function(){
      this.$eventType.on('blur change keyup', {field: addEventForm.$eventType}, this.isEmpty);
      this.$eventName.on('blur change keyup', {field: addEventForm.$eventName}, this.isEmpty);
      this.$eventDate.on('change blur', this.validateDateStart.bind(this));
      this.$eventDateEnd.on('change blur', this.validateDateEnd.bind(this));
      this.$eventStart.on('change blur', this.validateTimeStart.bind(this));
      this.$eventEnd.on('keyup blur', this.validateTimeEnd.bind(this));
      this.$eventLocation.on('blur change',{field: addEventForm.$eventLocation}, this.isEmpty);
      this.$eventHost.on('blur change keyup', {field: addEventForm.$eventHost}, this.isEmpty);
      $('input, textarea').on('change keyup',this.validateForm.bind(this));
      this.$continueBtn.on('click', this.saveEvent.bind(this));
    },

    validateDateStart: function(){
      console.log('validateDateStart fired');
      console.log(this.$eventDate.val());
      var inputDate = Date.parse(this.$eventDate.val());
      console.log('currentDate: ' + currentDate);
      console.log('inpuDate: ' + inputDate);
      console.log('dateStart condition is: ' + inputDate >currentDate);
      switch(isNaN(inputDate)){
        case true:
          console.log('eventDate is empty');
          console.log(this.$eventDate.parent().find('errMsg'));
          addEventForm.renderValidation(addEventForm.$eventDate, false);
          this.$eventDate.parent().find('.errMsg').text('Please, provide a start date').show();
          break;
        default:
          console.log('Date condition is:' + inputDate > currentDate);
          if(inputDate > currentDate){
            addEventForm.renderValidation(addEventForm.$eventDate, true);
            console.log('date errMsg is: ' + this.$eventDate.parent().find('errMsg').text());
            this.$eventDate.parent().find('.errMsg').hide();
            return true;
          }else{
            addEventForm.renderValidation(addEventForm.$eventDate, false);
            this.$eventDate.parent().find('.errMsg').text('The start date must be in the future').show();
            return false;
          }
          break;
      }
    },

    validateDateEnd: function(){
      var inputDateStart = Date.parse(this.$eventDate.val());
      var inputDateEnd = Date.parse(this.$eventDateEnd.val());
      console.log(inputDateEnd);
      switch(isNaN(inputDateEnd)){
        case true:
          this.renderValidation(addEventForm.$eventDateEnd, false);
          this.$eventDateEnd.parent().find('.errMsg').text('Please, provide an end date').show();
          break;
        default:
          if(inputDateEnd >= inputDateStart){
            this.renderValidation(addEventForm.$eventDateEnd, true);
            this.$eventDateEnd.parent().find('.errMsg').hide();
          }else{
            this.renderValidation(addEventForm.$eventDateEnd, false);
            this.$eventDateEnd.parent().find('.errMsg').text('The end date must be after the start date');
          }
      }
    },

    // validateEventType: function(){
    //   if(this.$eventType.val()){
    //     this.renderValidation(addEventForm.$eventType, true);
    //     return true;
    //   }else{
    //     this.renderValidation(addEventForm.$eventType, false);
    //     return false;
    //   }
    // },
    validateTimeStart: function(){
      console.log(this.$eventStart.val().length);
      console.log('validateTimeStart fired');
      switch(this.$eventStart.val().length){
        case 0:
          console.log('switch statement for 0 fired');
          this.renderValidation(this.$eventStart, false);
          this.$eventStart.parent().find('.errMsg').text('Please, provide a start time').show();
          break;
        default:
          console.log('switch statement default fired');
          this.renderValidation(this.$eventStart, true);
          this.$eventStart.parent().find('.errMsg').hide();
      }

    },

    validateTimeEnd: function(){
      var startTime = this.$eventStart.val();
      var endTime = this.$eventEnd.val();
      console.log(endTime > startTime);
      switch(endTime.length){
        case 0:
          console.log('switch statement for 0 fired');
          this.renderValidation(this.$eventEnd, false);
          this.$eventEnd.parent().find('.errMsg').text('Please, provide an eventEnd time').show();
          break;
        default:
          if((this.$eventDate.val() === this.$eventDateEnd.val() && startTime < endTime) ){
            console.log('switch statement default fired');
          this.renderValidation(this.$eventEnd, true);
          this.$eventStart.parent().find('.errMsg').hide();
          }else if (this.$eventDate.val() !== this.$eventDateEnd.val()){
            this.renderValidation(this.$eventEnd, true);
            this.$eventEnd.parent().find('.errMsg').hide();
          }else{
            this.renderValidation(this.$eventEnd, false);
            this.$eventEnd.parent().find('.errMsg').text('The end time must be after the start time').show();
          }
      }

    },

    // validateTime: function(){
    //   console.log(this.$eventEnd);
    //   if(this.$eventStart.val()){
    //     if(this.$eventEnd.val() === '' || this.$eventEnd.val()>this.$eventStart.val()){
    //       this.renderValidation(this.$eventEnd, true);
    //       return true;
    //     }else{
    //       this.renderValidation(this.$eventEnd, false);
    //       return false;
    //     }
    //   }
    // },
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
      }
    },
    validateForm: function(){
      // console.log('validateform fired');
      // console.log('name: ' + this.$eventType.hasClass('valid'));
      // console.log('date: '+this.$eventDate.hasClass('valid'));
      // console.log('start: '+ this.$eventStart[0].checkValidity());
      // console.log('location: '+ this.$eventLocation.hasClass('valid'));
      // console.log('end: '+ this.$eventEnd.hasClass('valid'));
      if(this.$eventType.hasClass('valid') && 
        this.$eventName.hasClass('valid')&&
        this.$eventDate.hasClass('valid') && 
        this.$eventDateEnd.hasClass('valid')&&
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
        firebaseEvent.newEvent.name = this.$eventName.val();
        firebaseEvent.newEvent.date = this.formatDate(this.$eventDate.val());
        firebaseEvent.newEvent.dateEnd = this.formatDate(this.$eventDateEnd.val());
        // firebaseEvent.newEvent.date = this.$eventDate.val();
        firebaseEvent.newEvent.start = this.$eventStart.val();
        firebaseEvent.newEvent.end = this.formatTime(this.$eventEnd.val());
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
      this.$eventDate.val('');
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
      var formattedTime =  "";
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
