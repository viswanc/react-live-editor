import { Exception } from "handlebars";

/* Test Helpers */

const assert = (value) => {
  
  if(!value) {
    throw 'Assertion failed!';
  }
}

export {
  assert,
}