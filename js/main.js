require.config({
    packages: [
        { name: 'piratomat'
        , location: 'libs/piratomat' },
    ],

    paths: {
      jquery: 'libs/jquery/jquery'
      , underscore: 'libs/underscore/underscore'
      , backbone: 'libs/backbone/backbone'
    },

    use: {
        'underscore': {
            attach: '_'
        },
        'backbone': {
            deps: ['use!underscore', 'jquery'],
            attach: function(_, $) {
                return Backbone;
            }
        }
    }
});

require([
      'App'
], function(App) {
    App();
});
