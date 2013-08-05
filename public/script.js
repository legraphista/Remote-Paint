window.onload = function () {
					cv = document.getElementById('canv');
					cx = cv.getContext("2d");
					
					var name = URLVars.name;
					if(typeof name === 'undefined' || name == ''){
						name = prompt('Numele tau:','').trim();
						while(name == "" || typeof name === 'undefined')name = prompt('Numele tau:','').trim();
					}						
					
					var isConnectedInterval = setInterval(function(){
						if(socket.socket.connected){
							setName(name);
							window.clearInterval(isConnectedInterval);
						}
					},1000);
					
				}	
					
socket.on('nameSet', function(){
	alert('nume setat');
	pass = prompt('parola:','').trim();
	while(pass == "" || typeof pass === 'undefined')pass = prompt('parola:','').trim();
	enterRoom(URLVars.rid || "",pass || "");
});

socket.on('didJoin', function(data){
	alert(data.ID + " " +data.success + ' ' + data.reason);
});