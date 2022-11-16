class Snow {
    constructor() {
        this.gravity =  0.75;
        this.wind_change = 0.0025;
        this.wind_speed = 1;
        this.snowflakes = [];
        this.layer_count = 4;
        this.max_size = 10;
        for (let l = 0; l < this.layer_count; l++) {
            this.snowflakes.push([]);
            for (let i = 0; i < 200; i++) {
                this.snowflakes[l].push({
                    x: random(width),
                    y: random(height),
                    mass: random(0.75, 1.25),
                    l: l + 1
                });
            }
        }
    }

    draw() {
        fill("snow");
        noStroke();
        for (let l = 0; l < this.snowflakes.length; l++) {
            const snowlayer = this.snowflakes[l];
        
            // Draw each snowflake
            for (let i = 0; i < snowlayer.length; i++) {
              const snowflake = snowlayer[i];
              circle(snowflake.x, snowflake.y, (snowflake.l * this.max_size) / this.layer_count);
              this.updateSnowflake(snowflake);
            }
          }
    }

    // Helper function to prepare a given snowflake for the next frame
    updateSnowflake(snowflake) {
        const diameter = (snowflake.l * this.max_size) / this.layer_count;
        if (snowflake.y > height + diameter) {
            snowflake.y = -diameter;
        }
        else {
            snowflake.y += this.gravity * snowflake.l * snowflake.mass;
        }
    
        // Get the wind speed at the given layer and area of the page
        const wind = noise(snowflake.l, snowflake.y * this.wind_change, frameCount * this.wind_change) - 0.5;
        if (snowflake.x > width + diameter) {
            snowflake.x = -diameter;
        }
        else if (snowflake.x < -diameter) {
            snowflake.x = width + diameter;
        }
        else {
            snowflake.x += wind * this.wind_speed * snowflake.l;
        }
    }
}