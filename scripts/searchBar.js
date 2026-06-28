import { searchProducts } from "./amazon.js";

/*
import { loadProducts, Product, products } from "../data/products.js";

let keyArray = [];
async function loadKeywords() {
  await loadProducts();
  products.forEach((prod)=>{
    prod.keywords.forEach((p)=>{
      if(!keyArray.includes(p)) keyArray.push(p)
    })
  })
  console.log(keyArray)
}
loadKeywords();
*/
const suggestionsData = [
  'socks', 'sports', 'apparel', 'basketballs', 'tshirts', 'mens', 'toaster', 'kitchen', 'appliances', 'plates', 'dining', 'cookware', 'hoodies', 'sweaters', 'bathroom', 'washroom', 'restroom', 'towels', 'bath towels', 'cleaning', 'shoes', 'running shoes', 'footwear', 'robe', 'swimsuit', 'swimming', 'bathing', 'accessories', 'shades', 'sandals', 'womens', 'beach', 'summer', 'bedroom', 'curtains', 'home', 'shorts', 'water boiler', 'kleenex', 'tissues', 'tissues box', 'napkins', 'hats', 'straw hats', 'jewelry', 'hooded', 'bathmat', 'flats', 'shirts', 'garbage', 'bins', 'cans', 'bed sheets', 'sheets', 'covers', 'winter hats', 'beanies', 'tuques', 'pants', 'sunglasses', 'glasses', 'cooking set', 'mirrors', 'sweatpants', 'jogging', 'boxes', 'food containers', 'coffeemakers', 'food blenders', 'mixing bowls', 'baking', 'kitchen towels'
];

const searchBar = document.querySelector(".search-bar");
const suggestions = document.querySelector(".suggestions");

let selectedIndex = -1;
let filteredResults = [];

function renderSuggestions(list){
  suggestions.innerHTML = "";
  if(list.length === 0){
    suggestions.classList.remove("show");
    return;
  }
  list.forEach((item,index)=>{
    const div = document.createElement("div");
    div.className = "suggestion";
    div.innerHTML = `
      <span class="icon">🕘</span>
      <span class="searchText">${item}</span>
    `;
    div.addEventListener("click",()=>{
      searchBar.value = item;
      searchProducts();
      suggestions.classList.remove("show");
    });
    suggestions.appendChild(div);
  });
  suggestions.classList.add("show");
}

searchBar.addEventListener("input",()=>{
  const value = searchBar.value.trim().toLowerCase();
  selectedIndex = -1;
  if(value===""){
    suggestions.classList.remove("show");
    return;
  }
  filteredResults = suggestionsData.filter(item=>
    item.toLowerCase().includes(value)
  );
  renderSuggestions(filteredResults);
});

searchBar.addEventListener("keydown",(event)=>{
  const items = document.querySelectorAll(".suggestion");
  if(!items.length) return;
  if(event.key==="ArrowDown"){
    event.preventDefault();
    selectedIndex++;
    if(selectedIndex>=items.length){
      selectedIndex=0;
    }
    updateSelection(items);
  }else if(event.key==="ArrowUp"){
    event.preventDefault();
    selectedIndex--;
    if(selectedIndex<0){
      selectedIndex=items.length-1;
    }
    updateSelection(items);
  }else if(event.key==="Enter"){
    if(selectedIndex>=0){
      event.preventDefault();
      searchBar.value = filteredResults[selectedIndex];
      searchProducts();
      suggestions.classList.remove("show");
    }
  }else if(event.key==="Escape"){
      suggestions.classList.remove("show");
  }
});

function updateSelection(items){
  items.forEach(item=>item.classList.remove("active"));
  items[selectedIndex].classList.add("active");
  items[selectedIndex].scrollIntoView({
    block:"nearest"
  });
}

document.addEventListener("click",(event)=>{
  if(!event.target.closest(".search-container")){
    suggestions.classList.remove("show");
  }
});

searchBar.addEventListener("focus",()=>{
  if(filteredResults.length){
    suggestions.classList.add("show");
  }
});
