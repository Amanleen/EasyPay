$(function(){
	
	function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }
    var userName = getCookie('username');
	var status = "";
	var con = new connect(window.location.hostname);
	var usr = {name:userName};
	var userRole="cit";

	con.request('/user/status', usr, function(data, code) {
		if (code == 200) {
			console.log("result req 1=",data);
			// window.location = '../html/settings.html';
			userRole = data.role;
			$('#settingsName-ip').val(data.name);
			$('#settingsLocation-ip').val(data.place);
			status = data.sta;
			if(status=='red'){
				selectedRed();
			}else if(status == 'yellow'){
				selectedYellow();
			}else if(status == 'green'){
				selectedGreen();
			}
			console.log("Response: ",data);
		}else {
			alert('Update failed.');
		}
	});

	function selectedRed(){
		status = "red";
	 	$("#resetStatus-div").removeClass('hidden');
	 	$('#settingsYellow-btn').prop('disabled', true);
	 	$('#settingsGreen-btn').prop('disabled', true);
	 	$("#errorBlock1-sp").hide();
	}

	function selectedYellow(){
		status = "yellow";
	 	$('#settingsRed-btn').prop('disabled', true);
	 	$("#resetStatus-div").removeClass('hidden');
	 	$('#settingsGreen-btn').prop('disabled', true);
	 	$("#errorBlock1-sp").hide();
	}

	function selectedGreen(){
		status = "green";
	 	$('#settingsRed-btn').prop('disabled', true);
	 	$('#settingsYellow-btn').prop('disabled', true);
	 	$("#resetStatus-div").removeClass('hidden');
	 	$("#errorBlock1-sp").hide();
	}


	$('#settingsGreen-btn').click(function() {
	 	selectedGreen();
	 });
	 $('#settingsYellow-btn').click(function() {
	 	selectedYellow();
	 });
	 $('#settingsRed-btn').click(function() {
	 	selectedRed();
	 });
	 $('#reset-btn').click(function() {
	 	status = "";
	 	$('#settingsRed-btn').prop('disabled', false);
	 	$('#settingsYellow-btn').prop('disabled', false);
	 	$('#settingsGreen-btn').prop('disabled', false);
	 	$("#resetStatus-div").addClass('hidden');
	 	$("#errorBlock1-sp").hide();
	 });


	
	$('#settingsSubmit-btn').click(function(){
		$("#errorBlock1-sp").hide();
		$("#errorBlock2-sp").hide();
		$("#errorBlock3-sp").hide();
		var name = $("#settingsName-ip").val();
		// var location = $("#settingsLocation-ip").val();
		var blankStatus=false, blankName=false, blankLocaion=false;
		if(status=="" || status == null){
			 blankStatus=true;
			 $("#errorBlock1-sp").text("Select a status.");
			 $("#errorBlock1-sp").show();
		}
		if(name=="" || name == null){
			blankName=true;
			$("#errorBlock2-sp").text("Enter your chat name");
			$("#errorBlock2-sp").show();
		}
		// if(location=="" || location == null){
		// 	blankLocaion = true;
		// 	$("#errorBlock3-sp").text("Enter your location");
		// 	$("#errorBlock3-sp").show();
		// }
		// if(!blankStatus && !blankName && !blankLocaion){
		if(!blankStatus && !blankName){
			if(userRole==""|| ! userRole){
				userRole='cit';
			}
			var user = {
				username: userName,
				sta: status,
				place: '',
				name: name,
				role:userRole
			};
			console.log("Input user=", user);
			con.request('/user/update', user, function(data, code) {
				if (code == 201) {
					window.location = '../html/home.html';
				}else {
					alert('Update failed.');
				}
			});
		}
	});

});