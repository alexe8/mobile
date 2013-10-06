
// Wait for Apache Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
     
    
	
}

var zaoApp = function(){}

zaoApp.prototype = function() {
    
    
    _login = false,
    
    run = function(){
        
      /*$('#login').click(function ()
        {   
            console.log("Start");
            $.ajax({
                type: "post",
                url: "https://www.zao.com//referrer/create", 
                data: {},
                success: function(msg){      
                        console.log(msg);
                }
            });
        });*/

        // variable to hold request
        var request;
        // bind to the submit event of our form
        $("#logInForm").submit(function(event){
            // abort any pending request
            if (request) {
                request.abort();
            }
            // setup some local variables
            var $form = $(this);
            // let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");
            
                
            // serialize the data in the form
            var serializedData = $form.serialize();
            serializedData=serializedData+"&name=Temp";
            console.log(serializedData);
            // let's disable the inputs for the duration of the ajax request
            $inputs.prop("disabled", true);
            // fire off the request to url
            request = $.ajax({
                url: "http://dev.zao.com/referrer/create",
                type: "post",
                data: serializedData
            });

            // callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR){
                // log a message to the console
                console.log("Hooray, it worked!");
                console.log("M:Response:"+response);
                console.log("M:TextStatus:"+textStatus);
                console.log("M:JqXHR.responseText:"+jqXHR.responseText);
                $.mobile.changePage($("#page-main-company"));
            });

            // callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown){
                // log the error to the console
                console.error(
                    "The following error occured: "+
                    textStatus, errorThrown
                );
            });

            // callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                // reenable the inputs
                $inputs.prop("disabled", false);
            });

            // prevent default posting of form
            event.preventDefault();
        })
;
        
        
    };
    
    
    
    
   
    
    return {
        run:run,
    };
}();

