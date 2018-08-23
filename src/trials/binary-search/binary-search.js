/*
# Binary Search
    A simple binary search implementation.
*/

/* Exports */
const bs = (startValue, stopValue, errorMargin=0, comparator) => {
  let currentValue = startValue;
  let res;

  if(stopValue === undefined) {
    if(startValue) {
      while(comparator(currentValue) < errorMargin) {
        startValue = currentValue;
        currentValue *= 2;
      }
    }

    stopValue = currentValue;
  }

  res = comparator(startValue);

  if(res === 0) {
    return startValue;
  }

  if(res > 0) {
    return;
  }

  res = comparator(stopValue);

  if(res === 0) {
    return stopValue;
  }
  
  if(res < 0) {
    return;
  }

  let t = 0;
  
  while(stopValue - startValue > errorMargin && t < 15) {
    t += 1;
    currentValue = startValue + ((stopValue - startValue) / 2);
    res = comparator(currentValue);
    // console.log({currentValue, res, startValue, stopValue, errorMargin});
    
    if(res < 0) {
      startValue = currentValue;
    }
    else if(res > 0) {
      stopValue = currentValue;
    }
    else if(res === 0) {
      return currentValue;
    }
    else {
      return;
    }
  }
};

module.exports = bs;