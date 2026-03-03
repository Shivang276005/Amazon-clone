export const cart = [];
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
}