//This is where all drawing variables and functions take place

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//Paddings
var xPadding = 10;
var yPadding = 10;

//Canvas dimensions w/ padding
var canvasWidth = canvas.width - xPadding;
var canvasHeight = canvas.height - yPadding;



var bw = canvasWidth;
var bh = canvasHeight; 
var p = 0;


function drawBoard(n){
    
    console.log("Draw Grid");
    context.beginPath();
for (var x = 0; x <= bw; x += (canvasWidth)/Math.pow(2,n)) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
}


for (var x = 0; x <= bh; x += (canvasHeight)/Math.pow(2,n)) {
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
	    //Set ID
	    circle.id = filltext;
	    circles.push(circle);  
};


var drawInitial = function() {
    //ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    
    //drawBoard();

    var inputBox0 = document.getElementById("n");
    var inputBox1 = document.getElementById("k");
    numCircles=inputBox0.value;
    if(numCircles > 200)
        return;
    //ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    circles = [];
    initialCircles = [];
    console.log("Drawing Initial");
    
    finAnimate = true;
    //Draw initial points
    //Random points, make sure none are overlapping and separated by some distance
    //Determine which algorithm is selected
    var formElement = document.getElementById("knn");
    formElement.checked = true;
    
    	var dist = function(x,y,ox,oy) {
	        return Math.sqrt(Math.pow(x-ox,2)+Math.pow(y-oy,2));
         }
	
	var count = 0;
	while(circles.length < numCircles) {
    	
      //var radX = Math.random()*canvasWidth;
      //var radY = Math.random()*canvasHeight + 50;
      var radX = Math.floor(Math.random() * (canvasWidth - 10 - 10 +1)) + 10;
      var radY = Math.floor(Math.random() * (canvasHeight - 100 + 50)) + 50;
      var radR = 10;
    
    	var overlapping = false;
    	for(var j in circles) {
        d = dist(radX,radY,circles[j].x,circles[j].y);    
        if(d < (radR + circles[j].radius + 40)) {
        	overlapping = true;
          break;
        }
      }
    
    	if(!overlapping) {
      	 initialCircles.push(new Circle(radX, radY, radR));
      	 drawCircle(context,radX,radY, "black",radR,0,"#002200","black","center","bold 32px Arial",count++,circles);
    	}
    }

}


