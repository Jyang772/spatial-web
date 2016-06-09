function MyAlgorithm(am, w, h)
{
	this.init(am, w, h);
}

MyAlgorithm.prototype = new Algorithm();
MyAlgorithm.prototype.constructor = MyAlgorithm;
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
         this.mybytton = addControlToAlgorithmBar("Button", "Draw");
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
    
//	// Get value to insert from textfield (created in addControls above)
//	var insertedValue = this.insertField.value;
//
//  // If you want numbers to all have leading zeroes, you can add them like this:
//	insertedValue = this.normalizeNumber(insertedValue, 4);
//
//  // Only do insertion if the text field is not empty ...
//	if (insertedValue != "")
//	{
//		// Clear text field after operation
//		this.insertField.value = "";
//      // Do the actual work.  The function implementAction is defined in the algorithm superclass
//		this.implementAction(this.insertElement.bind(this), insertedValue);
//	}
}

//  Note that implementAction takes as parameters a function and an argument, and then calls that
//  function using that argument (while also storing the function/argument pair for future undos)
MyAlgorithm.prototype.simpleAction = function()
{
	this.commands = [];  // Empty out our commands variable, so it isn't corrupted by previous actions
//	// Get a new memory ID for the circle that we are going to create
	var circleID = this.nextIndex++;
	var circleX = 50;
	var circleY = 50;
	
        
        for(var i=0;i<arrx.length;i++)
        {
		console.log("Drawing circles");
            circleX=arrx[i];
            circleY=arry[i];
            // Create a circle
            this.cmd("CreateHighlightCircle",circleID,"#00FF00",arrx[i],arry[i],2);
            var circleID = this.nextIndex++;    
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
