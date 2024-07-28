const url = "https://66927791346eeafcf46d0443.mockapi.io/products";

export async function getAllProducts() {
  const response = await fetch(url);
  const products = await response.json();

  return products;
}

// export async function getProductById(id) {
//     const response =
//     const product =
// }
