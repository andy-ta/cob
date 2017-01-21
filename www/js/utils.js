var utils = {    
    /**
     * Gets a html template by ajax request.
     * @param {type} url
     * @returns {String}
     */
    getTemplate: function(url) {
        var el;
        $.ajax({
            url : url,
            dataType : "text",
            async : false,
            success : function(html){
                el = html;
            },
            error : function() {
                el = "AJAX ERROR : TEMPLATE LOADING FAILED";
            }
        });
        return el;
    }
};