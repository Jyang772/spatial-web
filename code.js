//Justin 
//KNN-Cloak visualization using a naive-approach to calculating KNN

	var initialCircles = []; //Initial circles drawn to canvas
	var circles = [];
	var numCircles = 20;
	var k = 2; //Default
	var steps = 1;
	var finAnimate = false;
	
	var level = 2;
	var quad;
	
	
	//Canvas undo
var canvasLogBook = new CanvasLogBook();
	

var Circle = function(x, y, radius) {
        this.id;
		this.x  = x;
		this.y = y;
		this.radius = radius;
	    this.left = x - radius;
	    this.top = y - radius;
	    this.right = x + radius;
	    this.bottom = y + radius;
	};

var initialize = function() {

    drawInitial(); //Draw initial random points
    initHilbert(level); //Calculate initial hilbert elements
    clearCanvas(1);
    //Casper
    quad = new QuadTree({
		x:0,
		y:0,
		width:canvasWidth,
		height:canvasHeight
	},40,4);
	
	for(var i=0; i<initialCircles.length; i++) {
	    quad.insert({x:initialCircles[i].x,y:initialCircles[i].y,id:i});
	}


}

var initial = function() {
        //Erases what was previously drawn and replot the original points

        var inputBox1 = document.getElementById("k");
        k=inputBox1.value;
        level = document.getElementById("level").value;
        //clearText();
        
	for(var i=0; i< initialCircles.length; i++)
		drawCircle(context, initialCircles[i].x, initialCircles[i].y, "black", initialCircles[i].radius, 0, "#003300", "black", "center", "bold 32px Arial",i,circles);

}

//If K has been changed, don't redraw the curve or the board for hilbert
var clearCanvas = function(valueChanged) {
    
    console.log("CLEAR");
    context.clearRect(0, 0, canvasWidth+10, canvasHeight+10);
    circles = [];
    initial();
    
    //if(document.getElementById("hilbert").checked){
    if(document.getElementById("algos").value == "hilbert"){
        if(valueChanged === 1) {
            canvasLogBook = new CanvasLogBook();

            drawBoard(level);
            drawHilbert(level);
            initHilbert(level);
            canvasLogBook.logDrawing(); //logged at index 1
        }
        else
            canvasLogBook.showLogAtIndex(1);
    }
    //if(document.getElementById("casper").checked || document.getElementById("ic").checked){
    if(document.getElementById("algos").value == "casper" || document.getElementById("algos").value == "ic"){
    
       canvasLogBook = new CanvasLogBook();

            //Casper
        quad = new QuadTree({
    		x:0,
    		y:0,
    		width:canvasWidth,
    		height:canvasHeight
    	},40,4);

    	//if(document.getElementById("ic").checked)
    	if(document.getElementById("algos").value == "ic")
    	    IC = true;
    	else
    	    IC = false;
    	
    	for(var i=0; i<initialCircles.length; i++) {
    	    quad.insert({x:initialCircles[i].x,y:initialCircles[i].y,id:i});
    	}
    	drawNode(quad.root);
    	canvasLogBook.logDrawing(); //logged at index 1
    }
    
    if(document.getElementById("algos").value == "PIR") {
        
    }
}



