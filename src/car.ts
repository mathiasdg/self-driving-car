import autoLogo from '/auto.svg'

class Car {
    y: number
    x: number
    width: number
    height: number
    direction: number
    speed: number
    image: HTMLImageElement

    constructor(x: number, y: number, width: number, height: number, direction: number, speed: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.direction = direction
        this.speed = speed
        this.image = new Image()
        this.image.src = autoLogo

    }
}

export { Car }
