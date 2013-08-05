						//server address
var socket = io.connect('http://localhost:8888');

function setName(name){
	socket.emit('who',{"name":name});
}

function enterRoom(rid,pass)
{
	socket.emit('enterRoom',{"ID":rid, "password":pass});
}

function send(x,y,c){
	socket.emit('push',{"x":x, "y":y, "c":c});
}

socket.on('get', function (data){
	gotData(data.x,data.y,data.c);
});