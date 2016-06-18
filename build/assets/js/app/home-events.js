define(['jquery','firebase'], function($,firebase){

  var homeEvents =  {

    init: function(){
      this.cacheDom();
      this.getEvents();
      console.log('init launched');
    },
    cacheDom: function(){
      this.$main = $('.main-wrap');
    },
    getEvents: function(){
      var ref = new Firebase('https://meetappplnr.firebaseio.com/events/');
      console.log(ref);
      ref.limitToLast(12).once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var eventName = childSnapshot.val().name;
          var eventLocation = childSnapshot.val().location;
          var eventDate = childSnapshot.val().date;
          homeEvents.renderEvent(eventName, eventLocation, eventDate);
        });
      });
    },
    renderEvent: function(eventName, eventLocation, eventDate){
      var markup =  '<div class="event-card media-element">' +
                      '<img src="/assets/img/icons/event-icon.svg" alt="event-icon" class="media">' +
                        '<div class="caption">' + 
                          '<h3>' + eventName + '</h3>' +
                          '<hr>' +
                          '<p class="event-description">' + eventLocation + '</p>' +
                          '<p class="event-date">'+ eventDate + '</p>' +
                        '</div>' +
                    '</div>';
      this.$main.append(markup);

    }
  };

return homeEvents;
});

