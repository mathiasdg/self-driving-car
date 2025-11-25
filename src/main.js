import * as _69 from "./Helpers/constants";
import UserCar from "./Classes/UserCar";
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
const drawOptions = {
	debug: true,
    sensorsOn: true,
    windscreenOn: false
};

function preload() {
	svgIcon = loadImage(autoIcon);
}

function setup() {
	height = window.innerHeight;
	createCanvas(_69.CANVAS_WIDTH, height, p5canvas);

	road = new Road(_69.CANVAS_WIDTH);
	car = new UserCar({
		x: road.getLaneCenter(2),
		y: height * _69.CAR_BOTTOM_PLACEMENT,
		width: _69.CAR_WIDTH,
		height: _69.CAR_HEIGHT,
		direction: 0,
		speed: 0,
		autoIcon: svgIcon
	});

	// de classes ook voor devtool interaction bij debuggen
	if(drawOptions.debug) {
		makeGlobal();
	}
}

function draw() {
	height = window.innerHeight;
	resizeCanvas(_69.CANVAS_WIDTH, height);
	background(69);
	
	car.update(road);

	push();
		translate(0, -car.y + height * _69.CAR_BOTTOM_PLACEMENT);
		road.draw();
		car.draw(drawOptions);
	pop();

	if(!looper) noLoop();
}

function keyPressed() {
	if(key === 'p') {
		looper = !looper;
		if(looper)
			loop();
		else
			noLoop();
	}
	if(key === 'v') {
		drawOptions.windscreenOn = !drawOptions.windscreenOn;
	}
	if(key === 's') {
		drawOptions.sensorsOn = !drawOptions.sensorsOn;
	}
	if(key === 'd') {
		drawOptions.debug = !drawOptions.debug;
	}
}

// Make them global
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;

function makeGlobal() {
	window.road = road;
	window.car = car;
	window.drawOptions = drawOptions;
}

// const app = mount(App, {
// 	target: document.querySelector("#app")}
// );
