class Rain {
    constructor() {
        this.gravity = 2;
        this.wind_change = 0.0005;
        this.wind_speed = 3;
        this.raindrops = [];
        this.layer_count = 4;
        this.max_size = 10;
        for (let l = 0; l < this.layer_count; l++) {
            this.raindrops.push([]);
            for (let i = 0; i < 500; i++) {
                this.raindrops[l].push({
                    x: random(width),
                    y: random(height),
                    mass: random(0.75, 1.25),
                    l: l + 1
                });
            }
        }
    }

    draw() {
        fill("lightblue");
        noStroke();
        for (let l = 0; l < this.raindrops.length; l++) {
            const rainlayer = this.raindrops[l];
        
            for (let i = 0; i < rainlayer.length; i++) {
              const raindrop = rainlayer[i];
              ellipse(raindrop.x, raindrop.y, 1, (raindrop.l * this.max_size) / this.layer_count);
              this.updateRaindrop(raindrop);
            }
          }
    }

    // Helper function to prepare a given raindrop for the next frame
    updateRaindrop(raindrop) {
        const diameter = (raindrop.l * this.max_size) / this.layer_count;
        if (raindrop.y > height + diameter) {
            raindrop.y = -diameter;
        }
        else {
            raindrop.y += this.gravity * raindrop.l * raindrop.mass;
        }
    
        // Get the wind speed at the given layer and area of the page
        const wind = noise(raindrop.l, raindrop.y * this.wind_change, frameCount * this.wind_change) - 0.5;
        if (raindrop.x > width + diameter) {
            raindrop.x = -diameter;
        }
        else if (raindrop.x < -diameter) {
            raindrop.x = width + diameter;
        }
        else {
            raindrop.x += wind * this.wind_speed * raindrop.l;
        }
    }
}