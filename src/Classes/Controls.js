export default class Controls {
    constructor() {
        this.accelerate = false;
        this.reverse = false;
        this.turnLeft = false;
        this.turnRight = false;

        this.#addKeyboardListener();
    }

    #addKeyboardListener() {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.accelerate = true;
                    break;
                case 'ArrowDown':
                    this.reverse = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                case ' ':
                    this.handbrake = true;
                    break;
            }
        });

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.accelerate = false;
                    break;
                case 'ArrowDown':
                    this.reverse = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
                case ' ':
                    this.handbrake = false;
                    break;
            }
        });
    }
}
