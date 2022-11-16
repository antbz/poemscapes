class Tree {
	constructor() {
		this.l = 100;
        this.a1 = Math.PI/6;
        this.a2 = Math.PI/9;
        this.leaves = [];
        for (var i = 0; i < 286; i++) {
            this.leaves[i] = {
                'size': random(6, 16), 
                'color1': random(170, 255),
                'color2': random(50, 170)};
        }
        this.x = random(width);
        this.leafCount = 0;
	}
	
	draw() {
        angleMode(RADIANS);
        if (frameCount % 5 == 0) {
            this.a1=min(Math.PI/5,max(Math.PI/10,this.a1+random(-0.01,0.01)));
            this.a2=min(Math.PI/5,max(Math.PI/10,this.a2+random(-0.01,0.01)));
        }
        this.leafCount = 0;
        this.drawtree(this.a1, this.a2);
        angleMode(DEGREES);
	}

    drawtree(angle1, angle2) {
        push();
        translate(this.x,height);
        this.tree(this.l, angle1, angle2);
        pop();
    }

    tree(l, a1, a2) {   
        stroke(80,60,0);
        strokeWeight(Math.ceil(l/5));
        line(0,0,0,-l);  
        translate(0,-l);
        if(l>6){
            push();
            rotate(a1);
            this.tree(l*0.65,a1,a2);
            pop();
            push();
            rotate(-a2);
            this.tree(l*0.75,a1,a2);
            if(l<14){
                fill(80,this.leaves[this.leafCount].color1,this.leaves[this.leafCount].color2);
                this.leaf();
            }
            pop();
        }
    }
    
    leaf() {
        noStroke();
        ellipse(0, 0, this.leaves[this.leafCount].size, 6);
        ellipse(-15, 0, this.leaves[this.leafCount].size, 6);  
        ellipse(15, 0, this.leaves[this.leafCount].size, 6);
        ellipse(0, -15, this.leaves[this.leafCount].size, 6);
        ellipse(0, 15, this.leaves[this.leafCount].size, 6);
        
        this.leafCount++;
    }
}

function drawTrees(trees) {
    for (var i = 0; i < trees.length; i++) {
        trees[i].draw();
    }
}


