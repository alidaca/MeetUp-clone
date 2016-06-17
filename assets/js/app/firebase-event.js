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
      if (eventKey === undefined){
        storedKey = localStorage.getItem('eventKey');
      }else{
        storedKey = eventKey;
      }
      var eventPath = firebaseDatabase.child('events').child(storedKey).update({guests: firebaseEvent.newEvent.guests});

      // firebaseDatabase.child('events').child(eventKey).set(firebaseEvent.newEvent, onComplete);
    }
    
  };

  return firebaseEvent;
});

// var adaNameRef = firebase.database().ref('users/ada/name');
// // Modify the 'first' and 'last' properties, but leave other data at
// // adaNameRef unchanged.
// adaNameRef.update({ first: 'Ada', last: 'Lovelace' });
