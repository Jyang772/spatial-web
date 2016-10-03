/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global Node, BoundsNode */

/*
	The MIT License

    Modified by Justin Y. --Variable input, 
	Copyright (c) 2011 Mike Chambers

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

var squares = [];
var IC = false;

/**
* A QuadTree implementation in JavaScript, a 2d spatial subdivision algorithm.
* @module QuadTree
**/

//(function (window) {
    "use strict";

    /****************** QuadTree ****************/

    /**
    * QuadTree data structure.
    * @class QuadTree
    * @constructor
    * @param {Object} An object representing the bounds of the top level of the QuadTree. The object 
    * should contain the following properties : x, y, width, height
    * @param {Boolean} pointQuad Whether the QuadTree will contain points (true), or items with bounds 
    * (width / height)(false). Default value is false.
    * @param {Number} maxDepth The maximum number of levels that the quadtree will create. Default is 4.
    * @param {Number} maxChildren The maximum number of children that a node can contain before it is split into sub-nodes.
    **/
    function QuadTree(bounds, maxDepth, maxChildren) {
        var node = new Node(bounds,0, maxDepth, maxChildren,null);
        this.root = node;
    }

    /**
    * The root node of the QuadTree which covers the entire area being segmented.
    * @property root
    * @type Node
    **/
    //QuadTree.prototype.root = null;


    /**
    * Inserts an item into the QuadTree.
    * @method insert
    * @param {Object|Array} item The item or Array of items to be inserted into the QuadTree. The item should expose x, y 
    * properties that represents its position in 2D space.
    **/
    QuadTree.prototype.insert = function (item) {
        if (item instanceof Array) {
            var len = item.length;

            var i;
            this.root.numChildren++;
            for (i = 0; i < len; i++) {
                this.root.insert(item[i]);
            }
        } else {
            this.root.numChildren++;

            this.root.insert(item);
        }
    };

    /**
    * Clears all nodes and children from the QuadTree
    * @method clear
    **/
    QuadTree.prototype.clear = function () {
        this.root.clear();
    };

    /**
    * Retrieves all items / points in the same node as the specified item / point. If the specified item
    * overlaps the bounds of a node, then all children in both nodes will be returned.
    * @method retrieve
    * @param {Object} item An object representing a 2D coordinate point (with x, y properties), or a shape
    * with dimensions (x, y, width, height) properties.
    **/
    QuadTree.prototype.retrieve = function (item) {
        //get a copy of the array of items
        console.log(item.x + " " + item.y);
        var out = this.root.retrieve(item).slice(0);
        console.log("out: ");
        console.log(out);
        return out;
    };

    /************** Node ********************/


    function Node(bounds, depth, maxDepth, maxChildren,parent) {
        this._bounds = bounds;
        this.children = [];
        this.nodes = [];

        if (maxChildren) {
            this._maxChildren = maxChildren;
        }

        if (maxDepth) {
            this._maxDepth = maxDepth;
        }

        if (depth) {
            this._depth = depth;
        }
        if(parent) {
            this._parent = parent;
        }
    }

    //subnodes
    Node.prototype.nodes = null;
    Node.prototype._classConstructor = Node;
    Node.prototype._index = null;

    //children contained directly in the node
    Node.prototype.numChildren = 0;
    Node.prototype.children = null;
    Node.prototype._bounds = null;
    Node.prototype._parent = null;
    //read only
    Node.prototype._depth = 0;

    Node.prototype._maxChildren = 4;
    Node.prototype._maxDepth = 40;

    Node.TOP_LEFT = 0;
    Node.TOP_RIGHT = 1;
    Node.BOTTOM_LEFT = 2;
    Node.BOTTOM_RIGHT = 3;


    Node.prototype.insert = function (item) {
        if (this.nodes.length) {
            //this.numChildren++;

            var index = this._findIndex(item);

            this.nodes[index].numChildren++;
            this.nodes[index].insert(item);
            return;
        }
        this.children.push(item);
        //this.numChildren++;
        
        var len = this.children.length;
        if (!(this._depth >= this._maxDepth) && len > this._maxChildren) {
            this.subdivide();

            var i;
            for (i = 0; i < len; i++) {
                this.insert(this.children[i]);
            }

            //this.children.length = 0;
        }
    };

