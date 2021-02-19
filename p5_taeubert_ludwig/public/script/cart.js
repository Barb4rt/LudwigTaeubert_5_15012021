function fichePanier(nounours) {
  // Declaration de variable
  const clearButton = document.createElement('button');
  const productTotalRow = document.createElement('li');
  const productTotalPrice = document.createElement('li');
  const productTaxes = document.createElement('li');
  const productTotalWithTaxes = document.createElement('li');
  const cartEmptyDiv = document.createElement('div');
  const cartEmptyText = document.createElement('p');
  const returnButton = document.createElement('a');
  const cartContainer = document.querySelector('.container-fluid');
  const cartList = document.querySelector('#product__overview');
  let formIsOk = false;
  let totalWithTaxesConcat;

  // declaration de fonction
  function checkForm(myArg) {//Fonction qui vérifie que le formulaire est remplis correctement sans la présence de caractères non désirer
    const regexAlpha = /^[a-zA-Z-\â\ô\;\s]+$/;
    const regexAdress = /^[a-zA-Z0-9-\â\ô\;\s]+$/;
    const regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
    Array.prototype.slice.call(myArg).forEach((element) => {
      if (!element.value == '' || !element.value == null) {
        formIsOk = true;
      }
    });
    if (
      formIsOk &&
      regexAlpha.test(firstName.value) &&
      regexAlpha.test(lastName.value) &&
      regexAdress.test(address.value) &&
      regexAlpha.test(city.value) &&
      regexEmail.test(email.value) === true
    ) {

      formIsOk = true;
    } else {
      alert('caractère non autorisé')
      formIsOk = false;
    }
  }
  // récupération de la liste des produit mis dans le panier et création de la liste dans le HTML
  function constructList() {
    let globalAmount = 0;
    let total = 0;
    let totalConcat;
    // Boucle d'itération des objet dans le localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const objIncart = localStorage.key(i);
      for (let p = 0; p < nounours.length; p++) {
        if (objIncart === nounours[p]._id) {
          const recupObj = localStorage.getItem(nounours[p]._id);
          const productInCart = JSON.parse(recupObj);
          const productRow = document.createElement('li');
          const productContainer = document.createElement('div');
          const productName = document.createElement('h6');
          const productPrice = document.createElement('span');
          const { name } = nounours[p];
          const price = `${nounours[p].price
            .toString()
            .substring(0, nounours[p].price.toString().length - 2)}.${nounours[
            p
          ].price
            .toString()
            .substr(-2)} €`;
          let somme = 0;
          let totalPrice = 0;

          productRow.className =
            'list-group-item d-flex justify-content-between lh-sm ';
          cartList.className = 'list-group mb-3';
          productPrice.className = 'text-muted';
          productTotalRow.className =
            'my-0 totalRow list-group list-group-flush';
          productTotalPrice.className = 'my-0 list-group-item';
          productTaxes.className = 'my-0 list-group-item';
          productTotalWithTaxes.className = 'my-0 list-group-item';
          productName.className = 'my-0';
          productContainer.appendChild(productName);
          cartList.appendChild(productRow);
          productRow.appendChild(productContainer);
          productRow.appendChild(productPrice);
          productPrice.textContent = price;
          productName.textContent = name;

          for (let n = 0; n < productInCart.length; n++) {// Boucle de création des éléments de la liste
            const productColor = document.createElement('small');
            const productAmount = document.createElement('span');
            const spaceBetween = document.createElement('span');
            const { amount } = productInCart[n];
            const { color } = productInCart[n];
            productColor.className = 'text-muted';
            productAmount.className = 'text-muted';
            spaceBetween.textContent = ' ';
            productContainer.appendChild(productColor);
            productContainer.appendChild(productAmount);
            productContainer.appendChild(spaceBetween);
            productAmount.textContent = amount;
            productColor.textContent = color + ' ';
            somme = parseInt(amount) + somme;//Converstion de amout en entier et ajout à chaque tour de boucle de ca propre quantité
            totalPrice = somme * nounours[p].price;// Multiplication de la somme par le prix de chaque objet
          }
          total = total + totalPrice;// Ajout à chaque tour de boucle du prix total de chaque type de nounours 
          globalAmount = globalAmount + somme;// récuperation de la quantité totale présente dans le panier 
          document.querySelector('#product__amount').textContent = globalAmount;
        }
      }
    }
    document.querySelector
    totalConcat = `${total//Concaténation du prix pour qui corresponde au standard
      .toString()
      .substring(0, total.toString().length - 2)}.${total
      .toString()
      .substr(-2)} €`;
    cartList.appendChild(productTotalPrice);
    cartList.appendChild(productTaxes);
    cartList.appendChild(productTotalWithTaxes);
    let taxes = (total * 20) / 100;//Calcul des taxes
    let taxesConcat = `${taxes//Concaténation des taxes pour qui corresponde au standard
      .toString()
      .substring(0, taxes.toString().length - 2)}.${taxes
      .toString()
      .substr(-2)} €`;
    let totalWithTaxes = total + taxes;
    totalWithTaxesConcat = `${totalWithTaxes //Concaténation du total pour qui corresponde au standard
      .toString()
      .substring(
        0,
        totalWithTaxes.toString().length - 2,
      )}.${totalWithTaxes.toString().substr(-2)} €`;
    productTotalPrice.textContent = 'Prix total sans taxes : ' + totalConcat;
    productTaxes.textContent = 'Taxe de 20% : ' + taxesConcat;
    productTotalWithTaxes.textContent =
      'Prix total avec taxes : ' + totalWithTaxesConcat;
  }

  function cartIsEmpty() {//affiche une page indiquant que le panier est vide 
    cartContainer.remove();
    document.querySelector('body').appendChild(cartEmptyDiv);
    cartEmptyDiv.appendChild(cartEmptyText);
    cartEmptyDiv.appendChild(returnButton);

    cartEmptyText.className = 'text-white';
    returnButton.className = 'btn btn-light';
    returnButton.setAttribute('href', '../index.html');

    cartEmptyText.textContent = 'Votre panier est vide :(';
    returnButton.textContent = 'Retourner au produit';
  }

  function isTheCartEmpty() {// Test si le local storage est vide
    if (localStorage.length <= 0) {
      cartIsEmpty();
    } else { //création du panier
      constructList();

      const dividerCart = document.createElement('hr');
      clearButton.setAttribute('id', 'clear__btn');
      dividerCart.className = 'my-8 text-white';
      cartList.appendChild(dividerCart);
      cartList.appendChild(clearButton);
      clearButton.className = 'btn btn-light';
      clearButton.textContent = 'Vider le panier';
      const cartClear = document.querySelector('#clear__btn');
      cartClear.onclick = function () {
        localStorage.clear();
        const cart = document.querySelector('#product__overview');
        cart.remove();
        cartIsEmpty();
        isTheCartEmpty();
      };
    }
  }
  if (document.readyState === 'complete') { //condition qui écoute le changement d'état du HTML
    isTheCartEmpty();
    console.log('HTML prêt !');
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('erreur lors du chargement de la page');
    });
  }
  let product_id = [];
  function productList() {
    for (i = 0; i < localStorage.length; i++) {
      let recupObj = localStorage.getItem(localStorage.key(i));
      recupObj = JSON.parse(recupObj);
      product_id.push(localStorage.key(i));
    }
  }
  productList();

  let form = document.querySelector('.needs-validation');
  form.addEventListener('submit', async function (event) { 
    event.preventDefault();
    form.classList.add('was-validated');
    checkForm(form);// appelle la fonction pour vérifier la validité du formulaire 

    let data = new FormData(form);
    if (formIsOk === true) {
      var object = {};
      data.forEach((value, key) => {
        object[key] = value;
      });
      let response = await fetch(form.getAttribute('action'), { //création de la requête
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact: object, products: product_id }),
      });
      try {
        let responseData = await response.json();
        if (response.ok === true) { //on vide les champs de saisie
          let inputs = form.querySelectorAll('input, textarea');
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
          }
          sessionStorage.setItem('orderId', responseData['orderId']);//on stocke le numèro de commande dans le session strorage
          sessionStorage.setItem('total', totalWithTaxesConcat);
          console.log(totalWithTaxesConcat);
          localStorage.clear();
          document.location.href = 'orderValidated.html';
        }
      } catch (event) {
        alert(event);
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}
async function cartProducts() {
  await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json())
    .then((nounours) => fichePanier(nounours));
}
cartProducts();
