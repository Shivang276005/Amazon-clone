import { cart, removeCartItem, getCartQuantity } from "../data/cart.js";
import { deliveryOptions } from "../data/delieveryOptions.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";  // we used "default export" thats why no {} are used in the syntax

let cartSummaryHTML = '';
cart.forEach((cartItem) => {
  let productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  cartSummaryHTML +=`
  <div class="cart-item-container" id="cart-item-${productId}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
        $${formatMoney(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input" id="input-quantity-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
          <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${delieveryOptionsHTML(matchingProduct)}
      </div>
    </div>
  </div>
  `;
});
function delieveryOptionsHTML(matchingProduct){
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add((deliveryOption.deliveryDays),'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = (deliveryOption.priceCents === 0)? "FREE" : `$${formatMoney(deliveryOption.priceCents)}`;
    html+=`
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `
  });
  return html;
}


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
document.querySelectorAll('.delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeCartItem(productId);
    document.getElementById(`cart-item-${productId}`).remove();
    // update the quantity display in header after removal
    refreshHeaderCount();
  });
});
// helper to refresh the header count on this page
function refreshHeaderCount() {
  const cartQuantity = getCartQuantity();
  document.getElementById('cartItemCount').innerHTML = 
    `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)`;
}
refreshHeaderCount();
document.querySelectorAll('.update-quantity-link').forEach(link => {
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;
    document.getElementById(`cart-item-${productId}`).classList.add('is-editing-quantity');
  });
});
document.querySelectorAll('.save-quantity-link').forEach(link =>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    const inputElement = document.getElementById(`input-quantity-${productId}`);
    const newQuantity = parseInt(inputElement.value);
    if (newQuantity > 0) {
      // Find and update the cart item quantity
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
        // Update the quantity label in the DOM
        document.querySelector(`#cart-item-${productId} .quantity-label`).textContent = newQuantity;
      }
      // Refresh header count
      refreshHeaderCount();
    }
    
    document.getElementById(`cart-item-${productId}`).classList.remove('is-editing-quantity');
  });
});