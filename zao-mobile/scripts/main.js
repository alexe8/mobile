
// Wait for Apache Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
   
    
    //var object = {value: "value", timestamp: new Date().getTime()}
    //localStorage.setItem("key", JSON.stringify(object));
    
	
}

var zaoApp = function(){}

zaoApp.prototype = function() {
    
    var domain="https://dev.zao.com";
    _login = false,
    
    run = function(){
        
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
            // let's disable the inputs for the duration of the ajax request
            $inputs.prop("disabled", true);
            // fire off the request to url
            request = $.ajax({
                url: "https://dev.zao.com/mobile/app/user/login",
                type: "post",
                data: serializedData
            });

            // callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR){
                //Get token add save to local storage -parses jqXHR.responseText as JSON object and saves to localstorage
                var jsonResponse=JSON.parse(jqXHR.responseText);
                localStorage.conToken=jsonResponse.message;
                if(localStorage.conToken!=null){
                    activeSess("page-main-company");
                    //$.mobile.changePage($("#page-main-company"));
                    //bringReq("https://dev.zao.com/mobile/app/jobs",localStorage.conToken);
                    
                    
                }
                    
                    
            
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
        });
        
        
    };
    
    //Will get which page to go from button or go to home screen by default
    //Will ask from server the content
    //
    activeSess=function(page){
        console.log("activeSess START");
        if(page===null){
            $.mobile.changePage($("#page-main-company"));
        }
            else{
             //Will set page to go to and content to bring
            $.mobile.changePage($("#"+page));
            //bringReq("https://dev.zao.com/mobile/app/jobs");
            //Maybe set iframe content    
            webViewContent("");
        }
    };
    
    
    
    bringReq= function(url){
       console.log("Start with"); 
       $.ajax({
                type: "GET",
                url: url, 
                data: localStorage.conToken,
                success: function(msg){      
                        console.log(msg);
                    //Return content to or set iframe
                    
                }          
            });
            request.done(function (response, textStatus, jqXHR){
                console.log("conn SUCC");
                    console.log("M:Response:"+response);
                    /*console.log("M:TextStatus:"+textStatus);
                    console.log("M:JqXHR.responseText:"+jqXHR.responseText);*/
                    activeSess();
            });
    };
    
    
    webViewContent= function(content){
        console.log("Start of webViewContent");
        var temp = "";
        document.getElementById('iframe_companyMain').src = "data:text/html;charset=utf-8," + escape(temp);
        //$('#iframe_companyMain').contents().html("<html><body><div> blah </div></body></html>");
    };    
    
   
    
    return {
        run:run,
    };
}();






 