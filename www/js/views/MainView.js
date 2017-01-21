var MainView = function(){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/main.html"));
        return this;
    };
    
    this.setListeners = function() {
        var dropdown = function() {
            $('.dropdown-menu li').click(function(e){
                e.preventDefault();
                if($(this).children("a").text() !== "Other") {
                    $(".dropdown-menu li").removeClass("active");
                    $(this).addClass("active");
                    $(this).parents().eq(2).find("span:first").remove();
                    $(this).parents().eq(2).find("button:first").prepend("<span>" + $(this).children("a").text() + "</span>");
                }
                else {
                    $(this).parents().eq(1).replaceWith("<input type='text' class='form-control' placeholder='Other'></input>");
                }
            });
        }
        
        dropdown();
        
        $('#add').click(function(e){
            e.preventDefault();
            var form = '<form class="form-inline" style="margin-top: 2%">\n\
                            <div class="form-group">\n\
                                <div class="row">\n\
                                    <div class="col-xs-6">\n\
                                        <div class="dropdown">\n\
                                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" style="width: 100%;"><span>Category</span><span class="caret"></span></button>\n\
                                            <ul class="dropdown-menu">\n\
                                                <li><a href="#">Food</a></li>\n\
                                                <li><a href="#">Clothes</a></li>\n\
                                                <li class="divider"></li><li><a id="other" href="#">Other</a></li>\n\
                                            </ul>\n\
                                        </div>\n\
                                    </div>\n\
                                    <div class="col-xs-6">\n\
                                        <input type="text" class="form-control" id="priceInput" placeholder="Budget limit (E.g. $100)">\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </form>'
            
            $('.form-inline:last').after(form);
            dropdown();
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