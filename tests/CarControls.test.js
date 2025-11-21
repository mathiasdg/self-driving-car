// import { expect, test } from 'vitest'
import Car from '../src/Classes/Car.js'
import Road from '../src/Classes/Road.js'

it('the car moves forward when up is pressed', () => {
  const car = new Car(150, 600);
  const road = new Road(300);
  const startY = car.y;
  
  car.controls.accelerate = true;
  car.update(road);
  
  expect(car.y).toBeLessThan(startY)
})

it('the car moves backwards when down is pressed', () => {
  const car = new Car(150, 600);
  const road = new Road(300);
  const startY = car.y;
  
  car.controls.reverse = true;
  car.update(road);
  
  expect(car.y).toBeGreaterThan(startY)
})

it('the car turns right when right is pressed while driving', () => {
  const car = new Car(150, 600);
  const road = new Road(300);
  const startAngle = car.direction;
  
  car.speed = 69;
  car.controls.right = true;
  car.update(road);
  
  expect(car.direction).toBeGreaterThan(startAngle)
})

it('the car turns left when left is pressed while driving', () => {
  const car = new Car(150, 600);
  const road = new Road(300);
  const startAngle = car.direction;
  
  car.speed = 69;
  car.controls.left = true;
  car.update(road);
  
  expect(car.direction).toBeLessThan(startAngle)
})
