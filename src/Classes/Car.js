import * as _69 from "../Helpers/constants";

/**
 * Base class for car objects in the self-driving car simulation.
 * Handles basic movement, boundary wrapping, and physics like friction.
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
    constructor(options) {
        const { x, y, width, height, direction = 0, speed = 0, acceleration = _69.ACCELERATION, color, autoIcon } = options;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = direction ; // laat 0° op de cirkel boven zijn
        this.speed = speed;
        this.icon = autoIcon;
        this.acceleration = acceleration;
        this.damaged = false;
        this.color = color;
		// this.tint = {
        //     r: round( random(222) ), 
        //     g: round( random(169) ), 
        //     b: round( random(222) )
        // };

		this.polygon = [];
        this.collisions = [];
    }

    update(road) {
        this.move();
        this.polygon = this.createPolygon();

        // this.wrapBoundary();
    }

    draw() {
        this.drawCar();
    }

    
    /*
        public getter methods
    */

    getPosition() {
        return { x: this.x, y: this.y };
    }

    getVelocity() {
        return {
            speed: this.speed,
            direction: this.direction
        };
    }

    getBounds() {
        return {
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y
        };
    }

    createPolygon() {
        const points = [
            createVector( -this.width / 2 + _69.CAR_IMAGE_OFFSET_X, -this.height / 2 + _69.CAR_IMAGE_OFFSET_Y),
            createVector( this.width / 2 - _69.CAR_IMAGE_OFFSET_X, -this.height / 2 + _69.CAR_IMAGE_OFFSET_Y),
            createVector( this.width / 2 - _69.CAR_IMAGE_OFFSET_X, this.height / 2 - _69.CAR_IMAGE_OFFSET_Y),
            createVector( -this.width / 2 + _69.CAR_IMAGE_OFFSET_X, this.height / 2 - _69.CAR_IMAGE_OFFSET_Y),
        ];

        return points;
    }

    drawCar(originalColor = false) {
        push();

        translate(this.x, this.y);
        rotate(this.direction);
        rectMode(CENTER)

        noStroke();
        fill(_69.CAR_WINDOWS)
        // rechthoek met zelfde grootte onder de auto om ramen vol te maken
        rect(0, 0, this.width - _69.CAR_BODY_WIDTH_OFFSET, this.height - _69.CAR_BODY_HEIGHT_OFFSET);

        if (this.damaged) {
            tint(111, 169); // gray-ish
            // noLoop();
        }
        if (!originalColor) {
            tint(this.color.r, this.color.g, this.color.b);
        }
        image(this.icon, - this.width / 2, -this.height / 2, this.width, this.height);

        pop();
    }

    drawCarBorder(points) {
        noFill()
        stroke(_69.CAR_POLYGON)
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

    

	move() {
        // this.speed += this.acceleration;
        // Basic movement - can be overridden
        this.x -= this.speed * Math.sin(-this.direction);
        this.y -= this.speed * Math.cos(-this.direction);
    }    

    wrapBoundary() {
        // Boundary wrapping
        if (this.x < 0) this.x = _69.CANVAS_WIDTH;
        if (this.x > _69.CANVAS_WIDTH) this.x = 0;
        if (Math.abs(this.speed) < 0.1) this.speed = 0;
    }
}
