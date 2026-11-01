const src = document.getElementById('src');
const dst = document.getElementById('dst');
const period = document.getElementById('period');
const msg = document.getElementById('msg');

function update() {
  dst.value = Translit.convert(src.value, { armenianPeriod: period.checked });
}
src.addEventListener('input', update);
period.addEventListener('change', update);

document.getElementById('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(dst.value);
    msg.textContent = 'Պատճենվեց';
  } catch (e) {
    dst.select();
    msg.textContent = 'Սեղմիր Ctrl+C';
  }
  setTimeout(() => (msg.textContent = ''), 1500);
});

const map = document.getElementById('map');
const all = Object.assign({}, Translit.DIGRAPHS, Translit.SINGLE, { y: 'յ / ը' });
for (const [k, v] of Object.entries(all)) {
  const s = document.createElement('span');
  const b = document.createElement('b');
  b.textContent = k;
  s.append(b, ' → ' + v);
  map.append(s);
}
