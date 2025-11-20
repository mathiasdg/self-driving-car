import * as SIZES from "./Helpers/constants";
import Car from "./Classes/Car";
import Road from "./Classes/Road";
import autoIcon from "/auto.svg";
import "../style.css";
// import { mount } from "svelte";
// import App from "./App.svelte";

const p5canvas = document.querySelector("#p5canvas");
let road;
let car;
let svgIcon;
let height;
let looper = true;

function preload() {
	svgIcon = loadImage(autoIcon);
}

function setup() {
	height = window.innerHeight;
	createCanvas(SIZES.CANVAS_WIDTH, height, p5canvas);
	// imageMode(CENTER);

	road = new Road(SIZES.CANVAS_WIDTH);
	car = new Car(
		road.getLaneCenter(2),
		height*0.87,
		SIZES.CAR_WIDTH,
		SIZES.CAR_HEIGHT,
		0,
		0,
		svgIcon,
	);
}

function draw() {
	height = window.innerHeight;
	resizeCanvas(SIZES.CANVAS_WIDTH, height);
	background(69);
	
	// road.update();
	car.update(road.borders);

	push();
		translate(0, -car.y+height*0.77);
		road.draw();
		car.draw();
	pop();

	if(!looper) noLoop();
}

function keyPressed() {
	if(key === 's') {
		looper = !looper;
		if(looper)
			loop();
		else
			noLoop();
	}
}

// Make them global
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;

// de classes ook voor devtool interaction bij debuggen
if(SIZES.DEBUG) {
	window.Road = Road;
	window.Car = Car;
}

// const app = mount(App, {
// 	target: document.querySelector("#app")}
// );
