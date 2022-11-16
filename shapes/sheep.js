class Sheep {
    constructor() {
        this.gravity = 0.2;
        this.sheep = [];
        this.layer_count = 4;
        this.max_size = 20;
        this.a1 = random(2*Math.PI);
        this.a2 = random(15);
        for (let l = 0; l < this.layer_count; l++) {
            this.sheep.push([]);
            for (let i = 0; i < 5; i++) {
                this.sheep[l].push({
                    x: random(width),
                    y: height - this.max_size,
                    mass: random(0.5, 1.5),
                    l: l + 1
                });
            }
        }
    }

    draw() {
        noStroke();
        for (let l = 0; l < this.sheep.length; l++) {
            const sheeplayer = this.sheep[l];
        
            for (let i = 0; i < sheeplayer.length; i++) {
              const sheepObj = sheeplayer[i];
              this.drawSheep(sheepObj, (sheepObj.l * this.max_size) / this.layer_count);
              this.updateSheep(sheepObj);
            }
        }
    }

    drawSheep(sheepObj, s) {
        fill(0);
        ellipse(sheepObj.x+0.3*s,sheepObj.y-0.6*s,1.4*s,0.8*s);
        fill(255);
        ellipse(sheepObj.x,sheepObj.y,s*1.2,s)
        ellipse(sheepObj.x-0.75*s,sheepObj.y+0.25*s,s,s)
        ellipse(sheepObj.x-1.25*s,sheepObj.y-0.25*s,s,s)
        ellipse(sheepObj.x-0.8*s,sheepObj.y-s,s,s)
        ellipse(sheepObj.x,sheepObj.y-0.75*s,s,s)
        ellipse(sheepObj.x-0.6*s,sheepObj.y-0.35*s,1.1*s,1.1*s);
    }

    updateSheep(sheepObj) {
        const diameter = (sheepObj.l * this.max_size) / this.layer_count;
        if (sheepObj.x > width + diameter) {
            sheepObj.x = -diameter;
        }
        else {
            sheepObj.x += this.gravity * sheepObj.l * sheepObj.mass;
        }

        angleMode(RADIANS);
        sheepObj.y = height - this.max_size + sin(this.a1 + this.a2 * frameCount * 0.01)*10;
        angleMode(DEGREES);
        console.log(sheepObj.y);
    }
}
