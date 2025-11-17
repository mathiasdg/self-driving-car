import * as SIZES from "./constants";
import Car from "./Car";
import autoIcon from "/auto.svg";
import "./style.css";

const p5canvas = document.querySelector("#p5canvas");
let car;
let svgIcon;
let height;

function preload() {
	svgIcon = loadImage(autoIcon);
}

function setup() {
	height = window.innerHeight;
	createCanvas(SIZES.CANVAS_WIDTH, height, p5canvas);
	// imageMode(CENTER);

	car = new Car(
		SIZES.CAR_POSITION_X,
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

	car.update();
	car.draw();
}

// Make them global
window.preload = preload;
window.setup = setup;
window.draw = draw;