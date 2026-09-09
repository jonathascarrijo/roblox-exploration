/* Original canvas artwork. The renderer reads physical/public state only. */
(function (root) {
  'use strict';
  const { CAST, POSITIONS, clamp, shares, mean, gradient, needle } = root.SnakeShow;
  class Scene {
    constructor(canvas) { this.canvas = canvas; this.ctx = canvas.getContext('2d'); this.time = 0; this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; }
    rect(x, y, w, h, r, color, stroke) {
      const c = this.ctx; c.beginPath(); c.roundRect(x, y, w, h, r); c.fillStyle = color; c.fill();
      if (stroke) { c.strokeStyle = stroke; c.lineWidth = 1.5; c.stroke(); }
    }
    ellipse(x, y, rx, ry, color) { const c = this.ctx; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fillStyle = color; c.fill(); }
    line(x, y, xx, yy, color, width = 2, dash = []) {
      const c = this.ctx; c.beginPath(); c.setLineDash(dash); c.moveTo(x, y); c.lineTo(xx, yy); c.strokeStyle = color; c.lineWidth = width; c.stroke(); c.setLineDash([]);
    }
    poly(points, fill, stroke) {
      const c = this.ctx; c.beginPath(); points.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fillStyle = fill; c.fill();
      if (stroke) { c.strokeStyle = stroke; c.lineWidth = 2; c.stroke(); }
    }
    text(text, x, y, size = 12, color = '#193c34', weight = 600, align = 'center') {
      const c = this.ctx; c.font = `${weight} ${size}px "Segoe UI",sans-serif`; c.fillStyle = color; c.textAlign = align; c.fillText(text, x, y);
    }
    palm(x, y, scale = 1) {
      const c = this.ctx; c.save(); c.translate(x, y); c.scale(scale, scale);
      this.ellipse(25, 27, 35, 13, '#233b3421'); this.line(0, 15, -7, -28, '#9b8650', 10); this.line(-7, -28, -5, -42, '#b2a066', 8);
      for (let i = 0; i < 7; i++) { c.save(); c.translate(-5, -42); c.rotate(i * Math.PI * 2 / 7 + .2); this.poly([[0, 0], [20, -18], [60, -7], [37, -4], [10, 6]], i % 2 ? '#5e7950' : '#385f43'); this.line(0, 0, 47, -7, '#a0ac643f', 1.5); c.restore(); }
      c.restore();
    }
    person(p, x, y, scale = 1, you = false, lever = false, moving = false) {
      const c = this.ctx; c.save(); c.translate(x, y); c.scale(scale, scale);
      const sway = moving && !this.reduced ? Math.sin(this.time * 9 + p.id) * 3 : 0;
      this.ellipse(5, 6, 18, 7, '#243e3630');
      if (you) { c.strokeStyle = '#fdfadd'; c.lineWidth = 2; c.beginPath(); c.ellipse(0, 5, 21, 9, 0, 0, Math.PI * 2); c.stroke(); }
      this.rect(-10, -9 + sway, 8, 15, 3, '#30433c'); this.rect(3, -9 - sway, 8, 15, 3, '#30433c');
      this.rect(-13, -29, 27, 24, 7, p.color); this.rect(-17, -25, 6, lever ? 9 : 19, 3, p.color); this.rect(12, -25, 6, lever ? 9 : 19, 3, p.color);
      this.ellipse(0, -39, 14, 16, p.hair); this.rect(-11, -46, 23, 20, 8, '#ebbf91');
      this.poly([[-12, -43], [-10, -54], [8, -54], [13, -46], [4, -48], [-2, -44]], p.hair);
      this.ellipse(-4, -37, 1.4, 1.9, '#343b2b'); this.ellipse(5, -37, 1.4, 1.9, '#343b2b'); this.line(-2, -31, 3, -31, '#956b4d', 1.2);
      if (p.id % 3 === 1) { this.line(-10, -39, 11, -39, '#313f37', 1.5); this.rect(-8, -41, 7, 6, 2, '#f1daab22', '#384738'); this.rect(3, -41, 7, 6, 2, '#f1daab22', '#384738'); }
      if (you) this.poly([[-5, -66], [5, -66], [0, -59]], '#c85836');
      c.restore();
    }
    nameplate(p, x, y, you = false, small = false) {
      const label = `${String(p.id + 1).padStart(2, '0')} ${p.name}${you ? ' · YOU' : ' · BOT'}`;
      const w = label.length * (small ? 5 : 5.8) + 15;
      this.rect(x - w / 2, y, w, 21, 5, you ? '#fff3d5' : '#1d4039e8');
      this.text(label, x, y + 14, small ? 9 : 10, you ? '#823e29' : '#edf1da', 650);
    }
    umbrella(x, y, r, color) {
      this.ellipse(x + 17, y + 24, r, r * .42, '#31482e24'); this.line(x, y, x, y + 30, '#9a8860', 4);
      const pts = Array.from({ length: 8 }, (_, i) => [x + Math.cos(i * Math.PI / 4) * r, y + Math.sin(i * Math.PI / 4) * r * .55]);
      this.poly(pts, color, '#fff6d2'); for (const point of pts) this.line(x, y, ...point, '#fff7dd80', 1.5); this.ellipse(x, y, 3, 2, '#fff5ce');
    }
    camera(x, y, flip = false) {
      const c = this.ctx; c.save(); c.translate(x, y); if (flip) c.scale(-1, 1);
      this.line(0, 0, -10, 30, '#536057', 3); this.line(0, 0, 10, 30, '#536057', 3); this.line(0, 0, 1, 33, '#536057', 3);
      this.rect(-12, -17, 25, 17, 3, '#3e5046'); this.poly([[13, -14], [24, -19], [24, 0], [13, -3]], '#243e35'); this.ellipse(-4, -9, 2, 2, '#e98255'); c.restore();
    }
    treasure(x, y, scale = 1) {
      const c = this.ctx; c.save(); c.translate(x, y); c.scale(scale, scale);
      this.ellipse(0, 12, 20, 7, '#25473820'); this.rect(-18, -25, 36, 40, 13, '#f8efbdbf', '#fff9d2');
      this.poly([[-12, -5], [-7, -17], [1, -9], [9, -19], [13, -4], [10, 5], [-9, 5]], '#e9ad37', '#b7842c');
      this.rect(-11, 4, 22, 5, 2, '#f4ca63'); this.ellipse(0, -3, 3, 3, '#699f87'); this.line(-12, -18, -12, -9, '#fff9df', 2);
      c.restore();
    }
    courtyard(game, view) {
      const c = this.ctx;
      this.rect(0, 0, 1000, 650, 0, '#92a778'); this.rect(48, 107, 908, 494, 30, '#567553');
      this.rect(65, 120, 870, 464, 25, '#d5d2ad'); this.rect(76, 130, 849, 439, 20, '#e8dfbe');
      c.save(); c.beginPath(); c.roundRect(76, 130, 849, 439, 20); c.clip();
      for (let x = 50; x < 960; x += 49) for (let y = 115; y < 590; y += 33) { this.rect(x + (Math.floor(y / 33) % 2) * 24, y, 47, 31, 1, '#e9e0bf', '#ddd3b12e'); }
      c.restore();
      // Terraced villa and the show sign.
      this.rect(144, 32, 737, 112, 8, '#6b6e492b'); this.rect(132, 13, 735, 118, 8, '#f3e8c5');
      this.poly([[118, 13], [147, 0], [852, 0], [883, 13]], '#ad7452'); this.rect(132, 14, 735, 15, 0, '#d7c7a0');
      for (const x of [164, 227, 697, 760]) { this.rect(x, 49, 43, 62, 22, '#476c5c'); this.rect(x + 5, 54, 33, 49, 16, '#8caa83'); this.line(x + 21, 56, x + 21, 104, '#dfd6b7', 3); this.line(x + 5, 78, x + 37, 78, '#dfd6b7', 3); }
      this.rect(305, 25, 383, 99, 8, '#234c3d'); this.rect(317, 35, 359, 78, 4, '#2e5b47', '#b6ba74');
      this.text('S N A K E  S H O W', 497, 74, 28, '#f2e9b9', 800); this.text('T H E   V I L L A', 498, 97, 10, '#c4d9a4', 650);
      this.rect(329, 123, 337, 10, 3, '#d2c6a0'); this.rect(313, 133, 369, 9, 3, '#c9bc99'); this.rect(303, 143, 389, 8, 3, '#baaf8f');
      // Inset ornamental pool keeps the villa's visual identity; lift pits are lava.
      this.rect(331, 201, 343, 300, 64, '#cec79f'); this.rect(343, 211, 320, 278, 57, '#fff0c8');
      this.rect(352, 220, 302, 260, 50, '#6eab9b'); this.rect(359, 227, 288, 244, 45, '#78b8a4');
      c.save(); c.beginPath(); c.roundRect(359, 227, 288, 244, 45); c.clip();
      for (let y = 242; y < 480; y += 24) for (let x = 365; x < 650; x += 40) {
        const drift = this.reduced ? 0 : Math.sin(this.time * .6 + y) * 4;
        this.line(x + drift, y, x + 23 + drift, y - 3, '#bbe2bc42', 2);
      }
      c.restore();
      this.ellipse(500, 352, 59, 24, '#276b6030'); this.ellipse(493, 341, 47, 24, '#ebd297'); this.ellipse(493, 337, 40, 19, '#f6ebbf');
      this.treasure(493, 324, 1.3);
      this.text('THE TREASURE POOL', 500, 443, 10, '#295f50', 750);
      for (const x of [284, 686]) for (const y of [253, 421]) { this.rect(x, y, 29, 64, 8, '#b8ac83'); this.rect(x - 1, y - 3, 27, 60, 6, '#f7edd0'); this.rect(x + 2, y + 2, 21, 15, 4, '#d1bc86'); }
      const live = game.phase === 'challenge';
      for (let i = 0; i < 4; i++) {
        const pos = POSITIONS[i], s = game.stations[i];
        this.rect(pos.x - 62, pos.y - 43, 124, 53, 10, '#baac83');
        this.rect(pos.x - 58, pos.y - 46, 116, 47, 8, '#6d7653');
        this.rect(pos.x - 49, pos.y - 38, 98, 27, 5, '#d57d46');
        this.line(pos.x - 42, pos.y - 28, pos.x + 39, pos.y - 31, '#eeb160', 3);
        this.rect(pos.x - 46, pos.y - 21, 92, 9, 3, '#e0c88e');
        if (live && s) {
          const near = Math.hypot(game.players[0].x - pos.x, game.players[0].y - pos.y) < 105;
          c.strokeStyle = near && !game.players[0].operated ? '#fff2b9' : '#456d4b55'; c.lineWidth = 2; c.setLineDash([6, 5]); c.beginPath(); c.ellipse(pos.x, pos.y + 10, 87, 55, 0, 0, Math.PI * 2); c.stroke(); c.setLineDash([]);
          this.text(s.name.toUpperCase(), pos.x, pos.y - 63, 11, '#2e5038', 800);
          this.text(s.state === 'catch' ? 'CATCH!' : s.delivered ? 'DELIVERED ✓' : 'RESCUE AREA', pos.x, pos.y + 66, 10, s.state === 'catch' ? '#b44929' : '#577453');
        } else {
          this.text(i === 0 ? 'PRACTICE' : i === 1 ? 'PRIZE LIFT' : i === 2 ? 'BACKSTAGE' : 'PRIZE LIFT', pos.x, pos.y - 60, 10, '#496342', 800);
          this.treasure(pos.x, pos.y - 36, .52);
        }
      }
      this.umbrella(130, 305, 41, '#ca885e'); this.umbrella(872, 356, 42, '#e2c085');
      this.camera(299, 187); this.camera(696, 177, true); this.camera(131, 539);
      this.palm(89, 168, 1.12); this.palm(906, 164, 1.12); this.palm(89, 554, 1.08); this.palm(918, 552, 1.08);
      this.rect(410, 537, 174, 37, 9, '#254f3f'); this.text(live ? 'THE VILLA · ON AIR' : 'JOIN THE SHOW  ↗', 497, 560, 11, '#f1e5b1', 800);
      let cast = game.players.filter(p => p.active || game.phase === 'lobby');
      cast = [...cast].sort((a, b) => a.y - b.y);
      for (const p of cast) {
        let x = p.x, y = p.y;
        if (game.phase === 'lobby' && p.id !== 0) { x = 220 + (p.id % 4) * 181 + Math.sin(this.time * .27 + p.id * 3) * 16; y = p.id < 4 ? 187 : 551 + Math.cos(this.time * .3 + p.id) * 9; }
        this.person(p, x, y, .87, p.id === 0 && game.mode !== 'watch', false, p.id === 0 && view.moving);
        this.nameplate(p, x, y + 12, p.id === 0 && game.mode !== 'watch', true);
      }
      if (view.destination) { c.strokeStyle = '#b36339'; c.lineWidth = 2; c.beginPath(); c.ellipse(view.destination.x, view.destination.y, 9, 5, 0, 0, Math.PI * 2); c.stroke(); }
      this.poly([[0, 0], [1000, 0], [1000, 650], [970, 650], [966, 81], [29, 90], [30, 650], [0, 650]], '#1c3c3120');
    }
    lift(game, index) { root.drawPrizeLift(this, game, index); }
    voteStage(game) {
      this.rect(0, 0, 1000, 650, 0, '#234737');
      this.rect(65, 50, 870, 490, 24, '#315741');
      for (let i = 0; i < 9; i++) this.poly([[i * 125 - 80, 0], [i * 125 + 40, 0], [i * 125 + 190, 570], [i * 125 - 160, 570]], i % 2 ? '#72985709' : '#e3d98308');
      this.rect(255, 78, 490, 120, 12, '#173a2f', '#939a63');
      const title = game.phase === 'casting' ? 'WELCOME TO THE CAST' : game.phase === 'finale' ? 'THE FINAL REVEAL' : game.phase === 'evidence' ? 'THE CAMERAS WERE ROLLING' : game.phase === 'result' ? 'THE VOTES ARE IN' : game.phase === 'runoff' ? 'ONE MORE VOTE' : 'TRUST YOUR INSTINCT';
      this.text('S N A K E   S H O W', 500, 119, 16, '#c1d690', 800); this.text(title, 500, 161, 25, '#f3e8bb', 800);
      this.ellipse(500, 522, 420, 44, '#16362c'); this.rect(90, 446, 820, 62, 9, '#aeaa75'); this.rect(90, 445, 820, 13, 4, '#dad09c'); this.rect(118, 508, 764, 21, 4, '#767f53');
      game.players.forEach((p, i) => {
        const x = 147 + i * 101, active = p.active || game.phase === 'finale' || game.phase === 'casting';
        this.rect(x - 36, 374, 72, 75, 7, active ? '#5a7650' : '#364f3b'); this.rect(x - 36, 373, 72, 9, 3, active ? '#a4b373' : '#516745');
        if (active) this.person(p, x, 371, 1.45, p.id === 0 && game.mode !== 'watch');
        this.text(String(i + 1).padStart(2, '0'), x, 405, 20, '#e7dfa8', 800); this.text(p.name, x, 430, 11, '#e9e5c1', 700);
        if (!p.active || game.phase === 'finale') this.text(p.role.toUpperCase(), x, 478, 10, p.role === 'Snake' ? '#e9ad77' : '#d5e795', 800);
      });
      if (game.phase === 'result' && game.lastVote) {
        const id = game.lastVote.removed;
        this.text(id === null ? 'DEADLOCK · EVERYONE STAYS' : `${game.players[id].name.toUpperCase()} LEAVES THE SHOW · ${game.players[id].role.toUpperCase()}`, 500, 579, 22, '#eaddac', 750);
      } else this.text(game.phase === 'evidence' ? 'Observe the action. Make your own call.' : game.phase === 'casting' ? 'Six Loyals. Two Snakes. One unforgettable episode.' : 'Eight faces. A few very good secrets.', 500, 579, 16, '#d7dfb2', 500);
      if (['result', 'finale'].includes(game.phase)) for (let i = 0; i < 55; i++) {
        const x = (i * 137.5) % 1000, y = this.reduced ? (i * 83) % 550 : (this.time * (17 + i % 5) + i * 73) % 550;
        this.rect(x, y, 5, 9, 1, ['#d4c771', '#c87d54', '#a1bd81', '#e6d5a6'][i % 4]);
      }
    }
    draw(game, view, time) {
      this.time = time;
      const isLift = ['challenge', 'practice-result'].includes(game.phase) && view.camera !== 'villa';
      const ratio = Math.min(2, devicePixelRatio || 1), width = Math.round(this.canvas.clientWidth * ratio), height = Math.round(width * (isLift ? 1 : .65));
      if (this.canvas.width !== width || this.canvas.height !== height) { this.canvas.width = width; this.canvas.height = height; }
      this.ctx.setTransform(width / (isLift ? 650 : 1000), 0, 0, height / 650, 0, 0);
      if (game.phase === 'lobby' || game.phase === 'challenge' && view.camera === 'villa') this.courtyard(game, view);
      else if (['challenge', 'practice-result'].includes(game.phase)) this.lift(game, view.station);
      else this.voteStage(game);
    }
  }
  root.SnakeScene = Scene;
})(globalThis);
