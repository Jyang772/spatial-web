var pairs = [
    [[0, 3], [1, 0], [3, 1], [2, 0]],
    [[2, 1], [1, 1], [3, 0], [0, 2]],
    [[2, 2], [3, 3], [1, 2], [0, 1]],
    [[0, 0], [3, 2], [1, 3], [2, 3]]
  ];
  

//Given x,y grid coordinates
//Return ith index in hilbert array
var xy2d = function(x, y, z) {
                console.log("*x: " + x + " y: " + y);
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
        context.moveTo(canvas.width/Math.pow(2,n+1),canvas.height/Math.pow(2,n+1));
        
        for(var i=0; i<(Math.pow(Math.pow(2,n),2)); i++){
        
        var coord = d2xy(level,i); //Get hilbert coordinates
        var lineX = (canvas.width)/Math.pow(2,n+1) + coord[0]*(canvas.width)/Math.pow(2,n);
        var lineY = (canvas.height)/Math.pow(2,n+1) + coord[1]*(canvas.height)/Math.pow(2,n);
        //console.log("coords: ");
       // console.log(lineX + " " + lineY);
        context.lineTo(lineX,lineY);
        context.stroke();
    }
        context.restore();
    
}

var hilbert = function(circle,level){
    drawBoard(level);
    drawHilbert(level);
    console.log("calculate grid");
    
    var m = canvas.width;
    var n = 2;
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



        
    console.log("X: " + x);
    console.log("Y: " + y);
    console.log("gX: " + gX);
    console.log("gY: " + gY);
    console.log(xy2d(gX,gY,n));
    
    
}
