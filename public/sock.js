						//server address
var socket = io.connect('http://localhost:888');

function send(x,y,c){
	socket.emit('push',{"x":x, "y":y, "c":c});
}

socket.on('get', function (data){
	gotData(data.x,data.y,data.c);
});