import { orders } from "../data/orders.js";
import { getProduct, loadProducts } from "../data/products.js";
import { deliveryFormat } from "./utils/formatDate.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('oid');
const prodId = url.searchParams.get('pid');

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
  orderToTrack.products.forEach((prod)=>{
    if(prod.productId===prodId){
      delivery = prod;
    }
  })


  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
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
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `
  document.querySelector('.order-tracking').innerHTML = trackingHTML;
}
renderTracking();