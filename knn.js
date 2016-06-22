var neighborslist = [];
var nprint = [];


function neighbor() {
	  this.x = 0;
	  this.y = 0;
	  this.dist = 0;
	  this.circles = 0;
}

var measureDistance = function(index,k,initial,second) {
		neighborslist = [];
		for(var i in circles) {
		if(i != index) {
		  var n = new neighbor();
		  dx = circles[index].x - circles[i].x;
		  dy = circles[index].y - circles[i].y;
		  n.dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
		  n.circles = i;
		  n.x = circles[i].x;
		  n.y = circles[i].y;
		  neighborslist.push(n);
	    }
	  }
	  
	  neighborslist.sort(function(a,b){
		return a.dist - b.dist;
	  });
	  
	//Select at random a neighbor
	context.lineWidth = 0;
	if(second) //Get another KNN for a point in the set of KNNs
	    draw(context,circles[index].x,circles[index].y,"blue",circles[index].radius,0,"#003300", "black", "center", "bold 32px Arial", "",true);	
	  for(var i=0; i<k;i++){
	   	//console.log(neighborslist[i]);
		if(neighborslist[i].circles != initial) {
	        draw(context,circles[neighborslist[i].circles].x,circles[neighborslist[i].circles].y,"Chartreuse",circles[neighborslist[i].circles].radius,0,"#003300", "black", "center", "bold 32px Arial", "",true);
		nprint.push(circles[neighborslist[i].circles]);
	   }

        //Select at random a neighbor
	  if(second){
	    draw(context, circles[index].x,circles[index].y,"blue",neighborslist[k-1].dist, 4, "red", "", "center", "bold 32px Arial", "",false);
	  }
      else
          draw(context, circles[index].x,circles[index].y,"blue",neighborslist[k-1].dist, 1, "red", "", "center", "bold 32px Arial", "",false);

		  context.lineWidth = 1;
	    //console.log(neighborslist[0].circles);	
	}
	
	/*
    canvasLogBook.logDrawing();
    alert("undo");
    canvasLogBook.undo();
    alert("redo");
    canvasLogBook.redo();
    */

}
