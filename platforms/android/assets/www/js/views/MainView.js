var MainView = function(){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/main.html"));
        return this;
    };
    
    this.setListeners = function() {
        var dropdown = function() {
            $('.dropdown-menu li').off();
            $('.row div:last-child input').off();
            
            $('.row div:last-child input').focusout(function(){
                var somme = 0;
                $('.actualPrice').each(function(){
                    somme = somme + Number($(this).val());
                });
                $("#totalAmount").text("$" + somme.toFixed(2));
            });
        
            $('.dropdown-menu li').click(function(e){
                e.preventDefault();
                if($(this).children("a").text() !== "Other") {
                    $(".dropdown-menu li").removeClass("active");
                    $(this).addClass("active");
                    $(this).parents().eq(2).find("span:first").remove();
                    $(this).parents().eq(2).find("button:first").prepend("<span>" + $(this).children("a").text() + "</span>");
                    dropdown();
                }
                else {
                    $(this).parents().eq(1).replaceWith("<input type='text' class='form-control' placeholder='Other'></input>");
                }
            });
        };
        
        dropdown();
        
        $('#add').click(function(e){
            e.preventDefault();
            var form = '<form class="form-inline" style="margin-top: 2%">\n\
                            <div class="form-group">\n\
                                <div class="row">\n\
                                    <div class="col-xs-6">\n\
                                        <div class="dropdown">\n\
                                            <button type="button" class="btn btn-primary dropdown-toggle button2" data-toggle="dropdown" style="width: 100%;"><span>Category</span><span class="caret"></span></button>\n\
                                            <ul class="dropdown-menu">\n\
                                                <li><a href="#">Food</a></li>\n\
                                                <li><a href="#">Clothes</a></li>\n\
                                                <li><a href="#">Essentials</a></li>\n\
                                                <li><a href="#">Entertainment</a></li>\n\
                                                <li class="divider"></li><li><a href="#">Other</a></li>\n\
                                            </ul>\n\
                                        </div>\n\
                                    </div>\n\
                                    <div class="col-xs-6">\n\
                                        <input type="number" class="form-control actualPrice" id="priceInput" placeholder="Budget limit (E.g. $100)">\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </form>';
            
            $('.form-inline:last').after(form);
            dropdown();
            $(this).css("background-color", "#FFCC33");
        });
        
        $("#next").click(function(){
            $(".row").each(function(){
                var budgets = JSON.parse(localStorage.getItem("budgets"));
                // don't want that total row
                if($(this).children('hr').length === 0) {
                    var category = $(this).find('button span:first-child').text();
                    if(category === "") // if it's 'other'
                        category = $(this).find('input:first').val();

                    var budgetMoney = $(this).children('div').eq(1).find('input').val();
                    
                    var budget = {
                        category: category,
                        budget: budgetMoney,
                        items: []
                    };
                    console.log(budgets);
                    if(budgets === null) //if no storage yet
                        budgets = [];

                    // does not exist or did not input anything
                    if(budget.category !== undefined && budget.budget !== undefined && 
                       budget.category !== "Category" && budget.budget !== "") {
                        budget.budget = Number(budget.budget).toFixed(2);
                        budgets.push(budget);
                    }
                    localStorage.setItem("budgets", JSON.stringify(budgets));
                }
            });
            app.displayView("budgetlist", false);
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