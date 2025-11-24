import * as _69 from "../Helpers/constants";
import { polysIntersect } from "../Helpers/utils";
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
		this.acceleration = _69.ACCELERATION;
		this.icon = autoIcon;
		this.damaged = false;

		this.controls = new Controls();
		this.sensor = new Sensor(this, 7, Math.PI*2/3);
		this.windscreen = new Windscreen(this);
		this.polygon = [];
		this.collisions = [];
	}

	update(road) {
		// Apply basic friction
		this.speed *= _69.FRICTION;

		this.#move();
		this.polygon = this.#createPolygon();
		// console.log(this.polygon)

		const result = this.#assessDamage(road.borders);
		this.damaged = result.damaged;
		this.collisions = result.intersections;
		
		// this.#wrapBoundary()

		this.sensor.update(road.borders)
		this.windscreen.update(road);
	}

	draw(options) {
		if (options.sensorsOn ) {
			this.sensor.draw()
		}
		if (options.windscreenOn)
			this.windscreen.draw()
	
		push();
		translate(this.x, this.y);
		rotate(this.direction);
		rectMode(CENTER)

		noStroke();
		fill(42, 69, 120)
		// rechthoek met zelfde grootte onder de auto om ramen vol te maken
		rect(0, 0, this.width-72, this.height-34);

		if (this.damaged) {
			tint(69);
			// noLoop();
			// this.icon.filter(GRAY)
		}
		image(this.icon, - this.width / 2, -this.height / 2, this.width, this.height);
		pop();

		if (options.debug) {
			// bounding box rond de auto voor collission detection
			this.#drawCarBorder(this.polygon);
			// rode stip in center van de auto (voor rotatie te debuggen)
			stroke("red")
			strokeWeight(6.9)
			point(this.x, this.y);

			// collision point on car polygon
			if ( this.collisions.length > 0 ) {
				stroke("cyan"); 
				strokeWeight(4);
				for (const intersect of this.collisions) {
					// point(intersect.x, intersect.y)
					ellipse(intersect.x, intersect.y, 11, 11)
				}
			}
			
		}

	
	}	

	#assessDamage(borders) {
		const theta = this.direction;
		const worldPolygon = this.polygon.map(pt => {
			const rotatedX = pt.x * Math.cos(theta) - pt.y * Math.sin(theta);
			const rotatedY = pt.x * Math.sin(theta) + pt.y * Math.cos(theta);
			return createVector(rotatedX + this.x, rotatedY + this.y);
		});
		
		const allIntersections = [];
		let isDamaged = false;
		
		for (const border of borders) {
			const intersections = polysIntersect(worldPolygon, border);
			allIntersections.push(...intersections);
			if (intersections.length > 0) {
				isDamaged = true;
			}
		}
		
		return { damaged: isDamaged, intersections: allIntersections };
	}
	
	

	#createPolygon() {
		const points= [
			createVector( -this.width / 2 + _69.CAR_IMAGE_OFFSET_X, -this.height / 2 + _69.CAR_IMAGE_OFFSET_Y),
			createVector( this.width / 2 - _69.CAR_IMAGE_OFFSET_X, -this.height / 2 + _69.CAR_IMAGE_OFFSET_Y),
			createVector( this.width / 2 - _69.CAR_IMAGE_OFFSET_X, this.height / 2 - _69.CAR_IMAGE_OFFSET_Y),
			createVector( -this.width / 2 + _69.CAR_IMAGE_OFFSET_X, this.height / 2 - _69.CAR_IMAGE_OFFSET_Y),
		];
		
		return points;
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
		if (this.x > _69.CANVAS_WIDTH) this.x = 0;
		if (Math.abs(this.speed) < 0.1) this.speed = 0;		
	}

	#drawCarBorder(points){
		noFill()
		stroke(255,122,22)
		strokeWeight(2)

		push()
		translate(this.x, this.y)
		rotate(this.direction)
		// polygon
		beginShape()
		for (const point of points) {
			vertex(point.x, point.y)
		}
		endShape(CLOSE)
		pop()
	}
}