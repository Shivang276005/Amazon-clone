import { orders } from "../data/orders.js";
import { dateFormat } from "./utils/formatDate.js";
import { formatCurrency } from './utils/money.js';
import { loadProducts, getProduct } from "../data/products.js"; 

let totalOrders = 0;

async function renderOrders(){
  await loadProducts();

  let orderContainerHTML = '';
  
  orders.forEach((order)=>{
    
    orderContainerHTML += `
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
        ${renderOrderProducts(order.products)}
      </div>
      
    `

    totalOrders++;
    
  });
  
  document.querySelector('.js-orders-grid').innerHTML = orderContainerHTML;
  
  console.log(totalOrders)
}

renderOrders();


function renderOrderProducts(products){
  let productHTML = '';

  products.forEach((product)=>{
    
    const matchingProduct = getProduct(product.productId);

    productHTML += `   
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${dateFormat(product.estimatedDeliveryTime)}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
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
    `
  });

  return productHTML;
  
}