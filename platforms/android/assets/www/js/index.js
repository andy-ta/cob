var app = {    
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.init();
    },
    
    
    // Bind Event Listeners
    // 
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    

    /**
     * Event handler if the device is not connected to Internet
     * @returns {undefined}
     */
    onOffline: function() {   
        console.log("Offline");
    },
    

    /**
     * Event handler if the device is connected to Internet
     * @returns {undefined}
     */
    onOnline: function() {   
        console.log("Online");        
    },


    /**
     * Event handler when the device has loaded Cordova lib. Initialization can be launched.
     * @returns {undefined}
     */
    onDeviceReady: function() {
        document.addEventListener("offline", this.onOffline, false);
        document.addEventListener("online", this.onOnline, false); 
    },


    /**
     * Function that manages the application's view
     * @param {String} hash The hash of the page to be displayed
     * @param {Boolean} init Whether initiating the app or just changing view
     * @returns {undefined}
     */
    displayView: function(hash, init) {
        if(!init) {
            //Kill all events
            //End kill all events
        }

        switch(hash) {
            case "main":
                view = new MainView();
                break;
        }
        $('#content').empty();
        view.initialize();
        $('#content').html(view.el.html());
        $("#content").trigger("create");
        view.setListeners();
    },


    /**
     * Initialize app's main view
     * @returns {undefined}
     */
    init: function() {
        app.displayView("main", true);
    }

};

app.initialize();