import { money } from "../scripts/utils/money.js";

console.log('Test Suite : formatCurrency');
console.log('Convert cents to dollar');

if (money(2095) === '20.95') {
  console.log('passed');
}else{
  console.log('failed');
}