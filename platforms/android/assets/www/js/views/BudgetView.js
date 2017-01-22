var BudgetView = function(){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/budgetlist.html"));
        return this;
    };
    
    this.setListeners = function() {
    };
    
    this.completeProcess = function() { setTimeout(function(){
        var budgets = JSON.parse(localStorage.getItem("budgets"));
        if(budgets === null) {
            $('#budgetListContainer').append('<div class="alert alert-danger" style="display: block;">You currently have no budget.</div>');
        }
        else if(budgets.length === 0) {
            $('#budgetListContainer').append('<div class="alert alert-danger" style="display: block;">You currently have no budget.</div>');
        }
        else {
            var i;
            for(i = 0; i < budgets.length; i++) {
                var color;
                switch(budgets[i].category) {
                    case "Food":
                        color = '#FFCC33';
                        break;
                    case "Clothes":
                        color = '#A3C586';
                        break;
                    case "Essentials":
                        color = '#5B7444';
                        break;
                    case "Entertainment":
                        color = '#688B9A';
                        break;
                    default:
                        color = '#47697E';
                        break;
                }
                $('#budgetListContainer').append('<button type="button" id="' + i + '"  class="btn btn-block btn-lg buttonbudget" style="background-color: ' + color + ';">' + budgets[i].category + '</button>');
            }
        }
        $('.buttonbudget').click(function(){
            app.displayView("itemlist", false, Number($(this).attr("id")));
        });
        $("#theNavbar").find("h3").text("Budget List"); 
        $("#content").append('<center><button id="next" type="button" class="btn btn-default button3" style="margin-top:10%"> BACK </button></center>');}, 0);
        setTimeout(function(){$("#next").click(function(){
            app.displayView("main", false);
        });},500);
    };
    
    this.initialize=function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.render();
        this.completeProcess();
    };  
};