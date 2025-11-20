import { CANVAS_WIDTH, DEBUG } from "../Helpers/constants";
import Controls from "./Controls";
import Sensor from "./Sensor";
import Windscreen from "./Windscreen";

/**
 * Represents a car object in the self-driving car simulation.
 * Handles movement, boundary wrapping, and basic physics like friction.
 */
export default class Car {
	/**
	 * Creates a new Car instance.
	 * @param {number} x - Initial x position.
	 * @param {number} y - Initial y position.
	 * @param {number} width - Car width.
	 * @param {number} height - Car height.
	 * @param {number} direction - Initial direction in degrees.
	 * @param {number} speed - Initial speed.
	 * @param {p5.Image} autoIcon - The car's image.
	 */
	constructor(x, y, width, height, direction = 0, speed = 0, autoIcon) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.direction = direction ; // laat 0° op de cirkel boven zijn
		this.speed = speed;
		this.acceleration = 0.420	;
		this.icon = autoIcon;

		this.controls = new Controls();
		this.sensor = new Sensor(this, 7, Math.PI*2/3);
		this.windscreen = new Windscreen(this);
	}

	update(road, toggleWindscreen) {
		// Apply basic friction
		this.speed *= 0.96;

		this.#move()
		this.#wrapBoundary()

		this.sensor.update(road.borders)
		this.windscreen.update(road);
		this.toggleWindscreen = toggleWindscreen;
		
		if (DEBUG) {
			// console.log(this.speed, this.direction, this.flip)
		}
	}

	draw() {
		this.sensor.draw()

		if(this.toggleWindscreen)
			this.windscreen.draw()
	
		push();
		translate(this.x, this.y);
		rotate(this.direction);
		rectMode(CENTER)
		noStroke();
		fill(42, 69, 120)
		rect(0, 0, this.width-72, this.height-34);
		image(this.icon, - this.width / 2, -this.height / 2, this.width, this.height);

		
		if (DEBUG) {
			this.#drawCarBorder();
			
			stroke("red")
			strokeWeight(6.9)
			point(0, 0);
		}
		
		pop();
	}

	#move() {
		// flip turning when reversing
		this.flip = (this.speed < 0) ? -1 : 1;
		
		if (this.controls.accelerate) {
			this.speed += this.acceleration;
		}
		if (this.controls.reverse) {
			this.speed -= this.acceleration * 0.5;
		}
		if (this.controls.left && Math.abs(this.speed) > 0.69) {
			this.direction -= 0.03 * this.flip;
		}
		if (this.controls.right && Math.abs(this.speed) > 0.69) {
			this.direction += 0.03 * this.flip;
		}
		if (this.controls.handbrake) {
			this.speed -= this.speed * 0.069;
		}

		// Update position
		this.x -= this.speed * Math.sin(-this.direction);
		this.y -= this.speed * Math.cos(-this.direction);
	}

	#wrapBoundary() {
		// Boundary wrapping
		if (this.x < 0) this.x = CANVAS_WIDTH;
		if (this.x > CANVAS_WIDTH) this.x = 0;
		if (Math.abs(this.speed) < 0.1) this.speed = 0;		
	}

	#drawCarBorder(){
		noFill()
		stroke(255,122,22)
		strokeWeight(2)

		rect(0, 0, this.width-60, this.height-20);
		
		// polygon
		// beginShape();
		// vertex(-this.width / 2, -this.height / 2);
		// vertex(this.width / 2, -this.height / 2);
		// vertex(this.width / 2, this.height / 2);
		// vertex(-this.width / 2, this.height / 2);
		// endShape(CLOSE);
	}
}