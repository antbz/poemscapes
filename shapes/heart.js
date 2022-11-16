class Love {
    constructor() {
        this.gravity = 0.3;
        this.wind_change = 0.0025;
        this.wind_speed = 1;
        this.hearts = [];
        this.layer_count = 4;
        this.max_size = 20;
        for (let l = 0; l < this.layer_count; l++) {
            this.hearts.push([]);
            for (let i = 0; i < 50; i++) {
                this.hearts[l].push({
                    x: random(width),
                    y: random(height),
                    mass: random(0.75, 1.25),
                    l: l + 1,
                    color: random(100,255)
                });
            }
        }
    }

    draw(isLight) {
        noStroke();
        for (let l = 0; l < this.hearts.length; l++) {
            const heartlayer = this.hearts[l];
        
            // Draw each snowflake
            for (let i = 0; i < heartlayer.length; i++) {
              const heart = heartlayer[i];
              if (isLight) {
                fill(heart.color, 200, 200);
                drawingContext.shadowColor = color(heart.color, 200, 200);
              }
              else {
                fill(heart.color, 0, 0);
                drawingContext.shadowColor = color(heart.color, 80, 80);
              }
              this.drawHeart(heart, (heart.l * this.max_size) / this.layer_count);
              this.updateHeart(heart);
            }
          }
    }

    drawHeart(heart, size) {
        beginShape();
        vertex(heart.x, heart.y);
        bezierVertex(heart.x - size / 2, heart.y - size / 2, heart.x - size, heart.y + size / 3, heart.x, heart.y + size);
        bezierVertex(heart.x + size, heart.y + size / 3, heart.x + size / 2, heart.y - size / 2, heart.x, heart.y);
        endShape(CLOSE);
    }

    // Helper function to prepare a given snowflake for the next frame
    updateHeart(heart) {
        const diameter = (heart.l * this.max_size) / this.layer_count;
        if (heart.y < -diameter) {
            heart.y = height + diameter;
        }
        else {
            heart.y -= this.gravity * heart.l * heart.mass;
        }
    
        // Get the wind speed at the given layer and area of the page
        const wind = noise(heart.l, heart.y * this.wind_change, frameCount * this.wind_change) - 0.5;
        if (heart.x > width + diameter) {
            heart.x = -diameter;
        }
        else if (heart.x < -diameter) {
            heart.x = width + diameter;
        }
        else {
            heart.x += wind * this.wind_speed * heart.l;
        }
    }
}
