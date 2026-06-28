import { cart } from "../../data/cart-class.js";

export function renderCheckoutHeaderSkeleton() {
  document.querySelector('.js-checkout-header').innerHTML = `
    <div class="header-content">
      <div class="checkout-header-left-section">
        <div class="skeleton skeleton-logo"></div>
      </div>

      <div class="checkout-header-middle-section">
        <div class="skeleton skeleton-title"></div>
      </div>

      <div class="checkout-header-right-section">
        <div class="skeleton skeleton-lock"></div>
      </div>
    </div>
  `;
}

export function renderCheckoutHeader(){
  const cartQuantity = cart.calculateCartQuantity();
  let cartQtyMsg;
  if (cartQuantity == 0) {
    cartQtyMsg = `Empty`;
  }else if(cartQuantity == 1){
    cartQtyMsg = `${cartQuantity} item`;
  } else {
    cartQtyMsg = `${cartQuantity} items`;
  }

  let headerHTML = `
  <div class="header-content">
    <div class="checkout-header-left-section">
      <a href="index.html">
        <img class="amazon-logo" src="images/amazon-logo.png">
        <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
      </a>
    </div>

    <div class="checkout-header-middle-section">
      Checkout (<a class="return-to-home-link js-checkout-item-count"
        href="index.html">${cartQtyMsg}</a>)
    </div>

    <div class="checkout-header-right-section">
      <img src="images/icons/checkout-lock-icon.png">
    </div>
  </div>
  `;
  document.querySelector('.js-checkout-header').innerHTML = headerHTML;
}