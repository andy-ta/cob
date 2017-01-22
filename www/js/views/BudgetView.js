var BudgetView = function(){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/budgetlist.html"));
        return this;
    };
    
    this.setListeners = function() {
    };
    
    this.completeProcess = function() { setTimeout(function(){
        var budgets = JSON.parse(localStorage.getItem("budgets"));
        console.log(budgets);
        if(budgets === null) {
            $('.container').append("<p>Empty</p>");
        }
        else if(budgets.length === 0) {
            $('.container').append("<p>Empty</p>");
        }
        else {
            var i;
            for(i = 0; i < budgets.length; i++) {
                var color;
                switch(budgets[i].category) {
                    case "Food":
                        color = 'btn-danger';
                        break;
                    case "Clothes":
                        color = 'btn-warning';
                        break;
                    case "Essentials":
                        color = 'btn-info';
                        break;
                    case "Entertainment":
                        color = 'btn-success';
                        break;
                    default:
                        color = 'btn-default';
                        break;
                }
                $('#budgetListContainer').append('<button type="button" class="btn btn ' + color + ' btn-block btn-lg" >' + budgets[i].category + '</button>');
            }
        }
        $("#theNavbar").find("h3").text("Budget List"); }, 0);
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