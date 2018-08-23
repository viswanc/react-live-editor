const assert = require('../../libs/test').assert;
const { getRandomInt } = require('../../libs/utils');
const bs = require('./binary-search');

assert(bs(0, 16, 0, (cur) =>  cur - 9) == 9, 'Simple search');
assert(bs(1, undefined, 0, (cur) =>  cur - 9) == 9, 'Auto detect stop value, when a non-zero start value is present');
assert(bs(0, 16, 0, (cur) =>  cur - 0) == 0, 'Include start boundary');
assert(bs(0, 16, 0, (cur) =>  cur - 16) == 16, 'Include stop boundary');
assert(bs(0, 0, 0, (cur) =>  cur - 0) === 0, 'Support same boundaries');
assert(bs(0, 16, 0, (cur) =>  cur - 17) === undefined, 'Return undefined when nothing is found');
assert(bs(0, 16, 0, (cur) =>  undefined) === undefined, 'Return undefined when comparator returns non-numbers');
assert(bs(0, 16, 1, (cur) =>  cur - 17) === 16, 'Respect error margins');
assert(bs(0, 16, 1, (cur) =>  cur - 9) === 10, 'Treat error margins in-par with accurate results');
assert(bs(0, 16, 0, (cur) =>  cur - 9.5) === 9.5, 'Allow for decimals');
assert(bs(-16, 0, 0, (cur) =>  cur - -9) === -9, 'Support negative numbers');
assert(bs(16, 0, 0, (cur) =>  cur - 9) === 9, 'Support reversed ranges');

// Randomized testing.
const getRnd = () => getRandomInt(0, 10);

for(let i = 0; i < getRandomInt(100, 200); ++i) {
  let start = getRnd();
  let stop = start + getRnd();
  let decimalConverter = getRandomInt(1, 2);
  let valueToFind = start + getRnd() / decimalConverter;
  
  assert(bs(start, stop, 0, (val) => val - valueToFind)
    === ((valueToFind <= stop && valueToFind >= start)
    ? valueToFind : undefined),
    JSON.stringify({start, stop, valueToFind})
  );
}
