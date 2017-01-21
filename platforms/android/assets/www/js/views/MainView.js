var MainView = function(){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/main.html"));
        return this;
    };
    
    this.setListeners = function() {
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

function alert(message){
    navigator.notification.alert(
        message,  // message
        undefined,         // callback
        "Message",            // title
        'Done'                  // buttonName
    );
}