const LIST_SHOP = 'listShop'
let listArray = []

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
    col.innerHTML += `
    <div class="card">
        <img src=${book.img} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <div>
            <p class="card-text">${book.price}$</p>
                <div class="d-flex gap-3">
                <button type="button" class="btn btn-secondary">add</button>
                <button type="button" class="btn btn-outline-secondary">Remove</button>
                </div>

            </div>
        </div>
    </div>`
    row.appendChild(col)
  })

  const buttonsRemove = document.querySelectorAll('section button:last-of-type')
  buttonsRemove.forEach((button) => {
    button.addEventListener('click', (event) => {
      button.closest('.col').remove()
    })
  })

  const buttonsAdd = document.querySelectorAll('section button:first-of-type')
  buttonsAdd.forEach((button) => {
    button.addEventListener('click', (event) => {
      const cardBody = button.closest('.card').querySelector('.card-body')
      const cardTitle = cardBody.querySelector('.card-title').textContent
      const cardText = cardBody.querySelector('p').textContent
      const contentCard = cardTitle + ' ' + cardText
      listArray.push(contentCard)
      addToShop(contentCard, listArray)
    })
  })
}

const ul = document.getElementById('listShop')

const addToShop = (title, list) => {
  const li = document.createElement('li')
  const btn = document.createElement('p')
  btn.classList.add('d-inline-block')
  btn.innerText = '❌'
  li.innerText = title
  li.appendChild(btn)
  ul.appendChild(li)

  btn.addEventListener('click', (event) => {
    const index = list.indexOf(title)
    list.splice(index, 1)
    btn.closest('li').remove()
  })
}

window.onload = () => {
  fetchLibrary()
  const listArrayShop = JSON.parse(localStorage.getItem(LIST_SHOP))
  if (listArrayShop.length > 0) {
    listArrayShop.forEach((element) => {
      listArray.push(element)
      addToShop(element, listArray)
    })
  } else {
    listArray = []
  }
}

window.addEventListener('beforeunload', () => {
  localStorage.setItem(LIST_SHOP, JSON.stringify(listArray))
})
