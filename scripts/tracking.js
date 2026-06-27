import { orders } from "../data/orders.js";
import { getProduct, loadProducts } from "../data/products.js";
import { deliveryFormat } from "./utils/formatDate.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


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

document.querySelector('.search-button').addEventListener('click',()=>{
  const searchValue = document.querySelector('.search-bar').value;
  console.log(searchValue);
  const ref = document.getElementById('search-value');
  ref.setAttribute('href',`index.html?search=${searchValue}`);
  
});

document.querySelector('.search-bar').addEventListener('keydown', (event)=>{
  if(event.key === 'Enter'){
    const searchValue = document.querySelector('.search-bar').value;
    console.log(searchValue)
    const ref = document.getElementById('search-value');
    ref.setAttribute('href',`index.html?search=${searchValue}`);
    window.location.href = ref;
  }
})