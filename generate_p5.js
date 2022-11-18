function get_frame(script) {
    let frame = document.createElement('iframe')
    frame.id = 'sketch'

    frame.srcdoc = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>Sketch</title>

            <link rel="stylesheet" type="text/css" href="style.css">

            <script src="libraries/p5.min.js"></script>
            <script src="libraries/p5.sound.min.js"></script>
            <script src="libraries/p5.play.js"></script>
            <script src="libraries/planck.min.js"></script>
            <script src="drawing_funcs.js"></script>
            <script src="shapes/background.js"></script>
            <script src="shapes/bird.js"></script>
            <script src="shapes/clouds.js"></script>
            <script src="shapes/flowers.js"></script>
            <script src="shapes/heart.js"></script>
            <script src="shapes/leaf.js"></script>
            <script src="shapes/rain.js"></script>
            <script src="shapes/sheep.js"></script>
            <script src="shapes/snow.js"></script>
            <script src="shapes/star.js"></script>
            <script src="shapes/tree.js"></script>
        </head>

        <body>
            ${script}
        </body>
        </html>
    `

    return frame
}

function get_p5js(sketch) {
    return get_frame(`<script src="${sketch}"></script>`)
}


function get_p5js_str(sketch_str) {
    return get_frame(`<script>${sketch_str}</script>`)
}

function get_sketch_from_comment(comment) {
    return `function preload() {\n\tattentionEveryone();\n}\nfunction setup() {\n\tletThePoetryBegin();\n}\nfunction draw() {\n${comment}\n\tTHE_END();\n}`
}
