import { DEBUG } from "../Helpers/constants";
import { clamp } from "../Helpers/utils";

/**
 * Represents a road with multiple lanes for a self-driving car simulation.
 */
export default class Road {
    /**
     * Creates a new Road instance.
     * @param {number} width - The total width of the road including padding.
     * @param {number} [lanes=3] - The number of lanes on the road.
     */
    constructor(width, lanes = 3) {
        this.lanes = lanes;
        this.width = width;
        this.roadLength = 1000000;
        this.roadPadding = 11;
        this.top = this.roadLength;
        this.bottom = -this.roadLength;
        this.laneWidth = this.width / this.lanes;
        
        
        this.borders=[
            [
                {x: this.roadPadding, y: this.top}, 
                {x: this.roadPadding, y: this.bottom}
            ],
            [
                {x: this.width - this.roadPadding, y: this.top}, 
                {x: this.width - this.roadPadding, y: this.bottom}
            ]
        ];
    }

    /**
     * Gets the center x-coordinate of a specified lane.
     * @param {number} lane - The lane number (1-based index).
     * @returns {number} The x-coordinate of the lane's center.
     */
    getLaneCenter(lane) {
        let laneIndex = clamp(lane, 1, this.lanes);
        laneIndex-- // reset naar 0 based voor array gebruik
        
        return laneIndex * this.laneWidth + this.laneWidth / 2;
    }

    /**
     * Updates the road state. Currently empty as a placeholder.
     */
    update() {

    }

    /**
     * Draws the road on the canvas, including outer borders and lane dividers.
     */
    draw() {
        // teken baan grenzen
        stroke(255);
        strokeWeight(5);
        for (const border of this.borders) {
            line(border[0].x, border[0].y, border[1].x, border[1].y);
        }
        
        // stippelende scheidingslijnen tussen rijvakken
        drawingContext.setLineDash([12, 26]);
        for(let i = 1; i < this.lanes; i++) {
            // stroke("yellow");
            strokeWeight(3);
            line(i * this.laneWidth, this.top, i * this.laneWidth, this.bottom);
        }
        drawingContext.setLineDash([]);

    }
}
