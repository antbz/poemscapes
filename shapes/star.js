class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 3);
		this.t = random(360);
	}
	
	draw() {
		angleMode(DEGREES);
		this.t += 0.1;
		var scale = this.size + sin(this.t * frameCount * 0.01) * 2;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
		
		angleMode(RADIANS);
	}
}

function drawStars(stars) {
	background(30);
	
    fill(200, 200, 0);
	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
}