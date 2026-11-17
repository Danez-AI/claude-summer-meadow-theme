// Original painterly countryside: drifting cumulus, rolling hills, swaying grass.
// A night meadow with moon, stars, fireflies and falling cherry petals, in both app modes.
// shortcut: night only, because a colour-scheme @media rule freezes the animation on Desktop 5.11492.5
// and Backdrop props carry no mode; add a day scene once either changes.

const cloud = (id: string) => `
  <g id="${id}">
    <ellipse cx="0" cy="0" rx="120" ry="46"/>
    <ellipse cx="-70" cy="10" rx="80" ry="36"/>
    <ellipse cx="80" cy="12" rx="90" ry="34"/>
    <ellipse cx="-10" cy="-38" rx="70" ry="48"/>
    <ellipse cx="55" cy="-22" rx="55" ry="38"/>
  </g>`

// Deterministic pseudo-random so the scene is stable across reloads.
let seed = 7
const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)

const stars = Array.from({ length: 70 }, () => {
  const x = Math.round(rnd() * 1600)
  const y = Math.round(rnd() * 430)
  const r = (0.8 + rnd() * 1.6).toFixed(1)
  const d = (2 + rnd() * 4).toFixed(1)
  return `<circle class="star" cx="${x}" cy="${y}" r="${r}" style="animation-delay:-${d}s;animation-duration:${d}s"/>`
}).join('')

const blades = Array.from({ length: 90 }, (_, i) => {
  const x = Math.round(i * 18 + rnd() * 12)
  const hgt = Math.round(40 + rnd() * 60)
  const lean = Math.round(rnd() * 16 - 8)
  const d = (3 + rnd() * 3).toFixed(1)
  return `<path class="blade" d="M${x} 1000 Q${x + lean} ${1000 - hgt / 2} ${x + lean * 2} ${1000 - hgt}" style="transform-origin:${x}px 1000px;animation-delay:-${d}s;animation-duration:${d}s"/>`
}).join('')

const seeds = Array.from({ length: 14 }, () => {
  const x = Math.round(rnd() * 1600)
  const y = Math.round(600 + rnd() * 300)
  const d = (14 + rnd() * 16).toFixed(1)
  return `<circle class="seed" cx="${x}" cy="${y}" r="2.6" style="animation-delay:-${d}s;animation-duration:${d}s"/>`
}).join('')

const flies = Array.from({ length: 26 }, () => {
  const x = Math.round(rnd() * 1600)
  const y = Math.round(640 + rnd() * 320)
  const d = (4 + rnd() * 5).toFixed(1)
  return `<circle class="fly" cx="${x}" cy="${y}" r="3.2" style="animation-delay:-${d}s;animation-duration:${d}s"/>`
}).join('')

// Cherry blossom petals: outer <g> places each one above the top edge, the inner one falls and sways, the path tumbles.
const petals = Array.from({ length: 34 }, () => {
  const x = Math.round(rnd() * 1900 - 300)
  const s = (0.7 + rnd() * 0.8).toFixed(2)
  const d = (11 + rnd() * 12).toFixed(1)
  const spin = (2.5 + rnd() * 3).toFixed(1)
  const sway = rnd() < 0.5 ? 'fallA' : 'fallB'
  return `<g transform="translate(${x} -40) scale(${s})"><g class="petal" style="animation-name:${sway};animation-delay:-${d}s;animation-duration:${d}s"><path class="pp" d="M0 0 C7 -9 17 -7 15 2 C13 9 5 12 0 9 L-2 4Z" style="animation-duration:${spin}s"/></g></g>`
}).join('')

