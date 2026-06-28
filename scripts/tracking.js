import { orders } from "../data/orders.js";
import { getProduct, loadProducts } from "../data/products.js";
import { deliveryFormat } from "./utils/formatDate.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { changeSearchInRef } from "./searchBar.js";

function renderTrackingSkeleton() {
  document.querySelector('.order-tracking').innerHTML = `
    <div class="skeleton skeleton-back-link"></div>
    <div class="skeleton skeleton-delivery-date"></div>
    <div class="skeleton skeleton-product-name"></div>
    <div class="skeleton skeleton-quantity"></div>
    <div class="skeleton skeleton-product-image"></div>
    <div class="progress-labels-container">
      <div class="skeleton skeleton-label"></div>
      <div class="skeleton skeleton-label"></div>
      <div class="skeleton skeleton-label"></div>
    </div>
    <div class="skeleton skeleton-progress"></div>
  `;
}

function renderTrackingNotFound() {
  document.querySelector('.order-tracking').innerHTML = `
    <div class="tracking-empty">
      <img
        class="tracking-empty-image"
        src="images/icons/tracking-not-found.png">
      <h2>Tracking unavailable</h2>
      <p>
        We couldn't find tracking information for this product.
      </p>
      <a href="orders.html">
        <button class="button-primary">
          Back to Orders
        </button>
      </a>
    </div>
  `;
}


const url = new URL(window.location.href);
const orderId = url.searchParams.get('oid');
const prodId = url.searchParams.get('pid');

renderTrackingSkeleton();

await loadProducts();

function renderTracking(){
  const product = getProduct(prodId);
  let delivery;
  let orderToTrack ;

  orders.forEach((order) => {
    if(order.id===orderId){
      orderToTrack = order;
    }
  });
  if (!orderToTrack) {
    renderTrackingNotFound();
    return;
  }
  orderToTrack.products.forEach((prod)=>{
    if(prod.productId===prodId){
      delivery = prod;
    }
  })


  const trackingHTML = `
    <a class="back-to-orders-link button-primary" href="orders.html">
      Back to orders
    </a>

    <div class="delivery-date">
      Arriving on ${deliveryFormat(delivery.estimatedDeliveryTime)}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${delivery.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label" id="preparing">
        Preparing
      </div>
      <div class="progress-label" id="shipped">
        Shipped
      </div>
      <div class="progress-label" id="delivered">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `
  document.querySelector('.order-tracking').innerHTML = trackingHTML;

  let deliveryTime = dayjs(delivery.estimatedDeliveryTime);
  let orderTime = dayjs(orderToTrack.orderTime);
  
  const currentTime = dayjs();
  const numerator = currentTime.diff(orderTime, 'second');
  const denominator = deliveryTime.diff(orderTime, 'second');
  // ((currentTime - orderTime)/(deliveryTime - orderTime))*100
  const percentage = Math.ceil((numerator/denominator)*1000);

  document.querySelector('.progress-bar').style.setProperty('--width',`${percentage}%`);


  let status = 'preparing';
  if (percentage >= 100) {
    status = 'delivered';
  } else if (percentage >= 50) {
    status = 'shipped';
  }
  document.getElementById(`${status}`).classList.add('current-status')


}
renderTracking();

const searchBar = document.querySelector('.search-bar');
const ref = document.getElementById('search-value');

document.querySelector('.search-button').addEventListener('click',()=>{
  const value = searchBar.value;
  changeSearchInRef(value);
})


document.querySelector('.search-bar').addEventListener('keydown', (event)=>{
  if(event.key === 'Enter'){
    const value = searchBar.value;
    changeSearchInRef(value);
  }
})