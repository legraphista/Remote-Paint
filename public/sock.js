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
	document.getElementById("cvBackImg").style.display = "none";
	document.getElementById("cvBackImg").src = '';
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

function showUploadFile()
{
	document.getElementById("div_setimg").style.display = "block";
	document.getElementById("bkmsg").style.display = "block";
}

var delivery = new Delivery(socket);

function hideUploadImage(){
	document.getElementById("cvBackImg").style.display = "block";
	document.getElementById("div_setimg").style.display = "none";
	document.getElementById("bkmsg").style.display = "none";
}
delivery.on('receive.success',function(file){
	if (file.isImage()) {
		document.getElementById("cvBackImg").src = file.dataURL();
		hideUploadImage();
	};
});

function sendImageToServer(){
	if(typeof document.getElementById("file_img").files[0] === 'undefined') return;
	
	var file = document.getElementById("file_img").files[0];
	delivery.send(file);

}