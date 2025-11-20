export function lerp(a, b, t) {
	return a + (b - a) * t;
}

export function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

export function drawCurrentCenter() {
	stroke(255)
	strokeWeight(69)
	point(0,0)
}
