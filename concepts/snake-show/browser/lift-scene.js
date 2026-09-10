/* Mechanical view follows the coupled-cables prototype's ruler and rigid tray. */
(function (root) {
  'use strict';
  root.drawPrizeLift = function (scene, game, index) {
    const s = game.stations[index]; if (!s) return;
    const { FIXED: F, catchGeometry } = LiftSettings;
    const { clamp, mean, shares, needle } = SnakeShow;
    const c = scene.ctx, P = game.settings, weights = shares(s), center = 325, base = 365, scale = 100, half = P.width / 2;
    const X = x => center + x * scale, Y = h => base - h * scale;
    const active = s.state === 'lifting', fault = s.state === 'catch';
    scene.rect(0, 0, 650, 650, 0, '#272940');
    scene.text('MOONMOP LIFT · TWO CABLES, ONE LITTLE FRIEND', 27, 27, 12, '#c0b0d3', 750, 'left');
    scene.text(`${game.timerClock().toFixed(1)}s / 45s`, 624, 27, 12, '#c0b0d3', 600, 'right');
    const angle = Math.atan2(s.h[1] - s.h[0], P.width), cy = mean(s.h);
    // Both axes use the same scale. The tray rotates at a constant length, and
    // its cable attachment points move inward as in the reference model.
    const pts = [[X(-half * Math.cos(angle)), Y(cy - half * Math.sin(angle))], [X(half * Math.cos(angle)), Y(cy + half * Math.sin(angle))]];
    scene.line(108, Y(F.finish), 108, Y(F.lava), '#a4ad96', 1);
    for (const h of [-1, 0, 1, 2]) {
      const y = Y(h); scene.line(102, y, 115, y, '#6d8068', 1.5);
      scene.text(h === 0 ? 'start' : `${h > 0 ? '+' : ''}${h}`, 92, y + 4, 12, '#b6a9c7', 500, 'right');
      scene.line(122, y, 535, y, '#46435b', 1, [3, 6]);
    }
    scene.line(114, Y(F.finish), 518, Y(F.finish), '#ac8b37', 1.5, [7, 6]);
    scene.text('MOON NEST', 528, Y(F.finish) + 4, 11, '#e6ca89', 650, 'left');
    scene.poly([[115, Y(cy)], [123, Y(cy) - 5], [123, Y(cy) + 5]], '#268477');
    scene.rect(92, Y(F.lava), 464, 14, 0, '#f0c4a2');
    scene.line(92, Y(F.lava), 556, Y(F.lava), '#b86b3d', 2);
    scene.text('THEATRICAL LAVA · safety boundary', 100, Y(F.lava) + 29, 11, '#9a5c38', 650, 'left');
    scene.text('Protective pods enter the housing safely. Both routes lead to a nursery.', 325, Y(F.lava) + 47, 10, '#c5b4d4', 500);
    scene.rect(X(-half) - 45, 53, P.width * scale + 90, 8, 0, '#b9acd0');
    s.ids.forEach((id, i) => {
      const p = game.players[id], drumX = X(i ? half : -half), drumY = 57;
      const load = clamp(weights[i], 0, 1), on = active && s.held[i];
      scene.line(drumX, drumY, pts[i][0], pts[i][1], '#b9acd0', 1.5 + load * 4);
      scene.ellipse(drumX, drumY, 11, 11, on ? '#368675' : '#272940');
      c.strokeStyle = '#b9acd0'; c.lineWidth = 2; c.beginPath(); c.arc(drumX, drumY, 11, 0, Math.PI * 2); c.stroke();
      scene.line(drumX, drumY, drumX, drumY + 11, on ? '#f6efca' : '#b9acd0', 2);
      const labelX = drumX + (i ? 53 : -53);
      scene.text(`MOTOR ${i + 1} · ${id === 0 && game.mode !== 'watch' ? 'YOU' : p.name.toUpperCase()}`, labelX, 44, 11, '#e0cdeb', 750);
      scene.text(`load ${Math.round(load * 100)}%`, labelX, 80, 12, '#c3b3d2', 650);
      scene.text(on ? 'ON ↑' : 'off ↓', labelX, 96, 11, on ? '#9cdec8' : '#b6a9c7', 650);
    });
    c.save(); c.translate(X(0), Y(cy)); c.rotate(-angle);
    scene.rect(-scale * half, 0, scale * P.width, 8, 0, '#eee5c5', '#b9acd0');
    if (!['reload', 'lava', 'timeout', 'catch'].includes(s.state)) {
      const prizeX = s.x * half * scale;
      scene.pod(prizeX, -F.r * scale, F.r * scale);
    }
    c.restore();
    if (fault) {
      const tau = clamp((game.timerClock('catch') - s.catchAt) / P.catchWin, 0, 1);
      const px = s.x * half * Math.cos(angle) - F.r * Math.sin(angle);
      const py = cy + s.x * half * Math.sin(angle) + F.r * Math.cos(angle);
      scene.pod(X(px), Y(py - (py - (F.lava + .18)) * tau * tau), F.r * scale);
      const zone = catchGeometry(P), tx = 208, tw = 234, ty = 505;
      scene.rect(tx, ty, tw, 15, 1, '#f5f0dc', '#ab8958'); scene.rect(tx + tw * zone.start, ty, tw * zone.width, 15, 0, '#e5b344');
      scene.line(tx + needle(s, game.timerClock('catch')) * tw, ty - 5, tx + needle(s, game.timerClock('catch')) * tw, ty + 20, '#244e3d', 3);
      scene.text('CATCH', tx - 13, ty + 13, 12, '#a05836', 750, 'right');
      scene.text(`${Math.max(0, P.catchWin - game.timerClock('catch') + s.catchAt).toFixed(1)}s`, tx + tw + 12, ty + 13, 12, '#6e754e', 600, 'left');
    }
    // Opaque housing always occludes the pod before the theatrical lava, armed or not.
    scene.rect(92, Y(F.lava) - 20, 464, 22, 6, '#877b9e', '#c9b8d5');
    scene.rect(177, Y(F.lava) - 19, 296, 7, 3, '#232238');
    scene.text('PROTECTED COLLECTION HOUSING', 325, Y(F.lava) - 4, 9, '#f2e6fa', 700);
    const tilt = angle * 180 / Math.PI;
    scene.text(`tilt ${tilt.toFixed(1)}°`, 546, 467, 13, Math.abs(tilt) > 8 ? '#aa673a' : '#b6cbca', 650, 'right');
    scene.text(fault ? 'falling' : Math.abs(s.x) < .05 ? 'pod centered' : `pod ${Math.abs(s.x * half).toFixed(2)}u ${s.x > 0 ? 'right' : 'left'}`, 546, 486, 11, '#b6a9c7', 500, 'right');
    // Spotter presence: the contestant without a console, when inside this rescue area.
    const spotter = game.spotter === null || game.spotter === undefined ? null : game.players[game.spotter];
    if (spotter?.active && game.nearStation(spotter.id) === s) {
      scene.person(spotter, 585, 300, .8, spotter.id === 0 && game.mode !== 'watch');
      scene.text('SPOTTER', 585, 322, 9, '#68795c', 650);
    }
    const banner = s.delivered ? 'MOONMOP IN THE MOON NEST · +1' : s.state === 'reload' ? `RELOAD IN ${Math.ceil(s.reloadAt - game.timerClock('reload'))}s` : s.state === 'lava' ? 'POD SAFE · LIFT FAILED' : s.state === 'timeout' ? 'TIME IS UP' : '';
    if (banner) { scene.rect(140, 199, 370, 39, 6, '#eef0dc', '#bdc8a8'); scene.text(banner, 325, 224, 14, '#486c47', 750); }
  };
})(globalThis);
