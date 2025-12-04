import { getIntersection } from "../Helpers/utils";
import { RAY_LENGTH } from "../Helpers/constants";  

export default class Sensor {
    constructor(car, rayCount = 4, raySpread = Math.PI/2 ) {
        this.car = car;
        this.rayCount = rayCount;
        this.raySpread = raySpread;
        this.rayLength = RAY_LENGTH;

        this.rays = [];
        this.readings = [];
    }

    update(roadBorders, traffic) {

        // print(traffic.cars)

        this.x = this.car.x;
        this.y = this.car.y;

        this.#castRays()
        this.readings = [];
        
        for (const ray of this.rays) {
            this.readings.push(
                this.#getReading(ray, roadBorders)
                // this.#getReading(ray, traffic.cars)
            )
        }
    }

    draw() {
        strokeWeight(2);
        stroke(42, 220, 69);

        for (let ray of this.rays) {
            line(this.car.x, this.car.y, ray.x, ray.y);
            // line(ray[0].x, ray[0].y, ray[1].x, ray[1].y);
        }

        for (let reading of this.readings) {
            if (reading) {
                stroke(255, 0, 0);
                strokeWeight(1)
                line(this.car.x, this.car.y, reading.x, reading.y);
                strokeWeight(9)
                point(reading.x, reading.y)
            }
        }
    }

    #getReading(ray, roadBorders) {
        let intersectionPoints = [];
        
        for (let border of roadBorders) {
            const touch = getIntersection(
                {x: this.car.x, y: this.car.y}, 
                ray, 
                border[0], 
                border[1]
            );
            if (touch) {
                intersectionPoints.push(touch);               
            }
        }
        if (intersectionPoints.length === 0) {
            return null;
        }
        const offsets = intersectionPoints.map(_ => _.offset);

        return intersectionPoints.find(
            _ => _.offset === Math.min(...offsets)
        );
    }

    

    #castRays() {
        this.rays = [];

        const startAngle = -this.raySpread/2;

        if (this.rayCount === 1) {
            const rayAngle = -this.car.direction;
            this.rays.push(
                {
                    x: this.x - Math.sin(rayAngle) * this.rayLength,
                    y: this.y - Math.cos(rayAngle) * this.rayLength  
                }
            )
        }

        for (let i=0; i < this.rayCount; ++i) {
            if (this.rayCount ===1) break;

            const rayAngle = -this.car.direction + startAngle + i*(this.raySpread/(this.rayCount-1));
            
            // const start = {
            //     x: this.x,
            //     y: this.y
            // };
            const end = {
                x: this.x - Math.sin(rayAngle) * this.rayLength,
                y: this.y - Math.cos(rayAngle) * this.rayLength
            }
            this.rays.push(end);
            // this.rays.push([start, end]);
        }

    }
}
