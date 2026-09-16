/**
 * Original card artwork generator.
 *
 * Every image on the site is drawn here as an SVG: geometric girih rosettes,
 * gold-foil gradients and calligraphic flourishes. Nothing is fetched from a
 * stock library, so there are no broken-image states, no licensing questions
 * and each file stays a few kilobytes.
 */

/* Deterministic PRNG so a given card id always renders the same artwork. */
export function rng(seed) {
  let h = 2166136261 >>> 0;
  const s = String(seed);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return () => {
    h ^= h << 13; h >>>= 0;
    h ^= h >> 17;
    h ^= h << 5;  h >>>= 0;
    return h / 4294967296;
  };
}

export const PALETTES = {
  ivoryEmerald: { bg: '#FBF8F4', bg2: '#F1EAE0', ink: '#0E4C41', accent: '#0E4C41', soft: '#D9E6E1', foil: 'gold' },
  creamRose:    { bg: '#FBF3F1', bg2: '#F4E2E0', ink: '#9E5C67', accent: '#B9767F', soft: '#F6E2E4', foil: 'gold' },
  emeraldGold:  { bg: '#0E4C41', bg2: '#093329', ink: '#EFDFB8', accent: '#D8B45F', soft: '#17604F', foil: 'gold' },
  navyGold:     { bg: '#17304F', bg2: '#0E2038', ink: '#EFDFB8', accent: '#D8B45F', soft: '#22436B', foil: 'gold' },
  roseDeep:     { bg: '#8C4B55', bg2: '#6B3540', ink: '#F7E7E4', accent: '#EFC9C2', soft: '#A25E68', foil: 'gold' },
  sandGold:     { bg: '#F4EBE0', bg2: '#E6D7C3', ink: '#7A5C22', accent: '#B08D3F', soft: '#EFDFB8', foil: 'gold' },
  mintIvory:    { bg: '#EAF2EE', bg2: '#D8E7E0', ink: '#14544A', accent: '#2C7A68', soft: '#FBF8F4', foil: 'gold' },
  plumBlush:    { bg: '#F6EEF4', bg2: '#EBDDE8', ink: '#6E3B5C', accent: '#9C5C86', soft: '#F9E6F1', foil: 'gold' }
};

const FOIL_STOPS = [
  ['0%', '#9C7A2E'], ['20%', '#D8B45F'], ['38%', '#F5E7BC'],
  ['55%', '#C9A34C'], ['74%', '#E8D08A'], ['100%', '#A8842F']
];

function defs(id, p) {
  return `<defs>
  <linearGradient id="foil-${id}" x1="0" y1="0" x2="1" y2="1">
    ${FOIL_STOPS.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}
  </linearGradient>
  <linearGradient id="bg-${id}" x1="0" y1="0" x2="0.3" y2="1">
    <stop offset="0%" stop-color="${p.bg}"/><stop offset="100%" stop-color="${p.bg2}"/>
  </linearGradient>
  <radialGradient id="glow-${id}" cx="50%" cy="42%" r="58%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
  </radialGradient>
</defs>`;
}

/* ---------------------------------------------------------------- geometry */

function polygon(cx, cy, r, n, rot = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = rot + (i * 2 * Math.PI) / n;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}

function star(cx, cy, rOuter, rInner, points, rot = 0) {
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = rot + (i * Math.PI) / points;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}

/** Eight-point girih rosette: the signature motif of the studio. */
function rosette(cx, cy, r, id, stroke, width = 2) {
  const s = `stroke="${stroke}" stroke-width="${width}" fill="none" stroke-linejoin="round"`;
  return `<g ${s}>
    <path d="${star(cx, cy, r, r * 0.56, 8, -Math.PI / 2)}"/>
    <path d="${star(cx, cy, r * 0.74, r * 0.42, 8, -Math.PI / 2 + Math.PI / 8)}"/>
    <path d="${polygon(cx, cy, r * 0.42, 8, Math.PI / 8)}"/>
    <circle cx="${cx}" cy="${cy}" r="${(r * 0.2).toFixed(2)}"/>
  </g>`;
}

