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
    },
	
	compColors: function (c1,c2){
		if(c1.r != c2.r) return false;
		if(c1.g != c2.g) return false;
		if(c1.b != c2.b) return false;
		if(c1.a != c2.a) return false;
		return true
	},
	isColor: function (c){
	
		if(typeof c.r === 'undefined') return false;
		if(typeof c.g === 'undefined') return false;
		if(typeof c.b === 'undefined') return false;
		if(typeof c.a === 'undefined') return false;		
		return true;
	},
	//THIS USES ImageMagic/ Download at ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/windows/
	resizeImage: function(gm, fn, nfn, callback){
		gm(fn)
					.resize(500, 500)
					.noProfile()
					.write(nfn, function (err) {
						if (err){ 
							console.log(err);
						}
						else{
							callback();
						}
				});
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