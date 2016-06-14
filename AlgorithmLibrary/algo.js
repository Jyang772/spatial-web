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
MyAlgorithm.prototype.arrColor = new Array();
MyAlgorithm.prototype.color;
MyAlgorithm.prototype.arrMid = new Array();
MyAlgorithm.prototype.arrDiff = new Array();
MyAlgorithm.prototype.arrDifftmp = new Array();
MyAlgorithm.prototype.arrMinvals = new Array();
MyAlgorithm.prototype.arrMinvalIndex = new Array();
MyAlgorithm.prototype.arrMinx = new Array();
MyAlgorithm.prototype.arrMiny = new Array();
MyAlgorithm.prototype.radius;
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
   // console.log(MyAlgorithm.prototype.arrColor);
    
    MyAlgorithm.prototype.arrMid.length=0;
    MyAlgorithm.prototype.arrMinvals.length=0;
    MyAlgorithm.prototype.arrDiff.length=0;
    MyAlgorithm.prototype.arrMinvals.length=0;
    MyAlgorithm.prototype.arrMinvalIndex.length=0;
    MyAlgorithm.prototype.arrMiny.length=0;
    MyAlgorithm.prototype.arrMinx.length=0;
    MyAlgorithm.prototype.arrDifftmp.length=0;
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
        MyAlgorithm.prototype.delindex = this.nextIndex-2;
        MyAlgorithm.prototype.delindexmistrypoint = this.nextIndex-1;
        this.cmd("Delete",MyAlgorithm.prototype.delindex);
        this.cmd("Delete",MyAlgorithm.prototype.delindexmistrypoint);
    }
    
    for(var i=0;i<MyAlgorithm.prototype.circleX.length;i++)
    {
        var temp = (Math.abs(MyAlgorithm.prototype.circleX[i])+Math.abs(MyAlgorithm.prototype.circleY[i]))/2;
        MyAlgorithm.prototype.arrMid.push(Math.round(temp));   
    }

    console.log(MyAlgorithm.prototype.circleX);
    console.log(MyAlgorithm.prototype.circleY);
    console.log(MyAlgorithm.prototype.arrMid);
    
    var circleID = this.nextIndex++;
    var med = (x+y)/2;
    for(var i=0;i<MyAlgorithm.prototype.arrMid.length;i++)
    {
        var temp=parseInt(med)-parseInt(MyAlgorithm.prototype.arrMid[i]);
        MyAlgorithm.prototype.arrDiff.push(Math.abs(temp));
        MyAlgorithm.prototype.arrDifftmp.push(Math.abs(temp));
    }
    console.log(MyAlgorithm.prototype.arrDiff);
    console.log("x="+x+",y="+y);
    //console.log("x="+MyAlgorithm.prototype.circleX);
    //console.log("y="+MyAlgorithm.prototype.circleY);
    
    /*Get Index Of Three Minimum Elementss*/
    for(var i=1;i<=4;i++)
    {
        min = Math.min.apply(Math, MyAlgorithm.prototype.arrDifftmp);
     
        minindex = MyAlgorithm.prototype.arrDifftmp.indexOf(min);
        MyAlgorithm.prototype.arrDifftmp.splice(minindex,1);
        //console.log(min);
        MyAlgorithm.prototype.arrMinvals.push(min);
        
     
        //console.log(minindex);
        //console.log(MyAlgorithm.prototype.arrDiff.indexOf(min))
    }
    MyAlgorithm.prototype.arrMinvals = MyAlgorithm.prototype.arrMinvals.filter(function(elem, pos) {
        return MyAlgorithm.prototype.arrMinvals.indexOf(elem) == pos;
    }); 
    for(var j=0;j<4;j++)
    {
        console.log(MyAlgorithm.prototype.arrMinvals[j]);
        MyAlgorithm.prototype.arrDiff.reduce(function(a, e, i) {
        if (e ===  MyAlgorithm.prototype.arrMinvals[j])
            //a.push(i);
            //return a;
            MyAlgorithm.prototype.arrMinvalIndex.push(i);
        }, []);
    }
    
    console.log(MyAlgorithm.prototype.arrMinvals);
    console.log(MyAlgorithm.prototype.arrMinvalIndex);
    
    var sum=0;
    for(var i=0;i<4;i++)
    {
        var index = MyAlgorithm.prototype.arrMinvalIndex[i];
        //console.log(MyAlgorithm.prototype.arrColor[index]);
        sum=sum+MyAlgorithm.prototype.arrMid[index];
        MyAlgorithm.prototype.arrMinx.push(MyAlgorithm.prototype.circleX[index]);
        MyAlgorithm.prototype.arrMiny.push(MyAlgorithm.prototype.circleY[index]);
    }
    console.log(MyAlgorithm.prototype.arrMinx);
    console.log(MyAlgorithm.prototype.arrMiny);
    /*Draw All Circle Again*/
    
    for(var i=0;i<arrx.length;i++)
    {
        circleX=arrx[i];
        circleY=arry[i];
        // Create a circle
        this.cmd("CreateHighlightCircle",circleID,arrcolors[i],arrx[i],arry[i],2);
        //this.cmd("CreateCircle",circleID,circleX+","+circleY,circleX,circleY);
        circleID = this.nextIndex++;    
    }
    
    /*Draw Near By Highlighted Circles*/
    for(var i=0;i<MyAlgorithm.prototype.arrMinx.length;i++)
    {
        circleID = this.nextIndex++;
        var circleX=MyAlgorithm.prototype.arrMinx[i];
        var circleY=MyAlgorithm.prototype.arrMiny[i];
        // Create a circle
        this.cmd("CreateHighlightCircle",circleID,"#FFFF00",circleX,circleY,2);
        //this.cmd("CreateCircle",circleID,circleX+","+circleY,circleX,circleY);
        circleID = this.nextIndex++;    
    }
    /*Draw Mistry Point*/
    mistryID = this.nextIndex++;
    this.cmd("CreateHighlightCircle",mistryID,"#000000",x,y,2);
    var radius = Math.round(sum/4);
    MyAlgorithm.prototype.radius=radius;
    console.log(radius);
    //console.log(MyAlgorithm.prototype.arrDiff);
    MyAlgorithm.prototype.delindex = circleID;
    var color = MyAlgorithm.prototype.color;
    if(x>=100)
    {
        var circleColor = "#1BA544";
    }
    else
    {
        var circleColor = "#E60C0C";
    }
    if(MyAlgorithm.prototype.radius >80)
    {
        MyAlgorithm.prototype.radius = MyAlgorithm.prototype.radius - 50
    }
    this.cmd("CreateHighlightCircle",circleID,circleColor,x,y,MyAlgorithm.prototype.radius); 
    return this.commands;
}
MyAlgorithm.prototype.simpleAction = function()
{
	this.commands = [];  // Empty out our commands variable, so it isn't corrupted by previous actions
//	// Get a new memory ID for the circle that we are going to create
	var circleID = this.nextIndex++;
        //console.log("lblid="+circleID);
	var circleX = 50;
	var circleY = 50;
	//console.log(arrx);
        //console.log(arrcolors);
        MyAlgorithm.prototype.circleX=arrx;
        MyAlgorithm.prototype.circleY=arry;
        MyAlgorithm.prototype.arrColor=arrcolors;
        for(var i=0;i<arrx.length;i++)
        {
            circleX=arrx[i];
            circleY=arry[i];
            // Create a circle
            this.cmd("CreateHighlightCircle",circleID,arrcolors[i],arrx[i],arry[i],2);
            //this.cmd("CreateCircle",circleID,circleX+","+circleY,circleX,circleY);
            circleID = this.nextIndex++;    
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