import { formatCurrency } from "../../scripts/utils/money.js";
import { calculateCartQuantity, cart, removeFromCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {calculateDeliveryDate, deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummary(){

  let cartSummaryHTML = '';
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    
    const matchingProduct = getProduct(productId);
    
    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);
    
    
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
    Delivery date: ${dateString}
    </div>
    
    <div class="cart-item-details-grid">
    <img class="product-image"
    src="${matchingProduct.image}">
    
    <div class="cart-item-details">
    <div class="product-name">
    ${matchingProduct.name}
    </div>
    <div class="product-price">
    $${formatCurrency(matchingProduct.priceCents)}
    </div>
    <div class="product-quantity">
    <span>
    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span> 
    </span>
    <span class="update-quantity-link link-primary js-update-quantity" data-product-id = "${matchingProduct.id}">
    Update
    </span>
    <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
    <span class="save-quantity-link link-primary" data-product-id = "${matchingProduct.id}">Save</span>
    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
    Delete
    </span>
    </div>
    </div>
    
    <div class="delivery-options">
    <div class="delivery-options-title">
    Choose a delivery option:
    </div>
    ${deliveryOptionsHTML(matchingProduct.id, cartItem)}
    </div>
    </div>
    </div>
    `;
    updateCartQuantity();
    renderCheckoutHeader();
  })
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  
  function deliveryOptionsHTML(matchingProductId, cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption)=>{
      const dateString = calculateDeliveryDate(deliveryOption);
      
      const priceString = (deliveryOption.priceCents == 0)? 'FREE': `$${formatCurrency(deliveryOption.priceCents)}`;
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html += `
      <div class="delivery-option js-delivery-option" data-product-id = "${matchingProductId}" data-delivery-option-id = "${deliveryOption.id}">
      <input type="radio"
      ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingProductId}">
      <div>
      <div class="delivery-option-date">
      ${dateString}
      </div>
      <div class="delivery-option-price">
      ${priceString} - Shipping
      </div>
      </div>
      </div>
      `;
    });
    return html;
  }
  
  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderOrderSummary();
      updateCartQuantity();
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });
  
  function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();
    let cartQtyMsgFormat;
    if (cartQuantity == 0) {
      cartQtyMsgFormat = `Empty`;
    }else if(cartQuantity == 1){
      cartQtyMsgFormat = `${cartQuantity} item`;
    } else {
      cartQtyMsgFormat = `${cartQuantity} items`;
    }
    document.querySelector('.js-checkout-item-count').innerHTML = cartQtyMsgFormat;
  }
  
  document.querySelectorAll('.js-update-quantity').forEach((link)=>{
    link.addEventListener('click', ()=>{
      const productId = link.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    });
  });
  
  document.querySelectorAll('.save-quantity-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
      const productId = link.dataset.productId;
      
      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
      
      let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
      if (newQuantity<=0 || newQuantity>1000) {
        alert("Enter the correct quantity please");
        newQuantity = 1;
      } else {
        updateQuantity(productId, newQuantity);
      }
      
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
      updateCartQuantity();
      document.querySelector(`.js-quantity-input-${productId}`).value = '';
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });
  document.querySelectorAll(`.quantity-input`).forEach((link)=>{
    link.addEventListener('keydown', (event)=>{
      if (event.key === 'Enter') {
        const productId = link.dataset.productId;
        
        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
        let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        if (newQuantity<=0 || newQuantity>1000) {
          alert("Enter the correct quantity please");
          newQuantity = 1;
        } else {
          updateQuantity(productId, newQuantity);
        }
        
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
        updateCartQuantity();
        document.querySelector(`.js-quantity-input-${productId}`).value = '';
        renderCheckoutHeader();
        renderPaymentSummary();
      }
    });
  });
  
  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

}