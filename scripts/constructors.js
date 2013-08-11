module.exports = {
    createRoom: function (password, ID) {
        var room = {};
        room.clients = [];
        room.password = password;
        room.ID = ID;
        return room;
    },


    createClient: function (name, socket, color) {
        var client = {};
		client.name = name;
        client.socket = socket;
		client.delivery = '';
        client.room = undefined;
		client.color = {"r":0,
						"g":0,
						"b":0,
						"a":1};
        return client;
    },

    createPoint: function (x, y) {
        var p = {};
        p.x = x;
        p.y = y;
        return p;
    },

    createColor: function (r, g, b, a) {
        var c = {};
        c.r = r;
        c.g = g;
        c.b = b;
        c.a = a;
        return c;
    }
};