var clickedNodeL;
var id;

    Node.prototype.get = function(node,index) {
        
        console.log("inside get");
        console.log("INDEX_: " + index);
        	
       // clickedNodeL += node.nodes[index].children.length;
        clickedNodeL += node.nodes[index].numChildren;
        var found = false;
        console.log(node.nodes[index]._bounds);
        if(clickedNodeL == k) {
            drawRect(node.nodes[index]._bounds);
        }
        
        
    //For IC, don't check index === n
    if(clickedNodeL < k) {
        if(!IC) {
        if(index === 0 || index === 3) {
            if(clickedNodeL + node.nodes[1].numChildren >= k) {
                        console.log("Add node: " + 1);
                        drawRect(node.nodes[1]._bounds);
                        drawGreen(node.nodes[1]._bounds,id);
                        return;
                    }
                    else if(clickedNodeL + node.nodes[2].numChildren >= k) {
                        console.log("Add node: " + 2);
                        drawRect(node.nodes[2]._bounds);
                        drawGreen(node.nodes[2].children,id);
                        drawGreen(node.nodes[2]._bounds,id);

                        return;
                    }   
                    else if(clickedNodeL + node.nodes[1].numChildren + node.nodes[2].numChildren >= k)                     {
                        console.log("Add node: " + 1);
                        console.log("Add node: " + 2);
                        drawRect(node.nodes[1]._bounds);
                        drawRect(node.nodes[2]._bounds);
                        drawGreen(node.nodes[1]._bounds,id);
                        drawGreen(node.nodes[2]._bounds,id);

                        
                        //Don't return if no L-shaped ASRs
                        //return;
                    }
                    else {
                        if(node.nodes[1].numChildren !== 0) {
                            clickedNodeL += node.nodes[1].numChildren;
                            drawRect(node.nodes[1]._bounds);
                            drawGreen(node.nodes[1]._bounds,id);

                        }
                        if(node.nodes[2].numChildren !== 0) {
                            clickedNodeL += node.nodes[2].numChildren;
                            drawRect(node.nodes[2]._bounds);
                            drawGreen(node.nodes[2]._bounds,id);;
                        }
                        console.log("Add node: " + 1);
                        console.log("Add node: " + 2);
                    }
        }
        if(index === 1 || index === 2) {
             if(clickedNodeL + node.nodes[0].numChildren >= k) {
                 
                        console.log("Add node: " + 0);
                        drawRect(node.nodes[0]._bounds);
                        drawGreen(node.nodes[0]._bounds,id);

                        return;
                    }
                    else if(clickedNodeL + node.nodes[3].numChildren >= k) {
                        console.log("Add node: " + 3);
                        drawRect(node.nodes[3]._bounds);
                        drawGreen(node.nodes[3]._bounds,id);

                        return;
                    }   
                    else if(clickedNodeL + node.nodes[0].numChildren + node.nodes[3].numChildren >= k)                                     {
                        
                        console.log("clickedNodeL: " + clickedNodeL);
                        console.log(node.nodes[0].numChildren);
                        console.log("Add node: " + 0);
                        console.log("Add node: " + 3);
                        drawRect(node.nodes[0]._bounds);
                        drawRect(node.nodes[3]._bounds);
                        drawGreen(node.nodes[0]._bounds,id);
                        drawGreen(node.nodes[3]._bounds,id);


                        //Don't return if no L-shaped ASRs
                       // return;
                    }
                    else {
                        if(node.nodes[0].numChildren !== 0) {
                            clickedNodeL += node.nodes[0].numChildren;
                           drawRect(node.nodes[0]._bounds);
                            drawGreen(node.nodes[0]._bounds,id);
                        }
                        if(node.nodes[3].numChildren !== 0) {
                            clickedNodeL += node.nodes[3].numChildren;
                            drawRect(node.nodes[3]._bounds);
                            drawGreen(node.nodes[3]._bounds,id);
                        }

                    }
                    
        }
        }
        
        
             {     //If node is root, don't half numChildren
    	        console.log(node.numChildren);
    	        //if(node.numChildren >= k) 
    	            drawRect(node._bounds);
    	            drawGreen(node._bounds,id);
    	        
             }
             if(node._parent) {
                console.log("Check Parent");
                node.get(node._parent,node._parent._index);
            }
    }
        
    };

    Node.prototype.retrieve = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);

	        
	        squares.push(index);
	        console.log("INDEX: " + index);
	        console.log("children: " + this.nodes[index].numChildren);
	        console.log("parent: " + this.numChildren);
	        
	        
            id = item.id;
            //Get Nodes that include K points
            clickedNodeL = 0;
            this.get(this,index);


            return this.nodes[index].retrieve(item);
        }
        else {
            drawRect(this._bounds);
            drawGreen(this._bounds,id);
        }

        console.log("DONE DRAW");
        return this.children;
    };

    Node.prototype._findIndex = function (item) {
        var b = this._bounds;
        var left = (item.x > b.x + b.width / 2) ? false : true;
        var top = (item.y > b.y + b.height / 2) ? false : true;

        //top left
        var index = Node.TOP_LEFT;
        if (left) {
            //left side
            if (!top) {
                //bottom left
                index = Node.BOTTOM_LEFT;
            }
        } else {
            //right side
            if (top) {
                //top right
                index = Node.TOP_RIGHT;
            } else {
                //bottom right
                index = Node.BOTTOM_RIGHT;
            }
        }
	    this._index = index;
        return index;
    };


    Node.prototype.subdivide = function () {
        var depth = this._depth + 1;

        var bx = this._bounds.x;
        var by = this._bounds.y;

        //floor the values
        var b_w_h = (this._bounds.width / 2); //todo: Math.floor?
        var b_h_h = (this._bounds.height / 2);
        var bx_b_w_h = bx + b_w_h;
        var by_b_h_h = by + b_h_h;

        //top left
        this.nodes[Node.TOP_LEFT] = new this._classConstructor({
            x: bx,
            y: by,
            width: b_w_h,
            height: b_h_h,
        },
            depth, this._maxDepth, this._maxChildren,this);

        //top right
        this.nodes[Node.TOP_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by,
            width: b_w_h,
            height: b_h_h,
        },
            depth, this._maxDepth, this._maxChildren,this);

        //bottom left
        this.nodes[Node.BOTTOM_LEFT] = new this._classConstructor({
            x: bx,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h,
        },
            depth, this._maxDepth, this._maxChildren,this);


        //bottom right
        this.nodes[Node.BOTTOM_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren,this);
    };

    Node.prototype.clear = function () {
        this.children.length = 0;

        var len = this.nodes.length;
        
        var i;
        for (i = 0; i < len; i++) {
            this.nodes[i].clear();
        }

        this.nodes.length = 0;
    };
    
