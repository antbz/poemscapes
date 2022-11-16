class Sky {
    constructor(layer_count, sky_space, ridge_step, ridge_amp,
                sky_amp, sky_zoom, sky_top_color, sky_bottom_color, sky_layer_offset, 
                sun_color, sun_glow, sun_radius) {
        this.layer_count = layer_count;
        this.sky_space = sky_space;
        this.ridge_step = ridge_step;
        this.ridge_amp = ridge_amp;

        this.sky_amp = sky_amp;
        this.sky_zoom = sky_zoom;
        this.sky_top_color = sky_top_color;
        this.sky_bottom_color = sky_bottom_color;
        this.sky_layer_offset = sky_layer_offset;

        this.sun_color = sun_color;
        this.sun_glow = sun_glow;
        this.sun_radius = sun_radius;
    }

    draw() {
        noStroke();
        drawingContext.shadowBlur = 0;
        const skyHeight = round(height * this.sky_space);

        for (let i = 0; i < this.layer_count; i++) {
            drawRidge(i,
                    (i * skyHeight) / this.layer_count,
                    this.ridge_step,
                    this.sky_amp,
                    this.sky_zoom,
                    this.sky_top_color,
                    this.sky_bottom_color,
                    this.sky_layer_offset);
        }

        this.drawSun(width / 4, skyHeight - this.ridge_amp / 2);
    }

    drawSun(x, y) {
        fill(this.sun_color);
        drawingContext.shadowBlur = this.sun_glow;
        drawingContext.shadowColor = this.sun_color;
        circle(x, y, this.sun_radius * 2);
        drawingContext.shadowBlur = 0;
    }
}

class Mountains {
    constructor(isLight, layer_count, sky_space, ridge_step,
                ridge_amp, ridge_zoom, ridge_top_color, ridge_bottom_color) {
            
        this.isLight = isLight;
        this.layer_count = layer_count;
        this.sky_space = sky_space;
        this.ridge_step = ridge_step;

        this.ridge_amp = ridge_amp;
        this.ridge_zoom = ridge_zoom;
        this.ridge_top_color = ridge_top_color;
        this.ridge_bottom_color = ridge_bottom_color;
    }

    draw() {
        noStroke();
        if (this.isLight) {
            drawingContext.shadowBlur = 20;
            drawingContext.shadowColor = "white";
        }
        else drawingContext.shadowBlur = 0;
        const skyHeight = round(height * this.sky_space);

        for (let l = 0; l < this.layer_count; l++) {
            const layerPosition = l * ((height - skyHeight) / this.layer_count);
            drawRidge(l,
                    skyHeight + layerPosition,
                    this.ridge_step,
                    this.ridge_amp,
                    this.ridge_zoom,
                    this.ridge_top_color,
                    this.ridge_bottom_color,
                    0);
        }
    }
}


function drawRidge(l, y, step, amp, zoom, c1, c2, coff) {
    const FILL = lerpColor(color(c1), color(c2), l / (layer_count - 1 + coff));
    fill(FILL);
  
    beginShape();
    for (let x = 0; x <= width; x += step) {
      const noisedY = noise(x * zoom, y);
      vertex(x, y - noisedY * amp);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }