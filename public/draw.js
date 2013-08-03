var cv;
var cx;

function gotData(x,y,c){
	cx.fillStyle = c;
	cx.fillRect(x-2,y-2,4,4);
}

var mouseDwn = false;

document.onmousedown=function(){
	mouseDwn=true;
};
document.onmouseup=function(){
	mouseDwn=false
};
document.onmousemove=function(e){
	if(mouseDwn){
		 send(e.offsetX,e.offsetY,color);
	}
}