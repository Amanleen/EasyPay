






   $('#PerformanceM-btn').on('click',function(){
		var content=$('#chatPubliclyMsg-ta').val();
		var content=$('#timeM-ta').val();
		if(content!=null && content.length >20)
			For timeM= 
		{
			var username = getCookie('username');
			var toname = '*';
			var msg = {
			    from: username,
			    to: toname,
			    content: content,
			    time: 0	//add time from client
			}
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
	


    con.request("/users/performanceM",{},function(data, code){
        var i=0;
        for(i = 0; i<data.length; i++){
            listOfUsersInDirectory=data[i];
            // console.log("*************listOfUsersInDirectory="+listOfUsersInDirectory);
            if(userName!=data[i].username)
            {
                
                













        redis_client.incr("requests", function (err, reply) {
            response.write(reply+'\n');                                                                                          
            response.end();
        });
}).listen(6666);

server.on('error', function(err){
    console.log(err);
    process.exit(1);
});







                 }
        }
    });
