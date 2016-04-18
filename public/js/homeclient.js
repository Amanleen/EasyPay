/* Author: Amanleen Puri, October 2015 */

$(function() {
	// var con = new connect(window.location.hostname);
    var userListArray = new Array();
    var dirUserListToDisplay = new Array();
    
    var listOfUsersInDirectory = new Array();
    
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
        }
        return "";
    }
    var userName = getCookie('username');
    var userRole = 'cit';//'Admin' 'Monitor' 'Coordinator' 'Citizen'
    var displayUserRole = '';

    function getDisplayRoleFromActualRole(userRoleInput){
        var displayUserRole="";
        if(userRoleInput=='admin'){
            displayUserRole = "Administrator";
        }else if(userRoleInput=='mon'){
            displayUserRole = "Monitor"; 
        }else if(userRoleInput=='cord'){
            displayUserRole = "Coordinator";
        }else if(userRoleInput=='cit'){
            displayUserRole = "Citizen";
        }
        return displayUserRole;
    }
    //TODO
    //Call the REST API to get the details by sending the username, then find role from the user object
    // con.request('/user/status', {name:userName}, function(data, code) {
    //     if (code == 200) {
    //         // window.location = '../html/settings.html';
    //         userRole = data.role;
    //         onUpdateUserRole(userRole);
    //         console.log("Response: ",data);
    //     }else {
    //         alert('Update failed.');
    //     }
    // });
    

    var isUserAdmin = false;
    var isUserMonitor = false;
    var isUserCoordinator = false;
    var isUserCitizen = false;

    function onUpdateUserRole(userRole){
        if(userRole=='admin'){
            displayUserRole = "Administrator";
            isUserAdmin = true;
        }else if(userRole=='mon'){
            displayUserRole = "Monitor";
            isUserMonitor=true;
        }else if(userRole=='cord'){
            displayUserRole = "Coordinator";
            isUserCoordinator=true;
        }else if(userRole=='cit'){
            displayUserRole = "Citizen";
            isUserCitizen = true;
        }
        $('#homePageUsernameTitle-s').text(userName+" as "+displayUserRole);
        if(isUserCitizen){
            $('#performanceNavButton-a').addClass('hidden');
        }else if(isUserCoordinator){
            $('#performanceNavButton-a').addClass('hidden');
        }else if(isUserMonitor){
             $('#performanceNavButton-a').removeClass('hidden');
        }else if(isUserAdmin){
             $('#performanceNavButton-a').removeClass('hidden');
        }
    }

    

    function prepareDropdown_back(userList, type){
        // console.log("userList="+userList);
        var i=0;
        for(i = 0; i<userList.length; i++){
            if(userName!=userList[i].username){
                var username=userList[i].username;
                if(type=='Directory'){
                    userListArray[username]=userList[i];
                }
                AppendUserToDropdown(userList[i], type);
            }
        }
    }

    function compareUser(user1, user2){
    	if (user1.place < user2.place) {
    		return-1;
    	}else if (user1.place > user2.place) {
    		return 1;
    	}else {
       		 if(user1.username < user2.username){
          		  return -1;
     		 }else if(user1.username > user2.username){
         		   return 1;
       		 }else{
          		  return 0;
     		 }
    	}
    }
    
    function updateDirUI(arrayList, type){
        // dirUserListToDisplay.sort(compareUser);
        var arrayWdIntIndex = new Array();
        var cntr = 0;
        for(var eachUserName in arrayList){
            arrayWdIntIndex[cntr]=arrayList[eachUserName];
            cntr ++;
        }
        arrayWdIntIndex.sort(compareUser);
        // console.log("*********** 3 **********");
        // console.log(arrayWdIntIndex);
        $('#homeDirectory-ul li').remove();
        for(eachUserName in arrayWdIntIndex){
            console.log("*********** 4 **********",arrayWdIntIndex[eachUserName]);
            AppendUserToDropdown(arrayWdIntIndex[eachUserName], type);
        }
    }

    function prepareDropdown(userList, type){
        var i=0;
        var messageDisplayList = new Array();
        for(i = 0; i<userList.length; i++){
            if(userName!=userList[i].username){
                var username=userList[i].username;
                if(type=='Directory'){
                    dirUserListToDisplay[username]=userList[i];
                }else if(type=='Message'){
                    // console.log("****** 1 ******** msg list username="+username);
                    messageDisplayList[username]=userList[i];
                }
                // AppendUserToDropdown(userList[i], type);
            }
        }
        if(type=='Directory'){
            updateDirUI(dirUserListToDisplay, type);
        }else if(type=='Message'){
            updateDirUI(messageDisplayList, type);
        }
    }

    function updateDropdown(revisedUserList, type){
        // dirUserListToDisplay;
        var usersToModifyList = new Array();
        for(var i=0; i<revisedUserList.length; i++){
            if(userName!=revisedUserList[i].username){
                var isStatusChange = dirUserListToDisplay[revisedUserList[i].username].sta!=revisedUserList[i].sta;
                var isPlaceChange = dirUserListToDisplay[revisedUserList[i].username].place!=revisedUserList[i].place;
                var isRoleChanged = dirUserListToDisplay[revisedUserList[i].username].role!=revisedUserList[i].role;
                // console.log("--------- ",dirUserListToDisplay[revisedUserList[i].username].role);
                // console.log("--------- ",revisedUserList[i].role);
                // console.log("---- isRoleChanged="+isRoleChanged);
                if(dirUserListToDisplay[revisedUserList[i].username]===undefined){
                    if(type=='Directory'){
                        dirUserListToDisplay[revisedUserList[i].username]=revisedUserList[i];
                    }
                }else if( isStatusChange || isPlaceChange || isRoleChanged){
                    if(type == 'Directory'){
                        dirUserListToDisplay[revisedUserList[i].username].sta=revisedUserList[i].sta;
                        dirUserListToDisplay[revisedUserList[i].username].place=revisedUserList[i].place;
                        dirUserListToDisplay[revisedUserList[i].username].role=revisedUserList[i].role;
                        usersToModifyList[revisedUserList[i].username]=dirUserListToDisplay[revisedUserList[i].username];
                    }
                }
            }
        }
        updateDirUI(dirUserListToDisplay, type);
    }

    function getOnlineImgClass(isOnline){
        if(isOnline){
            return '\"glyphicon glyphicon-eye-open\"';
        }else{
            return '\"glyphicon glyphicon-user\"';
        }
    }

    function AppendUserToDropdown(user, type) {
        var status=user.sta;
        var place=user.place;
        var name=user.place;
        var statusColorClass = statusColorClassForStatus(status);
        var onlineStatusImg = getOnlineImgClass(user.online);
        var role = getDisplayRoleFromActualRole(user.role);
        AppendDropdown(user.username, status, place, name, statusColorClass, onlineStatusImg, role, type);
    }

    function AppendDropdown(username, status, place, name, statusColorClass, onlineStatusImgClass, role, type){
        // $('#homeDirectory-ul').append('<li class='+statusColorClass+'><a href="#" class='+statusColorClass+'><span class="glyphicon glyphicon-user"></span>&nbsp;'+username+'<br>'+place+'<span class="badge">'+pMessageCount+'</span></a></li>');
        if(type=='Message'){
            $('#privateMsgUserList-ul').append('<li id="userList-ul-li-'+username+'-'+$('#privateMsgUserList-ul li').size()+'"><a id="statusColor-a" href="#" class='+statusColorClass+'><span class="glyphicon glyphicon-user"></span>&nbsp;'+username+' @ '+place+'<br>'+role+'</a></li>');
        }else if(type=='Directory'){
            $('#homeDirectory-ul').append('<li id="homeDirectory-ul-li-'+username+'-'+$('#homeDirectory-ul li').size()+'"><a id="statusColor-a" href="#" class='+statusColorClass+'><span class='+onlineStatusImgClass+'></span>&nbsp;'+username+' @ '+place+'<br>'+role+'</a></li>');
        }
    }

    function performSearchQuery(query, type, searchAttribute) {
        var showSearchResult = (query!=='' && query!==null);
        var searchResultArray = new Array();
        $('#homeDirectory-ul li').remove();
        var flagDisplayingResult=false;
        if(searchAttribute=='username'){
            for (var username in dirUserListToDisplay) {
                var user = dirUserListToDisplay[username];
                if ((showSearchResult && (username.indexOf(query) >= 0 || user.name.indexOf(query) >= 0)) || !showSearchResult) {
                    flagDisplayingResult = true;
                    // AppendUserToDropdown(user, type);
                    searchResultArray.push(user);
                }
            }
        }else if(searchAttribute=='status'){
            for (var username in dirUserListToDisplay) {
                var user = dirUserListToDisplay[username];
                var status = user.sta;
                if ((showSearchResult && (status.indexOf(query) >= 0 || status.indexOf(query) >= 0)) || !showSearchResult) {
                    flagDisplayingResult = true;
                    // AppendUserToDropdown(user, type);
                    searchResultArray.push(user);
                }
            }
        }
        updateDirUI(searchResultArray, type);
        if(showSearchResult && !flagDisplayingResult){
            if(searchAttribute=='username'){
                $("#cancelSearchList-btn").removeClass('hidden');
            }
            $('#homeDirectory-ul').append('<li id="homeDirectory-ul-li-NoUser" class="list-group-item">No Record found</li>');
        }else if (showSearchResult) {
            if(searchAttribute=='username'){
                $("#cancelSearchList-btn").removeClass('hidden');
            }
        }else {
            if(searchAttribute=='username'){
                $("#cancelSearchList-btn").addClass('hidden');
            }
            $('#searchDirectory-ip').val('');
        }
    }

    function statusColorClassForStatus(status){
        var statusColorClass;
        if(status=='green')
        {
            statusColorClass='\"list-group-item list-group-item-success\"';
        }else if(status=='red'){
            statusColorClass='\"list-group-item list-group-item-danger\"';
        }else if(status=='yellow'){
            statusColorClass='\"list-group-item list-group-item-warning\"';
        }else{
            statusColorClass='\"list-group-item\"';
        }
        return statusColorClass;
    }
    //List of registered users in directory
    // con.request("/users",{},function(data, code){
    //     prepareDropdown(data, 'Directory');
    // });

    // con.subscribe("users.new",{},function(data, code){
    //     //TODO
    //     //Update dropdown with new users
    //     //add the count of new users to Directory badge : directoryNavBtn-badge
    //     prepareDropdown(data, 'Directory');
    // });


    // //List of users in private chat
    // con.request("/users/chatbuddies/"+userName,{},function(data, code){
    //     prepareDropdown(data, 'Message');
    // });

    var getUserObjFromLiId = function(liId){
        var arrOfLiSplit = liId.split('-');
        var liName=arrOfLiSplit[arrOfLiSplit.length-2];
        return liName;
    };

    /* All on click functions from the navigation bar */

    $("#filterSearchDirectory-btn").on('click', function(e){
        $('#filterSearchDirectory-dv').removeClass('hidden');
        $('#cancelfilterSearchDirectory-btn').removeClass('hidden');
        $('#searchDirectory-btn').addClass('hidden');
        $('#searchDirectory-ip').addClass('hidden');
        $('#filterSearchDirectory-btn').addClass('hidden');
    });

    $('#homeGreen-btn').click(function() {
        status = "green";
        $('#homeRed-btn').prop('disabled', true);
        $('#homeYellow-btn').prop('disabled', true);
        $("#reset-a").removeClass('hidden');
        performSearchQuery(status, 'Directory', 'status');
     });
     $('#homeYellow-btn').click(function() {
        status = "yellow";
        $('#homeRed-btn').prop('disabled', true);
        $("#reset-a").removeClass('hidden');
        $('#homeGreen-btn').prop('disabled', true);
        performSearchQuery(status, 'Directory', 'status');
     });
     $('#homeRed-btn').click(function() {
        status = "red";
        $("#reset-a").removeClass('hidden');
        $('#homeYellow-btn').prop('disabled', true);
        $('#homeGreen-btn').prop('disabled', true);
        performSearchQuery(status, 'Directory', 'status');
     });
     $('#reset-a').click(function() {
        status = "";
        $('#homeRed-btn').prop('disabled', false);
        $('#homeYellow-btn').prop('disabled', false);
        $('#homeGreen-btn').prop('disabled', false);
        $("#reset-a").addClass('hidden');
        performSearchQuery('', 'Directory', 'status');
     });
     $('#cancelfilterSearchDirectory-btn').on('click', function(){
        $('#filterSearchDirectory-dv').addClass('hidden');
        $('#cancelfilterSearchDirectory-btn').addClass('hidden');
        $("#reset-a").addClass('hidden');
        $('#searchDirectory-btn').removeClass('hidden');
        $('#searchDirectory-ip').removeClass('hidden');
        $('#filterSearchDirectory-btn').removeClass('hidden');
        $('#homeRed-btn').prop('disabled', false);
        $('#homeYellow-btn').prop('disabled', false);
        $('#homeGreen-btn').prop('disabled', false);
        performSearchQuery('', 'Directory', 'status');
     });

     // function sortUsersForDirectory(arrayOfUsers){
     //    arrayOfUsers.sort(compareUser);
     // }

     

    // $("#directoryNavButton-a").on('click',function(e){
    //     con.request("/users",{},function(data, code){
    //         data.sort(compareUser);
    //         updateDropdown(data, 'Directory');
    //     });
    // });

    $('#searchDirectory-btn').on('click',function(e){
        var userNameToSearch = $('#searchDirectory-ip').val().trim();
        var isBanned = false;
        for (var name in banname) {
            if (userNameToSearch == banname[name]) {
              isBanned = true;
            }
        }
        if(!isBanned){
            $('#filterSearchDirectory-btn').addClass('hidden');
            performSearchQuery(userNameToSearch, 'Directory', 'username');
        }
    });

    $("#cancelSearchList-btn").on('click', function(e){
        $('#filterSearchDirectory-btn').removeClass('hidden');
        performSearchQuery('', 'Directory', 'username');
    });

	$("#settingsTab-li").on('click', function(e){
		$('#homeCurrentView-if').attr('src','../html/settings.html');
	});
	$("#homeDirectory-ul").on('click','li' ,function(e) {
        var liUserName = getUserObjFromLiId(this.id);
	    $('#homeCurrentView-if').attr('src','../html/chatprivately.html?selectedUserName='+liUserName);
	});
    $("#privateMsgUserList-ul").on('click','li' ,function(e) {
        var liUserName = getUserObjFromLiId(this.id);
        $('#homeCurrentView-if').attr('src','../html/chatprivately.html?selectedUserName='+liUserName);
    });

	$("#homeTab-li").on('click', function(e) {
	    $('#homeCurrentView-if').attr('src','../html/chatpublicly.html');
	});
	$("#announcementTab-li").on('click', function(e) {
		$('#homeCurrentView-if').attr('src','../html/announcements.html');
	});
    // $("#logoutTab-li").on('click', function(e){
    //     con.request('/user/logout',{},function(){
    //         console.log("Logged out successfully from db");
    //     });
    //     document.cookie = 'username='+userName+';expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/html ';
    //     window.location='../html/login.html';
    // });

    $('#start-btn').on('click', function(e){
        inputDuration = $('#performance-ip').val().trim();
        // console.log(inputDuration);
        $('#start-btn').addClass('hidden');
        $('#stop-btn').removeClass('hidden');

		stopFlag = false;

		setTimeout(function() {
			stopFlag = true;
		}, inputDuration * 1000);

		var msg = {
			from: 'test',
			to: '*',
			content: 'This is a test message to public.',
			time: 0
		};

		getNum = 0;
		postNum = 0;

		var sendReq = function() {
			// if (! stopFlag) {
			// 	con.request('/measure/msg', msg, sendWall);
			// 	postNum++;
			// 	console.log('POST ' + postNum);
			// }else {
			// 	con.request('/measure/stop', {}, showStop);
			// }
		};

		var sendWall = function() {
			// if (! stopFlag) {
			// 	con.request('/measure/wall', {}, sendReq);
			// 	getNum++;
			// 	console.log('GET ' + getNum);
			// }else {
			// 	con.request('/measure/stop', {}, showStop);
			// }
		};

		// con.request('/measure/start', {}, sendReq);

    });

	function showStop() {
		var pps = postNum/ inputDuration;
		var gps = getNum / inputDuration;

		alert(pps + ' POSTs per sec.\n' + gps + ' GETs per sec.');
        $('#performance-ip').val('');
        $('#stop-btn').addClass('hidden');
        $('#start-btn').removeClass('hidden');

	}

    $('#stop-btn').on('click', function(e){
		stopFlag = true;
    });
});
