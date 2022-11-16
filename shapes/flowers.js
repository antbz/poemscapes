class Flowers {
    constructor() {
        this.gravity = 0.3;
        this.wind_change = 0.0025;
        this.wind_speed = 1;
        this.flowers = [];
        this.layer_count = 4;
        this.max_size = 20;
        for (let l = 0; l < this.layer_count; l++) {
            this.flowers.push([]);
            for (let i = 0; i < 50; i++) {
                this.flowers[l].push({
                    x: random(width),
                    y: random(height),
                    mass: random(0.75, 1.25),
                    l: l + 1,
                    color: color(random(50,255),random(50,255), random(50,255)),
                    middle: color(255, 255, random(255))
                });
            }
        }
        this.updated = false;
    }

    draw(isLight) {
        noStroke();
        for (let l = 0; l < this.flowers.length; l++) {
            const flowerlayer = this.flowers[l];
        
            // Draw each snowflake
            for (let i = 0; i < flowerlayer.length; i++) {
              const flower = flowerlayer[i];
              this.drawFlower(flower, (flower.l * this.max_size) / this.layer_count, isLight);
              this.updateFlower(flower);
            }
        }
        if (!this.updated) this.updated = true;
    }

    drawFlower(flower, s, isLight) {
        if (isLight) {
            if (!this.updated) flower.color = color(random(100,255),random(100,255), random(100,255));
            drawingContext.shadowColor = flower.color
        };
        fill(flower.color);
        ellipse(flower.x,flower.y,s,s)
        ellipse(flower.x-0.75*s,flower.y+0.25*s,s,s)
        ellipse(flower.x-1.25*s,flower.y-0.25*s,s,s)
        ellipse(flower.x-0.8*s,flower.y-s,s,s)
        ellipse(flower.x,flower.y-0.75*s,s,s)
        fill(flower.middle);
        ellipse(flower.x-0.6*s,flower.y-0.35*s,1.1*s,1.1*s);
    }

    // Helper function to prepare a given snowflake for the next frame
    updateFlower(flower) {
        const diameter = (flower.l * this.max_size) / this.layer_count;
        if (flower.x > width + diameter) {
            flower.x = -diameter;
        }
        else {
            flower.x += this.gravity * flower.l * flower.mass;
        }
    
        // Get the wind speed at the given layer and area of the page
        const wind = noise(flower.l, flower.y * this.wind_change, frameCount * this.wind_change) - 0.5;
        if (flower.y > height+diameter) {
            flower.y = -diameter;
        }
        else if (flower.y < -diameter) {
            flower.y = height + diameter;
        }
        else {
            flower.y += wind * this.wind_speed * flower.l;
        }
    }
}
