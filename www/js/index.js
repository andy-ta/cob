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
     * @param {Number} # of the budget (optional)
     * @returns {undefined}
     */
    displayView: function(hash, init, number) {
        if(!init) {
            //Kill all events
            $("#page").children().off();
            if(hash !== "camera")
                $("#theNavbar").css('background', 'linear-gradient(#688B9A,#47697E)');
            //End kill all events
        }
        else {
            console.log("HI");
            $("#settings").click(function(){
                app.displayView('settings', false);
            });
            $("#settings").bind("touchstart",function(){
                $(this).css('color', 'white');
            });
            $("#settings").bind("touchend", function(){
                $(this).css('color', 'black');
            });
        }

        switch(hash) {
            case "main":
                view = new MainView();
                break;
            case "budgetlist":
                view = new BudgetView();
                break;
            case "itemlist":
                if(number !== undefined)
                    view = new ItemView(number);
                else
                    view = new ItemView(-1);
                break;
            case "camera":
                if(number !== undefined)
                    view = new CameraView(number);
                else
                    view = new CameraView(-1);
                break;
            case "settings":
                view = new SettingsView();
                $("#settings").off();
                $("#settings").click(function(){
                    app.displayView('budgetlist', false);
                    $("#settings").click(function(){
                        app.displayView('settings', false);
                    });
                });
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