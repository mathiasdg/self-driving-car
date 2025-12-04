import * as _69 from "../Helpers/constants";
import { polysIntersect } from "../Helpers/utils";
import Car from "./Car";
import Controls from "./Controls";
import Sensor from "./Sensor";
import Windscreen from "./Windscreen";

/**
 * Extended UserCar class for a car object that can be controlled by the user or later the AI
 * in the self-driving car simulation.
 * Handles the User controls, sensors and the view through the windshield.
 */

export default class UserCar extends Car {
    constructor(options) {
        super(options);

        this.collisions = []

        this.controls = new Controls();
        this.sensor = new Sensor(this, _69.RAY_COUNT, _69.RAY_SPREAD);
        this.windscreen = new Windscreen(this);
    }

    update(road, traffic) {
        super.update(road);

        // wrijven maar
        this.speed *= _69.FRICTION;

        this.sensor.update(road.borders, traffic)
        this.windscreen.update(road, traffic);

        const result = this.#assessDamage(road.borders, traffic);
        this.damaged = result.damaged;
        this.collisions = result.intersections;

        this.#move();
    }

    draw(options) {
        super.drawCar(true);

        this.#drawOptions(options);

        if (options.debug) {
            this.#drawDebugInfo();
        }

        return {
            x: this.x,
            y: this.y,
            direction: this.direction,
            speed: this.speed,
            damaged: this.damaged,
            collisions: this.collisions
        }
    }

    #drawDebugInfo() {
        // bounding box rond de auto voor collission detection
        this.drawCarBorder(this.polygon);
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

    #drawOptions(options) {
        if (options.sensorsOn ) {
            this.sensor.draw()
        }
        if (options.windscreenOn)
            this.windscreen.draw()
    }


    /*
        protected methods
    */

    #assessDamage(borders, traffic) {
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

        for (const car of traffic) {
            // print(car)
            const theta = car.direction;
            // const worldTrafficCarPolygons = car.polygon.map(pt => {
            //     const rotatedX = pt.x * Math.cos(theta) - pt.y * Math.sin(theta);
            //     const rotatedY = pt.x * Math.sin(theta) + pt.y * Math.cos(theta);
            //     return createVector(rotatedX + this.x, rotatedY + this.y);
            // });
    
            // print(worldTrafficCarPolygons)
            // print(worldPolygon)
            // print(car.polygon)

            const intersections = polysIntersect(worldPolygon, car.polygon);
            allIntersections.push(...intersections);
            if (intersections.length > 0) {
                isDamaged = true;
            }
        }

        return { damaged: isDamaged, intersections: allIntersections };
    }

    #move() {
        // flip turning when reversing
        this.flip = (this.speed < 0) ? -1 : 1;

        if (this.controls.accelerate) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration * _69.REVERSE_MULTIPLIER;
        }
        if (this.controls.turnLeft && Math.abs(this.speed) > _69.MIN_TURN_SPEED) {
            this.direction -= _69.TURN_SPEED * this.flip;
        }
        if (this.controls.turnRight && Math.abs(this.speed) > _69.MIN_TURN_SPEED) {
            this.direction += _69.TURN_SPEED * this.flip;
        }
        if (this.controls.handbrake) {
            this.speed -= this.speed * _69.HANDBRAKE_FRICTION;
        }

        // Update position
        // super.move();

        // this.x -= this.speed * Math.sin(-this.direction);
        // this.y -= this.speed * Math.cos(-this.direction);
    }
    // Clean up when destroying the car
    destroy() {
        this.controls.destroy();
    }
}