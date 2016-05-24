define(['jquery', 'app/googleApi'],function($, googleApi){

  var currentDate;
  var addEventForm = {

    init: function(){
      this.cacheDom();
      googleApi.init();
    },

    cacheDom: function(){
      this.$eventForm = $('#eventForm');
      this.$eventType = this.$eventForm.find('#eventType');
      this.$eventDate = this.$eventForm.find('#eventDate');
      this.$eventStart = this.$eventForm.find('#eventStart');
      this.$eventEnd = this.$eventForm.find('#eventEnd');
      this.$eventLocation = this.$eventForm.find('#eventLocation');
      this.$eventHost = this.$eventForm.find('#hostName');
      this.$eventDetails = this.$eventForm.find('#eventDetails');
      this.$continueBtn = this.$eventForm.find('#continueBtn');
    }
  };

  return addEventForm;
});
