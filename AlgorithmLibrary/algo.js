function MyAlgorithm(am, w, h)
{
	this.init(am, w, h);
}

MyAlgorithm.prototype = new Algorithm();
MyAlgorithm.prototype.constructor = MyAlgorithm;
MyAlgorithm.prototype.delindex=1;
MyAlgorithm.prototype.temp=1;
MyAlgorithm.prototype.circleX;
MyAlgorithm.prototype.circleY;
MyAlgorithm.prototype.circleD = new Array();
MyAlgorithm.superclass = Algorithm.prototype;
MyAlgorithm.prototype.init = function(am, w, h)
{
	// Call the unit function of our "superclass", which adds a couple of
	// listeners, and sets up the undo stack
	MyAlgorithm.superclass.init.call(this, am, w, h);
	
	this.addControls();
	
	// Useful for memory management
	this.nextIndex = 0;

	// TODO:  Add any code necessary to set up your own algorithm.  Initialize data
	// structures, etc.
}
MyAlgorithm.prototype.addControls =  function()
{
	this.controls = [];
	
    // Add any necessary controls for your algorithm.
    //   There are libraries that help with text entry, buttons, check boxes, radio groups
    //
    // To add a button myButton:
         this.mybytton = addControlToAlgorithmBar("Button", "Go");
         document.getElementById("canvas").onclick = this.myCallback2.bind(this);
         this.mybytton.onclick = this.myCallback.bind(this);
         
         this.controls.push(this.mybutton);
    //   where myCallback is a method on this function that implemnts the callback
    //
    // To add a text field myField:
    //    this.myField = addControlToAlgorithmBar("Text", "");
    //    this.myField.onkeydown = this.returnSubmit(this.myField,  
    //                                               this.anotherCallback.bind(this), // callback to make when return is pressed
    //                                               maxFieldLen,                     // integer, max number of characters allowed in field
    //                                               intOnly);                        // boolean, true of only digits can be entered.
    //    this.controls.push(this.myField);
    //
    // To add a textbox:
    //   	this.myCheckbox = addCheckboxToAlgorithmBar("Checkbox Label");
    //      this.myCheckbox.onclick = this.checkboxCallback.bind(this);
    //      this.controls.push(myCheckbox);
    //
    // To add a radio button group:
    //	  this.radioButtonList = addRadioButtonGroupToAlgorithmBar(["radio button label 1", 
    //                                                              "radio button label 2", 
    //                                                              "radio button label 3"], 
    //                                                             "MyButtonGroupName");
    //    this.radioButtonList[0].onclick = this.firstRadioButtonCallback.bind(this);
    //    this.controls.push(this.radioButtonList[0]);
    //    this.radioButtonList[1].onclick = this.secondRadioButtonCallback.bind(this);
    //    this.controls.push(this.radioButtonList[1]);
    //    this.radioButtonList[2].onclick = this.thirdRadioButtonCallback.bind(this);
    //    this.controls.push(this.radioButtonList[1]);
    //
    // Note that we are adding the controls to the controls array so that they can be enabled / disabled
    // by the animation manager (see enableUI / disableUI below)
}
//////////////////////////////////////////////
// Callbacks:
//////////////////////////////////////////////
//
//   All of your callbacks should *not* do any work directly, but instead should go through the
//   implement action command.  That way, undos are handled by ths system "behind the scenes"
//
//   A typical example:
//
MyAlgorithm.prototype.myCallback = function(event)
{
    this.implementAction(this.simpleAction.bind(this));
}
MyAlgorithm.prototype.myCallback2 = function(event)
{
    this.implementAction(this.simpleAction2.bind(this));
}
//  Note that implementAction takes as parameters a function and an argument, and then calls that
//  function using that argument (while also storing the function/argument pair for future undos)
MyAlgorithm.prototype.simpleAction2 = function()
{
    MyAlgorithm.prototype.circleD.length=0;
    this.commands = [];  // Empty out our commands variable, so it isn't corrupted by previous actions
//  // Get a new memory ID for the circle that we are going to create
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop; 
    //console.log(canvas.offsetTop+" "+event.pageY);
    
    //console.log("delindex="+MyAlgorithm.prototype.delindex);
    if(MyAlgorithm.prototype.temp == 1)
    {
        MyAlgorithm.prototype.temp = 0;
    }
    else
    {
        MyAlgorithm.prototype.delindex = this.nextIndex-1;
        this.cmd("Delete",MyAlgorithm.prototype.delindex);
    }
    
    for(var i=0;i<MyAlgorithm.prototype.circleX.length;i++)
    {
        var temp = (parseInt(MyAlgorithm.prototype.circleX[i])+parseInt(MyAlgorithm.prototype.circleY[i]))/2;
        MyAlgorithm.prototype.circleD.push(temp);   
    }
    console.log(MyAlgorithm.prototype.circleD);
    var circleID = this.nextIndex++;
    var med = (x+y)/2;
    this.cmd("CreateHighlightCircle",circleID,"#A3A599",x,y,42); 
    console.log("x="+x+",y="+y);
    console.log("x="+MyAlgorithm.prototype.circleX);
    console.log("y="+MyAlgorithm.prototype.circleY);
    MyAlgorithm.prototype.delindex = circleID;
    return this.commands;
}
MyAlgorithm.prototype.simpleAction = function()
{
	this.commands = [];  // Empty out our commands variable, so it isn't corrupted by previous actions
//	// Get a new memory ID for the circle that we are going to create
	var circleID = this.nextIndex++;
	var circleX = 50;
	var circleY = 50;
	console.log(arrx);
        MyAlgorithm.prototype.circleX=arrx;
        MyAlgorithm.prototype.circleY=arry;
        for(var i=0;i<arrx.length;i++)
        {
            circleX=arrx[i];
            circleY=arry[i];
            // Create a circle
            this.cmd("CreateHighlightCircle",circleID,"#00FF00",arrx[i],arry[i],2);
            //this.cmd("CreateCircle",circleID,circleX+","+circleY,circleX,circleY);
            circleID = this.nextIndex++;    
            console.log(circleID);
        }
//	// Move the circle
	//this.cmd("Move", circleID, circleX, circleY);
//	// First Animation step done
	//this.cmd("Step");
	//circleX = 50; 
	//circleY = 100; 
//	// Move the circle again
	//this.cmd("Move", circleID, circleX, circleY);
//	// Next Animation step done
	//this.cmd("Step");
//	// Return the commands that were generated by the "cmd" calls:
	return this.commands;
}

var currentAlg;
function init()
{
	var animManag = initCanvas();
	currentAlg = new MyAlgorithm(animManag, canvas.width, canvas.height);
	
}
////Penguin///
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
