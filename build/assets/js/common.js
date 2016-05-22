//first file to be loaded. sets up up all required paths

//requirejs configuration
requirejs.config({
  baseUrl: '/assets/js',
  paths:{
    app: 'app',
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
    leanModal: 'tools/jquery.leanModal.min',
    firebase: 'tools/firebase',
    googlemaps: 'tools/googlemaps',
    async: 'tools/async'
    },
  shim:{
    leanModal: {
      deps: ['jquery']
    },
    firebase: {
      exports: 'Firebase'
    },
    googlemaps: {
      params: {
        key : 'AIzaSyCLUSs24sIbNQ3RBNUwvab0_J-80VPLVGo',
        libraries: 'places'
      }
    }
  }
});