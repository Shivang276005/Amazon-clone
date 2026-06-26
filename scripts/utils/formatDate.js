import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export function dateFormat(date){
  return dayjs(date).format('MMMM D');
}

export function deliveryFormat(date){
  return dayjs(date).format('dddd, MMMM D')
}