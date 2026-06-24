import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/car-class.js';
// import '../data/backend-practice.js';


Promise.all([
  loadProductsFetch()
]).then(()=>{
  renderCheckoutHeader();
  renderPaymentSummary();
  renderOrderSummary();
});

/*
Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{    //wait for the finish
      resolve('value1');          //call resolve
    });
  }),
  new Promise((resolve)=>{   //new promise 
    loadCart(()=>{      //same steps goes on....
      resolve();
    });
  })
  
]).then((value)=>{
  console.log(value)
  renderCheckoutHeader();
  renderPaymentSummary();
  renderOrderSummary();
});
*/

/*
new Promise((resolve)=>{
  loadProducts(()=>{    //wait for the finish
    resolve('hello...');          //call resolve
  });
}).then((value)=>{           //go the next step
  console.log(value);
  return new Promise((resolve)=>{   //new promise 
    loadCart(()=>{      //same steps goes on....
      resolve();
    });
  });
}).then(()=>{
  renderCheckoutHeader();
  renderPaymentSummary();
  renderOrderSummary();
});
*/