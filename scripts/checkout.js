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

/*
Promise.all([
  loadProductsFetch()
]).then(()=>{
  renderCheckoutHeader();
  renderPaymentSummary();
  renderOrderSummary();
});
*/
/*
Promise.all([
  new Promise((resolve,reject)=>{
    loadProducts(()=>{    //wait for the finish
      reject('Error');
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