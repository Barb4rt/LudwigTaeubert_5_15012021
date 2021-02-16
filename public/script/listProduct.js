const productList = document.querySelector('#product__list');
const presContainer = document.querySelector('#presentation');

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function remplirListeProduits(nounours) {
  for (let i = 0; i < nounours.length; i++) {
    // Declaration des variables et creation d'éléments
    const productItem = document.createElement('a');
    const productImgbox = document.createElement('div');
    const productImg = document.createElement('img');
    const productName = document.createElement('h4');
    const productDescription = document.createElement('p');

    // Ajout du contenu
    productImg.src = nounours[i].imageUrl;
    productName.textContent = nounours[i].name;
    productDescription.textContent = nounours[i].description;

    // attribution de class
    productItem.setAttribute(
      'href',
      `pages/product.html?productid=${nounours[i]._id}`,
    );
    productItem.className = 'product card p-2 ';
    productImgbox.className = 'card-img-top rounded-circle';
    productName.className = 'card-text';
    productDescription.className = 'card-text description';

    productList.appendChild(productItem);
    productItem.appendChild(productImgbox);
    productImgbox.appendChild(productImg);
    productItem.appendChild(productName);
    productItem.appendChild(productDescription);
  }

  let randomImg = getRandom(nounours.length);
  console.log(randomImg);
  presContainer.setAttribute(
    'style',
    `background-image: url(${nounours[randomImg].imageUrl}); background-size: cover;`,
  );
}
async function fillProducts() {
  await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json())
    .then((nounours) => remplirListeProduits(nounours));
}
