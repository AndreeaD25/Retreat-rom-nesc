document.addEventListener("DOMContentLoaded", showProductDetails);

const url = "https://66927791346eeafcf46d0443.mockapi.io/products";

async function showProductDetails() {
  //   console.log(window.location.search);
  const urlSearchParam = new URLSearchParams(window.location.search);
  const productId = urlSearchParam.get("id");

  const response = await fetch(`${url}/${productId}`);
  const product = await response.json();

  document.querySelector(".main").innerHTML = `<h2>${product.details}</h2>`;
}
