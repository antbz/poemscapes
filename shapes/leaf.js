class Leaves {
    constructor() {
        this.gravity =  0.6;
        this.wind_change = 0.0085;
        this.wind_speed = 3;
        this.leaves = [];
        this.layer_count = 4;
        this.max_w = 16;
        this.max_h = 9;
        for (let l = 0; l < this.layer_count; l++) {
            this.leaves.push([]);
            for (let i = 0; i < 50; i++) {
                this.leaves[l].push({
                    x: random(width),
                    y: random(height),
                    mass: random(0.75, 1.25),
                    l: l + 1,
                    color: color(50, random(100, 200), random(30, 100)),
                    autumnColor: color(random(100, 200), random(100, 200), 0)
                });
            }
        }
    }

    draw(isAutumn) {
        for (let l = 0; l < this.leaves.length; l++) {
            const leaflayer = this.leaves[l];
        
            for (let i = 0; i < leaflayer.length; i++) {
                const leaf = leaflayer[i];
                if (isAutumn) fill(leaf.autumnColor);
                else fill(leaf.color);
                
                noStroke();
                let w = (leaf.l * this.max_w) / this.layer_count;
                let h = (leaf.l * this.max_h) / this.layer_count;
                ellipse(leaf.x, leaf.y, w, h);
                
                stroke(80, 80, 0);
                curve(
                    leaf.x - w/2, leaf.y - h*2,
                    leaf.x - w/2, leaf.y,
                    leaf.x + w/2, leaf.y, 
                    leaf.x + w/2, leaf.y + h*2);
                this.updateLeaf(leaf);
            }
        }
    }

    updateLeaf(leaf) {
        const h = (leaf.l * this.max_h) / this.layer_count;
        if (leaf.y > height + h) {
            leaf.y = -h;
        }
        else {
            leaf.y += this.gravity * leaf.l * leaf.mass;
        }
    
        const wind = noise(leaf.l, leaf.y * this.wind_change, frameCount * this.wind_change) - 0.5;
        const w = (leaf.l * this.max_w) / this.layer_count;
        if (leaf.x > width + w) {
            leaf.x = -w;
        }
        else if (leaf.x < -w) {
            leaf.x = width + w;
        }
        else {
            leaf.x += wind * this.wind_speed * leaf.l;
        }
    }
}