$('#myCanvas').click(function (e) {
    

        if(document.getElementById("algos").value=="PIR") {
            PIR(level,e,this.offsetLeft,this.offsetTop);
            return;
        }

	   
	    if(!finAnimate){
	        return;
	    }
	   
	    finAnimate = false;
	    //if(!document.getElementById("hilbert").checked)
	    //if(!document.getElementById("algos").value == "hilbert")
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    
	    //Show hilbert curve
	    
	    //circles = [];
	    initial();
	    //Show hilbert curve -- comment out to not display hilbert grid/curve
	   // if(document.getElementById("hilbert").checked)
	  
	   if(document.getElementById("algos").value == "hilbert")
	        canvasLogBook.showLogAtIndex(1);
	        
	    //if(document.getElementById("casper").checked || document.getElementById("ic").checked)
	    if(document.getElementById("algos").value == "casper" || document.getElementById("algos").value == "ic")
	        canvasLogBook.showLogAtIndex(1);
	   
	    var clickedX = e.pageX - this.offsetLeft;
	    var clickedY = e.pageY - this.offsetTop;
	    var clickedCircle;
	    var found;
	    
	    //Detect which circle was clicked
	    //console.log("circles.length: " + circles.length);
	    for (var i = 0; i < circles.length; i++) {
		    if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
		   
		   	    context.clearRect(0, 0, canvasWidth, canvasHeight);
	            circles = [];
	            initial(); //pushes original circles back

		   clickedCircle = i;
		   nprint = [];
		   
		   //Depending on what is selected, decide which algorithm to run
		   //appendNewText(steps++,"Calculate K Neighbors");
            //if(document.getElementById("hilbert").checked)
            
            if(document.getElementById("algos").value == "hilbert")
		        canvasLogBook.showLogAtIndex(1);
		  
		    //if(document.getElementById("casper").checked)
		    if(document.getElementById("algos").value == "casper")
		        canvasLogBook.showLogAtIndex(1);
		   
		   draw(context,circles[i].x,circles[i].y,"red",circles[i].radius,0,"#003300", "black", "center", "bold 32px Arial", "",true);
		   
		   //if(document.getElementById("hilbert").checked){
		   if(document.getElementById("algos").value == "hilbert"){
	       hilbert(circles[i],k);
	       finAnimate=true;
	       return;
	       }
	       
	       //if(document.getElementById("casper").checked || document.getElementById("ic").checked){
	       if(document.getElementById("algos").value == "casper" || document.getElementById("algos").value == "ic"){
	           squares = [];
	           drawNode(quad.root);
	           var points = quad.retrieve({x:circles[i].x,y:circles[i].y,id:i});
	           //console.log(squares);
	           //testSquares(squares);
	           finAnimate = true;
	           return;
	       }
	    
		   
		   found = true;
		   break;
		    }
	    }
	    if(!found){
	        finAnimate = true;
	        return;
	    }
	    
	    
	    
	       //canvasLogBook.logDrawing();
	    
	       setTimeout(function() {
	       //Save screenshot of canvas
	       measureDistance(clickedCircle,k); /*canvasLogBook.logDrawing();*/},500);
	       //measureDistance(i,k);
	      
	      
	       //if(document.getElementById("knn").checked)
	       if(document.getElementById("algos").value == "knn")
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
		    //context.fillText("ASR for " + clickedCircle,(rectxm+rectx),(recty+rectym));
		    if(rectx+rectxm > canvasWidth)
		        context.fillText("ASR for " + clickedCircle,(rectx),(recty+rectym));
		    else if(recty+rectym > canvasHeight)
		        context.fillText("ASR for " + clickedCircle,(rectx+rectxm),(recty));
            else
		        context.fillText("ASR for " + clickedCircle,(rectx+rectxm),(recty+rectym));
		  
		    


		    context.stroke(); 	
		    context.closePath();
		    context.restore();
		    finAnimate = true;
		//}, (document.getElementById("knn").checked) ? 2000 : 1300);
		  }, (document.getElementById("algos").value == "knn") ? 2000 : 1300);

	});
	

	//Draw initial points
	initialize();
	
