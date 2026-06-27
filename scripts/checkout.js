import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";


async function loadPage() {

  try {
    await Promise.all([
      loadProducts(),
      loadCartFetch()
    ])
    
  } catch (error) {
    console.log('Unexpected Error : Please try again');
  }

  renderCheckoutHeader();
  renderPaymentSummary();
  renderOrderSummary();
}
loadPage();
