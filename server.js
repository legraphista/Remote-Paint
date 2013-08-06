var port = 8888;
var socketIOLogLevel = 2;

var heartbeat_interval = 10//25
var heartbeat_timeout = 15;//60
var close_timeout = 20;//60

var io = require('socket.io');
var connect = require('connect');
var constructs = require('./scripts/constructors.js');
var assets = require('./scripts/extra.js');

var sockIOconns = io.listen(port, { log: true });
//setup
sockIOconns.set('log level', socketIOLogLevel);
sockIOconns.set('sync disconnect on unload',true);
sockIOconns.set('heartbeat timeout',heartbeat_timeout);
sockIOconns.set('close timeout',close_timeout);
sockIOconns.set('heartbeat interval',heartbeat_interval);

var rooms = [];
var RIDs  = [];

var sockets = [];

sockIOconns.sockets.on('connection', function (socket) {

    sockets.push(socket);

    var myClient;
    socket.on('who', function (data) {
        //daca nu mai este setat deja
        if (typeof myClient === 'undefined') {
            myClient = constructs.createClient(data.name, socket, constructs.createColor(0, 0, 0, 1));
			socket.emit('nameSet');
        }
    });


    socket.on('disconnect', function () {
		if(typeof myClient === 'undefined') return;
        //me sterg din camera
		if(typeof myClient.room !== 'undefined'){
			myClient.room.clients.remove(myClient);
			//daca camera e goala o sterg din lista de camere
			if (myClient.room.clients.length == 0) {
				RIDs.remove(myClient.room.ID);
				rooms.remove(myClient.room);
				delete myClient.room;
			}
		}
        //imi sterg obiectul
        delete myClient;
    });

    function didJoin(didIt, reason) {
        socket.emit('didJoin', { ID: myClient.room.ID,
            success: didIt,
            reason: reason
        });
        if (!didIt) {
			sockets.remove(socket);
            socket.disconnect('error');
        }
    }

    socket.on('enterRoom', function (data) {
        if (typeof myClient === 'undefined') {
            // protocol violation
            didJoin(false, "Protocol nerespectat (e1)");
            return;
        }
		
        //pt fiecare camera
        for (var i = 0; i < rooms.length; i++) {
            //daca gasim camera
            if (rooms[i].ID == data.ID) {
                //daca parola e corecta
				
                if (rooms[i].password == data.password) {
                    rooms[i].clients.push(myClient);
                    myClient.room = rooms[i];
					
                    didJoin(true, "");
                } else {
                    //TODO trimite parola gresita
					myClient.room = rooms[i];
                    didJoin(false, "Parola gresita");
					
                }
				
                return; //am incercat camera
            }
        }
        //dupa ce am incercat toate camerele, creem una noua
        //TODO crearea unei camere
		
        var room = constructs.createRoom(data.password, assets.generateRID(RIDs));
        RIDs.push(room.ID);
        room.clients.push(myClient);
        myClient.room = room;
        rooms.push(room);
		
        didJoin(true, "");
		
		console.log(rooms);
    });

    //  data.c - culoare ; data.p punct
    socket.on('push', function (data) {
        //reconstruim datele pt validare
        var toSend = {};
        if (typeof data.c !== undefined) {
            if (data.c.r === undefined || data.c.g === undefined || data.c.b === undefined || data.c.a === undefined) {
                return;
                //invalid data
            } else {
                toSend.c = data.c;
            }
        }
        if (typeof data.p !== undefined) {
            if (data.p.x === undefined || data.p.y === undefined) {
                return;
                //invalid data
            } else {
                toSend.p = constructs.createPoint(data.p.x, data.p.y);
            }
        }
		if (typeof data.lp !== undefined) {
            if (data.lp.x === undefined || data.lp.y === undefined) {
                return;
                //invalid data
            } else {
                toSend.lp = constructs.createPoint(data.lp.x, data.lp.y);
            }
        }


        var neighbours = myClient.room.clients;
        for (var i = 0; i < neighbours.length; i++) {
            //daca socketul e nul
            if (!neighbours[i] || typeof neighbours[i] === 'undefined') continue;
            //daca socketul este deconectat
            if (neighbours[i].disconnected == true) continue;
            
            neighbours[i].socket.emit('get', toSend);

        }
    });
});