/** A tapered stroke that evokes a calligraphic pen line without spelling words. */
function flourish(cx, cy, w, stroke, opacity = 1) {
  const h = w * 0.3;
  return `<g fill="none" stroke="${stroke}" stroke-linecap="round" opacity="${opacity}">
    <path d="M${cx - w / 2} ${cy} C${cx - w * 0.3} ${cy - h}, ${cx - w * 0.06} ${cy + h * 0.7}, ${cx} ${cy}
             S${cx + w * 0.3} ${cy - h}, ${cx + w / 2} ${cy}" stroke-width="3"/>
    <path d="M${cx - w * 0.34} ${cy + h * 0.42} C${cx - w * 0.1} ${cy + h * 0.8}, ${cx + w * 0.1} ${cy + h * 0.8}, ${cx + w * 0.34} ${cy + h * 0.42}" stroke-width="1.6" opacity="0.7"/>
    <circle cx="${cx - w / 2 - 9}" cy="${cy}" r="2.6" fill="${stroke}" stroke="none"/>
    <circle cx="${cx + w / 2 + 9}" cy="${cy}" r="2.6" fill="${stroke}" stroke="none"/>
  </g>`;
}

function frame(w, h, id, p, inset = 26) {
  const foil = `url(#foil-${id})`;
  const corner = (x, y, sx, sy) => `<g transform="translate(${x} ${y}) scale(${sx} ${sy})" fill="none" stroke="${foil}" stroke-width="1.8">
      <path d="M0 26 L0 8 Q0 0 8 0 L26 0"/>
      <path d="M8 30 L8 14 Q8 8 14 8 L30 8" opacity="0.6"/>
      <path d="${polygon(20, 20, 7, 8, Math.PI / 8)}" opacity="0.85"/>
    </g>`;
  return `<g>
    <rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}" rx="6"
          fill="none" stroke="${foil}" stroke-width="1.6"/>
    <rect x="${inset + 7}" y="${inset + 7}" width="${w - (inset + 7) * 2}" height="${h - (inset + 7) * 2}" rx="3"
          fill="none" stroke="${foil}" stroke-width="0.7" opacity="0.65"/>
    ${corner(inset - 4, inset - 4, 1, 1)}
    ${corner(w - inset + 4, inset - 4, -1, 1)}
    ${corner(inset - 4, h - inset + 4, 1, -1)}
    ${corner(w - inset + 4, h - inset + 4, -1, -1)}
  </g>`;
}

function patternField(w, h, id, color, opacity) {
  return `<g opacity="${opacity}" clip-path="url(#clip-${id})">
    <rect width="${w}" height="${h}" fill="url(#girih-${id})"/>
  </g>`;
}

function girihPatternDef(id, color) {
  return `<pattern id="girih-${id}" width="88" height="88" patternUnits="userSpaceOnUse">
    <g fill="none" stroke="${color}" stroke-width="1.1">
      <path d="${star(44, 44, 34, 19, 8, -Math.PI / 2)}"/>
      <path d="${polygon(44, 44, 15, 8, Math.PI / 8)}"/>
      <path d="M0 0 8 8M88 0 80 8M0 88 8 80M88 88 80 80"/>
    </g>
  </pattern>`;
}

/* ------------------------------------------------------------------ motifs */

