$(function(){
        $('#signUpBack-btn').click(function(){
            window.location='../html/landing.html';
        });
    });

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
	$(function(){
        $('#signupback').click(function(){
            window.location='/landing/landing.html';
        });
    });
	$(function(){
        $('#signUpForm-btn').click(function() {
		  
		  $("#errorBlock1-sp").hide();
		  $("#errorBlock2-sp").hide();
		  $("#errorBlock3-sp").hide();
		  // $("#p1msg").hide();
		  
		  var isBanned = false;
		  var isInvalid = false;
		  var selectedName = $('#username-ip').val().trim();
		  
		  for (var name in banname) {
			if (selectedName == banname[name]) {
			  isBanned = true;
			}
		  }
		  if(selectedName.length < '3') {
			$("#errorBlock1-sp").text("User name should be atleast 3 characters long");
			$("#errorBlock1-sp").show();
			isInvalid = true;
		  }
		  if (isBanned) {
			$("#errorBlock1-sp").text("User name is banned");
			$("#errorBlock1-sp").show();
			isInvalid = true;
		  }
		  if ($('#password1-ip').val().trim().length < '4') {
			$("#errorBlock2-sp").text("Password should be atleast 4 characters long");
			$("#errorBlock2-sp").show();
			isInvalid = true;
		  }
		  if ($('#password1-ip').val().trim() != $('#password2-ip').val().trim()) {
			$("#errorBlock3-sp").text("Passwords dont match");
			$("#errorBlock3-sp").show();
			isInvalid = true;
		  }
          if (!isInvalid) {
			var con = new connect(window.location.hostname);
			con.request('/user/signup', {userName: selectedName, password:$('#password1-ip').val().trim()}, function(data, code) {
					if (code == 200) {
					  $("#errorBlock3-sp").text("User name exists. Go back and try log in");
			          $("#errorBlock3-sp").show();
					}
					else if(code == 201) {
						document.cookie=selectedName;
						document.cookie = 'username='+selectedName;
						window.location='../html/welcome.html';
					}
			});
		  }
        });
    });