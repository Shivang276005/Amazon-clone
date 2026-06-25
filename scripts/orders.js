import { orders } from "../data/orders.js";
import { dateFormat } from "./utils/formatDate.js";
import { formatCurrency } from './utils/money.js';

console.log(orders)
/*
console.log(orders[0])//first order header
console.log(orders[1])//second order header
console.log(orders[0].products[0])// first header -> product no. 1
console.log(orders[0].products[1])// first header -> product no. 2
*/


let orderContainerHTML = '';
orders.forEach((order)=>{
  console.log(order);
  console.log(order.products);
  
  orderContainerHTML += `
  <div class="order-container">
    <!-- specific date's header -->
    <div class="order-header js-order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${dateFormat(order.orderTime)}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(order.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id}</div>
      </div>
    </div>
    <!-- products for that specific header -->

    <div class="order-details-grid">
      <!-- fist product -->
      <div class="product-image-container">
        <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
      </div>

      <div class="product-details">
        <div class="product-name">
          Black and Gray Athletic Cotton Socks - 6 Pairs
        </div>
        <div class="product-delivery-date">
          Arriving on: August 15
        </div>
        <div class="product-quantity">
          Quantity: 1
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
      <!-- second product -->
      <div class="product-image-container">
        <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
      </div>

      <div class="product-details">
        <div class="product-name">
          Adults Plain Cotton T-Shirt - 2 Pack
        </div>
        <div class="product-delivery-date">
          Arriving on: August 19
        </div>
        <div class="product-quantity">
          Quantity: 2
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>

    </div>
    
  </div>
  `
})

document.querySelector('.js-orders-grid').innerHTML = orderContainerHTML;


