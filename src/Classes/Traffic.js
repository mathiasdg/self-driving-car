import Car from './Car';
import { CAR_WIDTH, CAR_HEIGHT } from '../Helpers/constants';

export default class Traffic {

    constructor( trafficCount, road, icon ) {
        this.amount = trafficCount;
        this.road = road;
        this.icon = icon
        this.cars = [];

        this.#generateCars(this.amount)
    }

    #generateCars(amount) {

        const trafficColors = [
            { r: 222, g: 69, b: 69 },   // Red-ish
            { r: 69, g: 222, b: 69 },   // Green-ish
            { r: 69, g: 169, b: 222 },  // Blue-ish
            { r: 222, g: 169, b: 69 },  // Orange-ish
            { r: 169, g: 69, b: 169 },  // Purple-ish
            { r: 169, g: 169, b: 100 }  // Gray-ish
        ];

        for (let i=0; i<amount; ++i) {
            const laneIndex = floor( random(1, this.road.lanes+1) );
            const color = random(trafficColors);
            
            const car = new Car(
                {
                    x: this.road.getLaneCenter(laneIndex),
                    y: round(random(169, 690)),
                    width: CAR_WIDTH,
                    height: CAR_HEIGHT,
                    // speed: random(1, 2),
                    acceleration: random(0.1, 0.2),
                    autoIcon: this.icon,
                    color: color
                }
            );

            this.cars.push(car);
        }
    }

    update() {
        for(const car of this.cars) {
            car.update(this.road, []);
        }
    }

    draw() {
        for(const car of this.cars) {
            car.draw();
        }
    }


    // Utility methods 
    
    // Get all traffic cars (useful for collision detection)
    getCars() {
        return this.cars;
    }
    
    // Add a new traffic car dynamically
    addCar(laneIndex, y) {
        const car = new Car({
            x: this.road.getLaneCenter(laneIndex),
            y: y,
            width: CAR_WIDTH,
            height: CAR_HEIGHT,
            direction: 0,
            speed: random(0.1, 0.2),
            acceleration: random(0.01, 0.02),
            autoIcon: this.icon,
            color: {
                r: round(random(122, 220)), 
                g: round(random(69, 209)), 
                b: round(random(42, 142))
            }
        });
        
        this.cars.push(car);

        return car;
    }
    
    // Remove cars that are too far off-screen (performance optimization)
    removeOffscreenCars(minY, maxY) {
        this.cars = this.cars.filter(car => {
            return car.y > minY && car.y < maxY;
        });
    }
    
    // Get number of active traffic cars
    getCount() {
        return this.cars.length;
    }
}
