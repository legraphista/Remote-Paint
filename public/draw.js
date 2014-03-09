var cv;
var cx;
var lp = createPoint(-1,-1);
var color = createColorRGBA(0,0,0,1);
var lineW = 5;

var pxMoved = 0;

var lineWidthSizes = [2,5,10,15,20,25];

function setLineWColor(){
	for(var i = 0;i < lineWidthSizes.length; i++){
		var e = document.getElementById("pen"+lineWidthSizes[i]);
		e = e.getElementsByTagName("div")[0];
		e.style.background = parseColor(color);
	}
}

function setLineW(w){
	lineW = w;
	for(var i = 0;i < lineWidthSizes.length; i++){
		var e = document.getElementById("pen"+lineWidthSizes[i]);
		if(lineWidthSizes[i] == w){
			e.className = "penCont penContSel";
		}else{
			e.className = "penCont";
		}
	}
}

function dist (p1,p2){
	return Math.sqrt((p1.x - p2.x)*(p1.x - p2.x) + 
					 (p1.y - p2.y)*(p1.y - p2.y));
}

function SavePNG(){
	//adresa aici
	var cs = new CanvasSaver('http://stefandev.net:8889/saveImg.php');
	
	var drawingURI = cv.toDataURL();
	var backimg = document.getElementById("cvBackImg").src;
	
	clearCanvas();
	
	if(backimg != ''){
		cx.drawImage(document.getElementById("cvBackImg"),0,0); 
	}
	
	var img = new Image();
	img.src = drawingURI;

	img.onload = function(){
		cx.drawImage(img,0,0);
	
		cs.savePNG(cv,'img');
		
		clearCanvas();
		
		cx.drawImage(img,0,0);
	}
}

function gotData(_p,_lp,c,w){
	cx.fillStyle = parseColor(c);
	cx.strokeStyle = parseColor(c);
	cx.lineWidth = w;
	if(_lp.x == -1 && _lp.y == -1){
		//cx.fillRect(_p.x - lineW/2.0,
		//			_p.y - lineW/2.0,
		//			lineW,
		//			lineW);
		cx.beginPath();		
		cx.arc(_p.x, _p.y, w/2.0, 0, 2 * Math.PI, false);
		cx.fillStyle = c;
		cx.fill();
	}else{
		cx.beginPath();
		cx.moveTo(_lp.x, _lp.y);
		cx.lineTo(_p.x, _p.y);
		cx.stroke();
		
		cx.arc(_p.x, _p.y, (w-1)/2.0, 0, 2 * Math.PI, false);
		cx.fillStyle = c;
		cx.fill();
		
		cx.arc(_lp.x, _lp.y, (w-1)/2.0, 0, 2 * Math.PI, false);
		cx.fillStyle = c;
		cx.fill();
	}
	
}

var mouseDwn = false;

document.onmousedown=function(e){
	mouseDwn=true;
	lp = createPoint(-1,-1);
	pxMoved = 0;
	if(mouseDwn && ((e.target == document.getElementById('canv')) || (e.target.id == document.getElementById('canv').id))){
		var x = e.offsetX || e.layerX;
		var y = e.offsetY || e.layerY;
		var p = createPoint(x,y);
		send(p,lp,color,lineW);
		lp = p;
	}
};
document.onmouseup=function(){
	mouseDwn=false;
};
document.onmousemove=function(e){
	if(mouseDwn && ((e.target == document.getElementById('canv')) || (e.target.id == document.getElementById('canv').id))){
		var x = e.offsetX || e.layerX;
		var y = e.offsetY || e.layerY;
		var p = createPoint(x,y);
		pxMoved++;
		if(pxMoved > 5 || dist(p,lp) > 5){
			send(p,lp,color,lineW);
			lp = p;
			pxMoved = 0;
		}
	}
}

//TOUCH SUPPORT
document.addEventListener('touchstart', function(e){ 
	var x = event.touches[0].pageX - cv.offsetLeft;
	var y = event.touches[0].pageY - cv.offsetTop;
	
	
	
	if(x >= 0 && y >= 0 && x <= 550 && y <= 550 && finishedAsking && event.touches.length == 1)
	{	
		e.preventDefault(); 
		mouseDwn=true;
		lp = createPoint(-1,-1);
		if(mouseDwn && ((e.target == document.getElementById('canv')) || (e.target.id == document.getElementById('canv').id))){
			var x = e.offsetX || e.layerX;
			var y = e.offsetY || e.layerY;
			var p = createPoint(x,y);
			send(p,lp,color,lineW);
			lp = p;
		}
		return true;
	}
	return true;
	 
});
document.addEventListener('touchend',function(event) {
	mouseDwn=false;
	return true;
});
window.addEventListener('touchmove',function(e) {
	var x = event.touches[0].pageX - cv.offsetLeft;
	var y = event.touches[0].pageY - cv.offsetTop;
	if(x >= 0 && y >= 0 && x <= 550 && y <= 550){
		if(mouseDwn && ((e.target == document.getElementById('canv')) || (e.target.id == document.getElementById('canv').id))){
			var p = createPoint(x,y);
			pxMoved++;
			if(pxMoved > 5 || dist(p,lp) > 5){
				send(p,lp,color,lineW);
				lp = p;
				pxMoved = 0;
			}
			return false;
		}
	}
	return true;
});
///////////////


function clearCanvas()
{
	cx.clearRect(0, 0, cv.width, cv.height);
}
function clearCanvasImg(){
	document.getElementById("cvBackImg").src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAIAAABEtEjdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAABvRJREFUeNrt1MEJACAQwDB1/53PJQShJBP01T0zC4CW8zsAgPfMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYLMHSDI3AGCzB0gyNwBgswdIMjcAYIuLLkG5clnR2wAAAAASUVORK5CYII=";
}

function setColorWithName(c){
	color = createColorFromHTML(colorNameToHex(c));
	setLineWColor();
}
function setColorWithRGBA(r, g, b, a){
	color = createColorRGBA(r,g,b,a);
	setLineWColor();
} 
function setColorWithHexCode(hexC){
	color = createColorFromHTML(hexC);
	setLineWColor();
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
function parseColor(c){
	return 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')'; 
}


function colorNameToHex(color)
{
    var colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo ":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colors[color.toLowerCase()] != 'undefined')
    	return colors[color.toLowerCase()];

    return "#000000";
}