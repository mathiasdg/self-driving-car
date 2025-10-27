import './style.css'
import { Car } from './car'

const canvas = document.querySelector("canvas") as HTMLCanvasElement
const c = canvas.getContext("2d")!
const WIDTH = 200
const HEIGHT = window.innerHeight
const CAR_WIDTH = 69
const CAR_HEIGHT = 69

canvas.width = WIDTH
canvas.height = HEIGHT

const car: Car = new Car(
  WIDTH / 2 - CAR_WIDTH / 2,
  HEIGHT - CAR_HEIGHT * 2,
  CAR_WIDTH,
  CAR_HEIGHT,
  270,
  0,
)

function draw() {
  c.clearRect(0, 0, WIDTH, HEIGHT)

  c.save() // save current transform state
  // Move origin to the car's center
  c.translate(car.x + car.width / 2, car.y + car.height / 2)
  // Rotate around that center
  c.rotate(Math.PI / 2 + Math.PI / 180 * car.direction)
  // Draw image centered at origin (since we moved the origin)
  c.drawImage(car.image, -car.width / 2, -car.height / 2, car.width, car.height)

  c.restore() // restore transform so it doesn't accumulate
}

function update() {
  car.x += car.speed * Math.cos(car.direction * Math.PI / 180)
  car.y += car.speed * Math.sin(car.direction * Math.PI / 180)
  car.direction %= 360

  if (car.x < 0) car.x = WIDTH
  if (car.x > WIDTH) car.x = 0
  if (car.y < 0) car.y = HEIGHT
  if (car.y > HEIGHT) car.y = 0
}

function loop() {
  update()
  draw()
  requestAnimationFrame(loop)
}

car.image.onload = () => {
  loop()
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    car.speed += 2
  }
  if (event.key === 'ArrowDown') {
    car.speed -= 2
  }
  if (event.key === 'ArrowLeft') {
    car.direction -= 15
  }
  if (event.key === 'ArrowRight') {
    car.direction += 15
  }
  if (event.key === ' ') {
    car.speed = 0
  }
})
