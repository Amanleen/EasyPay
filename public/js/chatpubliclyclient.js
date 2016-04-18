/* Client side code for chat publicly */
/* Author: Amanleen Puri, October 2015 */

$(function(){
	var con = new connect(window.location.hostname);
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

	
	//GET DATE TIME IN YYYY-MM-DD hh:mm format
	var formatDateTime = function(datetime){
		var result="";
		// var datetime = new Date(timeInMillis);
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

	$('#chatPubliclyPost-btn').on('click',function(){
		var content=$('#chatPubliclyMsg-ta').val();
		if(content!==null && content.length >0)
		{
			var username = getCookie('username');
			var toname = '*';
			var dateTime = new Date();
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
			$(document).ready(function(){
			    $('#chatPubliclyMsg-ta').val('');
			});
		}
	});

	//SEARCH BUTTON ON CLICK
	$('#chatPubliclySearch-btn').on('click', function(){
		var searchQuery = $('#chatPubliclySearch-ip').val().trim();
		// var searcQueryList = searchQuery.split(" ");
		var isBanned = false;
        for (var name in banname) {
            if (searchQuery == banname[name]) {
              isBanned = true;
            }
        }
        var toSearch={keyword:searchQuery};
        console.log(toSearch);
        if(!isBanned){
        	con.request("/message/search",toSearch,function(data, code){
        		console.log(data.length);
        		$('#messageHistory-ul li').remove();
        		if(data.length>0){
	        		appendToUI(data);
	        	}else{
	        		$('#messageHistory-ul').append('<li class="list-group-item">No Result found</li>');
	        	}
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
			// console.log(msg);
			var message = arrayList[msg];
			var creationTime = getTime(message.time);
			$('#messageHistory-ul').append('<li class="list-group-item"><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+message.from+'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>&nbsp;'+creationTime+'</small></div><p>'+message.content+'</p><hr class="hr-clas-low"></div></li>');
		}

	}

	//Public chat history
   con.request("/message/wall",{},function(data, code){
   		if(data!==null && data.length>0){
   			appendToUI(data);
	        // for(var i = 0; i<data.length; i++){
	        //     var username=data[i].from;
	        //     var content=data[i].content;
	        //     var time = data[i].time;
	        //     console.log(time);
	        //     // console.log(formattedTime);
	        //     // console.log(new Date());
	        //     // var datenow = new Date();//get current time
	        //     // var messageDateTime = new Date(time);
	        //     // var formattedTime = formatDateTime(messageDateTime);
	        //     // var creationTime = humanized_time_span(formattedTime, formatDateTime(new Date()));//compare time to current time
	        //     var creationTime = getTime(time);
	        //     // $('#messageHistory-ul').append('<li class="list-group-item"><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+from+'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>'+creationTime+'</small></div><p>'+content+'</p><hr class="hr-clas-low"></div></li><br></br>');
	        //     $('#messageHistory-ul').append('<li class="list-group-item"><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+username+'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>&nbsp;'+creationTime+'</small></div><p>'+content+'</p><hr class="hr-clas-low"></div></li>');
	        // }
        }
    });

    //Post a new message
	con.subscribe("msg.new", function(data){
			// console.log("3224342="+data);
            var to=data.to;
            var from=data.from;
            var content=data.content;
            var time=data.time;
            var messageDateTime = new Date(parseInt(time));
            var formattedTime= formatDateTime(messageDateTime);
            // var creationTime=jQuery.timeago(creationTime1);
            var creationTime = getTime(time);
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
                $('#messageHistory-ul').append('<li class='+statusColorClass+'><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+from+'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>&nbsp;'+creationTime+'</small></div><p>'+content+'</p><hr class="hr-clas-low"></div></li>');
            });
        });
});