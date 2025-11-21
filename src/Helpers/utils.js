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

export function getIntersection(A, B, C, D) {
	/*
		Ix = Ax + (Bx - Ax) * (Cy - Ay) / (Dy - Cy)
		Iy = Ay + (By - Ay) * (Cy - Ay) / (Dy - Cy)
	*/
	let Ix = A.x + (B.x - A.x) * (C.y - A.y) / (D.y - C.y)
	let Iy = A.y + (B.y - A.y) * (C.y - A.y) / (D.y - C.y)
	return {x: Ix, y: Iy}
}
