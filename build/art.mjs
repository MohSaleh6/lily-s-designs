/**
 * Original card artwork generator.
 *
 * Every image on the site is drawn here as an SVG in the studio's botanical
 * language: lily-of-the-valley sprigs, open roses, trailing green vines and
 * periwinkle ribbon — the same vocabulary as the Lily's Designs mark.
 * Nothing is fetched from a stock library, so there are no broken-image
 * states, no licensing questions and each file stays a few kilobytes.
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

/* `grad` is the palette's ribbon gradient: the three stops that draw stems,
   rules and frames. Light palettes get deep stops, dark palettes light ones,
   so line work stays readable on every background. */
export const PALETTES = {
  ivoryLeaf: { bg: '#FBF7EE', bg2: '#EFF6F0', ink: '#256B43', accent: '#3E8F5C', petal: '#E86B9A',
    soft: '#D8EEDF', grad: ['#3E8F5C', '#7D8CCB', '#E86B9A'] },
  creamRose: { bg: '#FEF6F9', bg2: '#FADFE9', ink: '#A8325C', accent: '#E86B9A', petal: '#F58FB4',
    soft: '#FBDCE7', grad: ['#3E8F5C', '#E86B9A', '#A8325C'] },
  leafDeep:  { bg: '#1C4D33', bg2: '#123422', ink: '#EAF6EC', accent: '#7FD69B', petal: '#F58FB4',
    soft: '#2A6B48', grad: ['#7FD69B', '#C7D2F3', '#F8A9C6'] },
  periDeep:  { bg: '#3E478C', bg2: '#2A3168', ink: '#EEF0FC', accent: '#9AA7DC', petal: '#F8A9C6',
    soft: '#525CA6', grad: ['#C7D2F3', '#F8A9C6', '#9EE0B4'] },
  roseDeep:  { bg: '#B24B72', bg2: '#8E2549', ink: '#FDF0F4', accent: '#FBDCE7', petal: '#FFFFFF',
    soft: '#C76287', grad: ['#FBDCE7', '#FFFFFF', '#C7D2F3'] },
  creamLeaf: { bg: '#F8F3E8', bg2: '#EADFCB', ink: '#2E6B45', accent: '#5FB87E', petal: '#E86B9A',
    soft: '#DCEFE1', grad: ['#2E6B45', '#5FB87E', '#7D8CCB'] },
  mintIvory: { bg: '#EDF7EF', bg2: '#D8EEDF', ink: '#1C4D33', accent: '#3E8F5C', petal: '#E86B9A',
    soft: '#FBF7EE', grad: ['#256B43', '#5FB87E', '#E86B9A'] },
  periBlush: { bg: '#F4F2FC', bg2: '#E3E7F8', ink: '#4A57A0', accent: '#7D8CCB', petal: '#F58FB4',
    soft: '#FBDCE7', grad: ['#4A57A0', '#7D8CCB', '#E86B9A'] }
};

function defs(id, p) {
  return `<defs>
  <linearGradient id="ribbon-${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${p.grad[0]}"/>
    <stop offset="52%" stop-color="${p.grad[1]}"/>
    <stop offset="100%" stop-color="${p.grad[2]}"/>
  </linearGradient>
  <linearGradient id="bg-${id}" x1="0" y1="0" x2="0.3" y2="1">
    <stop offset="0%" stop-color="${p.bg}"/><stop offset="100%" stop-color="${p.bg2}"/>
  </linearGradient>
  <radialGradient id="glow-${id}" cx="50%" cy="40%" r="60%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.30"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
  </radialGradient>
</defs>`;
}

/* ------------------------------------------------------------ botany kit */

const n = (v) => Number(v).toFixed(2);

/** A pointed leaf, base at (x,y), tip `len` away along `ang` radians. */
function leaf(x, y, len, ang, fill, opacity = 1, curve = 0.34) {
  const deg = (ang * 180) / Math.PI;
  return `<path d="M0 0 Q${n(len * 0.48)} ${n(-len * curve)} ${n(len)} 0 Q${n(len * 0.48)} ${n(len * curve)} 0 0Z"
    fill="${fill}" opacity="${opacity}" transform="translate(${n(x)} ${n(y)}) rotate(${n(deg)})"/>`;
}

/** Point on a quadratic bezier — used to hang leaves and bells off a stem. */
function qAt(x0, y0, x1, y1, x2, y2, t) {
  const u = 1 - t;
  return [u * u * x0 + 2 * u * t * x1 + t * t * x2, u * u * y0 + 2 * u * t * y1 + t * t * y2];
}
function qAngle(x0, y0, x1, y1, x2, y2, t) {
  const u = 1 - t;
  return Math.atan2(2 * u * (y1 - y0) + 2 * t * (y2 - y1), 2 * u * (x1 - x0) + 2 * t * (x2 - x1));
}