const MOTIFS = {
  /* Weddings — interlaced rings inside a rosette halo */
  rings(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.44, foil = `url(#foil-${id})`;
    return `${rosette(cx, cy, 128, id, foil, 1.1)}
      <g fill="none" stroke="${foil}" stroke-width="3.4">
        <circle cx="${cx - 26}" cy="${cy}" r="42"/>
        <circle cx="${cx + 26}" cy="${cy}" r="42"/>
      </g>
      <g fill="none" stroke="${p.ink}" stroke-width="1" opacity="0.5">
        <circle cx="${cx - 26}" cy="${cy}" r="48"/>
        <circle cx="${cx + 26}" cy="${cy}" r="48"/>
      </g>
      ${flourish(cx, h * 0.72, 190, foil)}
      ${flourish(cx, h * 0.8, 120, p.ink, 0.45)}`;
  },

  /* Eid — crescent, hanging lanterns, star field */
  eid(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.4, foil = `url(#foil-${id})`;
    const lantern = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${foil}" stroke-width="2">
        <path d="M0 -70 V-44"/>
        <path d="M-16 -44 H16"/>
        <path d="M-20 -36 Q0 -46 20 -36 L24 16 Q0 32 -24 16Z"/>
        <path d="M-13 -22 H13M-15 2 H15"/>
        <path d="M-9 -34 V14M9 -34 V14" opacity="0.55"/>
        <path d="M-12 22 H12M-7 30 H7"/>
      </g>`;
    let stars = '';
    for (let i = 0; i < 9; i++) {
      const x = 70 + r() * (w - 140), y = 80 + r() * (h * 0.62);
      const s = 4 + r() * 5;
      stars += `<path d="${star(x, y, s, s * 0.4, 4, -Math.PI / 2)}" fill="${foil}" opacity="${(0.4 + r() * 0.5).toFixed(2)}"/>`;
    }
    return `${stars}
      <g fill="none" stroke="${foil}" stroke-width="3.4">
        <path d="M${cx + 54} ${cy - 62} A78 78 0 1 0 ${cx + 54} ${cy + 62} A60 60 0 1 1 ${cx + 54} ${cy - 62}Z" fill="${foil}" stroke="none"/>
      </g>
      ${lantern(cx - 150, cy + 10, 0.85)}
      ${lantern(cx + 150, cy - 18, 0.72)}
      ${flourish(cx, h * 0.78, 200, foil)}`;
  },

  /* Birthday — confetti burst over a rosette */
  confetti(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.44, foil = `url(#foil-${id})`;
    let bits = '';
    for (let i = 0; i < 26; i++) {
      const a = r() * Math.PI * 2;
      const dist = 150 + r() * 130;
      const x = cx + Math.cos(a) * dist * 0.62;
      const y = cy + Math.sin(a) * dist * 0.72;
      if (x < 54 || x > w - 54 || y < 60 || y > h - 70) continue;
      const kind = Math.floor(r() * 3);
      const col = i % 3 === 0 ? foil : (i % 3 === 1 ? p.ink : p.accent);
      const op = (0.45 + r() * 0.5).toFixed(2);
      if (kind === 0) bits += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3 + r() * 3).toFixed(1)}" fill="${col}" opacity="${op}"/>`;
      else if (kind === 1) bits += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="5" height="12" rx="2" fill="${col}" opacity="${op}" transform="rotate(${(r() * 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      else bits += `<path d="${star(x, y, 8, 3.4, 5, -Math.PI / 2)}" fill="${col}" opacity="${op}"/>`;
    }
    return `${bits}
      ${rosette(cx, cy, 112, id, foil, 2)}
      <path d="${star(cx, cy, 44, 18, 8, -Math.PI / 2)}" fill="${foil}"/>
      ${flourish(cx, h * 0.76, 180, foil)}`;
  },

  /* Graduation — laurel wreath cradling a cap silhouette */
  laurel(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.44, foil = `url(#foil-${id})`;
    const branch = (dir) => {
      let out = '';
      for (let i = 0; i < 9; i++) {
        const t = i / 9;
        const a = (-Math.PI / 2 + dir * (0.45 + t * 2.1));
        const rr = 118 + Math.sin(t * Math.PI) * 8;
        const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
        out += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="15" ry="6.5" fill="${foil}" opacity="0.9"
                 transform="rotate(${((a * 180) / Math.PI + 90 + dir * 18).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      }
      return out;
    };
    return `${branch(1)}${branch(-1)}
      <g fill="none" stroke="${p.ink}" stroke-width="1" opacity="0.4"><circle cx="${cx}" cy="${cy}" r="138"/></g>
      <g transform="translate(${cx} ${cy})">
        <path d="M-72 -14 L0 -48 L72 -14 L0 20Z" fill="${foil}"/>
        <path d="M-44 0 L-44 44 Q0 68 44 44 L44 0" fill="none" stroke="${foil}" stroke-width="3.4"/>
        <path d="M72 -14 L72 46" stroke="${foil}" stroke-width="2.4" fill="none"/>
        <circle cx="72" cy="52" r="7" fill="${foil}"/>
      </g>
      ${flourish(cx, h * 0.76, 170, foil)}`;
  },

  /* Corporate — precise interlocking grid, restrained and architectural */
  grid(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.44, foil = `url(#foil-${id})`;
    let cells = '';
    for (let gx = -1; gx <= 1; gx++) {
      for (let gy = -1; gy <= 1; gy++) {
        const x = cx + gx * 84, y = cy + gy * 84;
        const rr = gx === 0 && gy === 0 ? 46 : 32;
        cells += `<path d="${polygon(x, y, rr, 8, Math.PI / 8)}" fill="none" stroke="${gx === 0 && gy === 0 ? foil : p.ink}" stroke-width="${gx === 0 && gy === 0 ? 2.6 : 1.1}" opacity="${gx === 0 && gy === 0 ? 1 : 0.55}"/>`;
      }
    }
    return `${cells}
      <path d="${star(cx, cy, 30, 13, 8, -Math.PI / 2)}" fill="${foil}"/>
      <g fill="none" stroke="${foil}" stroke-width="1.2" opacity="0.8">
        <path d="M${cx - 150} ${h * 0.68} H${cx + 150}"/>
        <path d="${polygon(cx, h * 0.68, 9, 8, Math.PI / 8)}" fill="${p.bg}"/>
      </g>`;
  },

  /* Ramadan / spiritual — arched mihrab window with a lantern glow */
  arch(w, h, id, p, r) {
    const cx = w / 2, foil = `url(#foil-${id})`;
    const top = h * 0.2, bot = h * 0.66, halfW = 108;
    const arch = `M${cx - halfW} ${bot} L${cx - halfW} ${top + 74}
                  Q${cx - halfW} ${top}, ${cx} ${top - 26}
                  Q${cx + halfW} ${top}, ${cx + halfW} ${top + 74}
                  L${cx + halfW} ${bot}Z`;
    let lamps = '';
    for (let i = -1; i <= 1; i += 2) {
      const x = cx + i * 168;
      lamps += `<g fill="none" stroke="${foil}" stroke-width="1.8" opacity="0.85">
        <path d="M${x} ${h * 0.14} V${h * 0.3}"/>
        <path d="M${x - 16} ${h * 0.3} Q${x} ${h * 0.26} ${x + 16} ${h * 0.3} L${x + 20} ${h * 0.42} Q${x} ${h * 0.5} ${x - 20} ${h * 0.42}Z"/>
        <path d="M${x - 10} ${h * 0.45} H${x + 10}"/>
      </g>`;
    }
    return `<path d="${arch}" fill="${p.soft}" opacity="0.5"/>
      <path d="${arch}" fill="none" stroke="${foil}" stroke-width="2.6"/>
      <path d="${arch}" fill="none" stroke="${foil}" stroke-width="0.8" opacity="0.6" transform="translate(0 0) scale(1)" style="transform-box:fill-box;transform-origin:center"/>
      ${rosette(cx, (top + bot) / 2 - 10, 62, id, foil, 1.6)}
      ${lamps}
      ${flourish(cx, h * 0.8, 180, foil)}`;
  },

  /* Thank-you / new baby — soft botanical spray */
  botanical(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.46, foil = `url(#foil-${id})`;
    let sprigs = '';
    for (let k = 0; k < 6; k++) {
      const a = -Math.PI / 2 + (k - 2.5) * 0.42;
      const len = 132 + r() * 34;
      const ex = cx + Math.cos(a) * len, ey = cy + Math.sin(a) * len + 40;
      sprigs += `<path d="M${cx} ${cy + 76} Q${cx + Math.cos(a) * len * 0.5} ${cy + Math.sin(a) * len * 0.5 + 40}, ${ex.toFixed(1)} ${ey.toFixed(1)}"
                  fill="none" stroke="${foil}" stroke-width="1.6"/>`;
      for (let j = 1; j <= 4; j++) {
        const t = j / 5;
        const px = cx + Math.cos(a) * len * t, py = cy + Math.sin(a) * len * t + 40 + (1 - t) * 30;
        sprigs += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="13" ry="5.5" fill="${p.accent}" opacity="0.55"
                    transform="rotate(${((a * 180) / Math.PI + 90).toFixed(0)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
      }
    }
    return `${sprigs}
      ${rosette(cx, cy - 40, 86, id, foil, 1.6)}
      <path d="${star(cx, cy - 40, 26, 11, 8, -Math.PI / 2)}" fill="${foil}"/>
      ${flourish(cx, h * 0.8, 160, foil)}`;
  },

  /* Invitation — tall panel of layered arabesque bands */
  bands(w, h, id, p, r) {
    const cx = w / 2, foil = `url(#foil-${id})`;
    let out = '';
    const ys = [h * 0.24, h * 0.44, h * 0.64];
    ys.forEach((y, i) => {
      const half = 128 - i * 18;
      out += `<g fill="none" stroke="${foil}" stroke-width="${i === 1 ? 2.4 : 1.4}" opacity="${i === 1 ? 1 : 0.75}">
        <path d="M${cx - half} ${y} H${cx + half}"/>
        <path d="${polygon(cx - half - 12, y, 7, 8, Math.PI / 8)}"/>
        <path d="${polygon(cx + half + 12, y, 7, 8, Math.PI / 8)}"/>
      </g>`;
    });
    return `${out}
      ${rosette(cx, h * 0.44, 104, id, foil, 1.8)}
      <path d="${star(cx, h * 0.44, 34, 14, 8, -Math.PI / 2)}" fill="${foil}"/>
      ${flourish(cx, h * 0.8, 170, foil)}`;
  }
};

