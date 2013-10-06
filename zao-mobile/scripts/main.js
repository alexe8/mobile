
// Wait for Apache Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    
	
}

var zaoApp = function(){}

zaoApp.prototype = function() {
    //var _flightForCheckin = null,
    //_flightForDetails=null,
    //_ffNum = null, 
    //_customerData = null,
    _login = false,
    
    run = function(){
        console.log("T2");
        var that = this,
        
        $('#page-Log-In').on('pagebeforeshow',$.proxy(_initHome,that));
        $('#checkIn').on('pageshow', $.proxy(_initCheckIn,that));
        
        $('#myTripsListView').on('click', 'li', function () {
        	var item = $(this);
        	_flightForCheckin = item.data('flight');
            _flightForDetails = item.data('flight');
        });
        
        $seatPicker.on('pageshow', function (event) {
        	var el = $('#seatMapPickerContainer', this),
        	seat = _flightForCheckin.segments[_flightForCheckin.currentSegment].seat;
        	seatMapDrawing.drawSeatMap(el, seat);
        
        });
        
        $seatPicker.on('pagebeforehide', function (event) {
        	_flightForCheckin.segments[_flightForCheckin.currentSegment].seat = seatMapDrawing.getselectedSeat();
        });
    },
    
    
    
    _initHome = function(){
        if (!_login) {
            console.log("r");
	    	$.mobile.changePage("#logIn", { transition: "flip" });
	    	$('#login').submit(function () {
	    		$(this).hide();
	    		_login = true;
	    		airData.logOn($('#userName').val(), $('#pwd').val(),_handleLogOn);
	    		return false;
	    	});
	    }
    },
    
    
    
    _handleLogOn = function (ff, success) {
		if (success) {
			_ffNum = ff;
            console.log("t");
			airData.getDataforFF(_ffNum,_handleDataForFF);
		}
	};
   
    
    return {
        run:run,
    };
}();