module.exports = {
     generateRID: function (RIDs){
        var rid;
        do {
            rid = "";
            for (var i = 1; i <= 10; i++) {
                switch (random(0, 3)) {
                    case 0:
                        {
                            rid += String.fromCharCode(random("a".charCodeAt(0), "z".charCodeAt(0) + 1));
                            break;
                        }
                    case 1:
                        {
                            rid += String.fromCharCode(random("A".charCodeAt(0), "Z".charCodeAt(0) + 1));
                            break;
                        }
                    default:
                        {
                            rid += String.fromCharCode(random("0".charCodeAt(0), "9".charCodeAt(0) + 1));
                            break;
                        }
                }

            }
        } while (RIDs.indexOf(rid) != -1);
        return rid;
    }
}
//extensie pt math ransom
function random (min, max){
	return Math.floor((Math.random()*(max-min))+min);
}
//extensie de array pt stergere
Array.prototype.remove = function(member) {
  var index = this.indexOf(member);
  if (index > -1) {
    this.splice(index, 1);
  }
  return this;
}