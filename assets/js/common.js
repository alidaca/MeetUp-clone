//first file to be loaded. sets up up all required paths

//requirejs configuration
requirejs.config({
  baseUrl: '/assets/js',
  paths:{
    app: 'app',
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
    leanModal: 'tools/jquery.leanModal.min'
    },
  shim:{
    leanModal: {
      deps: ['jquery']
    }
  }
});