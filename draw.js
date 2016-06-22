//This is where all drawing variables and functions take place

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//Paddings
var xPadding = 10;
var yPadding = 10;

//Canvas dimensions w/ padding
var canvasWidth = canvas.width;// + xPadding;
var canvasHeight = canvas.height;// + yPadding;



var bw = canvas.width;
var bh = canvas.height;
var p = 0;

function drawBoard(n){
    console.log("Draw Grid");
context.beginPath();
for (var x = 0; x <= bw; x += canvas.width/Math.pow(2,n)) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
}


for (var x = 0; x <= bh; x += canvas.height/Math.pow(2,n)) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
}

context.strokeStyle = "black";
context.stroke();
//context.closePath();
}



var draw = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext,fill) {
	    context.beginPath();
	    context.arc(x, y, radius, 0, 2 * Math.PI, false);
	    context.fillStyle = fillcolor;
	    if(fill)
	    context.fill();
	    context.lineWidth = linewidth;
	    context.strokeStyle = strokestyle;
	    context.stroke();
	    
	    context.fillStyle = fontcolor;
	    context.textAlign = textalign;
	    context.font = fonttype;
	    
	    context.fillText(filltext, x, y-radius-1);    
};


var drawCircle = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, circles,fill=true) {
	    draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext,fill);
	    var circle = new Circle(x, y, radius);
	    circles.push(circle);  
};


