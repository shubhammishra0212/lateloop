/* LateLoop — turn a train delay into a safe local trip. */
(() => {
  "use strict";

  // ---------- Text (English / Hindi) ----------
  const T = {
    en: {
      heroTitle: "Train late? See the city.<br>Be back on time.",
      heroSub: "Tell us how late your train is. We plan a short local trip around the station — and make sure you are back before your train.",
      where: "Which station are you at?", howLate: "How late is your train?",
      delayHint: "Check the delay on the station board, NTES or call 139.",
      timeNow: "Time now", move: "How will you move?", walk: "Walk", auto: "Auto",
      likes: "What do you enjoy?", heritage: "History", food: "Food", market: "Markets", faith: "Temples", nature: "Parks",
      planBtn: "Plan my trip",
      agentTitle: "Ask LateLoop", agentSub: "Type or speak in plain words, like “my train is 2 hours late, I want food”. The assistant plans it and answers your questions.",
      askPh: "e.g. Train is 2 hours late, I love history", ask: "Ask",
      qSummary: "Summarise my trip", qSafe: "Is it safe to go?", qEat: "Where should I eat?",
      backBy: "Be back at the station by", outFor: "Time outside", timeLeft: "Time left",
      start: "Start trip", started: "Trip started", update: "Train delay changed?", share: "Share plan",
      hoursNote: "Opening hours are approximate. Keep checking the train status while you are out.",
      emptyTitle: "Your trip will appear here", emptySub: "Set how late your train is and press “Plan my trip”.",
      how1: "We assume the train may make up 30% of its delay.", how2: "We keep 30 minutes spare before your train.", how3: "Only places open at that time are suggested.",
      newDelay: "New train delay", apply: "Update my trip", cancel: "Cancel",
      foot: "Built for travellers stuck by fog delays. Map data © OpenStreetMap contributors. Routing by OSRM.",
      h: "h", min: "min", leave: "Leave", arrive: "Arrive", stay: "Stay", leaveBy: "leave by",
      walkLeg: "min walk", autoLeg: "min by auto", startAt: "Start from the station", endAt: "Back at the station",
      listen: "Listen", stopListen: "Stop", readMore: "About this place", imHere: "I'm here", here: "You are here",
      whyTpl: (d, e, b) => `Your train is ${d} late. Trains often make up time, so we assume it could arrive by ${e}. You will be back at ${b} — 30 minutes before that.`,
      safe: "Safe plan. You will be back with 30 minutes to spare.",
      tight: "Not enough time to leave the station safely.", tightSub: "Stay at the station. Delays of 1 h 30 min or more usually allow a short trip.",
      headBack: "HEAD BACK NOW", headBackSub: (m) => `Your train may arrive sooner. Go back to the station now — about ${m} min.`,
      replanned: "Trip updated for the new delay.", nothingFits: "Nothing else fits — enjoy this stop, then go back.",
      copied: "Plan copied — paste it in WhatsApp.", thinking: "Thinking…", aiLabel: "AI assistant", offLabel: "Offline assistant",
      needPlan: "First tell me how late your train is, or press “Plan my trip”.",
      planned: "Done — I planned your trip. ",
    },
    hi: {
      heroTitle: "ट्रेन लेट है? शहर घूमिए।<br>समय पर लौटिए।",
      heroSub: "बताइए आपकी ट्रेन कितनी लेट है। हम स्टेशन के आसपास एक छोटी यात्रा बनाते हैं — और पक्का करते हैं कि आप ट्रेन से पहले लौट आएँ।",
      where: "आप किस स्टेशन पर हैं?", howLate: "ट्रेन कितनी लेट है?",
      delayHint: "देरी स्टेशन बोर्ड, NTES या 139 पर देखें।",
      timeNow: "अभी का समय", move: "कैसे जाएँगे?", walk: "पैदल", auto: "ऑटो",
      likes: "आपको क्या पसंद है?", heritage: "इतिहास", food: "खाना", market: "बाज़ार", faith: "मंदिर", nature: "पार्क",
      planBtn: "मेरी यात्रा बनाइए",
      agentTitle: "LateLoop से पूछिए", agentSub: "आसान शब्दों में लिखिए या बोलिए, जैसे “ट्रेन 2 घंटे लेट है, खाना खाना है”। सहायक यात्रा बनाएगा और सवालों के जवाब देगा।",
      askPh: "जैसे: ट्रेन 2 घंटे लेट है, इतिहास पसंद है", ask: "पूछें",
      qSummary: "यात्रा का सार बताइए", qSafe: "क्या जाना सुरक्षित है?", qEat: "कहाँ खाऊँ?",
      backBy: "स्टेशन पर लौटिए", outFor: "बाहर का समय", timeLeft: "बचा समय",
      start: "यात्रा शुरू करें", started: "यात्रा शुरू", update: "ट्रेन की देरी बदली?", share: "प्लान भेजें",
      hoursNote: "खुलने का समय अनुमानित है। बाहर रहते हुए ट्रेन का स्टेटस देखते रहें।",
      emptyTitle: "आपकी यात्रा यहाँ दिखेगी", emptySub: "ट्रेन की देरी चुनें और “मेरी यात्रा बनाइए” दबाएँ।",
      how1: "हम मानते हैं कि ट्रेन 30% देरी पूरी कर सकती है।", how2: "ट्रेन से 30 मिनट पहले लौटने का समय रखते हैं।", how3: "सिर्फ़ उस समय खुली जगहें सुझाते हैं।",
      newDelay: "ट्रेन की नई देरी", apply: "यात्रा अपडेट करें", cancel: "रद्द करें",
      foot: "कोहरे से लेट हुए यात्रियों के लिए बनाया गया। नक्शा © OpenStreetMap योगदानकर्ता। रास्ते OSRM से।",
      h: "घं", min: "मि", leave: "निकलें", arrive: "पहुँचें", stay: "रुकें", leaveBy: "निकलें",
      walkLeg: "मिनट पैदल", autoLeg: "मिनट ऑटो से", startAt: "स्टेशन से शुरू", endAt: "स्टेशन पर वापस",
      listen: "सुनें", stopListen: "रोकें", readMore: "इस जगह के बारे में", imHere: "मैं यहाँ हूँ", here: "आप यहाँ हैं",
      whyTpl: (d, e, b) => `आपकी ट्रेन ${d} लेट है। ट्रेनें अक्सर समय पूरा कर लेती हैं, इसलिए हम मानते हैं कि यह ${e} तक आ सकती है। आप ${b} तक लौट आएँगे — उससे 30 मिनट पहले।`,
      safe: "सुरक्षित प्लान। आप 30 मिनट पहले लौट आएँगे।",
      tight: "स्टेशन से बाहर जाने के लिए समय कम है।", tightSub: "स्टेशन पर ही रहें। 1 घंटा 30 मिनट या ज़्यादा देरी में छोटी यात्रा हो सकती है।",
      headBack: "अभी वापस चलें", headBackSub: (m) => `ट्रेन जल्दी आ सकती है। स्टेशन वापस चलें — लगभग ${m} मिनट।`,
      replanned: "नई देरी के हिसाब से यात्रा बदल दी गई।", nothingFits: "और कुछ नहीं समाता — यहाँ घूमिए, फिर वापस जाइए।",
      copied: "प्लान कॉपी हो गया — WhatsApp में भेजें।", thinking: "सोच रहा हूँ…", aiLabel: "AI सहायक", offLabel: "ऑफ़लाइन सहायक",
      needPlan: "पहले बताइए ट्रेन कितनी लेट है, या “मेरी यात्रा बनाइए” दबाएँ।",
      planned: "हो गया — आपकी यात्रा बना दी। ",
    }
  };

  // ---------- State ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const S = {
    lang: "en", station: "ambala-cantt", delay: 240, nowMin: 0, mode: "walk",
    likes: new Set(["heritage", "food", "market", "faith", "nature"]),
    plan: null, trip: null, map: null, layers: null, timer: null, speaking: null
  };
  const t = (k) => T[S.lang][k] ?? T.en[k] ?? k;
  const st = () => window.LL_STATIONS[S.station];

  // ---------- Time helpers ----------
  const pad = (n) => String(n).padStart(2, "0");
  const clock = (m) => {
    m = ((Math.round(m) % 1440) + 1440) % 1440;
    const h = Math.floor(m / 60), mm = m % 60;
    const h12 = ((h + 11) % 12) + 1;
    return `${h12}:${pad(mm)} ${h < 12 ? "AM" : "PM"}`;
  };
  const dur = (m) => {
    m = Math.max(0, Math.round(m));
    const h = Math.floor(m / 60), mm = m % 60;
    return h ? `${h} ${t("h")} ${pad(mm)} ${t("min")}` : `${mm} ${t("min")}`;
  };
  const nowOfDay = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };

  // ---------- Planner ----------
  const travel = (a, b) => {
    if (a === b) return 0;
    const s = st();
    return S.mode === "walk" ? s.walk[a][b] : Math.round(s.drive[a][b] * 1.8) + 4; // traffic + finding an auto
  };
  const isOpen = (p, arrive, leave) => {
    const a = ((arrive % 1440) + 1440) % 1440, l = a + (leave - arrive);
    return a >= p.open * 60 && l <= p.close * 60;
  };

  // Best route from matrix index `from` at minute `startMin`, ending at the station by `endMin`.
  function bestRoute(from, startMin, endMin, skip = new Set()) {
    const places = st().places;
    const cand = places.map((p, i) => i + 1).filter((i) => !skip.has(i));
    let best = { score: 0, used: 0, seq: [] };
    const weight = (p) => p.score * (S.likes.has(p.type) ? 1 : 0.25);
    const dfs = (at, time, seq, score, used) => {
      // close the loop
      const back = time + travel(at, 0);
      if (seq.length && back <= endMin) {
        if (score > best.score + 1e-9 || (Math.abs(score - best.score) < 1e-9 && back < best.used)) {
          best = { score, used: back, seq: seq.slice() };
        }
      }
      if (seq.length >= 5) return;
      for (const i of cand) {
        if (seq.includes(i)) continue;
        const p = places[i - 1];
        const arrive = time + travel(at, i);
        const leave = arrive + p.visit;
        if (leave + travel(i, 0) > endMin) continue;
        if (!isOpen(p, arrive, leave)) continue;
        seq.push(i); dfs(i, leave, seq, score + weight(p), used); seq.pop();
      }
    };
    dfs(from, startMin, [], 0, 0);
    // build schedule
    let at = from, time = startMin; const stops = [];
    for (const i of best.seq) {
      const p = places[i - 1], leg = travel(at, i), arrive = time + leg, leave = arrive + p.visit;
      stops.push({ idx: i, place: p, leg, arrive, leave });
      at = i; time = leave;
    }
    return { stops, returnLeg: travel(at, 0), backAt: time + travel(at, 0) };
  }

  function makePlan() {
    const earliestTrain = S.nowMin + Math.round(S.delay * 0.7);
    const backBy = earliestTrain - 30;
    const budget = backBy - S.nowMin;
    const route = budget >= 20 ? bestRoute(0, S.nowMin, backBy) : { stops: [], returnLeg: 0, backAt: S.nowMin };
    return { startMin: S.nowMin, earliestTrain, backBy, budget, ...route, delay: S.delay, mode: S.mode };
  }

  // ---------- Map ----------
  function initMap() {
    if (S.map) return;
    const s = st();
    S.map = L.map("map", { zoomControl: true, attributionControl: true, scrollWheelZoom: false }).setView([s.lat, s.lon], 14);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(S.map);
    S.layers = L.layerGroup().addTo(S.map);
  }
  const pinIcon = (label, cls = "") => L.divIcon({ className: "", html: `<div class="pin ${cls}">${label}</div>`, iconSize: [40, 40], iconAnchor: [20, 20] });

  async function drawMap(plan) {
    initMap();
    S.layers.clearLayers();
    const s = st();
    const pts = [[s.lat, s.lon], ...plan.stops.map((x) => [x.place.lat, x.place.lon]), [s.lat, s.lon]];
    L.marker([s.lat, s.lon], { icon: pinIcon("🚉", "station"), title: s.name[S.lang] }).addTo(S.layers).bindPopup(s.name[S.lang]);
    plan.stops.forEach((x, k) => {
      const cls = S.trip && S.trip.at === x.idx ? "now" : "";
      L.marker([x.place.lat, x.place.lon], { icon: pinIcon(k + 1, cls), title: x.place.name[S.lang] })
        .addTo(S.layers).bindPopup(`<b>${x.place.name[S.lang]}</b><br>${clock(x.arrive)} – ${clock(x.leave)}`);
    });
    const fallback = L.polyline(pts, { color: "#16181d", weight: 3, dashArray: "6 8", opacity: 0.7 }).addTo(S.layers);
    S.map.fitBounds(L.latLngBounds(pts).pad(0.25));
    setTimeout(() => S.map.invalidateSize(), 50);
    if (plan.stops.length === 0) return;
    // real street route (falls back to the dashed line if routing is slow)
    try {
      const prof = S.mode === "walk" ? "foot" : "car";
      const coords = pts.map(([la, lo]) => `${lo},${la}`).join(";");
      const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 6000);
      const r = await fetch(`https://routing.openstreetmap.de/routed-${prof}/route/v1/driving/${coords}?overview=full&geometries=geojson`, { signal: ctl.signal });
      clearTimeout(to);
      const j = await r.json();
      if (j.code === "Ok" && S.plan === plan) {
        S.layers.removeLayer(fallback);
        L.geoJSON(j.routes[0].geometry, { style: { color: "#f59e0b", weight: 6, opacity: 0.95 } }).addTo(S.layers);
      }
    } catch (_) { /* keep dashed line */ }
  }

  // ---------- Render ----------
  function render() {
    const p = S.plan;
    $("#empty").hidden = !!p;
    $("#result").hidden = !p;
    if (!p) return;
    const s = st();
    $("#backBy").textContent = clock(p.backBy);
    $("#why").textContent = t("whyTpl")(dur(p.delay), clock(p.earliestTrain), clock(p.backBy));
    updateCountdown();

    const banner = $("#banner");
    if (!p.stops.length && !S.trip) {
      banner.className = "banner warn"; banner.hidden = false;
      banner.innerHTML = `<div>${t("tight")}<small>${t("tightSub")}</small></div>`;
    } else if (!S.trip) {
      banner.className = "banner go"; banner.hidden = false; banner.innerHTML = `<div>${t("safe")}</div>`;
    } else if (!S.trip.alert) { banner.hidden = true; }

    const legTxt = (m) => `${m} ${S.mode === "walk" ? t("walkLeg") : t("autoLeg")}`;
    const tl = $("#timeline"); tl.innerHTML = "";
    const li0 = document.createElement("li");
    li0.innerHTML = `<span class="n st" aria-hidden="true">🚉</span><h3>${t("startAt")}</h3><p class="sub">${s.name[S.lang]} · ${t("leave")} ${clock(p.startMin)}</p>`;
    tl.append(li0);
    p.stops.forEach((x, k) => {
      const li = document.createElement("li");
      if (S.trip) {
        if (S.trip.done.has(x.idx)) li.classList.add("done");
        if (S.trip.at === x.idx) li.classList.add("current");
      }
      li.innerHTML = `
        <span class="n" aria-hidden="true">${k + 1}</span>
        <h3>${x.place.name[S.lang]}</h3>
        <p class="sub">${x.place.short[S.lang]}</p>
        <p class="leg">${legTxt(x.leg)} · ${t("arrive")} ${clock(x.arrive)} · ${t("stay")} ${x.place.visit} ${t("min")} · ${t("leaveBy")} ${clock(x.leave)}</p>
        <details><summary class="sub" style="cursor:pointer;margin-top:8px;font-weight:600">${t("readMore")}</summary><p class="story">${x.place.story[S.lang]}</p></details>
        <div class="row">
          <button type="button" data-listen="${x.idx}">🔊 ${t("listen")}</button>
          ${S.trip ? `<button type="button" data-here="${x.idx}">${S.trip.at === x.idx ? "✓ " + t("here") : "📍 " + t("imHere")}</button>` : ""}
        </div>`;
      tl.append(li);
    });
    const liEnd = document.createElement("li");
    liEnd.innerHTML = `<span class="n st" aria-hidden="true">🚉</span><h3>${t("endAt")}</h3><p class="sub">${p.stops.length ? legTxt(p.returnLeg) + " · " : ""}${t("arrive")} ${clock(p.backAt)}</p>`;
    tl.append(liEnd);

    $("#startBtn").textContent = S.trip ? "✓ " + t("started") : t("start");
    $("#startBtn").disabled = !!S.trip || !p.stops.length;
    drawMap(p);
  }

  function currentMinute() {
    if (!S.trip) return S.nowMin;
    return S.trip.startMin + (Date.now() - S.trip.startMs) / 60000;
  }
  function updateCountdown() {
    const p = S.plan; if (!p) return;
    const el = $("#countdown");
    if (!S.trip) { $("#countLabel").textContent = t("outFor"); el.textContent = dur(p.backBy - p.startMin); el.classList.remove("live"); return; }
    $("#countLabel").textContent = t("timeLeft");
    const secs = Math.max(0, Math.round((p.backBy - currentMinute()) * 60));
    const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
    el.textContent = `${h}:${pad(m)}:${pad(s)}`; el.classList.add("live");
  }

  // ---------- Actions ----------
  function plan() {
    stopSpeaking();
    S.trip = null; clearInterval(S.timer);
    S.plan = makePlan();
    render();
    if (matchMedia("(max-width:920px)").matches) $("#result").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startTrip() {
    if (!S.plan || !S.plan.stops.length) return;
    S.trip = { startMs: Date.now(), startMin: S.plan.startMin, at: 0, done: new Set(), alert: false };
    clearInterval(S.timer);
    S.timer = setInterval(updateCountdown, 1000);
    render();
  }

  // Delay changed mid-trip: re-plan from where the traveller is now.
  function applyNewDelay(newDelay) {
    S.delay = newDelay; syncDelay();
    if (!S.trip) { plan(); return; }
    const p = S.plan, now = currentMinute();
    const earliestTrain = p.startMin + Math.round(newDelay * 0.7);
    const backBy = earliestTrain - 30;
    const at = S.trip.at;
    const returnNow = travel(at, 0);
    const banner = $("#banner");
    const visited = new Set([...S.trip.done, ...(at ? [at] : [])]);
    if (now + returnNow + 5 > backBy) {
      // must go back now
      S.plan = { ...p, earliestTrain, backBy, delay: newDelay, stops: p.stops.filter((x) => visited.has(x.idx)), returnLeg: returnNow, backAt: now + returnNow };
      S.trip.alert = true;
      banner.className = "banner stop"; banner.hidden = false;
      banner.innerHTML = `<div>⚠ ${t("headBack")}<small>${t("headBackSub")(returnNow)}</small></div>`;
      speak(`${t("headBack")}. ${t("headBackSub")(returnNow)}`);
      if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 600]);
    } else {
      const route = bestRoute(at, now, backBy, visited);
      const kept = p.stops.filter((x) => visited.has(x.idx));
      S.plan = { ...p, earliestTrain, backBy, delay: newDelay, stops: [...kept, ...route.stops], returnLeg: route.stops.length ? route.returnLeg : returnNow, backAt: route.stops.length ? route.backAt : now + returnNow };
      S.trip.alert = true;
      banner.className = "banner go"; banner.hidden = false;
      banner.innerHTML = `<div>✓ ${t("replanned")}${route.stops.length ? "" : `<small>${t("nothingFits")}</small>`}</div>`;
    }
    render();
  }

  function markHere(idx) {
    if (!S.trip) return;
    if (S.trip.at) S.trip.done.add(S.trip.at);
    S.trip.at = idx;
    // everything before this stop counts as visited
    for (const x of S.plan.stops) { if (x.idx === idx) break; S.trip.done.add(x.idx); }
    render();
  }

  function planText() {
    const p = S.plan, s = st(); if (!p) return "";
    const L1 = [`LateLoop — ${s.name[S.lang]}`, `${t("backBy")}: ${clock(p.backBy)}`];
    p.stops.forEach((x, k) => L1.push(`${k + 1}. ${x.place.name[S.lang]} — ${clock(x.arrive)}–${clock(x.leave)}`));
    L1.push(`${t("endAt")}: ${clock(p.backAt)}`);
    return L1.join("\n");
  }
  async function share() {
    const text = planText() + "\n" + location.href;
    try { if (navigator.share) { await navigator.share({ title: "LateLoop", text }); return; } } catch (_) { return; }
    try { await navigator.clipboard.writeText(text); toastAgent(t("copied"), false); } catch (_) {}
  }

  // ---------- Speech ----------
  function pickVoice(lang) {
    const vs = speechSynthesis.getVoices();
    return vs.find((v) => v.lang === lang) || vs.find((v) => v.lang.startsWith(lang.slice(0, 2)));
  }
  function speak(text, btn) {
    if (!("speechSynthesis" in window)) return;
    stopSpeaking();
    const u = new SpeechSynthesisUtterance(text.replace(/[⚠✓🔊🚉📍]/g, ""));
    u.lang = S.lang === "hi" ? "hi-IN" : "en-IN";
    const v = pickVoice(u.lang); if (v) u.voice = v;
    u.rate = 0.95;
    if (btn) { S.speaking = btn; btn.dataset.label = btn.textContent; btn.textContent = "■ " + t("stopListen"); }
    u.onend = u.onerror = () => { if (S.speaking === btn && btn) { btn.textContent = btn.dataset.label; S.speaking = null; } };
    speechSynthesis.speak(u);
  }
  function stopSpeaking() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (S.speaking) { S.speaking.textContent = S.speaking.dataset.label; S.speaking = null; }
  }

  // ---------- AI agent ----------
  // 1) understands plain requests and fills the planner itself
  function parseIntent(q) {
    const s = q.toLowerCase();
    const out = {};
    const hr = s.match(/(\d+(?:[.,]\d+)?)\s*(?:h\b|hr|hrs|hour|hours|ghante|ghanta|घंट)/);
    const mn = s.match(/(\d+)\s*(?:m\b|min|mins|minute|minutes|मिनट)/);
    if (/(half|aadha|आधा|डेढ़|dedh)/.test(s) && !hr) out.delay = /dedh|डेढ़/.test(s) ? 90 : 30;
    if (hr || mn) out.delay = Math.round((hr ? parseFloat(hr[1].replace(",", ".")) * 60 : 0) + (mn ? parseInt(mn[1]) : 0));
    if (/(walk|pedal|paidal|पैदल|on foot)/.test(s)) out.mode = "walk";
    if (/(auto|rickshaw|ऑटो|रिक्शा|cab|taxi)/.test(s)) out.mode = "auto";
    const likes = [];
    if (/(history|heritage|church|old|itihas|इतिहास|war|memorial)/.test(s)) likes.push("heritage");
    if (/(food|eat|hungry|dhaba|lunch|dinner|breakfast|khana|खाना|भूख|ढाबा)/.test(s)) likes.push("food");
    if (/(market|shop|bazaar|bazar|बाज़ार|बाजार|shopping)/.test(s)) likes.push("market");
    if (/(temple|mandir|मंदिर|pray|gurudwara|aarti|आरती)/.test(s)) likes.push("faith");
    if (/(park|lake|nature|walk around|झील|पार्क|green)/.test(s)) likes.push("nature");
    if (likes.length) out.likes = likes;
    return out;
  }

  function localAnswer(kind) {
    const p = S.plan;
    if (!p) return t("needPlan");
    const hi = S.lang === "hi";
    const names = p.stops.map((x) => x.place.name[S.lang]);
    if (kind === "safe") {
      if (!p.stops.length) return t("tight") + " " + t("tightSub");
      return hi
        ? `हाँ, अगर आप समय का ध्यान रखें। आपकी ट्रेन ${dur(p.delay)} लेट है, पर हम मानकर चलते हैं कि यह ${clock(p.earliestTrain)} तक आ सकती है। आप ${clock(p.backBy)} तक लौट आएँगे — 30 मिनट पहले। बाहर रहते हुए NTES या 139 पर स्टेटस देखते रहें, और देरी बदले तो “ट्रेन की देरी बदली?” दबाएँ।`
        : `Yes, if you keep an eye on the time. Your train is ${dur(p.delay)} late, but we plan as if it could arrive by ${clock(p.earliestTrain)}. You will be back by ${clock(p.backBy)} — 30 minutes early. Check NTES or 139 while you are out, and press “Train delay changed?” if the delay changes.`;
    }
    if (kind === "eat") {
      const food = p.stops.find((x) => x.place.type === "food") || p.stops.find((x) => x.place.type === "market");
      const dhaba = st().places.find((x) => x.type === "food");
      const pick = food ? food.place : dhaba;
      return hi
        ? `${pick.name.hi} — ${pick.short.hi}। ${pick.story.hi.split("।")[0]}।`
        : `${pick.name.en} — ${pick.short.en}. ${pick.story.en.split(". ").slice(0, 2).join(". ")}.`;
    }
    // summary
    if (!p.stops.length) return t("tight") + " " + t("tightSub");
    const how = S.mode === "walk" ? (hi ? "पैदल" : "on foot") : (hi ? "ऑटो से" : "by auto");
    return hi
      ? `आपकी ट्रेन ${dur(p.delay)} लेट है। आपके पास बाहर घूमने के लिए ${dur(p.backBy - p.startMin)} हैं। ${how} इन जगहों पर जाइए: ${names.join(", ")}। ${clock(p.backBy)} तक स्टेशन वापस आ जाइए।`
      : `Your train is ${dur(p.delay)} late, so you have ${dur(p.backBy - p.startMin)} to explore. Go ${how} to: ${names.join(", ")}. Be back at the station by ${clock(p.backBy)}.`;
  }

  // 2) answers free questions with an LLM, grounded in the plan and place data
  async function askLLM(question) {
    const p = S.plan, s = st();
    const ctx = {
      station: s.name.en, now: clock(S.nowMin), trainDelay: p ? dur(p.delay) : null,
      backAtStationBy: p ? clock(p.backBy) : null, mode: S.mode,
      plan: p ? p.stops.map((x) => ({ place: x.place.name.en, arrive: clock(x.arrive), leave: clock(x.leave) })) : [],
      places: s.places.map((x) => ({ name: x.name.en, type: x.type, hours: `${x.open}:00-${x.close}:00 (approx)`, about: x.short.en }))
    };
    const lang = S.lang === "hi" ? "Hindi (Devanagari script)" : "simple English";
    const prompt = `You are LateLoop, a friendly local travel assistant for train passengers whose train is delayed. Answer in ${lang}, in at most 4 short sentences, for someone with little travel experience. Use ONLY the facts below; if something is not in the data, say you are not sure and suggest asking a local. Always remind them of the back-at-station time if relevant.\nDATA: ${JSON.stringify(ctx)}\nQUESTION: ${question}`;
    const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 12000);
    try {
      const r = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`, { signal: ctl.signal });
      clearTimeout(to);
      if (!r.ok) throw new Error("bad");
      const txt = (await r.text()).trim();
      if (!txt || txt.length > 1500 || /budget|api key|rate limit|error/i.test(txt.slice(0, 120))) throw new Error("bad");
      return txt;
    } catch (_) { clearTimeout(to); return null; }
  }

  // 3) grounded offline answers: finds the place and topic in the question and answers from the data
  function localQA(q) {
    const s = q.toLowerCase(), hi = S.lang === "hi", sd = st();
    const place = sd.places.find((p) => {
      const words = (p.name.en + " " + p.name.hi + " " + p.id.replace(/-/g, " ")).toLowerCase().split(/[\s&.'’]+/).filter((w) => w.length > 3 && !["church", "mandir", "road", "board", "ruins", "prachin"].includes(w));
      return words.some((w) => s.includes(w));
    }) || (/(church|चर्च)/.test(s) && sd.places.find((p) => p.id === "st-pauls")) || (/(temple|mandir|मंदिर|aarti)/.test(s) && sd.places.find((p) => p.type === "faith")) || (/(lake|झील|park)/.test(s) && sd.places.find((p) => p.type === "nature")) || (/(memorial|स्मारक|war)/.test(s) && sd.places.find((p) => p.id === "kharga-memorial"));
    const idx = place ? sd.places.indexOf(place) + 1 : 0;
    const name = place ? place.name[S.lang] : "";
    const back = S.plan ? (hi ? ` ${clock(S.plan.backBy)} तक स्टेशन लौटना याद रखें।` : ` Remember to be back at the station by ${clock(S.plan.backBy)}.`) : "";
    if (/(veg|vegetarian|शाकाहारी|jain|egg)/.test(s))
      return (hi ? `${name || "इन जगहों"} के शाकाहारी खाने की पक्की जानकारी हमारे पास नहीं है। हरियाणा-पंजाब के ज़्यादातर ढाबों में दाल, पनीर और सब्ज़ी मिलती है — ऑर्डर से पहले स्टाफ़ से पूछ लें। सदर बाज़ार में शाकाहारी मिठाई और स्नैक्स आसानी से मिलते हैं।` : `I don't have confirmed veg details${name ? " for " + name : ""}. Most dhabas in Haryana and Punjab serve dal, paneer and sabzi — ask the staff before ordering. Sadar Bazaar has plenty of vegetarian sweets and snacks.`) + back;
    if (/(luggage|bag|saman|सामान|suitcase|cloak)/.test(s))
      return hi ? "भारी सामान के साथ घूमना मुश्किल है। बड़े स्टेशनों पर क्लोक रूम होता है — इन्क्वायरी काउंटर पर पूछें। छोटा बैग हो तो “ऑटो” चुनें।" : "Carrying heavy bags is tiring. Big junctions usually have a cloak room — ask at the enquiry counter. With a small bag, choose “Auto” to move faster.";
    if (/(toilet|washroom|bathroom|शौचालय)/.test(s))
      return hi ? "ढाबों और बाज़ार के बड़े रेस्टोरेंट में आमतौर पर शौचालय होता है। स्टेशन पर भी सुविधा है।" : "Dhabas and larger restaurants in the bazaar usually have washrooms. The station has them too.";
    if (/(woman|women|girl|alone|akeli|अकेली|safe|safety|सुरक्षित)/.test(s))
      return localAnswer("safe") + (hi ? " भीड़ वाली, रोशन जगहों पर रहें और प्लान “प्लान भेजें” से परिवार को भेज दें। आपात स्थिति में 112 पर कॉल करें।" : " Stay on busy, well-lit roads and send your plan to family with “Share plan”. In an emergency call 112.");
    if (place && /(open|close|hours|timing|time|khula|खुल|बंद|kab)/.test(s)) {
      const nowM = currentMinute() % 1440, open = nowM >= place.open * 60 && nowM < place.close * 60;
      return (hi ? `${name} लगभग ${place.open}:00 से ${place.close}:00 तक खुला रहता है (अनुमानित)। अभी यह ${open ? "खुला" : "बंद"} होना चाहिए।` : `${name} is open roughly ${place.open}:00 to ${place.close}:00 (approximate). It should be ${open ? "open" : "closed"} right now.`) + back;
    }
    if (place && /(far|distance|door|दूर|kitna|how long|reach|पहुँच)/.test(s))
      return (hi ? `स्टेशन से ${name} तक लगभग ${st().walk[0][idx]} मिनट पैदल या ${Math.round(st().drive[0][idx] * 1.8) + 4} मिनट ऑटो से।` : `${name} is about ${st().walk[0][idx]} min on foot or ${Math.round(st().drive[0][idx] * 1.8) + 4} min by auto from the station.`) + back;
    if (place) return `${name} — ${place.short[S.lang]}. ${place.story[S.lang]}`;
    if (/(eat|food|khana|खाना|hungry|भूख|dhaba)/.test(s)) return localAnswer("eat");
    if (/(miss|late|safe|सुरक्षित)/.test(s)) return localAnswer("safe");
    return localAnswer("summary");
  }

  function toastAgent(text, ai) {
    const out = $("#agentOut"); out.hidden = false;
    out.innerHTML = "";
    const p = document.createElement("div"); p.textContent = text; out.append(p);
    const meta = document.createElement("div"); meta.className = "meta";
    meta.innerHTML = `<span>${ai ? "✦ " + t("aiLabel") : t("offLabel")}</span>`;
    const b = document.createElement("button"); b.type = "button"; b.textContent = "🔊 " + t("listen");
    b.onclick = () => speak(text, b);
    meta.append(b); out.append(meta);
  }

  async function agent(query, kind) {
    const out = $("#agentOut"); out.hidden = false;
    if (kind) {
      // quick buttons: instant grounded answer (works offline), AI polish if online
      toastAgent(localAnswer(kind), false);
      return;
    }
    const q = (query || "").trim(); if (!q) return;
    const intent = parseIntent(q);
    let prefix = "";
    if (intent.delay || intent.mode) {
      if (intent.delay) { S.delay = Math.min(600, Math.max(30, intent.delay)); syncDelay(); }
      if (intent.mode) setMode(intent.mode);
      if (intent.likes) { S.likes = new Set(intent.likes); syncLikes(); }
      plan();
      prefix = t("planned");
      // plain plan request → answer instantly from the plan
      if (q.split(/\s+/).length < 14 && !/\?|kya|क्या|kaun|kahan|कहाँ|how|why|what|where|which/.test(q.toLowerCase())) {
        toastAgent(prefix + localAnswer("summary"), false); return;
      }
    }
    // grounded answer first (instant); AI rewrite replaces it if the online model responds
    toastAgent(prefix + localQA(q), false);
    $("#agentOut").insertAdjacentHTML("beforeend", `<p class="thinking" id="aiWait">✦ ${t("thinking")}</p>`);
    const ans = await askLLM(q);
    $("#aiWait")?.remove();
    if (ans) toastAgent(prefix + ans, true);
  }

  // ---------- UI sync ----------
  function syncDelay() {
    $("#delay").value = S.delay;
    $("#delayOut").textContent = dur(S.delay);
  }
  function setMode(m) {
    S.mode = m;
    $$(".seg button").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.mode === m)));
  }
  function syncLikes() { $$(".likes button").forEach((b) => b.setAttribute("aria-pressed", String(S.likes.has(b.dataset.like)))); }
  function setLang(l) {
    S.lang = l; document.documentElement.lang = l;
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
    $$("[data-i18n]").forEach((el) => { const v = T[l][el.dataset.i18n]; if (typeof v === "string") el.innerHTML = v; });
    $$("[data-i18n-ph]").forEach((el) => { el.placeholder = T[l][el.dataset.i18nPh]; });
    fillStations(); syncDelay();
    if (S.plan) render();
    try { localStorage.setItem("ll-lang", l); } catch (_) {}
  }
  function fillStations() {
    const sel = $("#station"); sel.innerHTML = "";
    Object.entries(window.LL_STATIONS).forEach(([id, s]) => {
      const o = document.createElement("option"); o.value = id; o.textContent = `${s.name[S.lang]} (${s.code})`; sel.append(o);
    });
    sel.value = S.station;
  }

  // ---------- Wire up ----------
  function init() {
    S.nowMin = nowOfDay();
    $("#now").value = `${pad(Math.floor(S.nowMin / 60))}:${pad(S.nowMin % 60)}`;
    let lang = "en"; try { lang = localStorage.getItem("ll-lang") || "en"; } catch (_) {}
    setLang(lang);

    $("#delay").addEventListener("input", (e) => { S.delay = +e.target.value; syncDelay(); });
    $$(".step").forEach((b) => b.addEventListener("click", () => { S.delay = Math.min(600, Math.max(30, S.delay + +b.dataset.step)); syncDelay(); }));
    $("#now").addEventListener("change", (e) => { const [h, m] = e.target.value.split(":").map(Number); if (!isNaN(h)) S.nowMin = h * 60 + m; });
    $$(".seg button").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));
    $$(".likes button").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.like; S.likes.has(k) ? S.likes.delete(k) : S.likes.add(k);
      if (!S.likes.size) S.likes.add(k);
      syncLikes();
    }));
    $$(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
    $("#station").addEventListener("change", (e) => { S.station = e.target.value; });
    $("#plan").addEventListener("submit", (e) => { e.preventDefault(); plan(); });

    $("#startBtn").addEventListener("click", startTrip);
    $("#shareBtn").addEventListener("click", share);
    const dlg = $("#delayDialog"); let pending = S.delay;
    $("#updateBtn").addEventListener("click", () => { pending = S.delay; $("#delayOut2").textContent = dur(pending); dlg.showModal(); });
    $$(".step2").forEach((b) => b.addEventListener("click", () => { pending = Math.min(600, Math.max(30, pending + +b.dataset.step)); $("#delayOut2").textContent = dur(pending); }));
    dlg.addEventListener("close", () => { if (dlg.returnValue === "ok") applyNewDelay(pending); });

    $("#timeline").addEventListener("click", (e) => {
      const l = e.target.closest("[data-listen]"), h = e.target.closest("[data-here]");
      if (l) {
        if (S.speaking === l) { stopSpeaking(); return; }
        const p = st().places[+l.dataset.listen - 1];
        speak(`${p.name[S.lang]}. ${p.story[S.lang]}`, l);
      }
      if (h) markHere(+h.dataset.here);
    });

    $("#askBtn").addEventListener("click", () => agent($("#askInput").value));
    $("#askInput").addEventListener("keydown", (e) => { if (e.key === "Enter") agent(e.target.value); });
    $$(".quick button").forEach((b) => b.addEventListener("click", () => agent("", b.dataset.q)));

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const mic = $("#micBtn");
    if (!SR) mic.hidden = true;
    else mic.addEventListener("click", () => {
      const rec = new SR(); rec.lang = S.lang === "hi" ? "hi-IN" : "en-IN"; rec.interimResults = false;
      mic.classList.add("on");
      rec.onresult = (e) => { const txt = e.results[0][0].transcript; $("#askInput").value = txt; agent(txt); };
      rec.onend = rec.onerror = () => mic.classList.remove("on");
      rec.start();
    });
    if ("speechSynthesis" in window) speechSynthesis.getVoices();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
