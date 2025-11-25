export default class Controls {
    constructor() {
        this.accelerate = false;
        this.reverse = false;
        this.turnLeft = false;
        this.turnRight = false;
        this.handbrake = false;
        
        this.#addKeyboardListener();
    }

    #addKeyboardListener() {
        this.keydownHandler = event => {
            switch (event.key) {
                case 'ArrowUp':
                    this.accelerate = true;
                    break;
                case 'ArrowDown':
                    this.reverse = true;
                    break;
                case 'ArrowLeft':
                    this.turnLeft = true;
                    break;
                case 'ArrowRight':
                    this.turnRight = true;
                    break;
                case ' ':
                    this.handbrake = true;
                    event.preventDefault();
                    break;
            }
        };

        this.keyupHandler = event => {
            switch (event.key) {
                case 'ArrowUp':
                    this.accelerate = false;
                    break;
                case 'ArrowDown':
                    this.reverse = false;
                    break;
                case 'ArrowLeft':
                    this.turnLeft = false;
                    break;
                case 'ArrowRight':
                    this.turnRight = false;
                    break;
                case ' ':
                    this.handbrake = false;
                    break;
            }
        };

        window.addEventListener('keydown', this.keydownHandler);
        window.addEventListener('keyup', this.keyupHandler);
    }
    
    // Clean up when no longer needed
    destroy() {
        window.removeEventListener('keydown', this.keydownHandler);
        window.removeEventListener('keyup', this.keyupHandler);
    }
}

