/** Inline icon set. Stroke-based, 24px grid, inherits currentColor. */
const w = (d, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ${extra}>${d}</svg>`;

export const icons = {
  arrow:    w('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
  chevronL: w('<path d="m15 18-6-6 6-6"/>'),
  chevronR: w('<path d="m9 18 6-6-6-6"/>'),
  close:    w('<path d="M18 6 6 18M6 6l12 12"/>'),
  check:    w('<path d="M20 6 9 17l-5-5"/>'),
  checkCircle: w('<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5L15.5 10"/>'),
  globe:    w('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z"/>'),
  cart:     w('<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.2l2.3 12.1a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L20 7H5"/>'),
  expand:   w('<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-8 8"/><path d="M3 21l8-8"/>'),
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6a2 2 0 0 0 .3-.5.6.6 0 0 0 0-.5L9.2 6.6c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6 16 16 0 0 0 1.7.6 4.2 4.2 0 0 0 1.9.1 3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3Z"/><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 1 1 12 20.3Z"/></svg>',
  instagram: w('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>'),
  phone:    w('<path d="M21 16.9v2.5a2 2 0 0 1-2.2 2 19.4 19.4 0 0 1-8.5-3 19.1 19.1 0 0 1-5.9-5.9 19.4 19.4 0 0 1-3-8.6A2 2 0 0 1 3.4 2H6a2 2 0 0 1 2 1.7c.1 1 .3 1.8.6 2.7a2 2 0 0 1-.5 2.1L7 9.6a15 15 0 0 0 5.4 5.4l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/>'),
  mail:     w('<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 8.1 5.4a2 2 0 0 0 2.2 0L21.5 7"/>'),
  pin:      w('<path d="M20 10.4c0 5.3-8 12.1-8 12.1s-8-6.8-8-12.1a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10.2" r="2.8"/>'),
  clock:    w('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 1.9"/>'),
  star:     '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9Z"/></svg>',
  upload:   w('<path d="M21 15v3.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5V15"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M12 4v12"/>'),
  sparkle:  w('<path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5L3.5 11 10 9Z"/><path d="M19 3v3M17.5 4.5h3"/>'),
  palette:  w('<path d="M12 21a9 9 0 1 1 9-9c0 2-1.6 3-3.2 3H16a2 2 0 0 0-1.4 3.4A1.9 1.9 0 0 1 12 21Z"/><circle cx="7.6" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="9.8" cy="8" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.4" cy="7.6" r="1.1" fill="currentColor" stroke="none"/>'),
  pen:      w('<path d="M12.5 5.5 18 11 8.5 20.5 3 21l.5-5.5Z"/><path d="m15 3 6 6"/>'),
  print:    w('<path d="M6.5 9V3.5h11V9"/><rect x="3" y="9" width="18" height="7.5" rx="2"/><path d="M6.5 14h11v6.5h-11Z"/>'),
  truck:    w('<path d="M2.5 6.5h11v10h-11Z"/><path d="M13.5 10h4l3 3v3.5h-7Z"/><circle cx="7" cy="18.5" r="1.8"/><circle cx="17" cy="18.5" r="1.8"/>'),
  gift:     w('<rect x="3" y="8.5" width="18" height="12.5" rx="2"/><path d="M3 13h18M12 8.5V21"/><path d="M12 8.5S10.5 3 8 3a2.5 2.5 0 0 0 0 5.5Z"/><path d="M12 8.5S13.5 3 16 3a2.5 2.5 0 0 1 0 5.5Z"/>'),
  users:    w('<circle cx="9" cy="8" r="3.4"/><path d="M2.8 20a6.2 6.2 0 0 1 12.4 0"/><path d="M16 5.2a3.4 3.4 0 0 1 0 5.6"/><path d="M18 14.6A6.2 6.2 0 0 1 21.2 20"/>'),
  heart:    w('<path d="M12 20.5S3.5 15.2 3.5 9.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8.5 2.1c0 5.8-8.5 11.1-8.5 11.1Z"/>'),
  moon:     w('<path d="M20 14.4A8.5 8.5 0 0 1 9.6 4 8.6 8.6 0 1 0 20 14.4Z"/>'),
  cake:     w('<path d="M3.5 21h17v-6a2 2 0 0 0-2-2h-13a2 2 0 0 0-2 2Z"/><path d="M3.5 17c2 0 2-1.4 4-1.4s2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4"/><path d="M8 9.5V11M12 8v3M16 9.5V11"/><circle cx="8" cy="7.6" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="6" r=".9" fill="currentColor" stroke="none"/><circle cx="16" cy="7.6" r=".9" fill="currentColor" stroke="none"/>'),
  henna:    w('<path d="M7 13V6.6a1.3 1.3 0 0 1 2.6 0V11"/><path d="M9.6 10.4V5.3a1.3 1.3 0 0 1 2.6 0v5.1"/><path d="M12.2 10.6V6.2a1.3 1.3 0 0 1 2.6 0v5"/><path d="M14.8 11.4V8.4a1.3 1.3 0 0 1 2.5 0v5.9c0 3.4-2 6.2-5.2 6.2-3 0-5.1-2.3-5.1-5.3V13"/><path d="M7 13c-1.2-.9-2.4-1.9-2.4-3.1A1.2 1.2 0 0 1 6.5 9"/><circle cx="12" cy="15.6" r="1.15" fill="currentColor" stroke="none"/>'),
  cap:      w('<path d="m12 4 9.5 4.5L12 13 2.5 8.5Z"/><path d="M6.5 10.8v4.7c0 1.8 2.5 3 5.5 3s5.5-1.2 5.5-3v-4.7"/><path d="M21.5 8.5V14"/>'),
  building: w('<path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21"/><path d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21"/><path d="M2.5 21h19"/><path d="M7 8h4M7 12h4M7 16h4M17 14h1M17 17.5h1"/>'),
  baby:     w('<circle cx="12" cy="9" r="5"/><path d="M9.6 8.6h.01M14.4 8.6h.01"/><path d="M10.4 11.2a2.4 2.4 0 0 0 3.2 0"/><path d="M6.5 20.5a5.5 5.5 0 0 1 11 0"/>'),
  ring:     w('<circle cx="12" cy="14.5" r="5.5"/><path d="m9 8.5 3-5.5 3 5.5"/><path d="M9.2 8.7h5.6"/>'),
  monitor:  w('<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M9 20.5h6M12 16.5v4"/>'),
  layers:   w('<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>'),
  shield:   w('<path d="M12 2.5 20 6v6c0 5-3.4 8.2-8 9.5-4.6-1.3-8-4.5-8-9.5V6Z"/><path d="m8.8 12 2.2 2.2 4.2-4.2"/>'),
  card:     w('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19"/><path d="M6 14.5h4"/>'),
  cash:     w('<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9v6M18 9v6"/>'),
  bank:     w('<path d="m12 3 9 5H3Z"/><path d="M5 8v9M9.6 8v9M14.4 8v9M19 8v9"/><path d="M3 21h18"/>'),
  trash:    w('<path d="M4 6.5h16"/><path d="M9.5 6.5V4.8A1.3 1.3 0 0 1 10.8 3.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7"/><path d="M6.5 6.5 7.4 20a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-13.5"/>')
};

export const occasionIcon = {
  wedding: icons.ring,
  eid: icons.moon,
  birthday: icons.cake,
  graduation: icons.cap,
  henna: icons.henna,
  corporate: icons.building,
  newborn: icons.baby,
  thanks: icons.heart,
  other: icons.sparkle
};
