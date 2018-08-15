/* Test Helpers */

const assert = (value) => {
  
  if(!value) {
    throw 'Assertion failed!';
  }
}

module.exports = {
  assert,
}