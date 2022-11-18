const view_button = document.getElementById('poem_view')
const poem_input = document.getElementById('poem_input')

document.getElementById('write').classList.toggle('active')

view_button.onclick = (ev) => {
    poem_input.parentElement.classList.toggle('visually-hidden')

    const sketch = get_sketch_from_comment(poem_input.value)

    const title = document.getElementById('title')
    title.textContent = `$ your_poem.js`
    title.classList.toggle('visually-hidden')

    let code = document.createElement('code')
    let pre = document.getElementById('poem')
    code.className = "language-js"
    code.textContent = sketch
    pre.textContent = ""
    pre.appendChild(code)

    console.log(pre.cloneNode(true))

    let prism = document.createElement('script')
    prism.src = "libraries/prism.js"
    prism.defer = true
    document.body.appendChild(prism)


    document.body.appendChild(get_p5js_str(sketch))
}

poem_input.onkeyup = (ev) => {
    ev.target.value.length > 0 ? view_button.disabled = false : view_button.disabled = true
}