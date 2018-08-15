var canvas;
var blocs = [];
var index = 0;
var backgroundColor = "#fcfcfc";
var isAdding = false;
var blocWidth = 100;
var blocHeight = 100;
var currentBloc;
var isMouseDown = false;


window.onload = function(){

		canvas = document.getElementById("canvas");
		canvas.width = 2500;
		canvas.height = 1000;
		c = canvas.getContext("2d");
			
		initializeCanvas();	
}

function initializeCanvas(){

	c.fillStyle = backgroundColor;
	c.fillRect(0, 0, canvas.width, canvas.height);
		
	canvas.addEventListener('mousemove', function(e) { moveBloc(e); } );
	canvas.addEventListener('click', function(e) { completeAdd(e); } );
	window.addEventListener('keypress', function(e) { processKeyDown(e); } );
	canvas.addEventListener('mousedown', function(e) { moveExistingBloc(e); } );
	canvas.addEventListener('mouseup', function(e) { isMouseDown = false; });
}

function clear(){
	c.clearRect (0, 0, canvas.width, canvas.height);
	c.fillStyle = backgroundColor;
	c.fillRect(0, 0, canvas.width,canvas.height);
}

function moveBloc(e){
	
	var mousePos = getMousePos(canvas, e);

	if(blocs.length > 0 && !isAdding){
		for(var i = blocs.length - 1, bloc; bloc = blocs[i]; i--) {
			if(mousePos.x >= bloc.x && mousePos.x <= bloc.x + bloc.width &&
			   mousePos.y >= bloc.y && mousePos.y <= bloc.y + bloc.height) {
				bloc.isHover = true;
				oneBlocIsHover = true;
				currentBloc = bloc;
			}else
			{
				bloc.isHover = false;
			}
		}
	}
	
	if(isAdding  || (isMouseDown && currentBloc != null)){
		currentBloc.x = mousePos.x;
		currentBloc.y = mousePos.y;
	}
		
	clear();
	draw();
}

function moveExistingBloc(e){
	isMouseDown = true;
}

function draw(){
	
	for (var i = 0; i < blocs.length; i++) { 
		if(blocs[i]){
			blocs[i].draw();
		}
	}
	
	currentBloc.draw();
	
}

function addBloc(e){
	var mousePos = getMousePos(canvas, e);
	var newBloc = bloc(mousePos.x, mousePos.y, blocWidth, blocHeight, 'black', 'black');
	currentBloc = newBloc;
}

function completeAdd(e){
	if(isAdding){
		isAdding = false;
		blocs.push(currentBloc);
		currentBloc = null;
	}
}

function processKeyDown(e)
{
	if(e.keyCode == 97)
	{
		isAdding = !isAdding;
		
		if(isAdding){
			addBloc(e);
		}else{
			addedBloc = null;
		}
	}
}

// function getMousePos(canvas, evt) {
  // var rect = canvas.getBoundingClientRect();
  // return {
    // x: evt.clientX - rect.left,
    // y: evt.clientY - rect.top
  // };
// }

function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function getNextIndex(){
	index = index + 1;
	return index;
}


function bloc(x, y, width, height, borderColor, color){
	var self = {
		x : x,
		y : y,
		width : width,
		height : height,
		borderColor : borderColor,
		color : color,
		index : getNextIndex(),
		isHover: false,
		
		
		draw : function(){		
			if(!self.isHover){
				c.lineWidth = 1;
				c.fillStyle = self.color;
				c.strokeRect(self.x, self.y, self.width, self.height);
			}else{
				c.lineWidth = 4;
				c.fillStyle = self.color;
				c.strokeRect(self.x, self.y, self.width, self.height);
			}
			
			var text = "Syllabus #" + self.index;
			c.font = "15px Arial";
			c.fillText(text, self.x + 10 , self.y  + 20);
			
		}
	}
	
	return self;
}

	


