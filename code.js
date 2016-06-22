//Justin 
//KNN-Cloak visualization using a naive-approach to calculating KNN

	var initialCircles = []; //Initial circles drawn to canvas
	var circles = [];
	var numCircles = 20;
	var k = 2; //Default
	var steps = 1;
	var finAnimate = false;
	
	var level = 2;
	
	
	//Canvas undo
var canvasLogBook = new CanvasLogBook();
	

var Circle = function(x, y, radius) {
		this.x  = x;
		this. y = y;
		this.radius = radius;
	    this.left = x - radius;
	    this.top = y - radius;
	    this.right = x + radius;
	    this.bottom = y + radius;
	};

var drawInitial = function() {
    ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
    
    //drawBoard();

    var inputBox0 = document.getElementById("n");
    var inputBox1 = document.getElementById("k");
    numCircles=inputBox0.value;
    if(numCircles > 200)
        return;
    ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
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
    	
      var radX = Math.random()*canvas.width;
      var radY = Math.random()*canvas.height + 50;
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

var initial = function() {
        //Erases what was previously drawn and replot the original points

        var inputBox1 = document.getElementById("k");
        k=inputBox1.value;
        clearText();
        
	for(var i=0; i< initialCircles.length; i++)
		drawCircle(context, initialCircles[i].x, initialCircles[i].y, "black", initialCircles[i].radius, 0, "#003300", "black", "center", "bold 32px Arial",i,circles);

}

var clearCanvas = function() {
    console.log("CLEAR");
    context.clearRect(0, 0, canvas.width, canvas.height);
    initial();
    
}



$('#myCanvas').click(function (e) {
	
	    if(!finAnimate){
	        return;
	    }
	    
	    finAnimate = false;
	    if(!document.getElementById("hilbert").checked)
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    //circles = [];

	    initial();
	    var clickedX = e.pageX - this.offsetLeft;
	    var clickedY = e.pageY - this.offsetTop;
	    var clickedCircle;
	    var found;
	    
	    //Detect which circle was clicked
	    //console.log("circles.length: " + circles.length);
	    for (var i = 0; i < circles.length; i++) {
		    if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
		   
		   	    context.clearRect(0, 0, canvas.width, canvas.height);
	            circles = [];
	            initial(); //pushes original circles back


		   
		   clickedCircle = i;
		   nprint = [];
		  
		   //Depending on what is selected, decide which algorithm to run
		   appendNewText(steps++,"Calculate K Neighbors");
		   draw(context,circles[i].x,circles[i].y,"red",circles[i].radius,0,"#003300", "black", "center", "bold 32px Arial", "",true);
		   found = true;
		   break;
		    }
	    }
	    if(!found){
	        finAnimate = true;
	        return;
	    }
	    
	    
	       if(document.getElementById("hilbert").checked){
	       hilbert(circles[i],k);
	       finAnimate=true;
	       return;
	       }
	    
	       //canvasLogBook.logDrawing();
	    
	       setTimeout(function() {
	       //Save screenshot of canvas
	       measureDistance(clickedCircle,k); /*canvasLogBook.logDrawing();*/},500);
	       //measureDistance(i,k);
	      
	      
	       setTimeout(function() {
	       //Save screenshot of canvas
		     var s = Math.floor(Math.random()*k);
		     measureDistance(neighborslist[s].circles,k,clickedCircle,true); 
	       }
		   ,1300);
		   
		    //Draw rectangle
		
		    setTimeout(function() {

		    var output = [];
		    output.push(circles[clickedCircle]); 
		    for(var i=0;i<nprint.length; i++)
			output.push(nprint[i]);
			

			//Refactor 
			//todo: put in drawRect function
			//animate (grow from 0 to x,y)
			//console.log(output); outputs pointer to object
			var xmin = output.sort(function(a,b){return a.x-b.x;})[0];
			//for(var x=0; x<output.length;x++)
			    //console.log(output[x]);

			
			var ymin = output.sort(function(a,b){return a.y-b.y;})[0];
		    var xmax = output.sort(function(a,b){return b.x-a.x;})[0];
			var ymax = output.sort(function(a,b){return b.y-a.y;})[0];
			
			var rectx = xmin.x-xmin.radius;
			var recty = ymin.y-ymin.radius;
			var rectxm = xmax.x-xmin.x+2*xmax.radius;
			var rectym = ymax.y-ymin.y+2*ymax.radius;
		

			//Draw rectangle
			context.save();
			context.beginPath();
		    context.rect(rectx,recty,rectxm,rectym);
		    context.closePath();
		    context.lineWidth = "2";
		    context.strokeStyle="black";
		    context.fillStyle="orange";
		    context.textBaseline = "top";
		    context.fillText("ASR for " + clickedCircle,(rectxm+rectx),(recty+rectym));
		    context.stroke(); 	
		    context.closePath();
		    context.restore();
		    finAnimate = true;
		    //alert("undo");
		    //canvasLogBook.undo();
		},2000);

	});
	

	//Draw initial points
	drawInitial();
	//drawBoard();
	

	//initial();
	//canvasLogBook.logDrawing();
	
	
//Misc Functions
function appendNewText(step,text)
{
    console.log("Appending to info");
    var newText = document.createTextNode(step + ". " + text);
    var infoBox = document.getElementById("info");
    var br = document.createElement("br");
    if(step != 1)
        infoBox.appendChild(br);
    infoBox.appendChild(newText);
}

function clearText(){
    steps=1;
    var infoBox = document.getElementById("info");
    while (infoBox.firstChild) {
    infoBox.removeChild(infoBox.firstChild);
    } 
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
