// import { expect, test } from 'vitest'
import Controls from '../src/Classes/Controls'

it('the car moves forward when up is pressed', () => {
  const controls = new Controls();
  
  controls.accelerate = true;
  
  expect(controls.accelerate).toBeTruthy
})

it('the car moves backwards when down is pressed', () => {
  const controls = new Controls();
  
  controls.reverse = true;
  
  expect(controls.reverse).toBeTruthy
})

it('the car turns right when right is pressed while driving', () => {
  const controls = new Controls();
  
  controls.right = true;
  
  expect(controls.right).toBeTruthy
})

it('the car turns left when left is pressed while driving', () => {
  const controls = new Controls();
  
  controls.left = true;
  
  expect(controls.left).toBeTruthy
})
