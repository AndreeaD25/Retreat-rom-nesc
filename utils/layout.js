export function mapProductToCard(product) {
  return `
     <div class="product-card flex-col gap-20 items-center justify-between">
    <h3 class="card-title">${product.name}</h3>
    <img src=${product.imageUrl} width="200px">
    <p class="card-price">${product.price} lei</p>
    <a href="../pages/details.html?id=${product.id}">Details</a>
    </div>
    `;
}
