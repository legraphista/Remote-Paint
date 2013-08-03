module.exports = {
     generateRID: function (RIDs){
        var rid;
        do {
            rid = "";
            for (var i = 1; i <= 6; i++) {
                switch (Math.random(0, 3)) {
                    case 0:
                        {
                            rid += String.fromCharCode(Math.random("a".charCodeAt(0), "z".charCodeAt(0) + 1));
                            break;
                        }
                    case 1:
                        {
                            rid += String.fromCharCode(Math.random("A".charCodeAt(0), "Z".charCodeAt(0) + 1));
                            break;
                        }
                    default:
                        {
                            rid += String.fromCharCode(Math.random("0".charCodeAt(0), "9".charCodeAt(0) + 1));
                            break;
                        }
                }

            }
        } while (RIDs.indexOf(rid));
        return rid;
    }
}
//extensie de array pt stergere
Array.prototype.remove = function(member) {
  var index = this.indexOf(member);
  if (index > -1) {
    this.splice(index, 1);
  }
  return this;
}