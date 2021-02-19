// selection de la liste des produits

const productView = document.querySelector('#product__view');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('productid');// récupération du Product Id dans l'url

/* Constructeur de Card */

function ficheProduits(nounours_id) {
  const productImgbox = document.createElement('div');
  const productImg = document.createElement('img');
  const productRow = document.createElement('div');
  const productColColor = document.createElement('div');
  const productColAmount = document.createElement('div');
  const productFormColor = document.createElement('div');
  const productFormAmount = document.createElement('div');
  const productColor = document.createElement('select');
  const productAmount = document.createElement('select');
  const amountLabel = document.createElement('label');
  const colorLabel = document.createElement('label');
  const productName = document.createElement('p');
  const productPrice = document.createElement('span');
  const price = `${nounours_id.price
    .toString()
    .substring(
      0,
      nounours_id.price.toString().length - 2,
    )}.${nounours_id.price.toString().substr(-2)} €`;
  const productDescription = document.createElement('p');
  const addCart = document.createElement('button');

  // Ajout du contenu
  productImg.src = nounours_id.imageUrl;
  productName.textContent = nounours_id.name + ' ';
  colorLabel.textContent = 'Séléctionner une couleur:';
  productDescription.textContent = nounours_id.description;
  productPrice.textContent = price;
  addCart.textContent = 'Ajouter au panier';
  amountLabel.textContent = 'Insérer une quantité';

  // Ajouts des attributs
  productColor.setAttribute('id', 'color__selector');
  colorLabel.setAttribute('for', 'color__selector');
  addCart.setAttribute('type', 'submit');
  addCart.setAttribute('id', 'ajout');
  productAmount.setAttribute('id', 'amount');
  productAmount.setAttribute('type', 'number');
  productAmount.setAttribute('name', 'amount');
  amountLabel.setAttribute('for', 'amount');

  // attribution de class
  productImg.setAttribute('alt', `photo du produit ${nounours_id.name}`)
  productImgbox.className = 'productView__imgbox img-fluid mx-auto';
  productImg.className = 'productView__img';
  productRow.className = 'row g-2';
  productColAmount.className = 'col-sm-6';
  productColColor.className = 'col-sm-6';
  productFormColor.className = 'productView__form';
  productFormAmount.className = 'productView__form';
  productName.className = 'productView__name text-center fs-1';
  productColor.className = ' form-select';
  productAmount.className = ' form-select';
  productDescription.className =
    'productView__description text-center fs-5 fw-light';
  addCart.className = 'btn btn-light';
  productPrice.className = 'badge rounded-pill bg-light ';

  // Boucle de création de liste déroulante pour couleur
  for (i = 0; i < nounours_id.colors.length; i++) {
    const colorsOption = document.createElement('option');
    colorsOption.textContent = nounours_id.colors[i];
    colorsOption.setAttribute('value', nounours_id.colors[i]);
    productColor.appendChild(colorsOption);
  }
  for (let i = 0; i < 99; i++) {
    const amountOption = document.createElement('option');
    amountOption.textContent = i;
    amountOption.setAttribute('value', i);
    productAmount.appendChild(amountOption);
  }

  productView.appendChild(productImgbox);
  productImgbox.appendChild(productImg);
  productView.appendChild(productName);
  productName.appendChild(productPrice);
  productView.appendChild(productDescription);
  productView.appendChild(productRow);
  productRow.appendChild(productColColor);
  productColColor.appendChild(productFormColor);
  productFormColor.appendChild(colorLabel);
  productFormColor.appendChild(productColor);
  productRow.appendChild(productColAmount);
  productColAmount.appendChild(productFormAmount);
  productFormAmount.appendChild(amountLabel);
  productFormAmount.appendChild(productAmount);

  productView.appendChild(addCart);
  const a = document.getElementById('ajout');

  //Fonction d'ajout au panier

  a.onclick = function () {
    // declaration des variables
    const colorsList = document.getElementById('color__selector');
    const colorSelected = colorsList.options[colorsList.selectedIndex].text;
    const amount = document.getElementById('amount');
    const amountSelect = amount.options[amount.selectedIndex].text;
    const idName = product;
    let result;

    // recuperation des donnée dans le localStorage
    const recupObj = localStorage.getItem(idName);
    const productInCart = JSON.parse(recupObj);

    // declaration des functions
    
    function controlQuantite(monarg) { //fonction pour controler si la quantité présente dans le localStorage et supérieur à 0
      if (monarg > 0) {
        result = true;
      } else {
        result = false;
      }
    }
    function isInTheCart(array, valueToDetect) { //Vérifie si le le produit d'une certaine couleur est deja dans le localStorage
      for (const elem of array) {
        if (elem.color === valueToDetect) {
          return true;
        }
      }
      return false;
    }
    function initCart() { //Controle si l'argument est supérieur à 0 
      const productInCart = [{ color: colorSelected, amount: amountSelect }];
      const objLinea = JSON.stringify(productInCart);
      localStorage.setItem(idName, objLinea);
    }
    function addTocart() { // Ajoute le produit séléctioner au localStorage sous forme d'objet
      productInCart.push({ color: colorSelected, amount: amountSelect });
      const objLinea = JSON.stringify(productInCart);
      localStorage.setItem(idName, objLinea);
    }

    controlQuantite(amountSelect);//Apelle de la fonction qui vérifie si l'utilisateur à bien entré une quantité supérieur à 0

    // condition
  if (result === false) {
      window.alert('Quantité incorrect');
      return;
    } else {
      if (productInCart === null && result === true) {
        // initialisation du localstorage renvoit true si le produit n'est pas dedans
        initCart();

      } else if (isInTheCart(productInCart, colorSelected) && result === true) {
        // Controle de la couleur et de la quantité
        productInCart.forEach((item) => {
          if (item.color === colorSelected) {
            item.amount = amountSelect;
            const objLinea = JSON.stringify(productInCart);
            localStorage.setItem(idName, objLinea);
            console.log(item.amount);
          }
        });
      } else if (result === true) {
        addTocart(); //Apelle de la fonction qui ajoute le produit au localStorage
      } else {
        window.alert('Quantité incorrect');
        return;
      }
    }
  };
}

async function detailledProducts() {
  await fetch(`http://localhost:3000/api/teddies/${product}`)
    .then((response) => response.json()) 
    .then((nounours_id) => ficheProduits(nounours_id));
}
