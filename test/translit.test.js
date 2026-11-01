const assert = require('assert');
const { convert } = require('../js/translit');

const cases = [
  ['hayeren', 'հայերեն'],
  ['voch', 'ոչ'],
  ['kody', 'կոդը'],
  ['proekty', 'պրոեկտը'],
  ['indz', 'ինձ'],
  ['git', 'գիտ'],
  ['hetaqrqir', 'հետաքրքիր'],
  ['Barev', 'Բարեվ'],
  ['ev', 'և'],
  ['yerevan', 'երեվան'],
  ['Barev dzez.', 'Բարեվ ձեզ։'],
];
let fail = 0;
for (const [src, want] of cases) {
  const got = convert(src);
  if (got !== want) { fail++; console.log(`FAIL ${src}: ${got} (expected ${want})`); }
}
assert.strictEqual(convert('a.b', {}), 'ա.բ'); // կետը միայն նախադասության վերջում
assert.strictEqual(convert('ok.', { armenianPeriod: false }), 'ոկ.');
if (fail) process.exit(1);
console.log(`OK, ${cases.length + 2} tests passed`);
