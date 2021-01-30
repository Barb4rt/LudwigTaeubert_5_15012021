/* eslint-disable semi */
// selection de la liste des produits
const productList = document.querySelector('#product__list')
const productView = document.querySelector('#product__view')

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const product = urlParams.get('productid')

/* Constructeur de Card */
function remplirListeProduits(nounours) {
  for (let i = 0; i < nounours.length; i++) {
    // Declaration des variables et creation d'éléments
    const productItem = document.createElement('a')
    const productImg = document.createElement('img')
    const productName = document.createElement('h4')
    const productDescription = document.createElement('p')

    // Ajout du contenu
    productImg.src = nounours[i].imageUrl
    productName.textContent = nounours[i].name
    productDescription.textContent = nounours[i].description
    // attribution de class
    productItem.setAttribute('id', `"${nounours[i]._id}"`)
    productItem.setAttribute(
      'href',
      `pages/product.html?productid=${nounours[i]._id}`
    )
    productItem.className = 'product card p-2'
    productImg.className = 'card-img-top'
    productName.className = 'card-text'
    productDescription.className = 'card-text description'

    productList.appendChild(productItem)
    productItem.appendChild(productImg)
    productItem.appendChild(productName)
    productItem.appendChild(productDescription)
  }
}

function ficheProduits(nounours_id) {
  const productImg = document.createElement('img')
  const productName = document.createElement('h4')
  const productColor = document.createElement('select')
  const productAmount = document.createElement('select')
  const amountLabel = document.createElement('label')
  const colorLabel = document.createElement('label')
  const productPrice = document.createElement('p')
  const price = `${nounours_id.price
    .toString()
    .substring(
      0,
      nounours_id.price.toString().length - 2
    )}.${nounours_id.price.toString().substr(-2)} €`
  const productDescription = document.createElement('p')
  const addCart = document.createElement('button')
  let objJson

  // Ajout du contenu
  productImg.src = nounours_id.imageUrl
  productName.textContent = nounours_id.name
  colorLabel.textContent = 'Séléctionner une couleur:'
  productDescription.textContent = nounours_id.description
  productPrice.textContent = price
  addCart.textContent = 'Ajouter au panier'
  amountLabel.textContent = 'Insérer une quantité'

  // attribution de class
  productImg.className = 'card-img-top'
  productName.className = 'card-text'
  productColor.setAttribute('id', 'color__selector')
  colorLabel.setAttribute('for', 'color__selector')
  productDescription.className = 'card-text description'
  addCart.setAttribute('type', 'submit')
  addCart.setAttribute('id', 'ajout')
  productAmount.setAttribute('id', 'amount')
  productAmount.setAttribute('type', 'number')
  productAmount.setAttribute('name', 'amount')
  amountLabel.setAttribute('for', 'amount')

  // Boucle de création de liste déroulante pour couleur
  for (i = 0; i < nounours_id.colors.length; i++) {
    const colorsOption = document.createElement('option')
    colorsOption.textContent = nounours_id.colors[i]
    colorsOption.setAttribute('value', nounours_id.colors[i])
    productColor.appendChild(colorsOption)
  }
  for (let i = 0; i < 99; i++) {
    const amountOption = document.createElement('option')
    amountOption.textContent = i
    amountOption.setAttribute('value', i)
    productAmount.appendChild(amountOption)
  }

  productView.appendChild(productImg)
  productView.appendChild(productName)
  productView.appendChild(colorLabel)
  productView.appendChild(amountLabel)
  productView.appendChild(productColor)
  productView.appendChild(productAmount)
  productView.appendChild(productPrice)
  productView.appendChild(productDescription)
  productView.appendChild(addCart)
  const a = document.getElementById('ajout')

  a.onclick = function () {
    // declaration des variables
    const colorsList = document.getElementById('color__selector')
    const colorSelected = colorsList.options[colorsList.selectedIndex].text
    const amount = document.getElementById('amount')
    const amountSelect = amount.options[amount.selectedIndex].text
    const idName = product
    let result
    let objLinea

    // recuperation des donnée dans le localStorage
    const recupObj = localStorage.getItem(idName)
    const productInCart = JSON.parse(recupObj)

    // declaration des functions
    function controlQuantite(monarg) {
      if (monarg > 0) {
        result = true
      } else {
        result = false
      }
      console.log(result)
      return result
    }
    function isInTheCart(array, valueToDetect) {
      for (const elem of array) {
        if (elem.color === valueToDetect) {
          return true
        }
      }
      return false
    }
    function initCart() {
      const productInCart = [{ color: colorSelected, amount: amountSelect }]
      const objLinea = JSON.stringify(productInCart)
      localStorage.setItem(idName, objLinea)
    }
    function addTocart() {
      productInCart.push({ color: colorSelected, amount: amountSelect })
      const objLinea = JSON.stringify(productInCart)
      localStorage.setItem(idName, objLinea)
    }

    controlQuantite(amountSelect)

    // condition
    if (productInCart === null && result === true) {
      // initialisation du localstorage renvoit true si le produit n'est pas dedans
      initCart()
      console.log(productInCart)
    } else if (isInTheCart(productInCart, colorSelected) && result === true) {
      // Controle de la couleur et de la quantité
      productInCart.forEach((item) => {
        if (item.color === colorSelected) {
          item.amount = amountSelect
          const objLinea = JSON.stringify(productInCart)
          localStorage.setItem(idName, objLinea)
          console.log(item.amount)
        }
      })
    } else if (result === true) {
      addTocart()
    } else {
      window.alert('Quantité incorrect')
    }
  }
}
async function fillProducts() {
  await fetch('http://localhost:3000/api/teddies') // will return info, but in wrong format
    .then((response) => response.json()) // will return info, in json format
    .then((nounours) => remplirListeProduits(nounours)) // main code here, using json info
}

async function detailledProducts() {
  await fetch(`http://localhost:3000/api/teddies/${product}`)
    .then((response) => response.json()) // will return info, in json format
    .then((nounours_id) => ficheProduits(nounours_id)) // main code here, using json info
}

