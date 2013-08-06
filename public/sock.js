						//server address
var socket = io.connect('http://localhost:8888');

function setName(name){
	socket.emit('who',{"name":name});
}

function enterRoom(rid,pass)
{
	socket.emit('enterRoom',{"ID":rid, "password":pass});
}

function send(p,lp,c){
	socket.emit('push',{"p":p,
						"lp":lp,
						"c":c}
				);
}

socket.on('get', function (data){

	gotData(data.p,data.lp,data.c);
});