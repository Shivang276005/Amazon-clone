export function isWeekend(checkDate){
  const day = checkDate.format('dddd');
  if(day === 'Saturday'){
    return true;
  }else if (day === 'Sunday') {
    return true;
  }else{
    return false;
  }
}