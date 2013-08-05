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
        client.socket = socket;
        client.color = color;
        client.lastPoint = {"x":-1,"y":-1};
        client.room = undefined;
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