import { CANVAS_WIDTH, DEBUG } from "../Helpers/constants";
import { drawCurrentCenter } from "../Helpers/utils";

export default class Windscreen {
	constructor(car) {
		this.width = CANVAS_WIDTH;
		this.height = CANVAS_WIDTH / 2;
        this.car = car;
        this.canvas = document.querySelector('#windscreen');
        this.roadBorders = [];
	}

    update(roadBorders) {
        this.roadBorders = roadBorders;
        this.offsetX = this.car.x-150;
        this.offsetY = this.car.y-580;
    }

    draw() {
        push()
            translate(0, this.car.y-577);
            // drawCurrentCenter()
            
            stroke(69,42,220);
            strokeWeight(2);
            fill(169);
            rect(0, 0, this.width, this.height);
        pop()

        push();
            drawCurrentCenter()

            translate(this.car.x, 150);
            // rotate(this.car.direction);

            // teken de borders
            stroke(0);
            strokeWeight(5);
            // linker border
            const perspectief = 69;

            line(this.offsetX+this.roadBorders[0][0].x, 75, this.offsetX+this.roadBorders[0][0].x, -75)
            
            // rechter border
            line(-150+this.roadBorders[1][0].x, 75, -150-perspectief+this.roadBorders[1][0].x, -75)
            
        pop();

        if(DEBUG) {
            // console.log(this.roadBorders);
        }
    }
}
