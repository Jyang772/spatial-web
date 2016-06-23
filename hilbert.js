var pairs = [
    [[0, 3], [1, 0], [3, 1], [2, 0]],
    [[2, 1], [1, 1], [3, 0], [0, 2]],
    [[2, 2], [3, 3], [1, 2], [0, 1]],
    [[0, 0], [3, 2], [1, 3], [2, 3]]
  ];
  
  
function hElem() {
    //Hilbert elements
    this.id; //Canvas id of circle (index in circles[i])
    this.circle; //contains Circle element
    this.i; //ith element in hilbert curve
}

var hArr = [];
var hSorted = [];

//Given x,y grid coordinates
//Return ith index in hilbert array
var xy2d = function(x, y, z) {
      var quad = 0,
          pair,
          i = 0;
      while (--z >= 0) {
        pair = pairs[quad][(x & (1 << z) ? 2 : 0) | (y & (1 << z) ? 1 : 0)];
        i = (i << 2) | pair[0];
        quad = pair[1];
      }
      console.log("i: " + i);
      return i;
}


var rot = function(n, x, y, rx, ry) {
    if (ry === 0) {
      if (rx === 1) {
        x = n - 1 - x;
        y = n - 1 - y;
      }
      return [y, x];
    }
    return [x, y];
};


//Given ith element in hilbert curve, return grid x,y
var d2xy = function(z, t) {
      var n = 1 << z,
          x = 0,
          y = 0;
      for (var s = 1; s < n; s *= 2) {
        var rx = 1 & (t / 2),
            ry = 1 & (t ^ rx);
        var xy = rot(s, x, y, rx, ry);
        x = xy[0] + s * rx;
        y = xy[1] + s * ry;
        t /= 4;
      }
      return [x, y];
}


var drawHilbert = function(level) {
        console.log("Drawing Hilbert");
        console.log("Level: " + level);
     //convert to mid-points for graphing hilbert
     //X = (1000)/(2^(n+1)) + gX * (1000/(2^n))
    
        var n = parseInt(level);

        context.save();
        context.beginPath();
        context.setLineDash([5, 15]);
        context.moveTo(canvasWidth/Math.pow(2,n+1),canvasHeight/Math.pow(2,n+1));
        
        for(var i=0; i<(Math.pow(Math.pow(2,n),2)); i++){
        
        var coord = d2xy(level,i); //Get hilbert coordinates
        var lineX = (canvasWidth)/Math.pow(2,n+1) + coord[0]*(canvasWidth)/Math.pow(2,n);
        var lineY = (canvasHeight)/Math.pow(2,n+1) + coord[1]*(canvasHeight)/Math.pow(2,n);
        //console.log("coords: ");
       // console.log(lineX + " " + lineY);
        context.lineTo(lineX,lineY);
        context.stroke();
    }
        context.restore();

}

var canvas2grid = function(circle,level) {
    var n = level;
    var m = canvasWidth;
    var n = level;
    var i = 0;
    
    var x = circle.x;
    var y = circle.y;
    var gX = 0, gY = 0;
    

    i=1;
    while((m/Math.pow(2,n)) * i++ < x)
        gX++;

    i=1;
    while((m/Math.pow(2,n)) * i++ < y)
        gY++;
        
    return [gX,gY];
}

var initHilbert = function(k) {
    //Get initial hilbert i values
    hArr = [];
    console.log("circles.length: ");
    console.log(circles.length);
    for(var c=0; c < circles.length; c++) {
        var h = new hElem();
        h.id = c;
        h.circle = circles[c];
        var xy = canvas2grid(h.circle,k);
        h.i = xy2d(xy[0],xy[1],k);
        hArr.push(h);
    }
    hSorted = hArr.sort(function(a,b){return a.i-b.i;});
    console.log("Printing hilbert elements");
}

var hilbert = function(circle,k){
    
    
    var test = canvas2grid(circle,k);
    console.log("order on curve: " + xy2d(test[0],test[1],k));

  function bucket() {
      this.id;
      this.hElem = [];
  }
  
  var buckets = [];
  var b;
  console.log("inside Hilbert");
  console.log("k: " + k);
  
    for(var i=0; i<hSorted.length; i++) {
        if(i%k === 0){
            if(i !== 0)
                buckets.push(b);
            console.log("new bucket " + i);

            b = new bucket();
        }
        b.hElem.push(hSorted[i]);
        console.log(i);
  }
  //push last bucket into list
  buckets.push(b);
  
  console.log("CIRCLE ID: " + circle.id);

  console.log("buckets.length: " + buckets.length);
  var index=0;
  for(var i=0; i<buckets.length; i++) {
      //Funky comparison for k==odd. Ex. k=3, then there will be two elements in the last bucket
    for(var j=0; j<buckets[i].hElem.length;j++) {
        if(buckets[i].hElem[j].id === circle.id) {
            console.log("bucket #: " + i);
            console.log("j: " + j);
            console.log("circle id: " + circle.id);
            console.log("curve #: " + buckets[i].hElem[j].i);
            index = i;
        }
        buckets[i].id = i;
        console.log(buckets[i].hElem[j]);
    }
  }
  
  console.log("finished");
  console.log("Elements in bucket: ")
  console.log(buckets[index].hElem);
  console.log(buckets[index].id);
  
  
            var output = buckets[index].hElem;
            //xmin returns an hElem object, therefore we get .circle
	        var xmin = output.sort(function(a,b){return a.circle.x-b.circle.x;})[0].circle;
			var ymin = output.sort(function(a,b){return a.circle.y-b.circle.y;})[0].circle;
		    var xmax = output.sort(function(a,b){return b.circle.x-a.circle.x;})[0].circle;
			var ymax = output.sort(function(a,b){return b.circle.y-a.circle.y;})[0].circle;
			
			var rectx = xmin.x-xmin.radius;
			var recty = ymin.y-ymin.radius;
			var rectxm = xmax.x-xmin.x+2*xmax.radius;
			var rectym = ymax.y-ymin.y+2*ymax.radius;
			
			console.log(rectx);
			console.log(recty);
			console.log(rectxm);
			console.log(rectym);
			
			context.save();
			context.beginPath();
		    context.rect(rectx,recty,rectxm,rectym);
		    context.closePath();
		    context.lineWidth = "2";
		    context.strokeStyle="black";
		    context.fillStyle="orange";
		    context.textBaseline = "top";
		    context.fillText("ASR for " + circle.id,(rectxm+rectx),(recty+rectym));
		    context.stroke(); 	
		    context.closePath();
		    context.restore();
			
  
}
