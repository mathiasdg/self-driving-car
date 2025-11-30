import * as _69 from "./Helpers/constants";
import UserCar from "./Classes/UserCar";
import Road from "./Classes/Road";
import Traffic from "./Classes/Traffic";
import autoIcon from "/auto.svg";
import "../style.css";
// import { mount } from "svelte";
// import App from "./App.svelte";

const p5canvas = document.querySelector("#p5canvas");
let road;
let userCar;
let traffic;
let svgIcon;
let height;
let looper = true;
let frameCounter = 0;
const updateInterval = 6
const drawOptions = {
	debug: true,
    sensorsOn: true,
    windscreenOn: false,
	userCar: true
};

function preload() {
	svgIcon = loadImage(autoIcon);
}

function setup() {
	height = window.innerHeight;
	createCanvas(_69.CANVAS_WIDTH, height, p5canvas);

	road = new Road(_69.CANVAS_WIDTH);
	traffic = new Traffic(11, road, svgIcon)
	userCar = new UserCar({
		x: road.getLaneCenter(2),
		y: height * _69.CAR_BOTTOM_PLACEMENT,
		width: _69.CAR_WIDTH,
		height: _69.CAR_HEIGHT,
		direction: 0,
		speed: 0,
		autoIcon: svgIcon
	});

	// de classes globaal beschikbaar voor devtool interaction bij debuggen
	if(drawOptions.debug) {
		makeGlobal();
		// print(traffic.cars);
	}
}

function draw() {
	height = window.innerHeight;
	resizeCanvas(_69.CANVAS_WIDTH, height);
	background(69);
	
	userCar.update(road);
	traffic.update();

	push();
		translate(0, -userCar.y + height * _69.CAR_BOTTOM_PLACEMENT);
		road.draw();
		traffic.draw(drawOptions)
		const carState = userCar.draw(drawOptions);
	pop();

	++frameCounter;
	// console.log(carState.speed);
	if (frameCounter >= updateInterval) {
		const speed = Math.abs(carState.speed);
		document.querySelector('.display').textContent = round(speed * 10);
		document.querySelector('.needle').style.setProperty('--needle',`${speed * 13.69}deg`);
		// document.querySelector('.needle').style.transform = `scale(0.87) rotate(${carState.speed * 11.69}deg)`;
		frameCounter = 0;
	}
	

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
	window.car = userCar;
	window.traffic = traffic;
	window.drawOptions = drawOptions;
}

// const app = mount(App, {
// 	target: document.querySelector("#app")}
// );
