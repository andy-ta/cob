var CameraView = function(index){
    
    this.render=function() {
        this.el.html(utils.getTemplate("templates/camera.html"));
        return this;
    };
    
    this.setListeners = function() {
        (function () {
            var datPic = document.getElementById('costco');

            var pictureWidth = 640;
            var pictureHeight = 360;

            var fxCanvas = null;
            var texture = null;


            function step1() {
                $("#costco").hide();
                $("#step1").show();
                $("#step2").hide();
                $("#step3").hide();
                //Enable the 'take picture' button
                $('#takePicture').removeAttr('disabled');
                //Hide the 'enable the camera' info
                $('#step1 figure').removeClass('not-ready');
            }

            function step2() {
                var canvas = document.querySelector('#step2 canvas');
                var img = document.querySelector('#step2 img');
                
                if(navigator.camera !== undefined) {
                    var options = setOptions();
                    navigator.camera.getPicture(function cameraSuccess(imageUri) {
                        $("#costco").on("load", function(){
                            step25();
                        });
                        $("#costco").attr("src", imageUri);
                    }, function cameraError(error) {
                        console.debug("Unable to obtain picture: " + error, "app");

                    }, options);
                }
                else {
                    $("#costco").on("load", function(){
                        step25();
                    });
                    $("#costco").attr("src", 'img/costco.jpg');
                }
            }
            
            function setOptions() {
                var options = {
                    // Some common settings are 20, 50, and 100
                    quality: 100,
                    destinationType: Camera.DestinationType.FILE_URI,
                    encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                    allowEdit: true,
                    correctOrientation: true  //Corrects Android orientation quirks
                }
                options.targetWidth = pictureWidth;
                options.targetHeight = pictureHeight;
                return options;
            }

            function step25() {
                var canvas = document.querySelector('#step2 canvas');
                var img = document.querySelector('#step2 img');
                //setup canvas
                canvas.width = pictureWidth;
                canvas.height = pictureHeight;

                var ctx = canvas.getContext('2d');
                
                //draw picture from datPic on canvas
                ctx.drawImage(datPic, 0, 0);

                //modify the picture using glfx.js filters
                fxCanvas = fx.canvas();
                
                texture = fxCanvas.texture(canvas);
                fxCanvas.draw(texture)
                    .hueSaturation(-1, -1)//grayscale
                    .unsharpMask(20, 2)
                    .brightnessContrast(0.2, 0.9)
                    .update();

                window.texture = texture;
                window.fxCanvas = fxCanvas;

                $(img)
                    //setup the crop utility
                    .one('load', function () {
                        if (!$(img).data().Jcrop) {
                            $(img).Jcrop({
                                onSelect: function () {
                                    //Enable the 'done' button
                                    $('#adjust').removeAttr('disabled');
                                }
                            });
                        } else {
                            //update crop tool (it creates copies of <img> that we have to update manually)
                            $('.jcrop-holder img').attr('src', fxCanvas.toDataURL());
                        }
                    })
                    //show output from glfx.js
                    .attr('src', fxCanvas.toDataURL());
            }

            function step3() {
                $("#loadmehere").after("<div class='loader'></div>");
                var canvas = document.querySelector('#step3 canvas');
                var step2Image = document.querySelector('#step2 img');
                var cropData = $(step2Image).data().Jcrop.tellSelect();

                var scale = step2Image.width / $(step2Image).width();

                //draw cropped image on the canvas
                canvas.width = cropData.w * scale;
                canvas.height = cropData.h * scale;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(
                    step2Image,
                    cropData.x * scale,
                    cropData.y * scale,
                    cropData.w * scale,
                    cropData.h * scale,
                    0,
                    0,
                    cropData.w * scale,
                    cropData.h * scale);
                
                Tesseract.recognize(ctx, {
                    tessedit_char_whitelist: '1234567890.,$'
                })
                .then(function(result){
                    $('blockquote p').html('Price: $' + result.text);
                    $(".loader").remove();
                });
            }

            /*********************************
             * UI Stuff
             *********************************/

            //start step1 immediately
            step1();
            $('.help').popover();

            function changeStep(step) {
                $('body').attr('class', 'step' + step);
                $('.nav li.active').removeClass('active');
                $('.nav li:eq(' + (step - 1) + ')').removeClass('disabled').addClass('active');
                switch(step) {
                    case 1:
                        $("#step1").show();
                        $("#step2").hide();
                        $("#step3").hide();
                        break;
                    case 2:
                        $("#step1").hide();
                        $("#step2").show();
                        $("#step3").hide();
                        break;
                    case 3:
                        $("#step1").hide();
                        $("#step2").hide();
                        $("#step3").show();
                        break;
                }
            }

            //handle brightness/contrast change
            $('#brightness, #contrast').on('change', function () {
                var brightness = $('#brightness').val() / 100;
                var contrast = $('#contrast').val() / 100;
                var img = document.querySelector('#step2 img');

                fxCanvas.draw(texture)
                    .hueSaturation(-1, -1)
                    .unsharpMask(20, 2)
                    .brightnessContrast(brightness, contrast)
                    .update();

                img.src = fxCanvas.toDataURL();

                //update crop tool (it creates copies of <img> that we have to update manually)
                $('.jcrop-holder img').attr('src', fxCanvas.toDataURL());
            });

            $('#takePicture').click(function () {
                step2();
                changeStep(2);
            });

            $('#adjust').click(function () {
                step3();
                changeStep(3);
            });

            $('#go-back').click(function () {
                changeStep(2);
            });

            $('#start-over').click(function () {
                changeStep(1);
            });
            
            $('#accept').click(function(){
                var value = Number($("#result").text().substring(8)).toFixed(2);
                if(navigator.notification !== undefined) {
                    if(!isNaN(value)) {
                        navigator.notification.prompt(
                            'Please enter the name of the product: ',  // message
                            function(results){
                                var budgets = JSON.parse(localStorage.getItem("budgets"));
                                budgets[index].items.push({name: results.input1, price: value});
                                localStorage.setItem("budgets", JSON.stringify(budgets));
                                app.displayView('itemlist', false, index);
                            },                  // callback to invoke
                            'Product Name',            // title
                            ['Ok','Exit'],             // buttonLabels
                            'Bobino Cord Wrap'                 // defaultText
                        );
                    }
                    else {
                        utils.alert("This number is invalid. Please start over.");
                    }
                }
                else {
                    var budgets = JSON.parse(localStorage.getItem("budgets"));
                    budgets[index].items.push({name: "Bobino Cord Wrap", price: value});
                    localStorage.setItem("budgets", JSON.stringify(budgets));
                    app.displayView('itemlist', false, index);
                }
            })

            $('.nav').on('click', 'a', function () {
                if (!$(this).parent().is('.disabled')) {
                    var step = $(this).data('step');
                    changeStep(step);
                }

                return false;
            });
        })();
    };
    
    this.completeProcess = function() {
    };
    
    function parseOutput(output) {
        var array = output.split("\/");
        
        var i;
        //clean array
        for(i = 0; i < array.length; i++) {
            if(!(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/.test(array[i]))) {
                array.splice(i, 1);
                i = 0;
            }
            else if(array[i].length === 0) {
                array.splice(i, 1);
                i = 0;
            }
            else if(array[i].length > 7) {
                array.splice(i, 1);
                i = 0;
            }
        }
        
        var choice;
        
        if(array.length !== 0) {
            var x;
            for(x = 1; x <= array.length; x++) {
                choice = array[array.length - x];
                if(!isNan(choice))
                    break;
            }
        }
        else
            choice = -1;
        
        return choice;
    }
    
    this.initialize=function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.render();
        this.completeProcess();
    };  
};