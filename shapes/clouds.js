class Clouds {
    constructor() {
        this.gravity = 0.05;
        this.clouds = [];
        this.layer_count = 4;
        this.max_size = 30;
        for (let l = 0; l < this.layer_count; l++) {
            this.clouds.push([]);
            for (let i = 0; i < 5; i++) {
                this.clouds[l].push({
                    x: random(width),
                    y: random(height/2),
                    mass: random(0.5, 1.5),
                    l: l + 1
                });
            }
        }
    }

    draw() {
        noStroke();
        for (let l = 0; l < this.clouds.length; l++) {
            const cloudslayer = this.clouds[l];
        
            for (let i = 0; i < cloudslayer.length; i++) {
              const cloud = cloudslayer[i];
              this.drawCloud(cloud, (cloud.l * this.max_size) / this.layer_count);
              this.updateCloud(cloud);
            }
        }
    }

    drawCloud(cloud, s) {
        fill(255);
        ellipse(cloud.x,cloud.y-0.1*s,s*1.1,s*1.1)
        ellipse(cloud.x+0.75*s,cloud.y-0.25*s,s,s)
        ellipse(cloud.x-1.25*s,cloud.y-0.25*s,1.1*s,1.1*s)
        ellipse(cloud.x-0.8*s,cloud.y-s,s,s)
        ellipse(cloud.x,cloud.y-0.75*s,1.1*s,1.1*s)
        ellipse(cloud.x-0.6*s,cloud.y,s*1.1,s*1.1);
    }

    updateCloud(cloud) {
        const diameter = (cloud.l * this.max_size) / this.layer_count;
        if (cloud.x > width + diameter) {
            cloud.x = -diameter;
        }
        else {
            cloud.x += this.gravity * cloud.l * cloud.mass;
        }
    }
}
