import { CANVAS_WIDTH } from "../Helpers/constants";

export default class Windscreen {
	constructor(car) {
		this.width = CANVAS_WIDTH;
		this.height = CANVAS_WIDTH / 2;
        this.car = car;
        this.road = null;
        this.roadBorders = [];
        // this.canvas = document.querySelector('#windscreen');
	}

    update(road) {
        this.laneCount = road.lanes;
        this.padding = road.roadPadding;
        this.roadBorders = road.borders;
    }

    draw() {
        const yLocationScreen = window.height * 0.75
        push()
            translate(0, this.car.y - yLocationScreen);          
            stroke(42, 69, 120);
            strokeWeight(6);
            fill(169);
            rect(0, 0, this.width, this.height);
        pop()

        push();
            translate((this.width/2 - this.car.x)/2, this.car.y - yLocationScreen);
            // teken de borders
            stroke(222);
            strokeWeight(4);
            let perspectief = this.width*0.11;          
            // linker border
            line(this.roadBorders[0][0].x + perspectief, 5, this.roadBorders[0][1].x, 145)
            // rechter border
            line(this.roadBorders[1][0].x - perspectief, 5, this.roadBorders[1][1].x, 145)
            // stippers
            stroke(222);
            strokeWeight(2);
            drawingContext.setLineDash([10, 10]);

            let perspectiefStippies = (this.width - 2*this.padding - 2*perspectief) / this.laneCount;

            for (let i = 1; i < this.laneCount; ++i) {
                const t = i / this.laneCount
                const x = lerp(0, this.width, t)
                line(this.roadBorders[0][0].x + perspectief + perspectiefStippies*i, 5, x, 145);
            }
        pop();
    }
}
