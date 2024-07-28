import { getAllProducts } from "../api/products.js";

// console.log(products);

document.addEventListener("DOMContentLoaded", displayAllProducts);
const mainContainer = document.querySelector(".main");

// function getAllProducts() {
//   const url = "https://66927791346eeafcf46d0443.mockapi.io/products";
//   return fetch(url).then((response) => response.json());
// }

async function displayAllProducts() {
  const products = await getAllProducts();
  // getAllProducts().then(
  //   (products) =>
  mainContainer.innerHTML = products
    .map(
      (product) =>
        `
    <div class="product-card flex-col gap-20 items-center justify-between">
    <h3 class="card-title">${product.name}</h3>
    <img src=${product.imageUrl} width="200px">
    <p class="card-price">${product.price} lei</p>
    <a href="../pages/details.html?id=${product.id}">Details</a>
    </div>
    `
    )
    .join("");
}
