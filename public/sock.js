						//server address
var socket = io.connect('http://192.168.0.109:8888');

function setName(name){
	socket.emit('who',{"name":name});
}

function enterRoom(rid,pass)
{
	socket.emit('enterRoom',{"ID":rid, "password":pass});
}

function sendClear(){
	socket.emit('sendClear',{});
}
socket.on('clearCanvas', function(){
	clearCanvas();
});

function send(p,lp,c,w){
	socket.emit('push',{"p":p,
						"lp":lp,
						"c":c,
						"w":w}
				);
}
function refreshNameList(){
	socket.emit('getNameList',{});
}
socket.on('nameList', function(data){
	buildNameList(data);
});

socket.on('get', function (data){

	gotData(data.p,data.lp,data.c,data.w);
});

var roomfound;
var roomHasPassword;
var gotRoomPassMSG = false;

function roomHasPass(rid){
	socket.emit('haspass',{"ID":rid});
	socket.on('roomPass', function (data){
		roomfound = data.RF;
		roomHasPassword = data.HP;
		gotRoomPassMSG = true;
	});
}