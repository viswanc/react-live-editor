const assert = require('../../libs/test').assert;
const { peek, log } = require('../../libs/dev');
const bs = require('./binary-search');

assert(bs(0, 16, 0, (cur) =>  cur - 9) == 9, 'Simple search');
assert(bs(1, undefined, 0, (cur) =>  cur - 9) == 9, 'Auto detect stop value, when a non-zero start value is present');
assert(bs(0, 16, 0, (cur) =>  cur - 0) == 0, 'Include start boundary');
assert(bs(0, 16, 0, (cur) =>  cur - 16) == 16, 'Include stop boundary');
assert(bs(0, 16, 0, (cur) =>  cur - 17) === undefined, 'Return undefined when nothing is found');
assert(bs(0, 16, 0, (cur) =>  cur - 17) === undefined, 'Return undefined when nothing is found');
assert(bs(0, 16, 0, (cur) =>  undefined) === undefined, 'Return undefined when comparator returns non-numbers');