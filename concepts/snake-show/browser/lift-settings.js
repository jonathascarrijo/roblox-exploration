/* One definition for the live physics, sliders, readouts, and exported drafts. */
(function (root) {
  'use strict';
  const FIXED = Object.freeze({ mp: 2, mw: .6, r: .15, edge: 1, lava: -1.8, finish: 2.6, top: 2.8, dmax: 1.6, limit: 45, zoneAt: .6 });
  const DEFAULTS = Object.freeze({ width: 2, botSkill: 75, force: 1.7, vup: .2, vdown: .2, g: 1.5, ballW: 1, cw: 4, roll: 1.2, cb: .1, mus: .02, muk: .05, x0: .5, pulse: .15, rigForce: 2, rigDown: 2, rigTime: 5, catchWin: 3, catchZone: .25, rigHold: 1.5 });
  const SLIDERS = [
    ['width', 'Frame', 'Winch width', .8, 3, .1, 1, 'u · cable span', 'Resizes the frame and tray live. Narrower spans tilt more for the same cable-height difference.'],
    ['botSkill', 'Bots', 'Bot skill', 0, 100, 5, 0, '%', 'Higher means quicker reactions, steadier centering, and better Catch timing. Catch changes start with the next fall.'],
    ['force', 'Motors', 'Motor force', 1, 3, .05, 2, '× balanced load', '1× holds a centered load. The heavier end needs more force.'],
    ['vup', 'Motors', 'Motor top speed', .05, 2, .05, 2, 'u/s', 'Maximum upward cable speed. Rig multiplies this limit.'],
    ['vdown', 'Motors', 'Fall speed cap', .05, 2, .05, 2, 'u/s', 'Maximum downward cable speed. Rig multiplies this limit.'],
    ['cw', 'Motors', 'Winch drag', 0, 8, .1, 1, '', 'Resistance to cable motion. More drag lowers the settled speed.'],
    ['g', 'Motors', 'Gravity', 1, 5, .1, 1, 'u/s²', 'Scales the load on each cable and the pod’s slide.'],
    ['pulse', 'Motors', 'Tap pulse', .05, .5, .05, 2, 's', 'Minimum motor-on time for a quick tap.'],
    ['ballW', 'Pod', 'Pod weight', .3, 3, .1, 1, '× tray weight', 'A heavier pod increases the difference between cable loads.'],
    ['roll', 'Pod', 'Slide response', .2, 2, .1, 2, '× slope', 'How strongly tilt accelerates the pod.'],
    ['cb', 'Pod', 'Slide drag', 0, 3, .1, 1, '', 'Speed-dependent resistance to the sliding pod.'],
    ['mus', 'Pod', 'Static friction', 0, .6, .01, 2, '', 'The pod holds still until tilt × slide response exceeds this.'],
    ['muk', 'Pod', 'Sliding friction', 0, .6, .01, 2, '', 'Constant resistance after the pod starts sliding.'],
    ['x0', 'Pod', 'Start offset', .1, .8, .05, 2, 'half-lengths', 'Applies to the next pod or practice restart; does not move a live pod.'],
    ['rigForce', 'Rig & Catch', 'Rig force multiplier', 1, 4, .1, 1, '×', 'Multiplies the armed motor’s force and upward speed cap.'],
    ['rigDown', 'Rig & Catch', 'Rig pull-down multiplier', 1, 4, .1, 1, '×', 'Multiplies cable weight and the downward speed cap, held or released.'],
    ['rigTime', 'Rig & Catch', 'Rig duration', .5, 6, .1, 1, 's', 'Burst duration measured from arming. Also updates a current burst.'],
    ['catchWin', 'Rig & Catch', 'Catch window', 1, 6, .5, 1, 's', 'Total falling time, with two needle passes. Also updates a current fall.'],
    ['catchZone', 'Rig & Catch', 'Catch zone per pass', .1, 1.5, .05, 2, 's', 'Requested time inside the zone. Limited by the space after the 60% mark.'],
    ['rigHold', 'Episode rule', 'Hold to arm Rig', .25, 3, .25, 2, 's', 'Additional game setting. One shared team attempt still applies.']
  ].map(([key, group, label, min, max, step, digits, unit, note]) => Object.freeze({ key, group, label, min, max, step, digits, unit, note }));
  function normalize(values = {}, strict = false) {
    if (!values || typeof values !== 'object' || Array.isArray(values)) throw new Error('Settings must be a JSON object.');
    if (strict && Object.keys(values).some(key => !Object.hasOwn(DEFAULTS, key))) throw new Error('The draft contains an unknown setting.');
    const result = { ...DEFAULTS };
    for (const spec of SLIDERS) if (Object.hasOwn(values, spec.key)) {
      const value = values[spec.key];
      if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error(`${spec.label} must be a finite number.`);
      if (strict && (value < spec.min || value > spec.max)) throw new Error(`${spec.label} must be between ${spec.min} and ${spec.max}.`);
      result[spec.key] = Math.max(spec.min, Math.min(spec.max, value));
    }
    return result;
  }
  function catchGeometry(settings) {
    const pass = settings.catchWin / 2, width = Math.min(1 - FIXED.zoneAt, settings.catchZone / pass);
    return { start: FIXED.zoneAt, width, seconds: width * pass, center: FIXED.zoneAt + width / 2, pass };
  }
  function speeds(settings, share = .5, corners = 2) {
    const mass = FIXED.mp / corners + FIXED.mp * settings.ballW * share;
    const weight = settings.g * mass, force = settings.force * settings.g * FIXED.mp * (1 + settings.ballW) / corners;
    return { up: force <= weight ? 0 : settings.cw > .05 ? Math.min(settings.vup, (force - weight) / settings.cw) : settings.vup,
      down: settings.cw > .05 ? Math.min(settings.vdown, weight / settings.cw) : settings.vdown };
  }
  const dutyCache = new Map();
  function neededDuty(settings, share = .5, corners = 2) {
    // Same pulsed-motor estimate as the prototype: five 0.4s cycles, one warm-up.
    const q = Math.round(Math.max(0, Math.min(1, share)) * 50) / 50;
    const key = [settings.force, settings.g, settings.ballW, settings.cw, settings.vup, settings.vdown, q, corners].join('|');
    if (dutyCache.has(key)) return dutyCache.get(key);
    const mass = FIXED.mp / corners + FIXED.mp * settings.ballW * q;
    const weight = settings.g * mass, force = settings.force * settings.g * FIXED.mp * (1 + settings.ballW) / corners, dt = 1 / 120;
    const drift = duty => {
      let v = 0, y = 0;
      for (let i = 0; i < 240; i++) {
        v = Math.max(-settings.vdown, Math.min(settings.vup, v + (((i * dt) % .4 < duty * .4 ? force : 0) - weight - settings.cw * v) / (mass + FIXED.mw) * dt));
        if (i >= 48) y += v * dt;
      }
      return y;
    };
    let result = 1.01;
    if (drift(1) > 0) { let low = 0, high = 1; for (let i = 0; i < 10; i++) { const mid = (low + high) / 2; if (drift(mid) > 0) high = mid; else low = mid; } result = (low + high) / 2; }
    if (dutyCache.size > 1000) dutyCache.clear(); dutyCache.set(key, result); return result;
  }
  function exportDraft(settings) { return JSON.stringify({ version: 1, settings: normalize(settings, true) }, null, 2); }
  function importDraft(text) {
    let draft; try { draft = JSON.parse(text); } catch { throw new Error('Paste valid JSON from an exported lift draft.'); }
    if (!draft || draft.version !== 1 || !draft.settings) throw new Error('Expected a version 1 lift draft with settings.');
    return normalize(draft.settings, true);
  }
  const api = { FIXED, DEFAULTS, SLIDERS, normalize, catchGeometry, speeds, neededDuty, exportDraft, importDraft };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.LiftSettings = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