/** A curving stem with leaves alternating down its length. */
function vine(x0, y0, x1, y1, x2, y2, stroke, leafFill, count = 5, size = 20, width = 2) {
  let out = `<path d="M${n(x0)} ${n(y0)} Q${n(x1)} ${n(y1)} ${n(x2)} ${n(y2)}"
    fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round"/>`;
  for (let i = 0; i < count; i++) {
    const t = 0.16 + (i / Math.max(count - 1, 1)) * 0.74;
    const [px, py] = qAt(x0, y0, x1, y1, x2, y2, t);
    const a = qAngle(x0, y0, x1, y1, x2, y2, t);
    const side = i % 2 === 0 ? 1 : -1;
    const taper = size * (0.62 + 0.38 * Math.sin(t * Math.PI));
    out += leaf(px, py, taper, a + side * 0.85, leafFill, 0.92);
  }
  return out;
}

/** A lily-of-the-valley bell — the flower in the studio mark. */
function bell(x, y, s, fill, stroke) {
  return `<g transform="translate(${n(x)} ${n(y)}) scale(${n(s)})">
    <path d="M-7 -4 Q-8 6 -5 10 Q-2.5 7.5 0 10 Q2.5 7.5 5 10 Q8 6 7 -4 Q4 -9 0 -9 Q-4 -9 -7 -4Z"
      fill="${fill}" stroke="${stroke}" stroke-width="0.9" stroke-linejoin="round"/>
    <path d="M0 -9 V-15" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-linecap="round"/>
  </g>`;
}

/** An arching stem hung with bells — the signature lily-of-the-valley sprig. */
function sprig(x, y, h, dir, stroke, bellFill, count = 6, s = 1) {
  const x2 = x + dir * h * 0.46, y2 = y - h;
  const cx = x + dir * h * 0.46, cy = y - h * 0.42;
  let out = `<path d="M${n(x)} ${n(y)} Q${n(cx)} ${n(cy)} ${n(x2)} ${n(y2)}"
    fill="none" stroke="${stroke}" stroke-width="${n(2.4 * s)}" stroke-linecap="round"/>`;
  for (let i = 0; i < count; i++) {
    const t = 0.18 + (i / count) * 0.78;
    const [px, py] = qAt(x, y, cx, cy, x2, y2, t);
    const scale = s * (1.05 - t * 0.34);
    out += bell(px + dir * 6 * scale, py + 15 * scale, scale, bellFill, stroke);
  }
  return out;
}

/** An open rose: outer petals, inner petals and a coiled heart. */
function rose(cx, cy, r, petal, deep, stroke) {
  let out = '';
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    out += `<ellipse cx="${n(cx + Math.cos(a) * r * 0.58)}" cy="${n(cy + Math.sin(a) * r * 0.58)}"
      rx="${n(r * 0.52)}" ry="${n(r * 0.42)}" fill="${petal}" opacity="0.95"
      transform="rotate(${n((a * 180) / Math.PI)} ${n(cx + Math.cos(a) * r * 0.58)} ${n(cy + Math.sin(a) * r * 0.58)})"/>`;
  }
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 - 0.5;
    out += `<ellipse cx="${n(cx + Math.cos(a) * r * 0.3)}" cy="${n(cy + Math.sin(a) * r * 0.3)}"
      rx="${n(r * 0.36)}" ry="${n(r * 0.3)}" fill="${deep}" opacity="0.9"
      transform="rotate(${n((a * 180) / Math.PI)} ${n(cx + Math.cos(a) * r * 0.3)} ${n(cy + Math.sin(a) * r * 0.3)})"/>`;
  }
  out += `<path d="M${n(cx - r * 0.2)} ${n(cy)} a${n(r * 0.2)} ${n(r * 0.2)} 0 1 1 ${n(r * 0.4)} 0
    a${n(r * 0.13)} ${n(r * 0.13)} 0 1 0 ${n(-r * 0.26)} 0" fill="none"
    stroke="${stroke}" stroke-width="${n(r * 0.075)}" stroke-linecap="round"/>`;
  return out;
}

/** Ribbon bow — the periwinkle tie from the mark. */
function bow(cx, cy, s, fill, dark) {
  return `<g transform="translate(${n(cx)} ${n(cy)}) scale(${n(s)})">
    <path d="M-4 0 Q-34 -20 -46 -4 Q-52 10 -32 14 Q-14 17 -4 4Z" fill="${fill}"/>
    <path d="M4 0 Q34 -20 46 -4 Q52 10 32 14 Q14 17 4 4Z" fill="${fill}"/>
    <path d="M-5 6 Q-16 40 -26 60 L-12 56 Q-4 34 -2 12Z" fill="${dark}" opacity="0.9"/>
    <path d="M5 6 Q16 40 26 60 L12 56 Q4 34 2 12Z" fill="${dark}" opacity="0.9"/>
    <ellipse cx="0" cy="3" rx="7.5" ry="8.5" fill="${dark}"/>
  </g>`;
}

