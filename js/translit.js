(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Translit = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  // Երկտառ համադրությունները ստուգվում են առաջինը
  const DIGRAPHS = {
    dz: 'ձ', ts: 'ց', ch: 'չ', sh: 'շ', zh: 'ժ', kh: 'խ', gh: 'ղ', dj: 'ջ',
    ph: 'փ', th: 'թ', rr: 'ռ', vo: 'ո', ee: 'է', oo: 'օ'
  };
  const SINGLE = {
    a: 'ա', b: 'բ', g: 'գ', d: 'դ', e: 'ե', z: 'զ', t: 'տ', i: 'ի', l: 'լ',
    x: 'խ', c: 'ց', k: 'կ', h: 'հ', j: 'ջ', m: 'մ', n: 'ն', o: 'ո', p: 'պ',
    r: 'ր', s: 'ս', v: 'վ', u: 'ու', f: 'ֆ', q: 'ք', w: 'վ', 'ē': 'է', 'ō': 'օ'
  };
  const VOWELS = 'aeiou';
  const isLetter = c => !!c && /[a-zēō]/.test(c);

  function applyCase(src, res) {
    const up = src !== src.toLowerCase();
    return up ? res.charAt(0).toUpperCase() + res.slice(1) : res;
  }

  function convert(text, opts) {
    const o = Object.assign({ armenianPeriod: true }, opts);
    const low = text.toLowerCase();
    let out = '', i = 0;
    while (i < text.length) {
      const ch = low[i];
      if (!isLetter(ch)) { out += text[i++]; continue; }
      const wordStart = !isLetter(low[i - 1]);
      // «ev» առանձին բառը՝ և
      if (wordStart && low.startsWith('ev', i) && !isLetter(low[i + 2])) {
        out += applyCase(text[i], 'և'); i += 2; continue;
      }
      // բառասկզբի «ye» -> ե
      if (wordStart && low.startsWith('ye', i)) {
        out += applyCase(text[i], 'ե'); i += 2; continue;
      }
      if (ch === 'y') {
        // y + ձայնավոր -> յ, այլապես (բառավերջ, բաղաձայնից առաջ) -> ը
        out += applyCase(text[i], (low[i + 1] && VOWELS.includes(low[i + 1])) ? 'յ' : 'ը');
        i++; continue;
      }
      const two = low.substr(i, 2);
      if (DIGRAPHS[two]) { out += applyCase(text[i], DIGRAPHS[two]); i += 2; continue; }
      out += applyCase(text[i], SINGLE[ch] || text[i]);
      i++;
    }
    if (o.armenianPeriod) out = out.replace(/\.(?=\s|$)/g, '։');
    return out;
  }

  return { convert, DIGRAPHS, SINGLE };
});
