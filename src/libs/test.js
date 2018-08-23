/* Test Helpers */

const assert = (value, message='Assertion') => {
  
  if(!value) {
    throw `${ message } failed!`;
  }
}

module.exports = {
  assert,
}