/* ------------------------------------------------------------------ public */

export function cardSVG({ id, palette = 'ivoryEmerald', motif = 'rings', w = 500, h = 700 }) {
  const p = PALETTES[palette] || PALETTES.ivoryEmerald;
  const r = rng(id + motif + palette);
  const draw = MOTIFS[motif] || MOTIFS.rings;
  const patternColor = p.ink;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs(id, p)}
<defs>
  ${girihPatternDef(id, patternColor)}
  <clipPath id="clip-${id}"><rect width="${w}" height="${h}"/></clipPath>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
${patternField(w, h, id, patternColor, 0.07)}
<rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
${draw(w, h, id, p, r)}
${frame(w, h, id, p)}
</svg>`;
}

/** Square crop used for the Instagram strip. */
export function squareSVG({ id, palette = 'creamRose', motif = 'confetti' }) {
  return cardSVG({ id, palette, motif, w: 560, h: 560 });
}

/** Wide photo-style image used for testimonial cards and the about portrait. */
export function sceneSVG({ id, palette = 'sandGold', w = 800, h = 500 }) {
  const p = PALETTES[palette] || PALETTES.sandGold;
  const r = rng(id);
  const foil = `url(#foil-${id})`;
  /* A styled flat-lay: cards on a desk surface with ribbon and envelope. */
  const cards = [
    { x: w * 0.2, y: h * 0.52, rot: -9, s: 1 },
    { x: w * 0.44, y: h * 0.46, rot: 4, s: 1.12 },
    { x: w * 0.68, y: h * 0.54, rot: 12, s: 0.94 }
  ].map((c, i) => {
    const cw = 118 * c.s, ch = 162 * c.s;
    const inner = ['ivoryEmerald', 'creamRose', 'navyGold'][i];
    const ip = PALETTES[inner];
    return `<g transform="translate(${c.x} ${c.y}) rotate(${c.rot})">
      <rect x="${-cw / 2 + 4}" y="${-ch / 2 + 8}" width="${cw}" height="${ch}" rx="8" fill="#241F1B" opacity="0.13"/>
      <rect x="${-cw / 2}" y="${-ch / 2}" width="${cw}" height="${ch}" rx="8" fill="${ip.bg}"/>
      <rect x="${-cw / 2 + 9}" y="${-ch / 2 + 9}" width="${cw - 18}" height="${ch - 18}" rx="4" fill="none" stroke="${foil}" stroke-width="1.1"/>
      <path d="${star(0, -ch * 0.12, 26 * c.s, 11 * c.s, 8, -Math.PI / 2)}" fill="none" stroke="${foil}" stroke-width="1.6"/>
      <path d="${polygon(0, -ch * 0.12, 11 * c.s, 8, Math.PI / 8)}" fill="${foil}" opacity="0.85"/>
      <g stroke="${ip.ink}" stroke-width="2" opacity="0.32" stroke-linecap="round">
        <path d="M${-cw * 0.22} ${ch * 0.18} H${cw * 0.22}"/>
        <path d="M${-cw * 0.14} ${ch * 0.27} H${cw * 0.14}"/>
      </g>
    </g>`;
  }).join('');

  let dust = '';
  for (let i = 0; i < 16; i++) {
    dust += `<circle cx="${(r() * w).toFixed(0)}" cy="${(r() * h).toFixed(0)}" r="${(1 + r() * 2.4).toFixed(1)}" fill="${p.accent}" opacity="${(0.12 + r() * 0.25).toFixed(2)}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs(id, p)}
<rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
<ellipse cx="${w / 2}" cy="${h * 1.02}" rx="${w * 0.75}" ry="${h * 0.42}" fill="${p.soft}" opacity="0.55"/>
${dust}
<g opacity="0.5">
  <path d="M0 ${h * 0.82} Q${w * 0.28} ${h * 0.7}, ${w * 0.52} ${h * 0.84} T${w} ${h * 0.76}" fill="none" stroke="${foil}" stroke-width="2.4"/>
  <path d="M0 ${h * 0.88} Q${w * 0.3} ${h * 0.78}, ${w * 0.54} ${h * 0.9} T${w} ${h * 0.83}" fill="none" stroke="${foil}" stroke-width="1.2" opacity="0.6"/>
</g>
${cards}
<rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
</svg>`;
}

/** Portrait-format studio scene for the About page. */
export function portraitSVG({ id = 'studio', w = 640, h = 800 }) {
  const p = PALETTES.creamRose;
  const r = rng(id);
  const foil = `url(#foil-${id})`;
  let tools = '';
  /* Pen, ruler and ink pot arranged on the desk edge. */
  tools += `<g transform="translate(${w * 0.22} ${h * 0.78}) rotate(-18)">
      <rect x="-9" y="-92" width="18" height="150" rx="9" fill="${PALETTES.emeraldGold.bg}"/>
      <path d="M-9 -92 L0 -124 L9 -92Z" fill="${foil}"/>
      <rect x="-9" y="-24" width="18" height="10" fill="${foil}" opacity="0.9"/>
    </g>`;
  tools += `<g transform="translate(${w * 0.78} ${h * 0.8})">
      <path d="M-42 0 Q-42 -52 0 -52 Q42 -52 42 0Z" fill="${PALETTES.navyGold.bg}"/>
      <rect x="-48" y="0" width="96" height="16" rx="6" fill="${foil}"/>
      <path d="${star(0, -26, 15, 6, 8, -Math.PI / 2)}" fill="${foil}" opacity="0.9"/>
    </g>`;
  let dust = '';
  for (let i = 0; i < 22; i++) {
    dust += `<circle cx="${(r() * w).toFixed(0)}" cy="${(r() * h * 0.7).toFixed(0)}" r="${(1 + r() * 2.6).toFixed(1)}" fill="${p.ink}" opacity="${(0.08 + r() * 0.16).toFixed(2)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs(id, p)}
<defs>${girihPatternDef(id, p.ink)}<clipPath id="clip-${id}"><rect width="${w}" height="${h}"/></clipPath></defs>
<rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
${patternField(w, h, id, p.ink, 0.06)}
${dust}
<g transform="translate(${w / 2} ${h * 0.4})">
  <rect x="-168" y="-214" width="336" height="440" rx="14" fill="#241F1B" opacity="0.12" transform="translate(8 14)"/>
  <rect x="-168" y="-214" width="336" height="440" rx="14" fill="${PALETTES.ivoryEmerald.bg}"/>
  <rect x="-152" y="-198" width="304" height="408" rx="6" fill="none" stroke="${foil}" stroke-width="1.4"/>
  ${rosette(0, -40, 106, id, foil, 2)}
  <path d="${star(0, -40, 36, 15, 8, -Math.PI / 2)}" fill="${foil}"/>
  ${flourish(0, 118, 210, foil)}
</g>
${tools}
<rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
</svg>`;
}

/** Brand mark — an eight-point rosette enclosing an "L". */
export function logoSVG(mono = false) {
  const foil = mono ? '#0E4C41' : 'url(#foil-logo)';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-hidden="true" focusable="false">
  <defs><linearGradient id="foil-logo" x1="0" y1="0" x2="1" y2="1">
    ${FOIL_STOPS.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}
  </linearGradient></defs>
  <path d="${star(32, 32, 29, 17, 8, -Math.PI / 2)}" fill="none" stroke="${foil}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="${polygon(32, 32, 17.5, 8, Math.PI / 8)}" fill="none" stroke="${foil}" stroke-width="1.1" opacity="0.7"/>
  <path d="M26 21 V41 H39" fill="none" stroke="${foil}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

/** Open Graph / social preview card. */
export function ogSVG() {
  const w = 1200, h = 630, id = 'og';
  const p = PALETTES.emeraldGold;
  const foil = `url(#foil-${id})`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs(id, p)}
<defs>${girihPatternDef(id, '#EFDFB8')}<clipPath id="clip-${id}"><rect width="${w}" height="${h}"/></clipPath></defs>
<rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
${patternField(w, h, id, '#EFDFB8', 0.14)}
<g transform="translate(300 315)">
  ${rosette(0, 0, 150, id, foil, 2.6)}
  <path d="${star(0, 0, 52, 22, 8, -Math.PI / 2)}" fill="${foil}"/>
</g>
<g transform="translate(560 250)">
  <text x="0" y="0" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="700" fill="#FBF8F4">Lily&#8217;s Designs</text>
  <text x="0" y="62" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#EFDFB8" letter-spacing="3">BESPOKE ARABIC GREETING CARDS</text>
  <path d="M0 108 H420" stroke="${foil}" stroke-width="2"/>
  <text x="0" y="168" font-family="Helvetica, Arial, sans-serif" font-size="27" fill="#C9D8D2">Weddings &#183; Eid &#183; Birthdays &#183; Corporate</text>
</g>
<rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="10" fill="none" stroke="${foil}" stroke-width="2"/>
</svg>`;
}

/** Favicon — same rosette, tuned for 32px. */
export function faviconSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#0E4C41"/>
  <path d="${star(32, 32, 24, 14, 8, -Math.PI / 2)}" fill="none" stroke="#D8B45F" stroke-width="3" stroke-linejoin="round"/>
  <path d="M26 23 V40 H38" fill="none" stroke="#EFDFB8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}
