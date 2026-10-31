// Builds the screens from window.CV and animates them on a paused GSAP timeline.
// render(t) draws exactly time t, so the renderer can capture any frame.
(() => {
const C = window.CV, T = C.timing, SC = T.scenes, END = SC.cta[1];
const root = document.getElementById('root');
const esc = s => String(s);
const AV = `<img src="${C.photo}">`;
const PH = ['p1', 'p2', 'p3'];
const bar = right => `<div class="bar"><span class="who">${AV}${esc(C.name)}</span><span>${right}</span></div>`;
const prog = () => `<div class="prog"><div></div><div></div><div></div></div><div class="plabels">${C.phases.map((p, i) => `<span>0${i + 1} ${p.title.toLowerCase()}</span>`).join('')}</div>`;

let html = `<div class="f" id="hook">${bar(C.role)}
 <div class="prompt"><span class="k">ask</span><span id="ptxt"></span><span class="caret"></span></div>
 <h1>${C.hook.line1}</h1><h1 style="margin-top:22px"><span class="mark">${C.hook.mark}</span><br>${C.hook.rest}</h1>
 <div id="hookbar" style="position:absolute;left:80px;right:80px;bottom:230px">${prog()}</div></div>`;
C.phases.forEach((p, i) => {
  html += `<div class="f" id="${PH[i]}">${bar(`0${i + 1} / 03`)}${prog()}
  <div class="idx">${p.kicker}</div><h2>${p.title}</h2><div class="years">${p.years}</div>
  <div class="rows">${p.rows.map(r => `<div class="row sm"><span class="y">${r.y}</span><span class="t">${r.t}<small>${r.s}</small></span></div>`).join('')}</div>
  ${p.chips ? `<div class="stack"><div class="lab">${p.chips.label}</div><div class="chips">${p.chips.items.map(c => `<span class="chip">${c}</span>`).join('')}</div></div>` : ''}
  ${p.stats ? `<div class="stats">${p.stats.map(s => `<div class="stat"><b data-v="${s.v}">${s.v}</b><span>${s.label}</span></div>`).join('')}</div>` : ''}
  </div>`;
});
const A = C.about;
html += `<div class="f" id="about">${bar('about me')}<div class="idx" style="margin-top:64px">${A.kicker}</div>
 <h2>${A.a}<br><span class="mark">${A.mark}</span></h2>
 ${A.groups.map((g, gi) => `<div class="label" style="margin-top:34px">${g.label}</div>` + (g.projects
   ? `<div class="proj">${g.projects.map(p => `<div>${p.t}<small>${p.s}</small></div>`).join('')}</div>`
   : `<div class="chips">${g.chips.map((c, ci) => `<span class="chip${g.now && ci === g.chips.length - 1 ? ' now' : ''}">${c}</span>`).join('')}</div>`)).join('')}
 </div>`;
html += `<div class="f" id="cta"><div class="bar"><span>${C.url}</span><span>let's talk</span></div>
 <div style="display:flex;gap:44px;align-items:flex-end;margin-top:70px"><img class="photo" src="${C.photo}">
 <div style="padding-bottom:10px"><div style="font:500 24px GM;color:var(--muted)">${C.name}</div><div style="font:600 40px/1.15 G;letter-spacing:-.02em;margin-top:10px">${C.cta.tagline}</div></div></div>
 <h2 style="margin-top:70px;font-size:88px">${C.cta.headline}<br><span class="mark">${C.url}</span></h2>
 <div style="position:absolute;left:80px;bottom:90px;display:flex;align-items:center;gap:28px"><span class="btn">${C.cta.button}</span><span style="font:500 24px GM;color:var(--muted)">${C.linkedin}</span></div></div>`;
root.innerHTML = html;

// captions
const cap = document.getElementById('cap');
const capEls = T.lines.map(l => { const d = document.createElement('div'); d.style.display = 'none'; const ws = l[2].split(' '); const dur = (l[1] - l[0]) * 0.92; d._w = [];
  ws.forEach((w, j) => { const s = document.createElement('span'); if (j === l[3]) s.className = 'k'; s.textContent = w; d.appendChild(s); d.appendChild(document.createTextNode(' ')); d._w.push([s, l[0] + dur * j / ws.length, j === l[3]]) });
  cap.appendChild(d); return d });
function renderCaps(t) { let a = -1; T.lines.forEach((l, i) => { const next = T.lines[i + 1] ? T.lines[i + 1][0] : l[1] + 0.4; if (t >= l[0] - 0.05 && t < next - 0.05) a = i }); if (t >= SC.cta[0]) a = -1;
  cap.style.visibility = a >= 0 ? 'visible' : 'hidden';
  capEls.forEach((d, i) => { d.style.display = i === a ? 'block' : 'none'; if (i === a) d._w.forEach(([s, ws, k]) => { const p = Math.max(0, Math.min(1, (t - ws) / 0.18)); if (!k) { const c = Math.round(110 + 145 * p); s.style.color = `rgb(${c},${c},${c})` } else s.style.opacity = 0.35 + 0.65 * p }) }) }

// timeline
const tl = gsap.timeline({ paused: true });
const Q = s => document.querySelector(s), QA = s => [...document.querySelectorAll(s)];
const rise = (el, t, d = .45) => tl.fromTo(el, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: d, ease: 'power3.out' }, t);
const pop = (el, t) => tl.fromTo(el, { scale: .9, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(1.8)' }, t);
const markOn = (el, t, d = .45) => el && tl.fromTo(el, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', duration: d, ease: 'power2.out' }, t);
Object.entries(SC).forEach(([id, [a, b]]) => { tl.set('#' + id, { display: 'block' }, a); if (id !== 'cta') tl.set('#' + id, { display: 'none' }, b) });
gsap.set(['#hook h1', '#hookbar', '.f .idx', '.f h2', '.f .years', '.row', '.stat', '.stack .chip', '.stack .lab', '#about .chip', '#about .proj div', '#about .label', '#cta .photo', '#cta h2', '#cta .btn', '#cta .bar'].join(','), { opacity: 0 });
const H1 = QA('#hook h1'); const h0 = SC.hook[0], hd = SC.hook[1] - SC.hook[0];
rise(H1[0], h0 + .05); rise(H1[1], h0 + hd * .37); markOn(Q('#hook h1 .mark'), h0 + hd * .45, .5); rise('#hookbar', h0 + hd * .62);
C.phases.forEach((p, i) => { const s = '#' + PH[i], t0 = SC[PH[i]][0];
  rise(s + ' .idx', t0); rise(s + ' h2', t0 + .05); rise(s + ' .years', t0 + .12);
  QA(s + ' .row').forEach((r, k) => rise(r, (p.cues && p.cues[k]) ?? (t0 + .5 + k * .2)));
  if (p.chips) { rise(s + ' .stack .lab', p.chips.at - .1); QA(s + ' .stack .chip').forEach((c, k) => pop(c, p.chips.at + k * .12)) }
  if (p.stats) QA(s + ' .stat').forEach((st, k) => pop(st, p.stats[k].at ?? (t0 + 1 + k * .3)));
});
const a0 = SC.about[0]; rise('#about .idx', a0); rise('#about h2', a0 + .05); markOn(Q('#about h2 .mark'), a0 + 1.2);
const labels = QA('#about .label'); A.groups.forEach((g, gi) => { rise(labels[gi], g.at - .05); });
const grpEls = [...Q('#about').children].filter(e => e.classList.contains('chips') || e.classList.contains('proj'));
grpEls.forEach((el, gi) => { const at = A.groups[gi].at; [...el.children].forEach((c, k) => pop(c, at + k * .1)) });
const c0 = SC.cta[0]; rise('#cta .bar', c0); pop('#cta .photo', c0 + .05); rise('#cta h2', c0 + .5); markOn(Q('#cta h2 .mark'), c0 + 1.4); pop('#cta .btn', c0 + 1.9);
tl.to({}, { duration: .01 }, END);

function renderProg(t) { QA('.f').forEach(f => { f.querySelectorAll('.prog div').forEach((b, i) => { const [a, e] = SC[PH[i]]; const p = Math.max(0, Math.min(1, (t - a) / (e - a)));
  b.style.background = `linear-gradient(90deg,#0A0A0A ${p * 100}%,#E3E3DE ${p * 100}%)` });
  f.querySelectorAll('.plabels span').forEach((l, i) => { const [a, e] = SC[PH[i]]; l.style.color = (t >= a && t < e) ? '#0A0A0A' : '#85857F' }) }) }
// count-up for stats like "12", "€2.1M", "4 days"
const counters = QA('.stat b').map((el, k) => { const m = el.dataset.v.match(/^([^\d]*)([\d.,]+)(.*)$/); const ph = C.phases.find(p => p.stats); const at = ph && ph.stats[k] ? ph.stats[k].at : 0;
  return m ? { el, pre: m[1], num: parseFloat(m[2].replace(',', '')), dec: (m[2].split('.')[1] || '').length, post: m[3], at } : null }).filter(Boolean);
function renderCounts(t) { counters.forEach(c => { const p = Math.max(0, Math.min(1, (t - c.at) / 1)); const e = 1 - Math.pow(1 - p, 3); c.el.textContent = c.pre + (c.num * e).toFixed(c.dec) + c.post }) }
const ptxt = Q('#ptxt');
function renderPrompt(t) { const n = Math.round(Math.min(1, (t - h0) / 1.1) * C.hook.prompt.length); ptxt.textContent = C.hook.prompt.slice(0, Math.max(0, n)); Q('#hook .caret').style.opacity = (Math.floor(t * 2.2) % 2 === 0 || t < 1.2) ? 1 : 0 }

window.DUR = END;
window.render = t => { tl.seek(t, false); renderPrompt(t); renderProg(t); renderCounts(t); renderCaps(t) };
document.fonts.ready.then(() => Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = r; i.onerror = r })))).then(() => { render(0); window.READY = true });
})();
