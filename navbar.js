const nav = document.createElement('nav')
nav.className = "navbar navbar-expand-sm navbar-dark bg-dark"
nav.innerHTML = `<div class="container-fluid">
<a class="navbar-brand text-white" href="#">poemscapes</a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon text-white"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav me-auto mb-0">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" id="our_poems" href="#" role="button" data-bs-toggle="dropdown"
        aria-expanded="false">
        Our Poems
      </a>
      <ul class="dropdown-menu" id="our_poems_list">
      </ul>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" href="index.html?poem=0" id="poem_0">Generate</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" href="write.html" id="write">Write</a>
    </li>
  </ul>
</div>
</div>`

document.body.appendChild(nav)

const poem_list = document.getElementById('our_poems_list')

for (let i = 1; i <= 5; i++) {
    const item = document.createElement('li')
    item.innerHTML = `<a class="dropdown-item" href="index.html?poem=${i}" id="poem_${i}">Poem ${i}</a>`
    poem_list.appendChild(item)
}
