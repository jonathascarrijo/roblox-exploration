(function (root) {
  'use strict';
  const { art, shade, esc, PALETTE, BADGES } = MidnightNursery;
  root.mountNursery = function (collection, hooks) {
    const dialog = document.getElementById('nurseryDialog'), body = document.getElementById('nurseryBody');
    let tab = 'babies', selected = null, filter = '', flipped = false, cooldown = 0, trade = null;
    const state = () => collection.state;
    const baby = () => state().babies.find(b => b.id === selected);
    const uid = () => crypto.randomUUID();
    function freshTrade() { trade = { id: uid(), mine: '', theirs: state().botBabies[0]?.id || '', confirmed: false, botConfirmed: false }; }
    const options = (babies, value) => babies.map(b => `<option value="${esc(b.id)}" ${b.id === value ? 'selected' : ''}>${esc(b.nickname)} · ${shade(b).name} · ${shade(b).rarity}</option>`).join('');
    function detail(b) { return `<b>${esc(b.nickname)}</b><span>Moonmop · ${shade(b).name} · ${shade(b).rarity}</span><small>${esc(b.origin)}</small><small>Individual ${esc(b.id.replace(/[^a-z0-9]/gi, '').slice(-7))}</small>`; }
    function notify(message) { document.getElementById('nurseryStatus').textContent = message; }
    function refresh() {
      const c = collection.counts(), companion = state().babies.find(b => b.id === state().companion), badge = BADGES.find(b => b.id === state().equippedBadge);
      document.getElementById('nurseryCount').textContent = `${c.individuals} ${c.individuals === 1 ? 'baby' : 'babies'} · ${c.variants} / ${PALETTE.length} study colors`;
      document.getElementById('lobbyCompanion').innerHTML = companion ? `<div class="mini-companion">${art(companion)}<span>${esc(companion.nickname)} is walking with you.</span></div>` : '<p class="fine">Your first team victory can bring home a Moonmop.</p>';
      document.getElementById('lobbyBadge').textContent = badge ? 'Maya · ' + badge.name : 'Maya · Fair visitor';
      document.getElementById('lobbyBadge').title = badge?.requirement || 'Choose a badge in My Nursery.';
      document.getElementById('collectionWarning').textContent = collection.warning;
      hooks.onChange?.(state());
    }
    function render() {
      if (!baby()) selected = state().babies[0]?.id || null;
      const b = baby(), c = collection.counts();
      const nav = [['babies','My babies'],['showcase','Showcase'],['social','Meet & present'],['badges','Badges'],['exchange','Exchange garden']];
      let html = `<nav class="nursery-tabs" aria-label="Nursery sections">${nav.map(([id, label]) => `<button data-nursery-tab="${id}" aria-pressed="${tab === id}">${label}</button>`).join('')}</nav>`;
      if (tab === 'babies') {
        const list = state().babies.filter(b => !filter || b.variant === filter);
        html += `<p class="collection-counts">${c.individuals} individuals · ${c.species} species · ${c.variants} / 5 color variants owned</p><label class="nursery-filter">Color <select id="nurseryFilter"><option value="">All colors</option>${PALETTE.map(p => `<option value="${p.id}" ${filter === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}</select></label><div class="nursery-layout"><div class="baby-list">${list.map(b => `<button class="baby-tile" data-baby="${esc(b.id)}" aria-pressed="${b.id === selected}">${art(b)}<b>${esc(b.nickname)}${b.favorite ? ' ♥' : ''}</b><span>${shade(b).name}</span></button>`).join('') || '<p>No babies here yet. Win with your team to adopt one. You can meet Leo’s babies in Meet & present.</p>'}</div><section class="baby-detail">${b ? `<div id="babyArt">${art(b, '', flipped)}</div><div class="baby-identity">${detail(b)}</div><div class="button-pair"><button data-pose="pet" class="primary">Pet</button><button data-turn class="secondary">Turn around</button><button data-pose="sleep" class="secondary">Settle to sleep</button></div><label class="nickname-label">Nickname <input id="babyNickname" maxlength="24" value="${esc(b.nickname)}"><button data-rename class="secondary">Save name</button></label><div class="button-pair"><button data-favorite class="secondary">${b.favorite ? 'Unlock favorite ♥' : 'Favorite ♡'}</button><button data-companion class="secondary">${state().companion === b.id ? 'Put companion to bed' : 'Walk with me'}</button></div>` : `<div class="empty-nursery">${art({ variant: 'lilac' }, 'sleep')}<h3>A little nest, waiting.</h3><p>One baby per participating winner, even if voted out. Practice and watching grant no babies.</p><button data-nursery-tab="social" class="secondary">Meet a bot’s Moonmop</button></div>`}</section></div><details class="study-details"><summary>About this local collection study</summary><p>Palette names, rarity tiers and odds are provisional: ${PALETTE.map(p => `${p.name} ${p.weight}%`).join(' · ')}. Both winning teams use the same draw. Personal deliveries, Catch and Rig do not improve it.</p><p>Local participation assumption: try a control, walk during a trial, review clues or cast a ballot. There is no success quota. The production AFK and departure rules are still open. Babies and equipment save in this browser only.</p></details>`;
      } else if (tab === 'showcase') {
        html += '<p>Arrange up to three owned individuals. Each slot is separate from your one walking companion.</p><div class="showcase-slots">' + state().showcase.map((id, i) => {
          const b = state().babies.find(b => b.id === id);
          return `<section><label>Perch ${i + 1}<select data-showcase="${i}"><option value="">Empty perch</option>${options(state().babies, id)}</select></label>${b ? art(b) + `<div class="baby-identity">${detail(b)}</div>` : '<div class="empty-perch">☾</div>'}</section>`;
        }).join('') + '</div>';
      } else if (tab === 'badges') {
        html += '<p>Draft achievement study: badges stay unlocked after an exchange. Choose one beside your lobby name, or hide it.</p><button class="secondary" data-badge="">Hide my badge</button><div class="badge-list">' + BADGES.map(b => `<button data-badge="${b.id}" ${state().badges.includes(b.id) ? '' : 'disabled'} aria-pressed="${state().equippedBadge === b.id}"><span>✧</span><b>${b.name}</b><small>${b.requirement}</small><strong>${state().badges.includes(b.id) ? state().equippedBadge === b.id ? 'Displayed' : 'Unlocked' : 'Not yet unlocked'}</strong></button>`).join('') + '</div>';
      } else if (tab === 'social') {
        const mine = state().babies.find(b => b.id === state().companion), visitor = state().botBabies[0];
        html += `<p>Leo is a local bot. Present your companion, settle together on the gathering blanket, or pose in the portrait nook.</p><div id="socialNook" class="social-nook"><div><b>Maya ${state().equippedBadge ? '· ' + BADGES.find(b => b.id === state().equippedBadge).name : ''}</b><div id="presentArt">${mine ? art(mine) : '<p>Choose “Walk with me” on one of your babies first.</p>'}</div></div><div><b>Leo · BOT</b><div id="visitorArt">${visitor ? art(visitor) : ''}</div>${visitor ? `<div class="baby-identity">${detail(visitor)}</div>` : ''}</div></div><div class="social-actions"><button data-social="present" ${mine ? '' : 'disabled'}>Present companion</button><button data-social="gather" ${mine ? '' : 'disabled'}>Gather on blanket</button><button data-social="portrait" ${mine ? '' : 'disabled'}>Portrait nook</button></div><p>Say hello to ${esc(visitor?.nickname || 'Moonmop')}. Everyone shares a brief reaction cooldown; no scores or likes are collected.</p><div class="social-actions">${['Aww!','Wow!','Hello!'].map(r => `<button data-reaction="${r}">${r}</button>`).join('')}<button data-reaction="pet">Pet Leo’s baby</button></div><details class="study-details"><summary>My visitor settings</summary><label><input type="checkbox" data-setting="visitorPetting" ${state().visitorPetting ? 'checked' : ''}> Allow visitors to pet my companion</label><label><input type="checkbox" data-setting="reactions" ${state().reactions ? 'checked' : ''}> Show reaction effects</label><button data-bot-visit>Invite Leo to greet my baby</button></details>`;
      } else if (tab === 'exchange') {
        if (!trade) freshTrade();
        const mine = state().babies.find(b => b.id === trade.mine), theirs = state().botBabies.find(b => b.id === trade.theirs);
        const warnings = mine ? [state().babies.filter(b => b.variant === mine.variant).length === 1 ? 'This is your last ' + shade(mine).name + ' Moonmop.' : '', state().companion === mine.id ? 'Your companion slot will clear.' : '', state().showcase.includes(mine.id) ? 'Its showcase slot will clear.' : '', mine.favorite ? 'This baby is favorited. Unlock it in My babies before offering.' : ''].filter(Boolean) : [];
        html += `<p>Local exchange study with Leo (BOT). Leo accepts any one unlocked baby for one offered baby. This is a scripted usability study; it is not a real player market.</p><div class="exchange-offers"><section><label>You offer<select id="tradeMine"><option value="">Choose an individual</option>${options(state().babies, trade.mine)}</select></label>${mine ? art(mine) + `<div class="baby-identity">${detail(mine)}</div>` : '<p>No offer selected. Earn a baby through a round first.</p>'}</section><span class="exchange-arrow">⇄</span><section><label>Leo offers<select id="tradeTheirs">${options(state().botBabies, trade.theirs)}</select></label>${theirs ? art(theirs) + `<div class="baby-identity">${detail(theirs)}</div>` : ''}</section></div><p class="exchange-warning">${warnings.map(esc).join(' ')}</p><p>Any offer change clears both confirmations. Origins travel with the baby. Earned badges stay yours.</p><div class="social-actions"><button data-bot-confirm ${mine && theirs && !mine.favorite ? '' : 'disabled'}>${trade.botConfirmed ? '✓ Leo confirmed these offers' : 'Ask Leo to confirm'}</button><button data-trade-confirm ${mine && theirs && !mine.favorite && trade.botConfirmed ? '' : 'disabled'}>Confirm exchange</button><button data-trade-cancel>Cancel proposal</button></div><p class="fine">Nothing transfers until both confirm. Canceling or closing this window transfers nothing.</p>`;
      }
      body.innerHTML = html; refresh();
    }
    function open(target = 'babies') {
      hooks.beforeOpen?.(); tab = target; trade = null; render();
      if (!dialog.open) dialog.showModal();
    }
    body.addEventListener('click', e => {
      const button = e.target.closest('button'); if (!button || button.disabled) return;
      const d = button.dataset;
      if (d.nurseryTab) { tab = d.nurseryTab; if (tab !== 'exchange') trade = null; render(); }
      else if (d.baby) { selected = d.baby; flipped = false; render(); }
      else if ('rename' in d && baby()) { collection.edit(selected, { nickname: document.getElementById('babyNickname').value }); render(); notify('Nickname saved.'); }
      else if ('favorite' in d && baby()) { collection.edit(selected, { favorite: !baby().favorite }); render(); }
      else if ('companion' in d && baby()) { collection.equip('companion', state().companion === selected ? null : selected); render(); }
      else if ('turn' in d || d.pose) {
        if (!baby()) return;
        if ('turn' in d) flipped = !flipped;
        document.getElementById('babyArt').innerHTML = art(baby(), d.pose || '', flipped);
        notify(d.pose === 'pet' ? baby().nickname + ' gathers an ear around your hand.' : d.pose === 'sleep' ? 'A paddle-tail pillow and an ear blanket. Sleep well.' : 'Moonmop turns to show her glowing tail.');
      } else if ('badge' in d) { collection.setting('equippedBadge', d.badge || null); render(); }
      else if (d.social) {
        const mine = state().babies.find(b => b.id === state().companion);
        document.getElementById('socialNook').dataset.pose = d.social;
        document.getElementById('presentArt').innerHTML = art(mine, d.social === 'gather' ? 'sleep' : 'Hello!');
        document.getElementById('visitorArt').innerHTML = art(state().botBabies[0], d.social === 'gather' ? 'sleep' : 'Wow!');
        notify(d.social === 'gather' ? 'Two Moonmops settle together, their long ears overlapping.' : d.social === 'portrait' ? 'Moonlight, two perches, and room for friends. Your portrait pose is ready.' : 'You lift your companion for Leo to admire.');
      } else if (d.reaction || 'botVisit' in d) {
        if (Date.now() < cooldown) { notify('Let Moonmop finish saying hello.'); return; }
        cooldown = Date.now() + 2000;
        const visiting = 'botVisit' in d, mine = state().babies.find(b => b.id === state().companion);
        if (visiting && !mine) { notify('Equip a companion to invite Leo over.'); return; }
        const pose = visiting ? state().visitorPetting ? 'pet' : 'Hello!' : d.reaction;
        if (state().reactions) document.getElementById(visiting ? 'presentArt' : 'visitorArt').innerHTML = art(visiting ? mine : state().botBabies[0], pose);
        notify(pose === 'Wow!' ? 'Moonmop lifts her softly glowing paddle tail.' : pose === 'Hello!' ? 'Moonmop gives a tiny paw-wave.' : 'Moonmop peeks around an ear. A little hello, just for you.');
      } else if ('botConfirm' in d) { trade.botConfirmed = true; render(); notify('Leo confirmed the exact individuals shown. Review your offer before confirming.'); }
      else if ('tradeConfirm' in d) {
        trade.confirmed = true; const result = collection.exchange(trade);
        freshTrade(); render(); notify(result === 'complete' ? 'Exchange complete. Both babies moved together; their origins are unchanged.' : 'Offers changed. No exchange was made.');
      } else if ('tradeCancel' in d) { freshTrade(); render(); notify('Proposal canceled. No babies moved.'); }
    });
    body.addEventListener('change', e => {
      const el = e.target;
      if (el.id === 'nurseryFilter') { filter = el.value; render(); }
      else if (el.dataset.showcase !== undefined) { collection.equip('showcase', el.value || null, Number(el.dataset.showcase)); render(); }
      else if (el.dataset.setting) { collection.setting(el.dataset.setting, el.checked); refresh(); }
      else if (el.id === 'tradeMine' || el.id === 'tradeTheirs') {
        trade[el.id === 'tradeMine' ? 'mine' : 'theirs'] = el.value;
        trade.confirmed = trade.botConfirmed = false; render(); notify('Offers changed. Both confirmations have been reset.');
      }
    });
    document.getElementById('closeNursery').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => { trade = null; refresh(); });
    refresh(); return { open, refresh, render, select(id) { selected = id; open('babies'); } };
  };
})(globalThis);
