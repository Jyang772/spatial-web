var isFirefox = typeof InstallTrigger !== 'undefined';
var ctx = document.getElementById('myCanvas').getContext("2d");
var CanvasLogBook = function() {
    this.index = 0;
    this.logs = [];
    this.logDrawing();
};
CanvasLogBook.prototype.sliceAndPush = function(imageObject) {
    var array;
    if (this.index == this.logs.length-1) {
        this.logs.push(imageObject);
        array = this.logs;
    } else {
        var tempArray = this.logs.slice(0, this.index+1);
        tempArray.push(imageObject);
        array = tempArray;
    }
    if (array.length > 1) {
        this.index++;
    }
    return array;
};
CanvasLogBook.prototype.logDrawing = function() { 
    if (isFirefox) {
       console.log("CANVAS LOGGED");

        var image = new Image();
        image.src = document.getElementById('myCanvas').toDataURL();
        this.logs = this.sliceAndPush(image);
    } else {
        var imageData = document.getElementById('myCanvas').toDataURL();
        this.logs = this.sliceAndPush(imageData);
    }
};
CanvasLogBook.prototype.undo = function() {
    console.log("UNDO");
    //ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (this.index > 0) {
        //this.index--;
        this.showLogAtIndex(this.index);
        this.index--;
    }
};
CanvasLogBook.prototype.redo = function() {
    if (this.index < this.logs.length-1) {
        //ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        this.index++;
        this.showLogAtIndex(this.index);
    }
};
CanvasLogBook.prototype.showLogAtIndex = function(index) {
    //ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    if (isFirefox) {
        var image = this.logs[index];
        ctx.drawImage(image, 0, 0);
    } else {
        var image = new Image();
        image.src = this.logs[index];
        ctx.drawImage(image, 0, 0);
    }
};
var canvasLogBook = new CanvasLogBook();