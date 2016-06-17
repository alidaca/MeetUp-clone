define(['jquery','firebase'],function($,firebase){

  var firebaseDatabase = new Firebase('https://meetappplnr.firebaseio.com/');

  var eventKey;

  var firebaseEvent= {

    newEvent: {
      name: '',
      date: '',
      start:'',
      end: '',
      location: '',
      host: '',
      details: '',
      author: '',
      guests:[]
    },

    init: function(){

    },
    createEvent: function(onComplete){
      console.log('createKey fired');
      // eventKey = firebaseDatabase.child('events').push().key;
      var eventPath = firebaseDatabase.child('events').push(firebaseEvent.newEvent, onComplete);
      eventKey = eventPath.key();
      console.log(eventPath);
      console.log(eventKey);
      localStorage.setItem('eventKey', eventKey);
    },
    updateEvent: function(onComplete){
      console.log('updateEvent fired');
      var storedKey;
      console.log(storedKey);
      console.log(localStorage.getItem('eventKey'));
      if (eventKey === undefined){
        storedKey = localStorage.getItem('eventKey');
      }else{
        storedKey = eventKey;
      }
      var eventPath = firebaseDatabase.child('events').child(storedKey).update({guests: firebaseEvent.newEvent.guests});

      // firebaseDatabase.child('events').child(eventKey).set(firebaseEvent.newEvent, onComplete);
    },

    goTo: function(page){
      window.open(page,'_self');
    }
    
  };

  return firebaseEvent;
});

