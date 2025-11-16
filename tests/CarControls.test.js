import { expect, test } from 'vitest'
import Car from '../src/Car.js'
// import { cos, sin } from Math
// import Controls from '../src/Controls.js'

test('the car moves forward when up is pressed', () => {
  const car = new Car(150, 600);
  const startY = car.y;
  
  car.controls.accelerate = true;
  car.update();
  
  expect(car.y).toBeLessThan(startY)
})

test('the car moves backwards when down is pressed', () => {
  const car = new Car(150, 600);
  const startY = car.y;
  
  car.controls.reverse = true;
  car.update();
  
  expect(car.y).toBeGreaterThan(startY)
})

test('the car turns right when right is pressed while driving', () => {
  const car = new Car(150, 600);
  const startAngle = car.direction;
  
  car.speed = 69;
  car.controls.right = true;
  car.update();
  
  expect(car.direction).toBeGreaterThan(startAngle)
})

test('the car turns left when left is pressed while driving', () => {
  const car = new Car(150, 600);
  const startAngle = car.direction;
  
  car.speed = 69;
  car.controls.left = true;
  car.update();
  
  expect(car.direction).toBeLessThan(startAngle)
})
