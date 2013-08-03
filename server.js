var port = 888;

var io = require('socket.io');
var connect = require('connect');

var htmlServer = connect().use(connect.static('public')).listen(port);

var sockIOconns = io.listen(htmlServer, { log: false });

var sockets = [];

sockIOconns.sockets.on('connection', function(socket){

	sockets.push(socket);
	
	socket.on('disconnect',function(){
		var i = sockets.indexOf(socket);
		delete sockets[i];
	});
	
	socket.on('push', function(data){
		
		for(var i = 0; i<sockets.length; i++)
		{
		 
			if(!sockets[i])continue;
			if(sockets[i].disconnected)continue;
				 
			sockets[i].emit('get',data);
			
		}
	});
});