//Misc Functions
function appendNewText(text)
{
    console.log("Appending to info");
    //var newText = document.createTextNode(step + ". " + text);
    var newText = document.createTextNode(text);
    var infoBox = document.getElementById("info");
    var br = document.createElement("br");
    //if(step != 1)
        //infoBox.appendChild(br);
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



/*        console.log(level);
        console.log(canvasWidth);
    
        cell_ = [];
        if(Voronoi.sites.length !== 0)
            Voronoi.clearSites();
	    
	    Voronoi.init();
	    drawBoard(level);
	    //console.log(canvas2grid_(e.pageX-this.offsetLeft,e.pageY-this.offsetTop,level));
	    Voronoi.drawCells();
	    
	    
	    function gridCell() {
	        this.corners = [];
	        this.cells = [];
	    }
	    
	    //Counter clockwise
	    //Populate gridCell corner points
	    var gridCells = [];
	    for(var i=0; i<Math.pow(2,level); i++) {
	        for(var j=0; j<Math.pow(2,level); j++) {
	            var g = new gridCell();
	            
	            var point = [];
	            var x0 = j*(1000)/Math.pow(2,level);
	            var y0 = i*(1000)/Math.pow(2,level);
	            point.push(x0);
	            point.push(y0);
	            g.corners.push(point);
	            var x1 = j*(1000)/Math.pow(2,level);
	            var y1 = i*(1000)/Math.pow(2,level) + (1000)/Math.pow(2,level);
	            point = [];
	            point.push(x1);
	            point.push(y1);
	            g.corners.push(point);
	            var x2 = j*(1000)/Math.pow(2,level) + (1000)/Math.pow(2,level);
	            var y2 = i*(1000)/Math.pow(2,level) + (1000)/Math.pow(2,level);
	            point = [];
	            point.push(x2);
	            point.push(y2);
	            g.corners.push(point);
	            var x3 = j*(1000)/Math.pow(2,level) + (1000)/Math.pow(2,level);
	            var y3 = i*(1000)/Math.pow(2,level);
	            point = [];
	            point.push(x3);
	            point.push(y3);
	            g.corners.push(point);
	            
	            gridCells.push(g);
	        }
	    }
	    
	    
	    //Each array element contains the Voronoi cells it's associated with
	    //Test if any four points is inside polygon
	    //Then test if any polygon points are inside square
	    
	    function box() {
	        this.id;
	        this.voronoi = [];
	    }
	    
	    var arr = [];

	    console.log("# of cells: " + Voronoi.sites.length);
	    
	    for(var i=0; i<gridCells.length; i++) {
	        console.log("Cell " + i + " is inside: ");
	        b = new box();
	        for(var j=0; j<Voronoi.sites.length; j++) {
	            
	            //For all 4 corners
	            if(inside(gridCells[i].corners[0],cell_[j].cellEdges) || inside(gridCells[i].corners[1],cell_[j].cellEdges) ||
	            inside(gridCells[i].corners[2],cell_[j].cellEdges) || inside(gridCells[i].corners[3],cell_[j].cellEdges)) {
	                b.voronoi.push(j);
	                console.log(j);
	            }
	            else { 	    
	                //console.log("Check polygons");

	                for(var x=0; x<cell_[j].cellEdges.length; x++) {
	                var point = [];
	                point[0] = cell_[j].cellEdges[x].x;
	                point[1] = cell_[j].cellEdges[x].y;
	                
	                if(inside2(point,gridCells[i].corners)) {
	                        b.voronoi.push(j);
	                    	console.log("Cell_ " + i + " is inside: ");
                            console.log(j);
                            break;
	                }
	            }
	                
	            }
	            
	        }
	        arr.push(b);
	    }
	   
	   //DEBUG 
	   for(var i=0; i<arr.length; i++) {
	       var y = Math.floor(i/Math.pow(2,level));
	       var x = i%Math.pow(2,level);
	       //console.log("Cell: " + i + " (" + x + "," + y + ")");
	       //console.log(arr[i].voronoi);
	   }
	   
	    var xy = canvas2grid_(e.pageX-this.offsetLeft,e.pageY-this.offsetTop,level);
	    var cell = xy[0] + xy[1]*Math.pow(level,2);
	    console.log(arr[cell].voronoi);
	    //console.log(canvas2grid_(e.pageX-this.offsetLeft,e.pageY-this.offsetTop,level));

	    return;
	    
	    */