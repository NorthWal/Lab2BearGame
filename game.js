function start(){
	bear = new Bear();
	document.addEventListener("keydown",moveBear,false);
	document.addEventListener("onChange",setSpeed,false);
	bees = new Array();
	makeBees();
	updateBees();
	lastStingTime = new Date();
}




function Bear(){

	this.dBear = document.getElementById("speedBear").value;
	this.htmlElement = document.getElementById("bear");
	this.id =this.htmlElement.id;
	this.x = this.htmlElement.offsetLeft;
	this.y = this.htmlElement.offsetTop;

	this.move = function(xDir,yDir){
		this.fitBounds();
		this.x += this.dBear*xDir;
		this.y += this.dBear*yDir;
		this.display();
	};

	this.display = function() {
		this.htmlElement.style.left = this.x + "px";
		this.htmlElement.style.top = this.y +"px";
		this.htmlElement.style.display = "absolute";
	};

	this.fitBounds = function(){
		let parent = this.htmlElement.parentElement;
 		let iw = this.htmlElement.offsetWidth;
 		let ih = this.htmlElement.offsetHeight;
 		let l = parent.offsetLeft;
 		let t = parent.offsetTop;
 		let w = parent.offsetWidth;
 		let h = parent.offsetHeight;
 		
 		if (this.x < 0) {
 		this.x = 0
 		console.log("A");
 	}

 		if (this.x > w - iw) {
 		this.x = w - iw
 		console.log("B");
 	}
 		if (this.y < 0){ 
 		this.y = 0
 		console.log("C");
 	}

 		if (this.y > h - ih){
 		this.y = h - ih
 		console.log("D");
 	}
 	};
	
	
}
function setSpeed(){
		bear.dBear = document.getElementById("speedBear").value;
 }


function moveBear(e){
	const KEYUP = 87;
	const KEYDOWN = 83;
	const KEYLEFT = 65;
	const KEYRIGHT = 68;

	if(e.keyCode == KEYUP){
		bear.move(0,-1)
	}
	if(e.keyCode == KEYDOWN){
		bear.move(0,1)
	}
	if(e.keyCode == KEYLEFT){
		bear.move(-1,0)
	}
	if(e.keyCode == KEYRIGHT){
		bear.move(1,0)
	}

}

class Bee{

	constructor(beeNumber){

		this.htmlElement = createBeeImg(beeNumber);
		this.id = this.htmlElement.id;
		this.x = this.htmlElement.offsetLeft;
		this.y = this.htmlElement.offsetTop;
	
	this.move = function(dx, dy){
			this.x += dx;
			this.y += dy;
			this.display();
		};
	


	this.display = function(){
		this.fitBounds()
		this.htmlElement.style.left = this.x + "px";
 		this.htmlElement.style.top = this.y + "px";
 		this.htmlElement.style.display = "block";
	};
		
	this.fitBounds = function() {
 
 		let parent = this.htmlElement.parentElement;
 		let iw = this.htmlElement.offsetWidth;
 		let ih = this.htmlElement.offsetHeight;
 		let l = parent.offsetLeft;
 		let t = parent.offsetTop;
 		let w = parent.offsetWidth;
 		let h = parent.offsetHeight;

 		if (this.x < 0)
 		this.x = 0;

 		if (this.x > w - iw)
 		this.x = w - iw;

 		if (this.y < 0)
 		this.y = 0;

 		if (this.y > h - ih)
 		this.y = h - ih;
 		};
 	}
 }

 function createBeeImg(wNum) {

 	let boardDiv = document.getElementById("board");
 	let boardDivW = boardDiv.offsetWidth;
 	let boardDivH = boardDiv.offsetHeight;
 	let boardDivX = boardDiv.offsetLeft;
 	let boardDivY = boardDiv.offsetTop;

 	let img = document.createElement("img");
 	img.setAttribute("src", "images/bee.gif");
 	img.setAttribute("width", "100");
 	img.setAttribute("alt", "A bee!");
 	img.setAttribute("id", "bee" + wNum);
 	img.setAttribute("class", "bee"); 

 	img.style.position = "absolute";
 	boardDiv.appendChild(img);

 	let x = getRandomInt(boardDivW);
 	let y = getRandomInt(boardDivH);
 	img.style.left = (boardDivX + x) + "px";
 	img.style.top = (y) + "px";

 	return img;
}
function makeBees() {
 	//get number of bees specified by the user
 	let nbBees = document.getElementById("nbBees").value;
 	nbBees = Number(nbBees); 					
 	//try converting the content of the input to a number 
 	if (isNaN(nbBees)) { 						
 	//check that the input field contains a valid number
 		window.alert("Invalid number of bees");
 		return;
	 }
 	//create bees 
 	let i = 1;
 	while (i <= nbBees) {
 		beeMaker();
 	i++;
 	}
}
function beeMaker(){
	var num = bees.length+1;
 	var bee = new Bee(num); //create object and its IMG element
 	bee.display(); 			//display the bee
 	bees.push(bee); 		//add the bee object to the bees array
 	document.getElementById("nbBees").value = bees.length;
}
function getRandomInt(max){
	return (max*(Math.random()));
}


function moveBees(){
	let speed = document.getElementById("speedBees").value;

	for (let i=0; i<bees.length;i++){
		let dx = getRandomInt(2*speed)-speed;
		let dy = getRandomInt(2*speed)-speed;
		bees[i].move(dx,dy);
		isHit(bees[i], bear);
	}
}

function updateBees(){

	moveBees();

	let period = document.getElementById("periodTimer").value;

	if (document.getElementById("hits").innerHTML >999){
		alert("Game Over!")
	}
	else
	updateTimer = setTimeout('updateBees()',period);
}

function isHit(defender, offender) {
 	if (overlap(defender, offender)) { //check if the two image overlap
 		let score = hits.innerHTML;
 		score = Number(score) + 1; //increment the score
 		hits.innerHTML = score; //display the new score

 		let newStingTime = new Date();
 		let thisDuration = newStingTime - lastStingTime;
 		lastStingTime = newStingTime;
 		let longestDuration = Number(duration.innerHTML);
 		if (longestDuration === 0) {
			 longestDuration = thisDuration;
 		} 
 		else {
 			if (longestDuration < thisDuration) longestDuration = thisDuration;
 		}
 		document.getElementById("duration").innerHTML = longestDuration;
 
 	}
}
function overlap(element1, element2) {
	 //consider the two rectangles wrapping the two elements
	 //rectangle of the first element
	 left1 = element1.htmlElement.offsetLeft; 
	 top1 = element1.htmlElement.offsetTop; 
	 right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth; 
	 bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight; 
	 
	 //rectangle of the second element
	 left2 = element2.htmlElement.offsetLeft; //e2x
	 top2 = element2.htmlElement.offsetTop; //e2y
	 right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
	 bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight; 
	
	//calculate the intersection of the two rectangles
	 x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
	 y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
	 intersectArea = x_intersect * y_intersect;
	 //if intersection is nil no hit
	 if (intersectArea == 0 || isNaN(intersectArea)) {
	 	return false;
	 }
	 return true;
}
