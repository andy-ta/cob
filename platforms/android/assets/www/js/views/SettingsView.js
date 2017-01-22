var SettingsView = function(){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/settings.html"));
        return this;
    };
    
    this.setListeners = function() {
        $("#reset").click(function(){
            navigator.notification.confirm(
                'Are you sure you want to reset all?', // message
                 function(buttonIndex){
                     if(buttonIndex === 1){
                         localStorage.clear();
                         app.displayView("main", false);
                    }
                },            // callback to invoke with index of button pressed
                'Reset'           // title
            );
        });
    };
    
    this.completeProcess = function() {
    };
    
    this.initialize=function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.render();
        this.completeProcess();
    };  
};