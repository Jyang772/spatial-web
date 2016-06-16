var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var circles = [];

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
    
    context.fillText(filltext, x, y);    
};

var Circle = function(x, y, radius) {
		this.x  = x;
   	this. y = y;
    this.left = x - radius;
    this.top = y - radius;
    this.right = x + radius;
    this.bottom = y + radius;
};


var drawCircle = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, circles,fill=true) {
    draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext,fill);
    var circle = new Circle(x, y, radius);
    circles.push(circle);  
};


var initial = function() {
drawCircle(context, 200, canvas.height / 2, "green", 10, 0, "#003300", "white", "center", "bold 32px Arial", "0", circles);
drawCircle(context, 144, canvas.height / 3, "blue", 10, 0, "#003300", "white", "center", "bold 32px Arial", "1", circles);
drawCircle(context, 300, canvas.height / 3, "red", 10, 0, "#003300", "white", "center", "bold 32px Arial", "2", circles);
drawCircle(context, 350, canvas.height / 3, "red", 10, 0, "#003300", "white", "center", "bold 32px Arial", "3", circles);
drawCircle(context, 244, 345, "red", 10, 0, "#003300", "white", "center", "bold 32px Arial", "4", circles);
drawCircle(context, 385,50,"yellow",10, 0, "#003300", "white", "center", "bold 32px Arial", "5", circles);
}

Node.prototype.sortByDistance = function() {
	this.neighbors.sort(function(a,b) {
  return a.distance - b.distance;
  })
}

var measureDistance = function(index,k) {

	function neighbor() {
  this.dist = 0;
  this.circles = 0;
  }
  
  var neighborslist = [];
  
	for(var i in circles) {
  	if(i != index) {
    		  var n = new neighbor();
    			dx = circles[index].x - circles[i].x;
          dy = circles[index].y - circles[i].y;
          n.dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
          n.circles = i;
          neighborslist.push(n);
    }
  }
  
  //console.log(neighborslist[0]);
  //console.log(neighborslist[1]);
  neighborslist.sort(function(a,b){
  	return a.dist - b.dist;
  })
  
  //console.log(neighborslist[1]);
  for(var i=0; i<k;i++){
   console.log(neighborslist[i]);
   }
   
  console.log("before");
  draw(context, circles[index].x,circles[index].y,"",neighborslist[k-1].dist, 0, "#003300", "white", "center", "bold 32px Arial", "",false);
  console.log("after");
}

$('#myCanvas').click(function (e) {
		var k = 2;
		context.clearRect(0, 0, canvas.width, canvas.height);
    circles = [];
		initial();
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;
    
    for (var i = 0; i < circles.length; i++) {
        if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
        	  measureDistance(i,k);
            //alert ('clicked number ' + (i + 1));
            break;
        }
    }
});


initial();