/** A ring of vine — the wreath the mark is built on. */
function wreath(cx, cy, r, stroke, leafFill, blooms, petal, deep) {
  let out = `<circle cx="${n(cx)} " cy="${n(cy)}" r="${n(r)}" fill="none" stroke="${stroke}" stroke-width="1.6" opacity="0.85"/>`;
  const count = 22;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    out += leaf(x, y, 22 + (i % 3) * 5, a + Math.PI / 2 + (i % 2 ? 0.5 : -0.5), leafFill, 0.9);
  }
  if (blooms) {
    for (let i = 0; i < blooms; i++) {
      const a = (i / blooms) * Math.PI * 2 + 0.55;
      out += rose(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 17, petal, deep, stroke);
    }
  }
  return out;
}

function starlet(cx, cy, rO, rI, points, rot = 0) {
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rO : rI;
    const a = rot + (i * Math.PI) / points;
    pts.push(`${n(cx + r * Math.cos(a))} ${n(cy + r * Math.sin(a))}`);
  }
  return `M${pts.join('L')}Z`;
}

/** A tapered stroke that evokes a pen line without spelling words. */
function flourish(cx, cy, w, stroke, opacity = 1) {
  const h = w * 0.3;
  return `<g fill="none" stroke="${stroke}" stroke-linecap="round" opacity="${opacity}">
    <path d="M${n(cx - w / 2)} ${n(cy)} C${n(cx - w * 0.3)} ${n(cy - h)}, ${n(cx - w * 0.06)} ${n(cy + h * 0.7)}, ${n(cx)} ${n(cy)}
             S${n(cx + w * 0.3)} ${n(cy - h)}, ${n(cx + w / 2)} ${n(cy)}" stroke-width="2.6"/>
    <circle cx="${n(cx - w / 2 - 9)}" cy="${n(cy)}" r="2.6" fill="${stroke}" stroke="none"/>
    <circle cx="${n(cx + w / 2 + 9)}" cy="${n(cy)}" r="2.6" fill="${stroke}" stroke="none"/>
  </g>`;
}

/** Card border: a fine rule with a leaf sprig at each corner. */
function frame(w, h, id, p, inset = 26) {
  const g = `url(#ribbon-${id})`;
  const corner = (x, y, sx, sy) => `<g transform="translate(${x} ${y}) scale(${sx} ${sy})">
      <path d="M2 34 Q2 2 34 2" fill="none" stroke="${g}" stroke-width="1.6"/>
      ${leaf(6, 22, 17, -1.15, g, 0.9)}
      ${leaf(22, 6, 17, -0.42, g, 0.9)}
      ${leaf(11, 11, 13, -0.79, p.accent, 0.75)}
    </g>`;
  return `<g>
    <rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}" rx="8"
          fill="none" stroke="${g}" stroke-width="1.5"/>
    <rect x="${inset + 7}" y="${inset + 7}" width="${w - (inset + 7) * 2}" height="${h - (inset + 7) * 2}" rx="4"
          fill="none" stroke="${p.accent}" stroke-width="0.7" opacity="0.5"/>
    ${corner(inset - 6, inset - 6, 1, 1)}
    ${corner(w - inset + 6, inset - 6, -1, 1)}
    ${corner(inset - 6, h - inset + 6, 1, -1)}
    ${corner(w - inset + 6, h - inset + 6, -1, -1)}
  </g>`;
}

function vinePatternDef(id, color) {
  return `<pattern id="vine-${id}" width="104" height="104" patternUnits="userSpaceOnUse">
    <g fill="none" stroke="${color}" stroke-width="1.1" stroke-linecap="round">
      <path d="M0 78 Q26 44 52 78 T104 78"/>
      <path d="M0 26 Q26 -8 52 26 T104 26"/>
    </g>
    ${leaf(26, 60, 15, -1.9, color, 0.55)}${leaf(78, 60, 15, -1.24, color, 0.55)}
    ${leaf(26, 8, 15, -1.9, color, 0.55)}${leaf(78, 8, 15, -1.24, color, 0.55)}
    <circle cx="52" cy="52" r="2.6" fill="${color}" opacity="0.5"/>
  </pattern>`;
}

function patternField(w, h, id, opacity) {
  return `<g opacity="${opacity}" clip-path="url(#clip-${id})">
    <rect width="${w}" height="${h}" fill="url(#vine-${id})"/>
  </g>`;
}

/* ------------------------------------------------------------------ motifs */

