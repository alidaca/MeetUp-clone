define(['jquery','firebase'], function($,firebase){

  var confirmEvent = {

    eventInfo: {
      name: '',
      date: '',
      dateEnd: '',
      start: '',
      end: '',
      location:' ',
      host: '',
      details: '',
      guests : '',
    },

    init: function(){
      this.cacheDom();
      this.getEventData();
      this.bindEvents();
    },

    cacheDom: function(){
      this.$confirmInfo = $('.confirm-info');
      this.$footer = $('.footer');
      this.$name = this.$confirmInfo.find('#confirmName');
      this.$date = this.$confirmInfo.find('#confirmDate');
      this.$dateEnd = this.$confirmInfo.find('#confirmDateEnd');
      this.$start = this.$confirmInfo.find('#confirmStart');
      this.$end = this.$confirmInfo.find('#confirmEnd');
      this.$location = this.$confirmInfo.find('#confirmLocation');
      this.$host = this.$confirmInfo.find('#confirmHost');
      this.$details = this.$confirmInfo.find('#confirmDetails');
      this.$guests = this.$confirmInfo.find('#confirmList');
      this.$startOver = this.$footer.find('#startOver');
      this.$confirm = this.$footer.find('#confirm');
    },

    bindEvents: function(){
      this.$startOver.on('click',{page: 'addEvent.html'},this.removeEvent.bind(this));
      this.$confirm.on('click', {page: 'index.html'},this.goTo.bind(this));
    },

    getEventData: function(){
      var eventKey = localStorage.getItem('eventKey');
      console.log(eventKey);
      if (eventKey !== undefined){
        var ref = new Firebase('https://meetappplnr.firebaseio.com/events/' + eventKey);
        console.log(ref);
        return ref.once('value', function(snapshot){
          confirmEvent.eventInfo.name = snapshot.val().name;
          confirmEvent.eventInfo.date = snapshot.val().date;
          confirmEvent.eventInfo.dateEnd = snapshot.val().dateEnd;
          confirmEvent.eventInfo.start = snapshot.val().start;
          confirmEvent.eventInfo.end = snapshot.val().end;
          confirmEvent.eventInfo.location = snapshot.val().location;
          confirmEvent.eventInfo.host = snapshot.val().host;
          confirmEvent.eventInfo.details = snapshot.val().details;
          confirmEvent.eventInfo.guests = snapshot.val().guests;
          console.log(confirmEvent.eventInfo);
          confirmEvent.renderData();
        });
      }
    },

    renderData: function(){
      this.$name.text(this.eventInfo.name);
      this.$date.text(this.eventInfo.date);
      this.$dateEnd.text(this.eventInfo.dateEnd);
      this.$start.text(this.eventInfo.start);
      this.$end.text(this.eventInfo.end);
      this.$host.text(this.eventInfo.host);
      this.$location.text(this.eventInfo.location);

      if(this.eventInfo.details === ''){
        this.$details.parent().hide();
      }else{
        this.$details.text(this.eventInfo.details);
        this.$details.parent().show();
      }
      var array = this.eventInfo.guests;
      for(var i=0; i<array.length; i++){
        var item = '<li>' + array[i] + '</li>';
        this.$guests.append(item);
      }

    },

    removeEvent: function(param){
      var page = param.data.page;
      var eventKey = localStorage.getItem('eventKey');  
      var ref = new Firebase('https://meetappplnr.firebaseio.com/events/' + eventKey);

      ref.remove();
      window.open(page,'self');

    },

    goTo: function(param){
      localStorage.removeItem('eventKey');
      var page = param.data.page;
      window.open(page, '_self');
    }


  };
  return confirmEvent;
});