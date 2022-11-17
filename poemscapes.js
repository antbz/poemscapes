const scroll_button = document.getElementById('scroll')

window.onscroll = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scroll_button.style.display = "none";
    } else {
        scroll_button.style.display = "block";
    }
};


const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const poem = params.poem ? Number(params.poem) : 1

document.getElementById(`poem_${poem}`).classList.toggle('active')

if (poem > 0) {
    const title = document.getElementById('title')
    title.textContent = `$ poem_${poem}.js`
    title.classList.toggle('visually-hidden')
    document.getElementById('our_poems').classList.toggle('active')

    const poem_path = `poems/poem_${poem}.js`
    document.getElementById('poem').dataset.src = poem_path
    document.body.appendChild(get_p5js(poem_path))
} else {
    let prev_prism = document.getElementById('prism')
    document.body.removeChild(prev_prism)
    let pre = document.getElementById('poem')
    let loading = document.createElement('div')
    loading.className = 'd-flex align-items-center flex-column'
    loading.innerHTML = `<div class="spinner-border text-white" role="status"><span class="visually-hidden"></span></div>`
    let loading_text = document.createElement('div')
    loading_text.id = 'loading-text'
    loading_text.className = 'text-white my-2'
    loading_text.textContent = 'Loading your poem!'
    loading.appendChild(loading_text)
    document.body.appendChild(loading)
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } };

    fetch('https://poemscapes.deta.dev/generate', options)
        .then(response => response.json())
        .then(response => {
            document.body.removeChild(loading)

            const title = document.getElementById('title')
            title.textContent = `$ your_poem.js`
            title.classList.toggle('visually-hidden')

            let code = document.createElement('code')
            code.className = "language-js"
            code.textContent = response
            pre.textContent = ""
            pre.appendChild(code)

            console.log(pre.cloneNode(true))

            let prism = document.createElement('script')
            prism.src = "libraries/prism.js"
            prism.defer = true
            document.body.appendChild(prism)


            document.body.appendChild(get_p5js_str(response))
        })
        .catch(err => console.error(err));
}