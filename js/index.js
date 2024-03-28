const btnCart = document.querySelector(".btnCar");
const contProducts = document.querySelector(".container-cart-products");

const cartEmpty = document.querySelector(".cart-empty");
const cartTotal = document.querySelector(".cart-total");

btnCart.addEventListener("click", () => {
  contProducts.classList.toggle("hidden-cart");
});

// ###

const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");
const productsList = document.querySelector(".grid");

let allProducts = [];
const valorTotal = document.querySelector(".total-pagar");
const countProducts = document.querySelector("#contador-productos");

productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-item")) {
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector(".title-item").textContent,
      price: product.querySelector(".price-item").textContent,
    };

    const exist = allProducts.some(
      (product) => product.title === infoProduct.title
    );

    if (exist) {
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }
  }
  showHTML();
});

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;

    allProducts = allProducts.filter((product) => product.title !== title);

    showHTML();
  }
});

// Mostrar en html

const showHTML = () => {
  if (!allProducts.length) {
    console.log(!allProducts.length);
    cartEmpty.classList.remove("hidden-cart");
    rowProduct.classList.add("hidden-cart");
    cartTotal.classList.add("hidden-cart");
  } else {
    console.log(!allProducts.length);
    cartEmpty.classList.add("hidden-cart");
    rowProduct.classList.remove("hidden-cart");
    cartTotal.classList.remove("hidden-cart");
  }
  // Limpiar primero

  rowProduct.innerHTML = "";

  //   Aumentar

  let total = 0;
  let totalOfProducts = 0;

  allProducts.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `
    <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio--producto-carrito">${product.price}</span>
    </div>
    <i class="bx bx-x-circle icon-close"></i>
    `;
    rowProduct.append(containerProduct);
    total = total + parseInt(product.price.slice(1)) * product.quantity;
    totalOfProducts = totalOfProducts + product.quantity;
  });
  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalOfProducts;
};
