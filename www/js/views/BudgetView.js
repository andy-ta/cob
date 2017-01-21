var BudgetView = function(){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/budgetlist.html"));
        return this;
    };
    
    this.setListeners = function() {
    };
    
    this.completeProcess = function() {
        $("#theNavbar").find("h3").text("Budget List");
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