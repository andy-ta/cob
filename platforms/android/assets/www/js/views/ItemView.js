var ItemView = function(index){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/itemlist.html"));
        return this;
    };
    
    this.setListeners = function() {
    };
    
    this.completeProcess = function() {setTimeout(function(){
        var budget = JSON.parse(localStorage.getItem("budgets"))[index];
        
        if(index !== -1) {
            var i;
            for(i = 0; i < budget.items.length; i++) {
                var name = budget.items[i].name;
                var price = budget.items[i].price;

                var firstLine = '<div class="row2">';
                if(i === 0)
                    firstLine = '<div id="rowitem1">';

                var item = firstLine +
                                '<div class="col-xs-10">\n\
                                    <h1 class="price">' + name + '</h1>\n\
                                </div>\n\
                                <div class="col-xs-2">\n\
                                    <span class="sign pricah">' + price + '</span>\n\
                                </div>\n\
                            </div>';
                $('#itemlist').append(item);

                var divider = '<div class="row2"><div class="col-xs-12"><hr class="dashed"></div></div>'
                $('#itemlist').append(divider);
            }

            $('#itemlist').append(' <div class="rowitem">\n\
                                        <div class="col-xs-10">\n\
                                            <h1 class="total">Budget:</h1>\n\
                                        </div>\n\
                                        <div class="col-xs-2">\n\
                                            <span id="totalPrice" class="sign">0.00</span>\n\
                                        </div>\n\
                                    </div>');
                
            setTimeout(function(){
                var sum = 0;
                $(".pricah").each(function(){
                    sum = sum + Number($(this).text());
                });
                $("#totalPrice").text(sum.toFixed(2));
            }, 0);
        }
        else {
            $('#itemlist').append('<div class="alert alert-info" style="display: block;">You have not purchased anything yet.</div>');
        }
        var color;
        var secondaryColor;
        switch(budget.category) {
            case "Food":
                color = '#FFCC33';
                secondaryColor = '#FFCC33';
                break;
            case "Clothes":
                color = '#A3C586';
                secondaryColor = '#A3C586';
                break;
            case "Essentials":
                color = '#5B7444';
                secondaryColor = '#5B7444';
                break;
            case "Entertainment":
                color = '#688B9A';
                secondaryColor = '#688B9A';
                break;
            default:
                color = '#47697E';
                secondaryColor = '#47697E';
                break;
        }
        $("#theNavbar").css('background', 'linear-gradient(' + secondaryColor + ', ' + color + ')');
        $("#theNavbar").find("h3").text(budget.category + ' Budget');
        $('#itemlist').append('<div class="rowitem">\n\
                                    <div class="col-xs-10">\n\
                                        <h1 class="total">Budget limit:</h1>\n\
                                    </div>\n\
                                    <div class="col-xs-2">\n\
                                        <span class="sign">' + budget.budget + '</span>\n\
                                    </div>\n\
                                </div>\n\
                                <footer id="bottomNavbar" class="navbar navbar-inverse navbar-fixed-bottom">\n\
                                    <center><span class="glyphicon glyphicon-camera"></span></center>\n\
                                </footer>');
        $("#itemlist").append('<center><button id="next" type="button" class="btn btn-default button3" style="margin-top:10%"> BACK </button></center>');
        bindListeners(index);
    },0);};
    
    this.initialize=function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.render();
        this.completeProcess();
    };  
};

function bindListeners(index) {
    $(".glyphicon-camera").bind("touchstart",function(){
       $(this).css("color", "white");
       $(this).css("background-color", "#FFCC33");
       $(this).css("border-color", "white");
    });

    $(".glyphicon-camera").bind("touchend",function(){
       $(this).css("color", "#666666");
       $(this).css("background-color", "");
       $(this).css("border-color", "");
       setTimeout(function(){
           app.displayView("camera", false, index);
       }, 300);
    });
    
    $("#next").click(function(){
        app.displayView("budgetlist", false);
    });
};