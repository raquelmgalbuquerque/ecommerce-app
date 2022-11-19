let products = [
  {
    id: 1,
    name: "Máquina Fotográfica Reflex",
    brand: "Canon",
    price: 1299.0,
    imageUrl:
      "https://www.worten.pt/i/5fa2afa71783cf35d39a0b52db55db58b2771177.jpg",
    discount: 10,
  },
  {
    id: 2,
    name: "Portátil",
    brand: "Asus",
    price: 799.99,
    imageUrl:
      "https://www.worten.pt/i/64877b12f086307b71c66624a8320a43ee6959a8.jpg",
    discount: 15,
  },
  {
    id: 3,
    name: "Televisão",
    brand: "LG",
    price: 699.99,
    imageUrl:
      "https://www.worten.pt/i/1887ae19a34f523e02951ffe95bcb1a704538221.jpg",
    discount: 20,
  },
  {
    id: 4,
    name: "Telemóvel",
    brand: "Samsung",
    price: 1779.0,
    imageUrl:
      "https://www.worten.pt/i/c6a18c778016d222170d65db2000cbafa6a87767.jpg",
    discount: 1,
  },
];

let cart = {
  total: 0,
  products: [],
};

function getDiscountPrice(product) {
  let discountPrice = product.price - product.price * product.discount * 0.01;
  return Math.round(discountPrice * 100) / 100;
}

function addToCart(product) {
  let productName = product.name;

  let uniqueProducts = cart.products.map((product) => product.name);
  let isProductListed = uniqueProducts.includes(productName);

  if (isProductListed) {
    let selectedProduct = cart.products.find(
      (item) => item.name === productName
    );
    selectedProduct.quantity = selectedProduct.quantity + 1;
  } else {
    cart.products.push({ name: product.name, quantity: 1 });
  }

  cart.total = cart.total + getDiscountPrice(product);
  // console.log(cart);
  document.querySelector(".cart-total").innerHTML =
    Math.round(cart.total * 100) / 100;

  let totalItems = cart.products.reduce((sum, curr) => curr.quantity + sum, 0);
  document.querySelector(".cart-total-items").innerHTML = totalItems;
}

let productContainerDiv = document.querySelector(".product-container");

products.forEach((product) => {
  let productInfoDiv = document.createElement("div");
  productInfoDiv.setAttribute("class", "product-info");

  let productName = document.createElement("div");
  productName.setAttribute("class", "product-name");
  productName.innerHTML = `<b>Nome: </b><span>${product.name}</span>`;
  productInfoDiv.appendChild(productName);

  let productBrand = document.createElement("div");
  productBrand.setAttribute("class", "product-brand");
  productBrand.innerHTML = `<b>Marca: </b>${product.brand}`;
  productInfoDiv.appendChild(productBrand);

  let productPrice = document.createElement("div");
  productPrice.setAttribute("class", "product-price-now");
  productPrice.innerHTML = `<b>Preço: </b> <s class="product-price-before">${
    product.price
  } €</s> ${getDiscountPrice(product)} €`;
  productInfoDiv.appendChild(productPrice);

  let productDiscount = document.createElement("div");
  productDiscount.setAttribute("class", "product-discount");
  productDiscount.innerHTML = `<b>Desconto: </b> ${product.discount} %`;
  productInfoDiv.appendChild(productDiscount);

  let productImage = document.createElement("img");
  productImage.setAttribute("src", product.imageUrl);
  productImage.setAttribute("height", "100px");
  productInfoDiv.appendChild(productImage);

  let addToCartButton = document.createElement("button");
  addToCartButton.setAttribute("class", "add-to-cart-button");
  addToCartButton.innerHTML = "Adicionar ao carrinho";
  addToCartButton.onclick = () => addToCart(product);
  productInfoDiv.appendChild(addToCartButton);

  productContainerDiv.appendChild(productInfoDiv);
});

// ALINEA G
let weekDay = new Date().toLocaleDateString("pt-PT", {
  weekday: "long",
});
document.querySelector(".weekday").innerHTML = weekDay;

// ALINEA H
function searchProduct() {
  let input = document.getElementById("searchInput");
  let filter = input.value.toUpperCase();
  let productDiv = document.getElementsByClassName("product-info");

  if (filter.length >= 3) {
    for (i = 0; i < productDiv.length; i++) {
      let span = productDiv[i].getElementsByTagName("span")[0];
      let txtValue = span.textContent || span.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        productDiv[i].style.display = "";
      } else {
        productDiv[i].style.display = "none";
      }
    }
  } else {
    for (i = 0; i < productDiv.length; i++) {
      productDiv[i].style.display = "";
    }
  }
}