const MOTIFS = {
  /* Weddings — two rings held in a rose-and-vine wreath */
  rings(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.43, g = `url(#ribbon-${id})`;
    return `${wreath(cx, cy, 132, g, p.accent, 3, p.petal, p.ink)}
      <g fill="none" stroke="${g}" stroke-width="3.6">
        <circle cx="${cx - 26}" cy="${cy}" r="42"/>
        <circle cx="${cx + 26}" cy="${cy}" r="42"/>
      </g>
      <g fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.55">
        <circle cx="${cx - 26}" cy="${cy}" r="48"/>
        <circle cx="${cx + 26}" cy="${cy}" r="48"/>
      </g>
      ${bow(cx, cy + 150, 0.78, p.grad[1], p.accent)}
      ${flourish(cx, h * 0.83, 170, g)}`;
  },

  /* Eid — a crescent of vine, lily bells and a scatter of stars */
  eid(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.4, g = `url(#ribbon-${id})`;
    let stars = '';
    for (let i = 0; i < 9; i++) {
      const x = 70 + r() * (w - 140), y = 80 + r() * (h * 0.6);
      const s = 4 + r() * 5;
      stars += `<path d="${starlet(x, y, s, s * 0.4, 4, -Math.PI / 2)}" fill="${g}" opacity="${(0.4 + r() * 0.5).toFixed(2)}"/>`;
    }
    return `${stars}
      <path d="M${cx + 52} ${cy - 62} A78 78 0 1 0 ${cx + 52} ${cy + 62} A60 60 0 1 1 ${cx + 52} ${cy - 62}Z"
        fill="${g}" opacity="0.92"/>
      ${sprig(cx - 148, cy + 118, 150, -1, p.accent, p.bg === '#FBF7EE' ? '#FFFFFF' : p.soft, 6, 1)}
      ${sprig(cx + 148, cy + 104, 132, 1, p.accent, p.bg === '#FBF7EE' ? '#FFFFFF' : p.soft, 5, 0.9)}
      ${rose(cx - 128, cy + 132, 20, p.petal, p.accent, g)}
      ${rose(cx + 132, cy + 120, 17, p.petal, p.accent, g)}
      ${flourish(cx, h * 0.84, 180, g)}`;
  },

  /* Birthday — a burst of petals around an open rose */
  confetti(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.43, g = `url(#ribbon-${id})`;
    let bits = '';
    for (let i = 0; i < 28; i++) {
      const a = r() * Math.PI * 2;
      const dist = 150 + r() * 130;
      const x = cx + Math.cos(a) * dist * 0.62;
      const y = cy + Math.sin(a) * dist * 0.72;
      if (x < 54 || x > w - 54 || y < 60 || y > h - 70) continue;
      const col = i % 3 === 0 ? p.petal : (i % 3 === 1 ? p.accent : p.grad[1]);
      const op = (0.5 + r() * 0.45).toFixed(2);
      if (i % 3 === 1) bits += leaf(x, y, 15 + r() * 9, r() * Math.PI * 2, col, op);
      else bits += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(5 + r() * 4)}" ry="${n(8 + r() * 5)}" fill="${col}" opacity="${op}"
              transform="rotate(${(r() * 360).toFixed(0)} ${n(x)} ${n(y)})"/>`;
    }
    return `${bits}
      ${wreath(cx, cy, 116, g, p.accent, 0)}
      ${rose(cx, cy, 52, p.petal, p.accent, g)}
      ${flourish(cx, h * 0.8, 170, g)}`;
  },

  /* Graduation — a laurel of leaves cradling the cap */
  laurel(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.44, g = `url(#ribbon-${id})`;
    const branch = (dir) => {
      let out = '';
      for (let i = 0; i < 10; i++) {
        const t = i / 10;
        const a = -Math.PI / 2 + dir * (0.4 + t * 2.15);
        const rr = 122 + Math.sin(t * Math.PI) * 9;
        out += leaf(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr,
          20 + Math.sin(t * Math.PI) * 8, a + Math.PI / 2 + dir * 0.34, g, 0.92);
      }
      return out;
    };
    return `${branch(1)}${branch(-1)}
      <circle cx="${cx}" cy="${cy}" r="142" fill="none" stroke="${p.accent}" stroke-width="1" opacity="0.45"/>
      ${rose(cx, cy + 128, 22, p.petal, p.accent, g)}
      <g transform="translate(${cx} ${cy})">
        <path d="M-72 -14 L0 -48 L72 -14 L0 20Z" fill="${g}"/>
        <path d="M-44 0 L-44 44 Q0 68 44 44 L44 0" fill="none" stroke="${g}" stroke-width="3.4"/>
        <path d="M72 -14 L72 46" stroke="${g}" stroke-width="2.4" fill="none"/>
        <circle cx="72" cy="52" r="7" fill="${p.petal}"/>
      </g>
      ${flourish(cx, h * 0.82, 160, g)}`;
  },

  /* Corporate — a restrained trellis of vines */
  grid(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.43, g = `url(#ribbon-${id})`;
    let lat = '';
    for (let i = -2; i <= 2; i++) {
      lat += `<path d="M${cx + i * 54} ${cy - 130} V${cy + 130}" stroke="${p.accent}" stroke-width="1" opacity="0.4" fill="none"/>`;
      lat += `<path d="M${cx - 130} ${cy + i * 54} H${cx + 130}" stroke="${p.accent}" stroke-width="1" opacity="0.4" fill="none"/>`;
    }
    return `${lat}
      ${vine(cx - 132, cy + 128, cx - 40, cy - 40, cx + 128, cy - 126, g, p.accent, 7, 22, 2.2)}
      ${vine(cx + 132, cy + 128, cx + 40, cy - 40, cx - 128, cy - 126, g, p.accent, 7, 22, 2.2)}
      ${rose(cx, cy, 34, p.petal, p.accent, g)}
      <g fill="none" stroke="${g}" stroke-width="1.2" opacity="0.85">
        <path d="M${cx - 140} ${h * 0.72} H${cx + 140}"/>
      </g>
      ${leaf(cx - 152, h * 0.72, 20, -0.2, g, 0.9)}${leaf(cx + 152, h * 0.72, 20, Math.PI + 0.2, g, 0.9)}`;
  },

  /* Ramadan / spiritual — an arched trellis hung with lily bells */
  arch(w, h, id, p, r) {
    const cx = w / 2, g = `url(#ribbon-${id})`;
    const top = h * 0.2, bot = h * 0.66, halfW = 108;
    const archPath = `M${cx - halfW} ${bot} L${cx - halfW} ${top + 74}
                  Q${cx - halfW} ${top}, ${cx} ${top - 26}
                  Q${cx + halfW} ${top}, ${cx + halfW} ${top + 74}
                  L${cx + halfW} ${bot}Z`;
    let bells = '';
    for (let i = 0; i < 5; i++) {
      const x = cx - 74 + i * 37;
      const y = top + 42 + Math.abs(i - 2) * 16;
      bells += bell(x, y, 1.15, p.soft, g);
    }
    return `<path d="${archPath}" fill="${p.soft}" opacity="0.45"/>
      <path d="${archPath}" fill="none" stroke="${g}" stroke-width="2.6"/>
      ${bells}
      ${vine(cx - halfW, bot, cx - halfW - 46, (top + bot) / 2, cx - halfW + 6, top + 56, g, p.accent, 5, 20, 2)}
      ${vine(cx + halfW, bot, cx + halfW + 46, (top + bot) / 2, cx + halfW - 6, top + 56, g, p.accent, 5, 20, 2)}
      ${rose(cx, (top + bot) / 2 + 40, 30, p.petal, p.accent, g)}
      ${flourish(cx, h * 0.84, 170, g)}`;
  },

  /* Henna night — an open palm traced in vine, flanked by candles */
  henna(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.42, g = `url(#ribbon-${id})`;
    /* A simplified open-hand outline, fingers together, palm up — the
       shape a henna cone is actually drawn on. */
    const hand = `M${cx - 46} ${cy + 92}
      C${cx - 60} ${cy + 40} ${cx - 58} ${cy - 4} ${cx - 52} ${cy - 40}
      C${cx - 50} ${cy - 58} ${cx - 34} ${cy - 58} ${cx - 33} ${cy - 40}
      L${cx - 30} ${cy - 4}
      C${cx - 29} ${cy - 66} ${cx - 12} ${cy - 66} ${cx - 11} ${cy - 44}
      L${cx - 9} ${cy - 6}
      C${cx - 8} ${cy - 70} ${cx + 10} ${cy - 70} ${cx + 10} ${cy - 46}
      L${cx + 11} ${cy - 6}
      C${cx + 12} ${cy - 60} ${cx + 28} ${cy - 58} ${cx + 27} ${cy - 38}
      L${cx + 24} ${cy - 2}
      C${cx + 40} ${cy - 14} ${cx + 56} ${cy + 6} ${cx + 50} ${cy + 30}
      L${cx + 40} ${cy + 92}Z`;
    /* A small mandala centred in the palm — the one detail that reads as
       henna at a glance, held inside the hand rather than floating above
       the fingers where it read as a stray blob. */
    const palmCx = cx - 6, palmCy = cy + 12;
    let mandala = `<circle cx="${palmCx}" cy="${palmCy}" r="3" fill="${p.accent}"/>`;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const x1 = palmCx + Math.cos(a) * 7, y1 = palmCy + Math.sin(a) * 7;
      const x2 = palmCx + Math.cos(a) * 15, y2 = palmCy + Math.sin(a) * 15;
      mandala += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"
        stroke="${p.ink}" stroke-width="1" opacity="0.5" stroke-linecap="round"/>`;
    }
    mandala += `<circle cx="${palmCx}" cy="${palmCy}" r="10" fill="none" stroke="${p.ink}" stroke-width="1" opacity="0.45"/>`;
    /* Bangles at the wrist. */
    const bangles = [0, 7, 14].map((dy) =>
      `<path d="M${cx - 44} ${cy + 82 + dy} Q${cx - 4} ${cy + 98 + dy} ${cx + 38} ${cy + 78 + dy}"
        fill="none" stroke="${g}" stroke-width="2" opacity="${0.85 - dy * 0.02}"/>`).join('');
    /* Fingertip dots — henna is worked densest at the tips. */
    const fingertips = [
      [cx - 42, cy - 41], [cx - 21, cy - 47], [cx - 0.5, cy - 51], [cx + 19, cy - 43]
    ];
    const tips = fingertips.map(([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="2.6" fill="${p.accent}" opacity="0.85"/>`).join('');
    const candle = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 -18 Q5 -9 1.5 -2 Q0 2 -1.5 -2 Q-5 -9 0 -18Z" fill="${p.petal}"/>
      <circle cx="0" cy="-2" r="1.6" fill="${p.ink}" opacity="0.4"/>
      <rect x="-6.5" y="0" width="13" height="52" rx="3.5" fill="${p.soft}" stroke="${g}" stroke-width="1"/>
      <rect x="-6.5" y="8" width="13" height="4" fill="${g}" opacity="0.5"/>
      <rect x="-6.5" y="20" width="13" height="4" fill="${g}" opacity="0.5"/>
    </g>`;
    return `
      <path d="${hand}" fill="${p.soft}" opacity="0.5"/>
      <path d="${hand}" fill="none" stroke="${g}" stroke-width="2"/>
      ${bangles}
      ${mandala}
      ${tips}
      ${candle(cx - 132, cy + 56, 1)}
      ${candle(cx + 132, cy + 40, 0.9)}
      ${rose(cx - 132, cy - 4, 15, p.petal, p.accent, g)}
      ${rose(cx + 132, cy - 12, 13, p.petal, p.accent, g)}
      ${flourish(cx, h * 0.84, 170, g)}`;
  },

  /* Thank-you / new baby — the lily-of-the-valley spray from the mark */
  botanical(w, h, id, p, r) {
    const cx = w / 2, cy = h * 0.46, g = `url(#ribbon-${id})`;
    const white = p.bg === '#FBF7EE' || p.bg === '#FEF6F9' || p.bg === '#EDF7EF' || p.bg === '#F4F2FC' || p.bg === '#F8F3E8'
      ? '#FFFFFF' : p.soft;
    return `${sprig(cx - 16, cy + 138, 196, -1, p.accent, white, 7, 1.15)}
      ${sprig(cx + 2, cy + 138, 224, 1, p.accent, white, 8, 1.25)}
      ${sprig(cx + 18, cy + 138, 160, 1, p.accent, white, 5, 0.95)}
      ${leaf(cx - 10, cy + 140, 132, -1.95, p.accent, 0.85)}
      ${leaf(cx + 10, cy + 140, 146, -1.16, p.accent, 0.85)}
      ${leaf(cx, cy + 142, 108, -1.57, p.ink === '#EAF6EC' || p.ink === '#EEF0FC' ? p.accent : p.ink, 0.5)}
      ${rose(cx - 58, cy + 96, 26, p.petal, p.accent, g)}
      ${rose(cx + 62, cy + 84, 21, p.petal, p.accent, g)}
      ${bow(cx, cy + 150, 0.86, p.grad[1], p.accent)}
      ${flourish(cx, h * 0.87, 150, g)}`;
  },

  /* Invitation — layered vine bands with roses at the rules */
  bands(w, h, id, p, r) {
    const cx = w / 2, g = `url(#ribbon-${id})`;
    let out = '';
    [h * 0.24, h * 0.46, h * 0.68].forEach((y, i) => {
      const half = 128 - i * 18;
      out += `<g fill="none" stroke="${g}" stroke-width="${i === 1 ? 2.4 : 1.4}" opacity="${i === 1 ? 1 : 0.75}">
        <path d="M${cx - half} ${y} H${cx + half}"/>
      </g>
      ${leaf(cx - half - 6, y, 19, Math.PI + 0.3, g, 0.9)}
      ${leaf(cx + half + 6, y, 19, -0.3, g, 0.9)}`;
    });
    return `${out}
      ${vine(cx - 120, h * 0.66, cx - 168, h * 0.44, cx - 116, h * 0.26, g, p.accent, 5, 19, 1.9)}
      ${vine(cx + 120, h * 0.66, cx + 168, h * 0.44, cx + 116, h * 0.26, g, p.accent, 5, 19, 1.9)}
      ${rose(cx, h * 0.46, 40, p.petal, p.accent, g)}
      ${flourish(cx, h * 0.84, 160, g)}`;
  }
};

/* ------------------------------------------------------------------ public */

export function cardSVG({ id, palette = 'ivoryLeaf', motif = 'rings', w = 500, h = 700 }) {
  const p = PALETTES[palette] || PALETTES.ivoryLeaf;
  const r = rng(id + motif + palette);
  const draw = MOTIFS[motif] || MOTIFS.rings;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs(id, p)}
<defs>
  ${vinePatternDef(id, p.accent)}
  <clipPath id="clip-${id}"><rect width="${w}" height="${h}"/></clipPath>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
${patternField(w, h, id, 0.1)}
<rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
${draw(w, h, id, p, r)}
${frame(w, h, id, p)}
</svg>`;
}

/** Wide flat-lay used for testimonial cards. */
export function sceneSVG({ id, palette = 'creamLeaf', w = 800, h = 500 }) {
  const p = PALETTES[palette] || PALETTES.creamLeaf;
  const r = rng(id);
  const g = `url(#ribbon-${id})`;
  const cards = [
    { x: w * 0.2, y: h * 0.52, rot: -9, s: 1 },
    { x: w * 0.44, y: h * 0.46, rot: 4, s: 1.12 },
    { x: w * 0.68, y: h * 0.54, rot: 12, s: 0.94 }
  ].map((c, i) => {
    const cw = 118 * c.s, ch = 162 * c.s;
    const ip = PALETTES[['ivoryLeaf', 'creamRose', 'periBlush'][i]];
    return `<g transform="translate(${c.x} ${c.y}) rotate(${c.rot})">
      <rect x="${-cw / 2 + 4}" y="${-ch / 2 + 8}" width="${cw}" height="${ch}" rx="8" fill="#221F1C" opacity="0.12"/>
      <rect x="${-cw / 2}" y="${-ch / 2}" width="${cw}" height="${ch}" rx="8" fill="${ip.bg}"/>
      <rect x="${-cw / 2 + 9}" y="${-ch / 2 + 9}" width="${cw - 18}" height="${ch - 18}" rx="4" fill="none" stroke="${ip.accent}" stroke-width="1.1"/>
      ${rose(0, -ch * 0.14, 24 * c.s, ip.petal, ip.accent, ip.ink)}
      ${leaf(-20 * c.s, -ch * 0.05, 26 * c.s, Math.PI - 0.5, ip.accent, 0.8)}
      ${leaf(20 * c.s, -ch * 0.05, 26 * c.s, 0.5, ip.accent, 0.8)}
      <g stroke="${ip.ink}" stroke-width="2" opacity="0.3" stroke-linecap="round">
        <path d="M${-cw * 0.22} ${ch * 0.2} H${cw * 0.22}"/>
        <path d="M${-cw * 0.14} ${ch * 0.29} H${cw * 0.14}"/>
      </g>
    </g>`;
  }).join('');

  let petals = '';
  for (let i = 0; i < 14; i++) {
    petals += leaf(r() * w, r() * h, 12 + r() * 12, r() * Math.PI * 2, i % 2 ? p.accent : p.petal, (0.16 + r() * 0.3).toFixed(2));
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs(id, p)}
<rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
<ellipse cx="${w / 2}" cy="${h * 1.02}" rx="${w * 0.75}" ry="${h * 0.42}" fill="${p.soft}" opacity="0.5"/>
${petals}
<g opacity="0.55">
  ${vine(0, h * 0.84, w * 0.3, h * 0.68, w * 0.6, h * 0.86, g, p.accent, 6, 20, 2.2)}
  ${vine(w, h * 0.78, w * 0.78, h * 0.94, w * 0.52, h * 0.8, g, p.accent, 5, 18, 1.8)}
</g>
${cards}
<rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
</svg>`;
}

/** Portrait-format studio scene for the About page. */
export function portraitSVG({ id = 'studio', w = 640, h = 800 }) {
  const p = PALETTES.creamRose;
  const r = rng(id);
  const g = `url(#ribbon-${id})`;
  let dust = '';
  for (let i = 0; i < 20; i++) {
    dust += leaf(r() * w, r() * h * 0.8, 10 + r() * 14, r() * Math.PI * 2,
      i % 2 ? PALETTES.ivoryLeaf.accent : p.accent, (0.1 + r() * 0.18).toFixed(2));
  }
  const tools = `<g transform="translate(${w * 0.2} ${h * 0.8}) rotate(-18)">
      <rect x="-9" y="-92" width="18" height="150" rx="9" fill="${PALETTES.leafDeep.bg}"/>
      <path d="M-9 -92 L0 -124 L9 -92Z" fill="${g}"/>
      <rect x="-9" y="-24" width="18" height="10" fill="${g}" opacity="0.9"/>
    </g>
    <g transform="translate(${w * 0.8} ${h * 0.82})">
      <path d="M-42 0 Q-42 -52 0 -52 Q42 -52 42 0Z" fill="${PALETTES.periDeep.bg}"/>
      <rect x="-48" y="0" width="96" height="16" rx="6" fill="${g}"/>
      ${rose(0, -26, 20, p.petal, p.accent, '#FFFFFF')}
    </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs(id, p)}
<defs>${vinePatternDef(id, p.accent)}<clipPath id="clip-${id}"><rect width="${w}" height="${h}"/></clipPath></defs>
<rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
${patternField(w, h, id, 0.09)}
${dust}
<g transform="translate(${w / 2} ${h * 0.4})">
  <rect x="-168" y="-214" width="336" height="440" rx="14" fill="#221F1C" opacity="0.1" transform="translate(8 14)"/>
  <rect x="-168" y="-214" width="336" height="440" rx="14" fill="${PALETTES.ivoryLeaf.bg}"/>
  <rect x="-152" y="-198" width="304" height="408" rx="6" fill="none" stroke="${PALETTES.ivoryLeaf.accent}" stroke-width="1.4"/>
  ${sprig(-14, 120, 184, -1, PALETTES.ivoryLeaf.accent, '#FFFFFF', 7, 1.1)}
  ${sprig(6, 120, 210, 1, PALETTES.ivoryLeaf.accent, '#FFFFFF', 8, 1.2)}
  ${leaf(-8, 124, 124, -1.95, PALETTES.ivoryLeaf.accent, 0.85)}
  ${leaf(10, 124, 138, -1.16, PALETTES.ivoryLeaf.accent, 0.85)}
  ${rose(-56, 80, 24, PALETTES.creamRose.accent, PALETTES.creamRose.ink, '#FFFFFF')}
  ${bow(0, 132, 0.8, '#7D8CCB', '#5A67AB')}
</g>
${tools}
<rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
</svg>`;
}

/** Brand mark — a vine wreath with a lily sprig and ribbon, echoing the logo. */
export function logoSVG(mono = false) {
  const stem = mono ? '#256B43' : '#3E8F5C';
  const ink  = mono ? '#256B43' : '#256B43';
  const tie  = mono ? '#256B43' : '#7D8CCB';
  const tieD = mono ? '#256B43' : '#5A67AB';
  const petalFill = mono ? 'none' : '#FFFFFF';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-hidden="true" focusable="false">
  <circle cx="32" cy="32" r="27" fill="none" stroke="${stem}" stroke-width="1.6"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return leaf(32 + Math.cos(a) * 27, 32 + Math.sin(a) * 27, 9, a + Math.PI / 2 + (i % 2 ? 0.55 : -0.55), stem, 0.9);
  }).join('')}
  <path d="M32 48 Q24 36 25 22" fill="none" stroke="${stem}" stroke-width="2" stroke-linecap="round"/>
  <path d="M32 48 Q40 36 39 22" fill="none" stroke="${stem}" stroke-width="2" stroke-linecap="round"/>
  ${bell(26, 26, 0.58, petalFill, ink)}${bell(23.5, 33, 0.52, petalFill, ink)}
  ${bell(38, 26, 0.58, petalFill, ink)}${bell(40.5, 33, 0.52, petalFill, ink)}
  ${bell(32, 21, 0.5, petalFill, ink)}
  <g transform="translate(0 2)">${bow(32, 46, 0.2, tie, tieD)}</g>
