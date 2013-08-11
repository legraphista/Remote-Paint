var _name;
var _rid;
var finishedAsking = false;


window.onload = function () {
					cv = document.getElementById('canv');
					cx = cv.getContext("2d");
					clearCanvas();
					
					document.getElementById('text_rid').onkeypress = function (e){
						if (e.keyCode == 13){
							document.getElementById('RID_OK').click();
						}
					}
					document.getElementById('text_name').onkeypress = function (e){
						if (e.keyCode == 13){
							document.getElementById('NAME_OK').click();
						}
					}
					document.getElementById('text_pass').onkeypress = function (e){
						if (e.keyCode == 13){
							document.getElementById('PASS_OK').click();
						}
					}
					
					
					getRID();					
				}	


function showLoading(){
	document.getElementById("bkmsg").style.display = "block";
	document.getElementById("div_load").style.display = "block";
}
function hideLoading(){
	document.getElementById("bkmsg").style.display = "none";
	document.getElementById("div_load").style.display = "none";
}
				
function getRID(){
	if(URLVars.rid){
		_rid = URLVars.rid;
		
		getName();
	}else{
		document.getElementById("text_rid").focus();
		document.getElementById("RID_OK").onclick = function(){
			_rid = document.getElementById("text_rid").value;
			
			getName();
		}
	}
}			
				
function getName(){
	document.getElementById("div_setrid").style.display = "none";
	
	_name = URLVars.name;
	if(typeof _name === 'undefined'){
		document.getElementById("div_setname").style.display = "block";
		document.getElementById("text_name").focus();
		
		document.getElementById("NAME_OK").onclick = function(){
			_name = document.getElementById("text_name").value;
			if(_name.trim() != ''){
				checkConnectionAndIfHasPass()
			}
		}
	}else{
		
		checkConnectionAndIfHasPass();
	}
	
}

function checkConnectionAndIfHasPass(){
	document.getElementById("div_setrid").style.display = "none";
	document.getElementById("div_setname").style.display = "none";
	document.getElementById("div_load").style.display = "block";
	
	var nameSet = false;
	socket.on('nameSet', function(){
		 nameSet = true;
		 
	});
	
	var isConnectedInterval = setInterval(function(){//check for connectivity
						if(!socket.socket.connecting){
							
							setName(_name);
							roomHasPass(_rid);//check for password
							
								var hasPassInterval = setInterval(function(){//check for pass
									if(gotRoomPassMSG && nameSet){
									
										document.getElementById("div_load").style.display = "none";
										if(roomHasPassword){
											getPass();
										}else{
											enterRoom(_rid,"");
										}
										
										window.clearInterval(hasPassInterval);
									}
								},100);
							
							window.clearInterval(isConnectedInterval);
						}
					},100);

	
}

function getPass(){
	document.getElementById("div_setpass").style.display = "block";
	document.getElementById("text_pass").focus();
	document.getElementById("PASS_OK").onclick = function (){
		var pass = document.getElementById("text_pass").value;
		enterRoom(_rid,pass);
	}
										
	
}

socket.on('didJoin', function(data){
	_rid = data.ID;
	window.location.hash = "#rid="+ _rid;
	if(!data.success){
		alert(data.reason);
		window.location.hash = "#rid="+ _rid + "&name=" + _name;
		document.location.reload(true);
	}else{
		finishQ();
	}
});

function finishQ(){
	document.getElementById("div_setpass").style.display = "none";
	document.getElementById("bkmsg").style.display = "none";
	refreshNameList();
	finishedAsking = true;
}

function shareRoom(){
	finishedAsking = false;
	document.getElementById("bkmsg").style.display = "block";
	document.getElementById("div_shared").style.display = "block";
	document.getElementById("_pShare").innerHTML = window.location.href;
	
	document.getElementById("SHARE_OK").onclick = function(){
		document.getElementById("div_shared").style.display = "none";
		document.getElementById("bkmsg").style.display = "none";
		finishedAsking = true;
	}
}

function buildNameList(data){
	var list = document.getElementById('nList');
	list.innerHTML ='';
	var template = '<div class="listItem">\
			<div class="listItemColor" style="background:%color%"></div>\
			<p class="listItemText">%text%</p>\
		</div>';
	for(var i = 0; i < data.length; i++){
		var toadd = template.replace('%text%',data[i].name);
		toadd = toadd.replace('%color%',parseColor(data[i].color));
		list.innerHTML += toadd;
	}
}

				