export const SCENE =`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 1000" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs>
  <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4f9be0"/><stop offset="0.55" stop-color="#9fd0f2"/><stop offset="1" stop-color="#e9f5f2"/>
  </linearGradient>
  <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0c1430"/><stop offset="0.6" stop-color="#233a63"/><stop offset="1" stop-color="#4b5e7d"/>
  </linearGradient>
  <radialGradient id="sunGlow"><stop offset="0" stop-color="#fffbe6"/><stop offset="0.35" stop-color="#fff1b8" stop-opacity="0.9"/><stop offset="1" stop-color="#fff1b8" stop-opacity="0"/></radialGradient>
  <radialGradient id="moonGlow"><stop offset="0" stop-color="#f4f1dc"/><stop offset="0.3" stop-color="#e8e4c8" stop-opacity="0.8"/><stop offset="1" stop-color="#e8e4c8" stop-opacity="0"/></radialGradient>
  ${cloud('c1')}
</defs>
<style>
  .day{opacity:1}.night{opacity:0}
  .sky{fill:url(#skyDay)}
  .cl{fill:#ffffff;opacity:.92}
  .cl-shade{fill:#cfe2f3;opacity:.7}
  .h1{fill:#9cc98a}.h2{fill:#6fae63}.h3{fill:#4f9150}.h4{fill:#3b7a3f}
  .blade{fill:none;stroke:#2f6b34;stroke-width:3;stroke-linecap:round;animation:sway ease-in-out infinite alternate}
  .seed{fill:#ffffff;opacity:.85;animation:drift linear infinite}
  .tree{fill:#2f6a3a}.trunk{fill:#5b4330}
  .drift-a{animation:cloudA 140s linear infinite}
  .drift-b{animation:cloudB 190s linear infinite}
  .drift-c{animation:cloudA 240s linear infinite}
  @keyframes cloudA{from{transform:translateX(-400px)}to{transform:translateX(2000px)}}
  @keyframes cloudB{from{transform:translateX(2000px)}to{transform:translateX(-400px)}}
  @keyframes sway{from{transform:rotate(-4deg)}to{transform:rotate(5deg)}}
  @keyframes drift{0%{transform:translate(0,0);opacity:0}10%{opacity:.85}100%{transform:translate(420px,-380px);opacity:0}}
  .petal{animation-timing-function:linear;animation-iteration-count:infinite}
  .pp{fill:#f7b8cc;opacity:.9;transform-box:fill-box;transform-origin:center;animation:tumble ease-in-out infinite alternate}
  @keyframes fallA{0%{transform:translate(0,0)}25%{transform:translate(90px,300px)}50%{transform:translate(20px,600px)}75%{transform:translate(130px,900px)}100%{transform:translate(70px,1150px)}}
  @keyframes fallB{0%{transform:translate(0,0)}25%{transform:translate(-60px,300px)}50%{transform:translate(50px,600px)}75%{transform:translate(-30px,900px)}100%{transform:translate(40px,1150px)}}
  @keyframes tumble{from{transform:rotate(-40deg) scaleX(1)}to{transform:rotate(80deg) scaleX(.35)}}
  @keyframes twinkle{0%,100%{opacity:.25}50%{opacity:1}}
  @keyframes glow{0%,100%{opacity:0;transform:translate(0,0)}50%{opacity:1;transform:translate(14px,-18px)}}
  /* Night, always: no colour-scheme media query here (see the note at the top of scene.ts). */
  .day{opacity:0}.night{opacity:1}
  .sky{fill:url(#skyNight)}
  .cl{fill:#6b80a8;opacity:.85}
  .cl-shade{fill:#4a5d84;opacity:.8}
  .h1{fill:#2c3f4f}.h2{fill:#22353f}.h3{fill:#1a2b31}.h4{fill:#132226}
  .blade{stroke:#1d3a2c}
  .seed{display:none}
  .tree{fill:#16291f}.trunk{fill:#1f1914}
  .star{fill:#fdfbe8;animation:twinkle ease-in-out infinite}
  .fly{fill:#e9ff8a;animation:glow ease-in-out infinite}
  .pp{fill:#d9a7c0;opacity:.55}
  @media (prefers-reduced-motion: reduce){*{animation:none!important}}
</style>
<rect class="sky" width="1600" height="1000"/>
<g class="day"><circle cx="1360" cy="150" r="210" fill="url(#sunGlow)"/><circle cx="1360" cy="150" r="56" fill="#fff9df"/></g>
<g class="night"><circle cx="1340" cy="150" r="170" fill="url(#moonGlow)"/><circle cx="1340" cy="150" r="44" fill="#f6f2d8"/><circle cx="1324" cy="140" r="7" fill="#e3ddbd"/><circle cx="1352" cy="166" r="5" fill="#e3ddbd"/></g>
<g>${stars}</g>
<g class="drift-a"><use xlink:href="#c1" href="#c1" class="cl" transform="translate(200 210) scale(1.3)"/><use href="#c1" xlink:href="#c1" class="cl-shade" transform="translate(212 236) scale(1.15 .5)"/></g>
<g class="drift-b"><use href="#c1" xlink:href="#c1" class="cl" transform="translate(900 120) scale(.9)"/></g>
<g class="drift-c"><use href="#c1" xlink:href="#c1" class="cl" transform="translate(-200 330) scale(1.7)"/><use href="#c1" xlink:href="#c1" class="cl-shade" transform="translate(-185 365) scale(1.5 .55)"/></g>
<path class="h1" d="M0 640 C220 560 420 590 640 620 C860 650 1080 560 1300 580 C1450 594 1540 620 1600 610 L1600 1000 L0 1000Z"/>
<path class="h2" d="M0 720 C260 660 520 700 760 730 C1000 760 1240 690 1600 700 L1600 1000 L0 1000Z"/>
<g><rect class="trunk" x="1408" y="640" width="14" height="70"/><circle class="tree" cx="1415" cy="625" r="48"/><circle class="tree" cx="1385" cy="648" r="32"/><circle class="tree" cx="1448" cy="646" r="34"/></g>
<path class="h3" d="M0 820 C300 770 640 800 940 830 C1220 858 1420 800 1600 800 L1600 1000 L0 1000Z"/>
<path class="h4" d="M0 910 C380 870 820 900 1600 880 L1600 1000 L0 1000Z"/>
<g>${blades}</g>
<g>${seeds}</g>
<g>${flies}</g>
<g>${petals}</g>
</svg>`
