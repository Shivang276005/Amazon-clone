import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId){
  return products.find((product) => product.id === productId);
}

export class Product{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getImageUrl(){
    return `images/ratings/rating-${this.rating.stars*10}.png`;
  }
  getPrice(){
    return `$${formatCurrency(this.priceCents)}`
  }

  extraInfoHTML(){
    return '';
  }
}

class Clothing extends Product{
  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `
    <a href="${this.sizeChartLink}" target="_blank" class="extraInfoLink">Size Chart</a>
    `
  }
}

class Appliance extends Product{
  instructionLink;
  warrantyLink;
  constructor(productDetails){
    super(productDetails);
    this.instructionLink = productDetails.instructionLink;
    this.warrantyLink = productDetails.warrantyLink;
  }
  extraInfoHTML(){
    return `
    <a href="${this.instructionLink}" target="_blank" class="extraInfoLink">Instruction Link</a>
    <a href="${this.warrantyLink}" target="_blank" class="extraInfoLink">Warranty Link</a>
    `
  }
}

export let products = [];

export async function loadProducts() {
  try {
    const response = await fetch("https://supersimplebackend.dev/products");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    products = data.map((productDetails) => {
      switch (productDetails.type) {
        case "clothing":
          return new Clothing(productDetails);

        case "appliance":
          return new Appliance(productDetails);

        default:
          return new Product(productDetails);
      }
    });
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}