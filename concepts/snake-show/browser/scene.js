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
    moonmop(x, y, scale = 1, baby = {variant: 'lilac'}, pose = '') {
      this.creatureImages ||= new Map();
      const key = baby.variant + ':' + pose;
      if (!this.creatureImages.has(key)) {
        const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(MidnightNursery.art(baby, pose));
        this.creatureImages.set(key, img);
      }
      const img = this.creatureImages.get(key);
      if (img.complete && img.naturalWidth) this.ctx.drawImage(img, x - 130 * scale, y - 180 * scale, 260 * scale, 205 * scale);
    }
    pod(x, y, radius = 23) {
      this.ellipse(x, y, radius, radius, '#d3dcff44');
      this.moonmop(x, y + radius * .68, radius * 1.7 / 260);
      const c = this.ctx; c.beginPath(); c.arc(x, y, radius, 0, Math.PI * 2); c.strokeStyle = '#d2e5fa'; c.lineWidth = 2; c.stroke();
      this.line(x - radius * .5, y - radius * .57, x - radius * .64, y - radius * .1, '#ffffffdd', 2);
      this.rect(x - radius * .6, y + radius * .75, radius * 1.2, 4, 2, '#b2a0d4');
    }
    lantern(x, y, scale = 1) {
      this.line(x, y - 30 * scale, x, y, '#9584af', 2);
      this.ellipse(x, y + 10 * scale, 24 * scale, 26 * scale, '#f7cd6a12');
      this.rect(x - 8 * scale, y, 16 * scale, 20 * scale, 5 * scale, '#f6d38b');
      this.line(x - 9 * scale, y, x + 9 * scale, y, '#9b775f', 2);
    }
    tent(x, y, label, color = '#8877b0') {
      this.ellipse(x, y + 28, 70, 17, '#080c203d');
      this.rect(x - 65, y - 27, 130, 61, 6, '#4d466c');
      this.poly([[x - 80, y - 23], [x, y - 91], [x + 80, y - 23]], color, '#ba9bbf');
      this.poly([[x - 12, y - 30], [x + 12, y - 30], [x + 37, y + 33], [x - 37, y + 33]], '#ffe1a177');
      this.line(x, y - 91, x, y - 111, '#d1ad84', 2);
      this.poly([[x, y - 112], [x + 22, y - 105], [x, y - 97]], '#efd393');
      this.text(label, x, y + 57, 11, '#efe0fd', 750);
      this.lantern(x - 55, y - 20, .75); this.lantern(x + 55, y - 20, .75);
    }
    courtyard(game, view) {
      const c = this.ctx, live = game.phase === 'challenge';
      const sky = c.createLinearGradient(0, 0, 0, 650); sky.addColorStop(0, '#151b38'); sky.addColorStop(1, '#34324b');
      this.rect(0, 0, 1000, 650, 0, sky);
      for (let i = 0; i < 90; i++) this.ellipse((i * 131.73) % 980 + 10, (i * 79.9) % 620, i % 4 ? 1 : 1.8, i % 4 ? 1 : 1.8, '#d7cded77');
      this.ellipse(820, 62, 29, 29, '#f8e6b5'); this.ellipse(832, 51, 26, 26, '#19203c');
      this.text('T H E  M I D N I G H T  F A I R', 497, 57, 27, '#f5e7c8', 800);
      this.text('L A N T E R N S  ·  L I T T L E  F R I E N D S  ·  S E C R E T S', 497, 82, 10, '#c6b1d8', 650);
      this.rect( 60, 128, 880, 466, 48, '#323b4b', '#5b5574');
      this.rect( 80, 153, 840, 418, 37, '#766b8155');
      // The moon garden preserves the established walkable ring and rescue distances.
      this.rect(331, 201, 343, 300, 64, '#9c87ad');
      this.rect(342, 212, 321, 278, 57, '#344665');
      this.rect(354, 225, 296, 252, 49, '#465571');
      for (let i = 0; i < 15; i++) { const x = 374 + i * 71 % 256, y = 246 + i * 37 % 203; this.line(x, y, x + 18, y, '#c5bfe82d', 2); }
      this.ellipse(499, 359, 89, 37, '#c6b1cf'); this.ellipse(499, 352, 80, 30, '#f0dec7');
      this.moonmop(500, 349, .52, {variant:'lilac'}, 'sleep');
      this.text('THE MOON NURSERY', 500, 420, 13, '#f0e0fc', 750);
      this.text('A safe nest at the end of every route.', 500, 443, 10, '#c4c1dc', 500);
      for (let i = 0; i < 4; i++) {
        const pos = POSITIONS[i], s = game.stations[i];
        if (live && s) {
          this.tent(pos.x, pos.y - 19, s.name.toUpperCase());
          const near = Math.hypot(game.players[0].x - pos.x, game.players[0].y - pos.y) < 105;
          c.strokeStyle = near && !game.players[0].operated ? '#f6d991' : '#c9b1d888'; c.lineWidth = 2; c.setLineDash([6, 5]); c.beginPath(); c.ellipse(pos.x, pos.y + 10, 87, 55, 0, 0, Math.PI * 2); c.stroke(); c.setLineDash([]);
          this.text(s.state === 'catch' ? 'CATCH!' : s.delivered ? 'DELIVERED ✓' : 'RESCUE AREA', pos.x, pos.y + 76, 10, s.state === 'catch' ? '#ffe1a1' : '#cbb9dc', 750);
        } else this.tent(pos.x, pos.y - 17, ['PRACTICE WITH A BOT', 'MOONMOP LIFT', 'EXCHANGE GARDEN', 'MY NURSERY'][i], ['#8175a7', '#aa7796', '#628f91', '#887cb3'][i]);
      }
      for (const y of [298, 411]) for (const x of [291, 698]) { this.rect(x - 12, y, 24, 55, 6, '#af95a1'); this.rect(x - 10, y + 5, 20, 13, 4, '#e0b78d'); }
      for (const x of [113, 890]) for (const y of [190, 364, 552]) {
        this.line(x, y, x, y - 45, '#605976', 4); this.ellipse(x, y - 51, 27, 22, '#485a63'); this.ellipse(x - 14, y - 57, 20, 18, '#58706c'); this.lantern(x + 9, y - 33, .8);
      }
      for (let x = 117; x < 931; x += 85) { this.line(x, 119, x + 85, 122, '#9c86ad', 1); this.lantern(x + 42, 144, .75); }
      this.rect(410, 537, 174, 37, 9, '#66537d', '#c0a3c5'); this.text(live ? 'THE FAIR · RESCUE PATH' : 'ENTER A ROUND  ↗', 497, 560, 11, '#f6e4b6', 800);
      const cast = game.players.filter(p => p.active || game.phase === 'lobby').sort((a, b) => a.y - b.y);
      for (const p of cast) {
        let x = p.x, y = p.y;
        if (game.phase === 'lobby' && p.id !== 0) { x = 220 + (p.id % 4) * 181; y = p.id < 4 ? 187 : 546; }
        this.person(p, x, y, .87, p.id === 0 && game.mode !== 'watch', false, p.id === 0 && view.moving);
        this.nameplate(p, x, y + 12, p.id === 0 && game.mode !== 'watch', true);
        if (game.phase === 'lobby' && p.id === 0) {
          const baby = this.collection?.babies.find(b => b.id === this.collection.companion);
          if (view.moving) this.lastWalk = this.time;
          if (baby) this.moonmop(x - 41, y + 3 + (view.moving && !this.reduced ? Math.sin(this.time * 10) * 2 : 0), .23, baby, this.time - (this.lastWalk || 0) > 8 ? 'sleep' : '');
        }
        if (game.phase === 'lobby' && p.id === 1) this.moonmop(x + 35, y + 5, .22, this.collection?.botBabies[0]);
      }
      if (view.destination) { c.strokeStyle = '#f0d095'; c.lineWidth = 2; c.beginPath(); c.ellipse(view.destination.x, view.destination.y, 9, 5, 0, 0, Math.PI * 2); c.stroke(); }
    }
    lift(game, index) { root.drawPrizeLift(this, game, index); }
    voteStage(game) {
      this.rect(0, 0, 1000, 650, 0, '#20233e');
      this.rect(65, 50, 870, 490, 24, '#343553');
      for (let i = 0; i < 9; i++) this.poly([[i * 125 - 80, 0], [i * 125 + 40, 0], [i * 125 + 190, 570], [i * 125 - 160, 570]], i % 2 ? '#72985709' : '#e3d98308');
      this.rect(255, 78, 490, 120, 12, '#222139', '#939a63');
      const title = game.phase === 'casting' ? 'WELCOME TO THE FAIR' : game.phase === 'finale' ? 'THE FINAL REVEAL' : game.phase === 'evidence' ? 'THE CLUES ARE READY' : game.phase === 'result' ? 'THE VOTES ARE IN' : game.phase === 'runoff' ? 'ONE MORE VOTE' : 'TRUST YOUR INSTINCT';
      this.text('T H E  M I D N I G H T  F A I R', 500, 119, 16, '#cab2e0', 800); this.text(title, 500, 161, 25, '#f3e8bb', 800);
      this.ellipse(500, 522, 420, 44, '#1b1c35'); this.rect(90, 446, 820, 62, 9, '#7e7195'); this.rect(90, 445, 820, 13, 4, '#ba9bbb'); this.rect(118, 508, 764, 21, 4, '#534b6c');
      game.players.forEach((p, i) => {
        const x = 147 + i * 101, active = p.active || game.phase === 'finale' || game.phase === 'casting';
        this.rect(x - 36, 374, 72, 75, 7, active ? '#75658c' : '#3b3851'); this.rect(x - 36, 373, 72, 9, 3, active ? '#af91c0' : '#6a597b');
        if (active) this.person(p, x, 371, 1.45, p.id === 0 && game.mode !== 'watch');
        this.text(String(i + 1).padStart(2, '0'), x, 405, 20, '#e7dfa8', 800); this.text(p.name, x, 430, 11, '#e9e5c1', 700);
        if (!p.active || game.phase === 'finale') this.text(p.role.toUpperCase(), x, 478, 10, p.role === 'Trickster' ? '#e9ad77' : '#d3c0ed', 800);
      });
      if (game.phase === 'result' && game.lastVote) {
        const id = game.lastVote.removed;
        this.text(id === null ? 'DEADLOCK · EVERYONE STAYS' : `${game.players[id].name.toUpperCase()} RESTS THIS ROUND · ${game.players[id].role.toUpperCase()}`, 500, 579, 22, '#eaddac', 750);
      } else this.text(game.phase === 'evidence' ? 'Observe the action. Make your own call.' : game.phase === 'casting' ? 'Six Keepers. Two Tricksters. One little Moonmop.' : 'Eight faces. A few very good secrets.', 500, 579, 16, '#d7dfb2', 500);
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
