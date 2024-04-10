const fetchLibrary = () => {
  fetch('https://striveschool-api.herokuapp.com/books')
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
    .then((library) => {
      createLibrary(library)
    })
    .catch((error) => console.log(error))
}

const createLibrary = (library) => {
  const row = document.getElementById('library')
  library.forEach((book) => {
    const col = document.createElement('div')
    col.classList.add('col')
    col.innerHTML += `<div class="card">
        <img src=${book.img} class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
            <div>
            <p class="card-text">${book.price}$</p>
            <button type="button" class="btn btn-outline-secondary">Remove</button>
            </div>
        </div>
    </div>`
    row.appendChild(col)
  })
  const buttons = document.querySelectorAll('section button')
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      button.closest('.col').remove()
    })
  })
}

window.onload = () => fetchLibrary()
