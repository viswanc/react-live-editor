/*
# Binary Search
    A simple binary search implementation.

## Improvements

  * Boundaries could be moved to their nearest even numbers, so to avoid long divisions.
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

  let diff = stopValue - startValue;

  while(diff > errorMargin * 2) {
    currentValue = startValue + diff / 2;
    res = comparator(currentValue);
    
    if(res < 0) {
      startValue = currentValue;
    }
    else if(res > 0) {
      stopValue = currentValue;
    }
    else if(res == 0) {
      return currentValue;
    }
    else {
      return;
    }

    diff = stopValue - startValue;
  }

  return currentValue;
};

module.exports = bs;