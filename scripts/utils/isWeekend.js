export function isWeekend(checkDate){
  if(checkDate === 'Saturday'){
    return 'Saturday';
  }else if (checkDate === 'Sunday') {
    return 'Sunday';
  }else{
    return 'Working day';
  }
}