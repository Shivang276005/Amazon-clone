import { cart } from "../../data/cart-class.js";

describe('addToCart test Suite: ',()=>{
  it('adds quantity for existing product',()=>{
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.cartItems.length).toEqual(1);
  });
})