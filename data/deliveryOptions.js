import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { isWeekend } from '../scripts/utils/isWeekend.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{  
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if (option.id == deliveryOptionId) {
      deliveryOption = option;
    }
  });
  
  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){
  const today = dayjs();
  // when the date between the addition is weekend -> skip that addition to the delivery date => Implement for selecting the next working day.
  let daysToBeDelivered = deliveryOption.deliveryDays;
  let addDay = 1;
  let deliveryDate;
  while(daysToBeDelivered != 0){
    let checkDate = today.add(addDay, 'days');
    if (isWeekend(checkDate) == false) {
      deliveryDate = checkDate;
    } else {
      daysToBeDelivered++;
    }
    addDay++;
    daysToBeDelivered--;
  }
  // let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D' );
  return dateString;
}