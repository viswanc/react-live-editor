/*
# Binary Search
    A simple binary search implementation.
*/

/* Exports */
const bs = (startValue, stopValue, errorMargin=0, comparator) => {
  let currentValue, res;

  if(stopValue === undefined) {
    if(startValue) {
      currentValue = startValue;
      
      while(comparator(currentValue) < errorMargin) {
        startValue = currentValue;
        currentValue *= 2;
      }
      
      stopValue = currentValue;
    }
    else {
      throw 'A non-zero start value is neded to auto-detect stop margins.'
    }
  }

  res = comparator(startValue);
  
  if(res <= errorMargin && res >= -errorMargin) {
    return startValue;
  }

  if(res > 0) {
    return;
  }

  res = comparator(stopValue);
  
  if(res <= errorMargin && res >= -errorMargin) {
    return stopValue;
  }
  
  if(res < 0) {
    return;
  }

  while(stopValue - startValue > errorMargin) {
    currentValue = startValue + ((stopValue - startValue) / 2);
    res = comparator(currentValue);
    
    if(res <= errorMargin && res >= -errorMargin) {
      return currentValue;
    }
    else if(res < 0) {
      startValue = currentValue;
    }
    else if(res > 0) {
      stopValue = currentValue;
    }
    else {
      return;
    }
  }
};

module.exports = bs;