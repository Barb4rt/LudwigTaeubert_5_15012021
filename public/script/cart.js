const { format } = require("prettier");

/* eslint-disable linebreak-style */
let productID
function fichePanier(nounours) {
  // Declaration de variable
  // créateur
  const clearButton = document.createElement('button');
  const productTotalRow = document.createElement('li');
  const productTotalPrice = document.createElement('li');
  const productTaxes = document.createElement('li');
  const productTotalWithTaxes = document.createElement('li');
  

  const cartEmptyDiv = document.createElement('div')
  const cartEmptyText = document.createElement('p')
  const returnButton = document.createElement('button')

  // selecteur
  const cartContainer = document.querySelector('.page-container')
  const cartList = document.querySelector('#product__overview');
  const key = localStorage.length;

  // declaration de fonction
  

  function constructList() {
    let globalAmount = 0
    let total = 0
    let totalConcat
    for (let i = 0; i < localStorage.length; i++) {
      const objIncart = localStorage.key(i)
      
      for (let p = 0; p < nounours.length; p++) {
        
        if (objIncart === nounours[p]._id) {
          const recupObj = localStorage.getItem(nounours[p]._id);
          const productInCart = JSON.parse(recupObj)
          const productRow = document.createElement('li');
          const productContainer = document.createElement('div');
          const productName = document.createElement('h6');
          const productPrice = document.createElement('span')
          const { name } = nounours[p]
          const price = `${nounours[p].price.toString().substring(0, nounours[p].price.toString().length - 2)}.${nounours[p].price.toString().substr(-2)} €`
          
          
          productRow.className = 'list-group-item d-flex justify-content-between lh-sm'
          cartList.className = 'list-group mb-3'
          
          productPrice.className = 'text-muted'
          productTotalRow.className = 'my-0 totalRow'
          productTotalPrice.className = 'my-0'
          productTaxes.className = 'my-0'
          productTotalWithTaxes.className = 'my-0';

          productName.textContent = name;
          productContainer.appendChild(productName)
          productName.className = 'my-0';
          
          cartList.appendChild(productRow)
          productRow.appendChild(productContainer)
          productRow.appendChild(productPrice)
          
          productPrice.textContent = price
          let somme = 0
          let totalPrice = 0

          for (let n = 0; n < productInCart.length; n++) {
            const productColor = document.createElement('small');
            const productAmount = document.createElement('span')
            const { amount } = productInCart[n];
            const { color } = productInCart[n];
            somme = parseInt(amount) + somme

            productColor.className = 'text-muted'
            productAmount.className = 'text-muted'

            productContainer.appendChild(productColor);
            productContainer.appendChild(productAmount)

            productAmount.textContent = amount
            productColor.textContent = color
            totalPrice = somme * nounours[p].price
            
          }
          
          total = total + totalPrice
          
          
          globalAmount = globalAmount + somme
        }
      }
      
    }
    console.log(total)
    totalConcat = `${total.toString().substring(0, total.toString().length - 2)}.${total.toString().substr(-2)} €`
    cartList.appendChild(productTotalPrice)
          cartList.appendChild(productTaxes)
          cartList.appendChild(productTotalWithTaxes)
          let taxes = total *20 / 100;
          let taxesConcat = `${taxes.toString().substring(0, taxes.toString().length - 2)}.${taxes.toString().substr(-2)} €`;
          let totalWithTaxes = total + taxes
          let totalWithTaxesConcat= `${totalWithTaxes.toString().substring(0, totalWithTaxes.toString().length - 2)}.${totalWithTaxes.toString().substr(-2)} €`
          productTotalPrice.textContent = totalConcat;
          productTaxes.textContent = taxesConcat
          productTotalWithTaxes.textContent = totalWithTaxesConcat;
  }
 
  function cartIsEmpty() {
    cartContainer.appendChild(cartEmptyDiv)
    cartEmptyDiv.appendChild(cartEmptyText);
    cartEmptyDiv.appendChild(returnButton)

    cartEmptyText.textContent = 'Votre panier est vide :(';
    returnButton.textContent = 'Retourner au produit'
  }

  function isTheCartEmpty() {
    if (key <= 0) {
      cartIsEmpty()
    } else {
      constructList()

      clearButton.setAttribute('id', 'clear__btn')
      cartList.appendChild(clearButton);
      clearButton.textContent = 'Vider le panier'
      const cartClear = document.querySelector('#clear__btn')
      cartClear.onclick = function () {
        localStorage.clear()
        const cart = document.querySelector('#cart__list')
        cart.remove()
        cartIsEmpty()
      };
    }
  }
  if (document.readyState === 'complete') {
    isTheCartEmpty();
    console.log('HTML prêt !');
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('erreur lors du chargement de la page');
    });
  }
let productID = []
function productList(){
  
for (i=0 ; i< localStorage.length ; i ++)
{
  const recupObj = localStorage.getItem(localStorage.key(i));
  const productInCart = JSON.parse(recupObj)
  productID.push([localStorage.key(i)])
  
}





}
productList()
console.log(productID)
let form = document.forms.namedItem('contact__form')
form.addEventListener('submit', function(event){
  let contact = document.querySelector('#contact__form');
  let req = new FormData(document.forms.namedItem());
  console.log(req);
  event.preventDefault();
},false)



// async function postFormDataAsJson({ url, formData }) {
//   const plainFormData = Object.fromEntries(formData.entries())
//   const formDataJsonString = JSON.stringify(plainFormData)
//   const fetchOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: formDataJsonString,
//   }
//   const response = await fetch(url, fetchOptions)
//   if (!response.ok) {
//     const errorMessage = await response.text()
//     throw new Error(errorMessage)
//   }
//   return response.json()
// }
// async function requestConstruct(event) {
//   event.preventDefault()
//   const contact = event.currentTarget
//   const url = 'http://localhost:3000/api/teddies/order'
//   try {
//     const formData = new formData(contact)
//     let req= new order(formData,productID,5)
//     const responseData = await postFormDataAsJson({ url, req })

//     console.log(responseData)
//   } catch (error) {
//     console.log(error)
//   }
// }
// const orderForm = document.querySelector('#contact__form')


// orderForm.addEventListener('submit', requestConstruct())
}






async function cartProducts() {
  await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json()) // will return info, in json format
    .then((nounours) => fichePanier(nounours));
}