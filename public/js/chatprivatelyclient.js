/* Author: Amanleen Puri, October 2015 */
$(function(){
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
	var banname = ['about','access','account','accounts','add','address','adm','admin','administration','adult',
                      'advertising','affiliate','affiliates','ajax','analytics','android','anon','anonymous',
                      'api','app','apps','archive','atom','auth','authentication','avatar',
                      'backup','banner','banners','bin','billing','blog','blogs','board','bot','bots','business',
                      'chat','cache','cadastro','calendar','campaign','careers','cgi','client','cliente','code','comercial',
                      'compare','config','connect','contact','contest','create','code','compras','css',
                      'dashboard','data','db','design','delete','demo','design','designer','dev','devel','dir',
                      'directory','doc','docs','domain','download','downloads', 'edit','editor','email','ecommerce','forum',
                      'forums','faq','favorite','feed','feedback','flog','follow','file','files','free','ftp','gadget','gadgets',
                      'games','guest','group','groups','help','home','homepage','host','hosting','hostname','html','http','httpd',
                      'https','hpg','info','information','image','img','images','imap','index','invite','intranet','indice','ipad',
                      'iphone','irc','java','javascript','job','jobs','js','knowledgebase','log','login','logs','logout','list','lists',
                      'mail','mail1','mail2','mail3','mail4','mail5','mailer','mailing','mx','manager','marketing','master','me','media',
                      'message','microblog','microblogs','mine','mp3','msg','msn','mysql','messenger','mob','mobile','movie','movies',
                      'music','musicas','my','name','named','net','network','new','news','newsletter','nick','nickname','notes','noticias',
                      'ns','ns1','ns2','ns3','ns4','old','online','operator','order','orders','page','pager','pages','panel','password',
                      'perl','pic','pics','photo','photos','photoalbum','php','plugin','plugins','pop','pop3','post','postmaster','postfix',
                      'posts','profile','project','projects','promo','pub','public','python','random','register','registration','root','ruby','rss',
                      'sale','sales','sample','samples','script','scripts','secure','send','service','shop','sql','signup','signin','search',
                      'security','settings','setting','setup','site','sites','sitemap','smtp','soporte','ssh','stage','staging','start','subscribe',
                      'subdomain','suporte','support','stat','static','stats','status','store','stores','system','tablet','tablets','tech',
                      'telnet','test','test1','test2','test3','teste','tests','theme','themes','tmp','todo','task','tasks','tools','tv','talk',
                      'update','upload','url','user','username','usuario','usage','vendas','video','videos','visitor','win','ww','www','www1',
                      'www2','www3','www4','www5','www6','www7','wwww','wws','wwws','web','webmail','website','websites','webmaster','workshop',
                      'xxx','xpg','you','yourname','yourusername','yoursite','yourdomain'
                      ];

	var username = getCookie('username');
	var url = window.location.href;
	console.log("url="+url);
	var selectedUserName = url.split("=")[1];
	var dummy={
		from:username,
		to:selectedUserName
	};
	var userRole="cit";
	var selectedUserObj="";
	var selectedUserRole ="";
	var selDisplayRole = "";

	var con = new connect(window.location.hostname, username);
	$('#chatPrivatelyTitlename-h').text(selectedUserName);
	// var listOfRole = new Array();
	// listOfRole['Citizen']='Citizen';
	// listOfRole['Coordinator']='Coordinator';
	// listOfRole['Monitor']='Monitor';
	// listOfRole['Administrator']='Administrator';

	//TODO
	//Check if userRole === Administrator only then add
	// var userRole='Citizen'


	con.request('/user/status', {name:username}, function(data, code) {
		if (code == 200) {
			userRole = data.role;
			if(userRole=='admin'){
				$('#chatprivatelyUserRole-btn').removeClass('hidden');
				$('#chatprivatelyEdit-btn').removeClass('hidden');
			}else{
				$('#chatprivatelyUserRole-btn').addClass('hidden');
				$('#chatprivatelyEdit-btn').addClass('hidden');	
			}
			console.log("Response: ",data);
		}else {
			alert('Update failed.');
		}
	});

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
        }else if(userRoleInput=='inact'){
            displayUserRole = "Inactive";
        }
        return displayUserRole;
	}

	function getActualRoleFromDisplayRole(userRoleInput){
		var actualUserRole='';
		if(userRoleInput== 'Administrator'){
            actualUserRole = 'admin';
        }else if(userRoleInput=='Monitor'){
            actualUserRole = 'mon'; 
        }else if(userRoleInput=='Coordinator'){
            actualUserRole = 'cord';
        }else if(userRoleInput=='Citizen'){
            actualUserRole = 'cit';
        }else if(userRoleInput=='Inactive'){
        	actualUserRole = 'inact';
        }
        return actualUserRole;
	}
	
	con.request('/user/status', {name:selectedUserName}, function(data, code) {
        if (code == 200) {
            // window.location = '../html/settings.html';
            console.log("********** data=", data);
            selectedUserObj = data;
            selectedUserRole = data.role;
            selDisplayRole = getDisplayRoleFromActualRole(selectedUserRole);
            console.log(selDisplayRole);
            $('#chatprivatelyUserRole-btn').text(selDisplayRole);
            $('#chatprivatelyUserRole-btn').append('<span class="caret"></span>');
            $('#'+selDisplayRole).addClass('active');
            // onUpdateUserRole(userRole);
            console.log("Response: ",data);
        }else {
            alert('Update failed.');
        }
     });

	if(selectedUserName=='SSNAdmin'){
		$('#chatPrivatelyTitlename-h').append('<div class="btn btn-group pull-right" role="group" style><button type="button" id="chatprivatelyEdit-btn" class="btn btn-info">edit</button></div> <div class="clearfix"></div>');
	}else{
		$('#chatPrivatelyTitlename-h').append('<div class="btn btn-group pull-right" role="group" style><button id="chatprivatelyUserRole-btn" type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">Role<span class="caret"></span></button><ul class="dropdown-menu" id="chatprivatelyRole-ul"><li id="Citizen"><a href="#">Citizen</a></li><li id="Coordinator"><a href="#">Coordinator</a></li><li id="Administrator"><a href="#">Administrator</a></li><li id="Monitor"><a href="#">Monitor</a></li><li id="Inactive"><a href="#">Inactive</a></li></ul> &nbsp;<button type="button" id="chatprivatelyEdit-btn" class="btn btn-info">edit</button></div> <div class="clearfix"></div>');
	}

	$('#chatprivatelySaveProfile-btn').on('click', function(){
		console.log('------ save profile ------');
		var usernameEntered = $('#chatprivatelyUsername-ip').val();
		var passwordEntered = $('#chateprivatelyPassword1-ip').val();
		var passwordReEntered = $('#chateprivatelyPassword2-ip').val();
		var userObj = {
			username:selectedUserName, 
			newusername:'', 
			pwd:''
		};

		//

		$("#errorBlock1-sp").hide();
		$("#errorBlock2-sp").hide();
		$("#errorBlock3-sp").hide();

		var isBanned = false;
		var isInvalid = false;
		  
		if(usernameEntered.length < '3') {
			$("#errorBlock1-sp").text("User name should be atleast 3 characters long");
			$("#errorBlock1-sp").show();
			isInvalid = true;
		  }
		  
		  if (passwordEntered.length < '4') {
			$("#errorBlock2-sp").text("Password should be atleast 4 characters long");
			$("#errorBlock2-sp").show();
			isInvalid = true;
		  }
		  if (passwordEntered != passwordReEntered) {
			$("#errorBlock3-sp").text("Passwords dont match");
			$("#errorBlock3-sp").show();
			isInvalid = true;
		  }
		//

		if(usernameEntered != selectedUserName){
			for (var name in banname) {
				if (usernameEntered == banname[name]) {
				  isBanned = true;
				}
		  	}
		  	if(!isBanned && !isInvalid){
		  		userObj.newusername = usernameEntered;
		  	}
		}
		if (isBanned) {
			$("#errorBlock1-sp").text("User name is banned");
			$("#errorBlock1-sp").show();
			isInvalid = true;
		}
		if(!isInvalid && !isBanned){
			userObj.pwd = passwordEntered;
			con.request('/user/update/pwd',userObj, function(data, code){
				if(code===201){
					$("#errorBlock3-sp").text(" Successfully completed!");
					$("#errorBlock3-sp").show();
				}else if(code === 400){
					$("#errorBlock3-sp").text(" Username already exists! Please select another user name");
					$("#errorBlock3-sp").show();
				}else if(code === 404){
					$("#errorBlock3-sp").text(" This user does not exist!");
					$("#errorBlock3-sp").show();
				}
			});
		}
	});

	$('#chatprivatelyRole-ul').on('click','li', function(){
		console.log('*********** selDisplayRole ='+selDisplayRole);
		var newRoleSelected = this.id;
		console.log('*********** newRoleSelected ='+newRoleSelected);
		//TODO 
		//call REST API to update user role in db i/p:this.id make a user object
		//in the con.request: on success '201' update userRole
		//send a chat publicly msg
		var newRole = getActualRoleFromDisplayRole(this.id);
		selectedUserObj.role = newRole;
		console.log("Selecetd user=",selectedUserObj);
		con.request('/user/update', selectedUserObj, function(data, code) {
			if (code == 201) {
				$('#'+selDisplayRole).removeClass('active');
				$('#chatprivatelyUserRole-btn').text(newRoleSelected);
            	$('#chatprivatelyUserRole-btn').append('<span class="caret"></span>');
            	$('#'+newRoleSelected).addClass('active');
            	selDisplayRole = newRoleSelected;

				var toname = '*';
				var dateTime = new Date();
				var content = "Updated <i>"+selectedUserObj.username+"</i> role to <i>"+newRoleSelected+"</i>";
				var dateTimeInMilliSecs = dateTime.getMilliseconds();
				var msg = {
				    from: username,
				    to: toname,
				    content: content,
				    time: parseInt(dateTimeInMilliSecs)	//add time from client
				};
				console.log(msg);
				con.request("/message", msg, function(data, code) {
				    console.log(code);
				    if(code==201){

				    }
				});
			}else {
				alert('Update failed.');
			}
		});
	});

	$('#chatprivatelyEdit-btn').on('click', function(){
		$('#chatprivatelyEdit-btn').attr('data-toggle','modal');
		$('#chatprivatelyEdit-btn').attr('data-target','#chatprivatelyEditModal');
		$('#chatprivatelyUsername-ip').val(selectedUserName);
	});

	$('#chatPrivatelyPost-btn').on('click',function(){
		var content=$('#chatPrivatelyMsg-ta').val();
		if(content!==null && content.length >0)
		{
			var dateTime = new Date();
			var dateTimeInMilliSecs = dateTime.getMilliseconds();
			var msg = {
			    from: username,
			    to: selectedUserName,
			    content: content,
			    time:parseInt(dateTimeInMilliSecs) 	//add time from client
			};
			con.request("/chat", msg, function(data, code) {
			    console.log(code);
			    if(code==201){

			    }
			});
			$(document).ready(function(){
			    $('#chatPrivatelyMsg-ta').val('');
			});
		}
	});

	function getTime(timeInMillis){
		var d = new Date(parseInt(timeInMillis));
		var formattedTime = formatDateTime(d);
		var creationTime = humanized_time_span(formattedTime, formatDateTime(new Date()));//compare time to current time
	    // var result=(d.getMonth()+1)+"."+d.getDate()+"."+d.getFullYear();
	    return creationTime;
	}

	function appendToUI(arrayList){
		for(var msg in arrayList){
			console.log(msg);
			var message = arrayList[msg];
			var creationTime = getTime(message.time);
			$('#chatPrivatelyMessageHistory-ul').append('<li class="list-group-item"><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+message.from+'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>&nbsp;'+creationTime+'</small></div><p>'+message.content+'</p><hr class="hr-clas-low"></div></li>');
		}
	}

	//SEARCH BUTTON ON CLICK
	$('#chatPrivatelySearch-btn').on('click', function(){
		var searchQuery = $('#chatPrivatelySearch-ip').val().trim();
		var isBanned = false;
        for (var name in banname) {
            if (searchQuery == banname[name]) {
              isBanned = true;
            }
        }
        if(!isBanned){
        	var toSearch={from:username, to:selectedUserName, keyword:searchQuery};
        	console.log(toSearch);
        	con.request("/chat/search",toSearch,function(data, code){
        		console.log(data.length);
        		$('#chatPrivatelyMessageHistory-ul li').remove();
        		if(data.length>0){
	        		appendToUI(data);
	        	}else{
	        		$('#chatPrivatelyMessageHistory-ul').append('<li class="list-group-item">No Result found</li>');
	        	}
        	});
        }
		//TODO
		//$('#messageHistory-ul').remove('li')
		//append searc result li only 10 msgs
		//or no result found
	});

	//GET DATE TIME IN YYYY-MM-DD hh:mm format
	var formatDateTime = function(datetime){
		var result="";
		result=(datetime.getMonth()+1)+"."+datetime.getDate()+"."+datetime.getFullYear();
		var hours = datetime.getHours();
		var minutes = datetime.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		result = result+" "+strTime;
		return result;
	};

	con.subscribe("chat.new", function(data){
        var to=data.to;
        var from=data.from;
        var content=data.content;

        // switch Unix Time to Standard Time
        var time=data.time;
        // var unixtime=new Date(time*1000);
        var realtime=getTime(parseInt(time));
		// var messageDateTime = new Date(realtime);
		// var formattedTime= formatDateTime(messageDateTime);
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
        $(document).ready(function(){
        	$('#chatPrivatelyMessageHistory-ul').append('<li class='+statusColorClass+'><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+from+'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>&nbsp;'+realtime+'</small></div><p>'+content+'</p><hr class="hr-clas-low"></div></li>');
            // $('#chatPrivatelyMessageHistory-ul').append('<li class="left clearfix" style="list-style-type: none"><span class="chat-img pull-left"><input type="button" class='+statusColorClass+'disabled></input></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+from+'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>'+realtime+'</small></div><p>'+content+'</p><hr class="hr-clas-low"></div></li><br></br>');
            // $('#chatPrivatelyMessageHistory-ul').append('<li class='+statusColorClass+'><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+from+'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>&nbsp;'+realtime+'</small></div><p>'+content+'</p><hr class="hr-clas-low"></div></li><br></br>');
        });
    });

	con.request("/chat/wall",dummy,function(data, code){
   		if(data!==null && data.length>0){
   			appendToUI(data);
        }
    });
});