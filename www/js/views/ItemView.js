var ItemView = function(){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/itemlist.html"));
        return this;
    };
    
    this.setListeners = function() {
        $(".glyphicon-camera").bind("touchstart",function(){
           $(this).css("color", "white");
           $(this).css("background-color", "#FFCC33");
           $(this).css("border-color", "white");
        });
        
        $(".glyphicon-camera").bind("touchend",function(){
           $(this).css("color", "#666666");
           $(this).css("background-color", "");
           $(this).css("border-color", "");
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

function alert(message){
    navigator.notification.alert(
        message,  // message
        undefined,         // callback
        "Message",            // title
        'Done'                  // buttonName
    );
}