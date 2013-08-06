var cv;
var cx;
var lp = createPoint(-1,-1);
var color = createColorRGBA(0,0,0,1);

function gotData(_p,_lp,c){
	cx.fillStyle = c;
	cx.fillRect(_p.x-2,_p.y-2,4,4);
}

var mouseDwn = false;

document.onmousedown=function(){
	mouseDwn=true;
	lp = createPoint(-1,-1);
};
document.onmouseup=function(){
	mouseDwn=false
};
document.onmousemove=function(e){
	if(mouseDwn){
		var p = createPoint(e.offsetX,e.offsetY);
		send(p,lp,color);
		lp = p;
	}
}

function createColorFromHTML(cc){
	cc = cc.replace("#","");
	if(cc.length == 6){
		var a = 1;
		var r = parseInt(cc.substring(0,2),16);
		var g = parseInt(cc.substring(2,4),16);
		var b = parseInt(cc.substring(4,6),16);
		
		return {"r":r,
				"g":g,
				"b":b,
				"a":a};
	}else{
		return {"r":0,
				"g":0,
				"b":0,
				"a":1};
	}
}
function createColorRGBA(r,g,b,a){
	return {"r":r,
			"g":g,
			"b":b,
			"a":a};
}

function createPoint(x,y){
	return {"x":x,"y":y};
}