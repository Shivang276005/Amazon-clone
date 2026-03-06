export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }]
}
function renderCartItems(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

// helper to compute total number of items in the cart
export function getCartQuantity() {
  let quantity = 0;
  cart.forEach((ci) => {
    quantity += ci.quantity;
  });
  return quantity;
}

export function addToCart(productId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  const quantitySelected = document.getElementById(`js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelected.value); 
  if (matchingItem) {
    matchingItem.quantity+=quantity;
  }else{
    cart.push({ //{ variableName: variableName }
        productId,
        quantity
      }
  )}
  renderCartItems();
}
export function removeCartItem(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  renderCartItems();
}