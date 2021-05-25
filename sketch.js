
let plane;

let tube

let vid

let bleachtemp

let bleach

let crossSize = 100;

let coralOne
let coralTwo

let zoom;
let zvel = 0;
let xpos = 0;
let xvel = 0;
let lpos, mpos;

var bubbles = [];
var targetx;
var targety;
var rotx = 0.0;
var roty = 0.0;

///postions
beginning = true
freedom = false


///camera tings
let m 

let camman

let zoomnumber
let zoommoving = true
let zoomnotmoving = false



////coral changes

let coralisplain = true
let coralistextured = false



////maybe array
let deadcoral = []


function preload() {
  plane = loadModel('assets/alteredplane.obj');

  coralOne = loadModel('assets/itlldo.obj')

  coralTwo = loadModel('assets/clam.obj')

}

function setup() {
  createCanvas(windowWidth -10, windowHeight -10, WEBGL);
  pixelDensity (displayDensity ());


  vid = createVideo(['assets/visual.webm'])
  vid.elt.muted = true
  vid.loop();
  vid.hide();

  bleachtemp = createVideo(['assets/bleach.webm'])
  bleachtemp.elt.muted = true
  bleachtemp.loop();
  bleachtemp.hide();

 

  zoom = 1.2 * height;
	lpos = createVector(0, 0);

  noCursor()

  angleMode(DEGREES)

  //camman = createCamera()

	//if(beginning = true){
	//camman.setPosition(0, 0, 6000)
	//}

  for (let i = 0; i < 50; i++) {
    deadcoral.push(new dead());
  }
}



function draw() {
  background(0);

  ambientLight(0, 100, 120, 200)
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(0,22, 84.3, -dirX, -dirY, -1);

  let dirXX	 = (mouseX / width - 0.25) * 4;
  let dirYY = (mouseY / height - 0.25) * 4;
  directionalLight(68.6, 7.8 , 87.1, -dirXX, -dirYY, -1);

  zoomCamera()
  
  bubbling()

  normal()

  //orbitControl();
  //rotateY(0.5);

  
  

  for (let i = 0; i < deadcoral.length; i++) {
    deadcoral[i].move();
    deadcoral[i].display();
  }

}

class dead{
  constructor(){
    this.x = random(width)
    this.y = random(-height/4)
    this.z = random(width)
    this.size = random (30, 60)

  }
  move(){
    //rotateY(millis() / 200)
    rotateX(millis() / 100)
  }

  display(){

  translate(this.x, this.y, this.z)
  push()
  scale(this.size)
  normalMaterial()
  texture(bleachtemp)
  fill(255)
  model(coralOne)
  pop()
  }
}

function coralplain(){
  
  translate(-windowWidth/4 +300, -windowHeight/2, -400)
  push()
  rotateY(millis() / 30)
  scale(50)
  normalMaterial()
  texture(bleachtemp)
  fill(255)
  model(coralOne)
  pop()

}

function normal(){
  translate(-windowWidth/4 +300, -windowHeight/2, -400)
  push()
  rotateY(millis() / 30)
  scale(50)
  normalMaterial()
  texture(bleachtemp)
  //fill(255)
  model(coralOne)
  pop()
}

function bubbling(){
  bubbles.push (new BubblesBase (random (width/2), height + 40.0, random (-1000.0, 1000.0), random (20,0), random (0.1, 20.0)));
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].update ();
		bubbles[i].render ();
		if (bubbles[i].lifetime < -100) {
			bubbles.splice (i, 1);
		}
	}

}
 
function zoomCamera() {
  
	zoom += zvel;
	zvel *= .99;
	xpos += xvel;
	xvel *= .99;
	if (zoom < -200000000) {
		zvel *= -1;
	}
	if (xpos > 1200000000 || xpos < -120000000) {
		xvel *= -1
	};
	if (keyIsDown(UP_ARROW)) {
		zvel -= 0.2;
	}
	if (keyIsDown(DOWN_ARROW)) {
		zvel += 0.2;
	}
	if (keyIsDown(LEFT_ARROW)) {
		xvel -= 0.2;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		xvel += 0.2;
	}
	
	
	camera(xpos, 0, zoom, 0, 0, 0, 0, 1, 0);
	
}


function BubblesBase (x, y, z, r, up) {
	this.bx = x;
	this.by = y;
	this.bz = z;
	this.br = r;
	this.lifetime = 50;
	this.update = function () {
		this.by -= up;
		this.lifetime--;
	}
	this.render = function () {
		noStroke ();
		push ();
		fill(255, map(this.lifetime, 100, -100, 0, 100))
		translate (this.bx - width / 2.0, this.by - height / 2.0, this.bz);
		sphere (this.br * 1.0);
		pop ();
	}
}


function Tunneling (){
        this.tx = 50;
        this.ty = 20 +frameCount/2;
        this.tz = 50;

        this.render = function(){
        push()
          scale(20)
          normalMaterial()
          translate(this.tx, this.ty, this.tz)
          texture(bleachtemp)
          model(tube)
        pop()
        }

        this.update = function(){
        this.ty = 20 +frameCount/2

        if(this.ty >40){
         this.ty = 20 +frameCount/2}
         push()
          scale(20)
          normalMaterial()
          translate(this.tx, this.ty, this.tz)
          texture(bleachtemp)
          model(tube)
        pop()
        } 
} 

function fly(){

  translate(windowWidth/4, windowHeight/2, -400)
  //scale(50 + sin(frameCount/60)*15)
  scale(50)
  normalMaterial()
  //rotateX(frameCount/90)*0.02
  //rotateY(frameCount/90)*0.02
  fill(255)
  texture(bleachtemp)
  model(plane);

}

function zoommoves(zoomchecker){
	if(zoomchecker){
	zoomnumber = -1.5

	camman.move(0, 0, zoomnumber)
	}	
}

function nozoommoves(zoomnotmoving){
	if(zoomnotmoving)
		zoomnumber = 0

		camman.move(0, 0, zoomnumber)
	}

function zoomtimeandplace(){
	
		zoommoving = false
		zoomnotmoving = true
}

function thetruth(){

	beginning = false
	freedom = true
}

function cameraz(){

	if(m > 30000){
	zoomtimeandplace()

	//thetruth()
	}
}