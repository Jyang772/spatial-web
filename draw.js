//This is where all drawing variables and functions take place

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//Paddings
var xPadding = 10;
var yPadding = 10;

//Canvas dimensions w/ padding
var canvasWidth = 1100;
var canvasHeight = 1100;



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
    
    //var formElement = document.getElementById("knn").checked = true;
    //formElement.checked = true;
    
    	var dist = function(x,y,ox,oy) {
	        return Math.sqrt(Math.pow(x-ox,2)+Math.pow(y-oy,2));
         }
	
	var count = 0;
	while(circles.length < numCircles) {
    	
      //var radX = Math.random()*canvasWidth + 250;
      //var radY = Math.random()*canvasHeight + 250;
      var radX = Math.floor(Math.random() * (canvasWidth - 50 - 50 +1)) + 50;
      var radY = Math.floor(Math.random() * (canvasHeight - 50 - 50 + 1)) + 50;
      //var radX = Math.floor(Math.random() * (canvasWidth - 250 - 250 +1)) + 250;
      //var radY = Math.floor(Math.random() * (canvasHeight - 250 - 250 + 1)) + 250;
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


//Casper grid
function drawNode(node)
{
	        var bounds = node._bounds;

			context.save();
			context.beginPath();
		    context.rect(bounds.x,bounds.y,bounds.width,bounds.height);
		    context.closePath();
		    context.lineWidth = "2";
		    context.setLineDash([5, 15]);

		    context.strokeStyle="black";
		    context.fillStyle="orange";
		    context.textBaseline = "top";
		    //context.fillText("ASR for " + clickedCircle,(rectxm+rectx),(recty+rectym));
		    context.stroke(); 	
		    context.closePath();
		    context.restore();
	
	
	var cLen = node.children.length;
	var childNode;
	if(cLen)
	{
		for(var j = 0; j < cLen; j++)
		{
			childNode = node.children[j];
			//g.beginStroke(drawColor);
			//g.drawCircle(childNode.x, childNode.y,3);
		}
	}
	
	var len = node.nodes.length;
	
	for(var i = 0; i < len; i++)
	{
		drawNode(node.nodes[i]);
	}
}

function testSquares(squares) {
    
    var x = 0,
        y = 0,
        w = canvasWidth,
        h = canvasHeight;
    
    for(var i=0; i<squares.length;i++) {
        
        switch(squares[i]) {
            case 0:
                w /= 2;
                h /= 2;
                break;
            case 1:
                x +=  w/2;
                w /= 2;
                h /= 2;
                break;
            case 2:
                y += h/2;
                w /= 2;
                h /= 2;
                break;
            case 3:
                x += w/2;
                y += h/2;
                w /= 2;
                h /= 2;
                break;
        }
        
        console.log("x: " + x + " y: " + y + " w: " + w + " h: " + h);
        	context.save();
			context.beginPath();
		    context.rect(x,y,w,h);
		    context.closePath();
		    //context.setLineDash([5, 15]);

		    context.lineWidth = "3";
		    context.strokeStyle="orange";
		    context.fillStyle="orange";
		    context.textBaseline = "top";
		    //context.fillText("ASR for " + clickedCircle,(rectxm+rectx),(recty+rectym));
		    context.stroke(); 	
		    context.closePath();
		    context.restore();
        
    }
}

function drawRect(bounds) {
    
            console.log("Draw Rect: ");
            context.save();
			context.beginPath();
		    context.rect(bounds.x,bounds.y,bounds.width,bounds.height);
		    context.closePath();
		    //context.setLineDash([5, 15]);

		    context.lineWidth = "3";
		    context.strokeStyle="red";
		    context.fillStyle="orange";
		    context.textBaseline = "top";
		    //context.fillText("ASR for " + clickedCircle,(rectxm+rectx),(recty+rectym));
		    context.stroke(); 	
		    context.closePath();
		    context.restore();
    
}

/*
function drawGreen(children,id) {
                	                    //Color them green
     for(var i=0; i<children.length;i++){
		if(id != children[i].id) {
	        draw(context,children[i].x,children[i].y,"Chartreuse",10,0,"#003300", "black", "center", "bold 32px Arial", "",true);
		   }
		}
}*/


function drawGreen(bounds,id) {
    console.log("INSIDE GREEN");
    console.log(bounds);
    console.log("^^^^");
    console.log("circles.length: " + circles.length);
    
    for(var i=0; i<circles.length;i++){
		if(id != circles[i].id) {
		    var xmin = bounds.x;
		    var xmax = (bounds.x + bounds.width);
		    var ymin = bounds.y;
		    var ymax =  (bounds.y + bounds.height);
		    if((circles[i].x >= xmin && circles[i].x <= xmax))
		        if(circles[i].y >= ymin && circles[i].y <= ymax) {
		            console.log("DDRAWWWW");
	                draw(context,circles[i].x,circles[i].y,"Chartreuse",10,0,"#003300", "black", "center", "bold 32px Arial", "",true);
		        }
		   }
		}
    
}

/*  Called from voronoi
    ids : contains id for cicles
*/
function highlight(ids) {
    for(var i=0; i<ids.length; i++)
        draw(context,circles[ids[i]].x,circles[ids[i]].y,"Chartreuse",10,0,"#003300", "black", "center", "bold 32px Arial", "",true);
}
