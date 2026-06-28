import { cart } from "../data/cart-class.js";
import { products, loadProducts } from "../data/products.js";

const searchBar = document.querySelector('.search-bar');
const addedMessageTimeouts = {};

export function searchProducts(){
  let searchValue = searchBar.value.trim().toLowerCase();
  const url = new URL(window.location.href);
  if (searchValue) {
    url.searchParams.set("search", searchValue);
  } else {
    url.searchParams.delete("search");
  }
  history.replaceState({}, "", url);

  renderProductGrid(searchValue);
}

document.querySelector('.search-button').addEventListener('click',()=> searchProducts());
searchBar.addEventListener('keydown', (event)=>{
  if(event.key === 'Enter') searchProducts();
});


async function initializePage() {
  await loadProducts();

  const url = new URL(window.location.href);
  const searchInput = url.searchParams.get('search') || '';
  searchBar.value = searchInput;
  renderProductGrid(searchInput);
}

initializePage();


function renderProductGrid(searchValue){
  
  let productContainer =[];
  if (!searchValue) {
    productContainer = products;
  } else {
    products.forEach((product)=>{
      if (searchValue) {
        if ((product.name.trim().toLowerCase().includes(searchValue)) || (product.keywords.some(keyword => keyword.toLowerCase().includes(searchValue)))) {
          productContainer.push(product)
        }
      }    
    })
  }
  
  let productsHTML = '';
  productContainer.forEach((product)=>{
    productsHTML += `
    <div class="product-container">
    <div class="product-image-container">
    <img class="product-image"
    src=${product.image}>
    </div>
    
    <div class="product-name limit-text-to-2-lines">
    ${product.name}
    </div>
    
    <div class="product-rating-container">
    <img class="product-rating-stars"
    src="${product.getImageUrl()}">
    <div class="product-rating-count link-primary">
    ${product.rating.count}
    </div>
    </div>
    
    <div class="product-price">
    ${product.getPrice()}
    </div>
    
    <div class="product-quantity-container">
    <select class = "js-quantity-selector-${product.id}">
    <option selected value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    </select>
    </div>
    
    ${product.extraInfoHTML()}
    
    <div class="product-spacer"></div>
    
    <div class="added-to-cart js-added-${product.id}">
    <img src="images/icons/checkmark.png">
    Added
    </div>
    
    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
    Add to Cart
    </button>
    </div>
    `
  });
  const prodGrid = document.querySelector('.js-products-grid');
  if (!prodGrid) return;
  prodGrid.innerHTML = productsHTML;
  
  function updateCartQuantity(){
    const cartQuantity = cart.calculateCartQuantity();
    if(cartQuantity == 0){
      document.querySelector('.js-cart-quantity').innerHTML = '';
    }else{
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }
  }
  updateCartQuantity();
  
  let intervalId;
  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;
      const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      
      cart.addToCart(productId,selectedQuantity);
      
      updateCartQuantity();
      
      const addedMessage = document.querySelector(`.js-added-${productId}`);

      clearTimeout(addedMessageTimeouts[productId]);

      addedMessage.classList.add("display-added");

      addedMessageTimeouts[productId] = setTimeout(() => {
        addedMessage.classList.remove("display-added");
      }, 2000);
    });
  });
}