</svg>`;
}

/** Open Graph / social preview card. */
export function ogSVG() {
  const w = 1200, h = 630, id = 'og';
  const p = PALETTES.leafDeep;
  const g = `url(#ribbon-${id})`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs(id, p)}
<defs>${vinePatternDef(id, '#7FD69B')}<clipPath id="clip-${id}"><rect width="${w}" height="${h}"/></clipPath></defs>
<rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
${patternField(w, h, id, 0.16)}
<g transform="translate(290 315)">
  ${wreath(0, 0, 148, g, '#7FD69B', 3, '#F8A9C6', '#E86B9A')}
  ${sprig(-12, 96, 158, -1, '#9EE0B4', '#FFFFFF', 6, 1.1)}
  ${sprig(8, 96, 178, 1, '#9EE0B4', '#FFFFFF', 7, 1.2)}
  ${leaf(-6, 100, 108, -1.95, '#7FD69B', 0.9)}
  ${leaf(8, 100, 118, -1.16, '#7FD69B', 0.9)}
  ${bow(0, 108, 0.7, '#9AA7DC', '#7D8CCB')}
</g>
<g transform="translate(560 250)">
  <text x="0" y="0" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="700" fill="#FBF7EE">Lily&#8217;s Designs</text>
  <text x="0" y="62" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#9EE0B4" letter-spacing="3">BESPOKE ARABIC GREETING CARDS</text>
  <path d="M0 108 H420" stroke="${g}" stroke-width="2"/>
  <text x="0" y="168" font-family="Helvetica, Arial, sans-serif" font-size="27" fill="#CFE8D8">Weddings &#183; Eid &#183; Birthdays &#183; Corporate</text>
</g>
<rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="10" fill="none" stroke="${g}" stroke-width="2"/>
</svg>`;
}

/** Favicon — the wreath and sprig, tuned for 32px. */
export function faviconSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#1C4D33"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="#7FD69B" stroke-width="2"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return leaf(32 + Math.cos(a) * 22, 32 + Math.sin(a) * 22, 9, a + Math.PI / 2 + (i % 2 ? 0.6 : -0.6), '#7FD69B', 0.95);
  }).join('')}
  <path d="M32 44 Q25 34 26 24" fill="none" stroke="#9EE0B4" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M32 44 Q39 34 38 24" fill="none" stroke="#9EE0B4" stroke-width="2.4" stroke-linecap="round"/>
  ${bell(26, 28, 0.62, '#FFFFFF', '#9EE0B4')}${bell(38, 28, 0.62, '#FFFFFF', '#9EE0B4')}
  ${bell(32, 22, 0.55, '#FFFFFF', '#9EE0B4')}
</svg>`;
}
