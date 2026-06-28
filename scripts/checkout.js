import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
import { renderCheckoutHeaderSkeleton } from "./checkout/checkoutHeader.js";
import { renderOrderSummarySkeleton } from "./checkout/orderSummary.js";
import { renderPaymentSummarySkeleton } from "./checkout/paymentSummary.js";




async function loadPage() {

  renderCheckoutHeaderSkeleton();
  renderOrderSummarySkeleton();
  renderPaymentSummarySkeleton();

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
