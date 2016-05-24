 define(['jquery'], function($){

  var googleApi = {
    init: function(){
      this.cacheDom();
      this.bindEvents();
      console.log(this.$inputAddress);
      this.addressAutocomplete();
    },

    cacheDom: function(){
      this.$inputAddress = $('#eventLocation');
    },

    bindEvents: function(){
      // this.$inputAddress.on('click', this.addressAutocomplete.bind(this));
    },

    addressAutocomplete: function(){
      var input = document.getElementById('eventLocation');
      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', function(){
        var place = autocomplete.getPlace();
      // $('#selected').text("Place selected:" +place.formatted_address)
      });
    },

  }; //googleApi

  return googleApi;
});