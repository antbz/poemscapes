class Bird {
    constructor(sky_space) {
        this.x = random(width);
		this.y = random(height*sky_space);
        this.speed = random(1, 3);
    }

    draw() {
        tint(0,0,0)
	    animation(birdAni, this.x, this.y)
        
        this.x += this.speed;
        if (this.x > width) {
            this.x = 0;
            this.y = random(height*sky_space);
        }
	}
}

function drawBirds(birds) {
    birds.forEach(bird => {bird.draw()});
}