// const url = "https://66927791346eeafcf46d0443.mockapi.io/products";
import { getAllProducts } from "../api/products.js";
import { getProductById } from "../api/products.js";
import { mapProductToAdminTableRow } from "../utils/layout.js";
import { updateProduct } from "../api/products.js";
import { addNewProduct } from "../api/products.js";
import { deleteProduct } from "../api/products.js";

const productsTableBody = document
  .getElementById("products-table")
  .querySelector("tbody");
document.addEventListener("DOMContentLoaded", displayAllProducts);

// function getAllProducts() {
//   return fetch(url).then((response) => response.json());
// }

// function getProductById(id) {
//   return fetch(`${url}/${id}`).then((response) => response.json());
// }

async function displayAllProducts() {
  const products = await getAllProducts();

  productsTableBody.innerHTML = products
    .map(mapProductToAdminTableRow)
    .join("");
}
// save new product
const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("image-url");
const detailsInput = document.getElementById("details");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const saveProductButton = document.getElementById("save-btn");
let editMode = false;
let currentEditableProductId;

saveProductButton.addEventListener("click", saveProduct);
// console.log(nameInput, priceInput, imageUrlInput, detailsInput);

async function saveProduct(event) {
  event.preventDefault();

  const product = {
    name: nameInput.value,
    price: Number(priceInput.value),
    imageUrl: imageUrlInput.value,
    details: detailsInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
  };

  if (editMode) {
    const editedProduct = await updateProduct(
      product,
      currentEditableProductId
    );
    if (editedProduct !== null) {
      form.reset();
      displayAllProducts();
      editMode = false;
    }
  } else {
    const newProduct = await addNewProduct(product);
    if (newProduct !== null) {
      form.reset();
      displayAllProducts();
    }
  }

  // console.log(JSON.stringify(product), product);

  // fetch(editMode ? `${url}/${currentEditableProductId}` : url, {
  //   method: editMode ? "PUT" : "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(product),
  // }).then(() => {
  //   form.reset();
  //   displayAllProducts();
  //   editMode = false;
  // });
}
// edit product
productsTableBody.addEventListener("click", handleActions);

async function handleActions(event) {
  const className = event.target.parentElement.className;
  if (className.includes("edit")) {
    const productId = className.split("-")[1];
    editProduct(productId);
  } else if (className.includes("delete")) {
    const productId = className.split("-")[1];
    await deleteProduct(productId);
    await displayAllProducts();
  }
}

function editProduct(id) {
  getProductById(id).then((product) => {
    editMode = true;
    nameInput.value = product.name;
    priceInput.value = product.price;
    imageUrlInput.value = product.imageUrl;
    detailsInput.value = product.details;
    descriptionInput.value = product.description;
    categoryInput.value = product.category;

    currentEditableProductId = product.id;
  });
}
