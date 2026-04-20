'use strict';

// ═══════════════════════════════════════════════════════════
// ORION GROW TRACKER · Auto Orion F1 · BioBizz Light Mix
// ═══════════════════════════════════════════════════════════

// ─── PHASES (RQS Orion F1 · BioBizz 2025 · Autoflower-angepasst) ───
const PH = [
{id:'germ',name:'Keimung',color:'#86EFAC',s:0,e:4,
 env:{temp:[22,25],rh:[70,85],ph:[6.0,6.5],ec:[0,0]},
 wat:{ml:[20,50],every:1,note:'Nur sprühen · Minidome feucht'},
 bb:{rj:0,bg:0,bb:0,tm:0,am:0,note:'Keine Nährstoffe · pH-Wasser 6.3'},
 tips:['Papertowel-Methode ODER direkt in angefeuchtete Light Mix','Keimung 24–72h','Minidome 70-85% RH','Licht 18/6 ab Sprössling · 40cm LED-Abstand']},
{id:'seed',name:'Sämling',color:'#4ADE80',s:4,e:14,
 env:{temp:[22,25],rh:[65,75],ph:[6.0,6.5],ec:[0.2,0.4]},
 wat:{ml:[50,200],every:2,note:'Topf anheben: leicht = gießen'},
 bb:{rj:2,bg:0,bb:0,tm:0,am:0,note:'Light Mix reicht · Root Juice ab 2. Blattpaar'},
 tips:['Topf-Trockengewicht merken als Referenz','Light Mix Vordüngung für 10-14 Tage','Ab 2. Blattpaar: Root Juice 2ml/L','Nicht überwässern – häufigster Anfängerfehler','LED 30-40cm Abstand']},
{id:'veg',name:'Vegetation',color:'#22C55E',s:14,e:28,
 env:{temp:[22,28],rh:[50,60],ph:[6.0,6.5],ec:[0.6,1.2]},
 wat:{ml:[300,700],every:2,note:'10-20% Runoff anstreben'},
 bb:{rj:2,bg:1,bb:0,tm:0,am:1,note:'Bio Grow einführen · Root Juice bis ~Tag 21'},
 tips:['Bio Grow langsam steigern: 1→2→3 ml/L','Root Juice bis ~Tag 21 fortsetzen','Autos NICHT toppen – zu riskant','LST ab 4. Nodes OK','Erste Pistillen oft Tag 25-28']},
{id:'pre',name:'Vorblüte',color:'#FBBF24',s:28,e:35,
 env:{temp:[22,27],rh:[45,55],ph:[6.0,6.5],ec:[1.0,1.4]},
 wat:{ml:[500,1000],every:2,note:'Mehr Durst durch Stretch'},
 bb:{rj:0,bg:2,bb:1,tm:1,am:1,note:'Übergang: Bio Grow + Bio Bloom + Top Max'},
 tips:['Pistillen sichtbar (weiße Härchen)','Stretch: +30-50% Höhe in 7-14 Tagen','Ca/Mg-Defizite jetzt korrigieren','Luftzirkulation prüfen – Schimmelprävention','Keine Trainings mehr nach Tag 35']},
{id:'flower',name:'Blüte',color:'#F59E0B',s:35,e:56,
 env:{temp:[20,26],rh:[40,50],ph:[6.0,6.5],ec:[1.2,1.8]},
 wat:{ml:[700,1500],every:2,note:'EC-Spikes vermeiden'},
 bb:{rj:0,bg:1,bb:3,tm:2,am:1,note:'Bloom dominant · Top Max für dichte Buds'},
 tips:['Bio Bloom hochfahren auf 3-4 ml/L','RH UNTER 50% – Orion F1 neigt zu Schimmel','Geruch wird intensiv → Aktivkohlefilter','Untere Blätter nicht komplett entlauben','Licht 18/6 oder 20/4']},
{id:'ripe',name:'Reife',color:'#A78BFA',s:56,e:63,
 env:{temp:[20,24],rh:[35,45],ph:[6.0,6.5],ec:[1.4,1.8]},
 wat:{ml:[700,1200],every:2,note:'Peak Bloom, dann reduzieren'},
 bb:{rj:0,bg:0,bb:3,tm:3,am:1,note:'Kein Bio Grow mehr · Bloom + Top Max Peak'},
 tips:['Trichom-Check täglich mit 60× Lupe','Milchig = peak THC · bernstein = Couchlock','Nachttemperatur 18-20°C → mehr Harz','RH UNTER 45% halten (Schimmelgefahr!)','24-48h Dunkelphase vor Ernte optional']},
{id:'flush',name:'Flush (optional)',color:'#C4B5FD',s:63,e:70,
 env:{temp:[20,22],rh:[35,40],ph:[6.0,6.5],ec:[0,0.2]},
 wat:{ml:[500,1000],every:2,note:'Nur pH-Wasser oder leichte Gaben'},
 bb:{rj:0,bg:0,bb:0,tm:0,am:0,note:'BioBizz-Flush umstritten – bei rein organischem Setup oft unnötig. Siehe Hinweis in der Phase-Ansicht.'},
 tips:['Organische Dünger bauen keine Salze auf wie Mineral-Dünger','Viele BioBizz-Grower flushen gar nicht oder nur 3-4 Tage','10-30% bernsteinfarbene Trichome = Ernte','Blätter gilben normal','Ernte kurz vor Licht-AN (max Terpene)','Trocknen 10-14 Tage · 18°C · 55-60% RH · dunkel']}
];

const BB = {
  rj:{name:'Root Juice'}, bg:{name:'Bio Grow'},
  bb:{name:'Bio Bloom'},  tm:{name:'Top Max'}, am:{name:'Alg-A-Mic'}
};

// ─── MANGEL-DIAGNOSE ───
const SYMPTOMS = [
  {id:'yellow-lower',q:'Untere Blätter gelb, obere ok',a:'N-Mangel oder natürlich bei Blüte. Normal ab Reifephase. In Veg: Bio Grow steigern auf 2-3ml/L.',causes:['N-Mangel','Natürlich in Reife','Licht-Entzug']},
  {id:'yellow-all',q:'Alle Blätter gelb, gleichmäßig',a:'pH-Lockout wahrscheinlich. pH mit Messgerät prüfen (Ziel 6.0-6.5). Ggf. Spülgang mit pH 6.3 Wasser.',causes:['pH-Lockout','Wurzel-Probleme','Lichtmangel']},
  {id:'brown-tips',q:'Braune Blattspitzen',a:'Nutrient Burn – zu viel Dünger. BioBizz-Dosen halbieren, nächste Gabe nur pH-Wasser.',causes:['Overfeeding','EC zu hoch']},
  {id:'curl-up',q:'Blätter wölben sich nach OBEN (Tacoing)',a:'Hitzestress oder Licht zu nah. LED-Abstand erhöhen (mind. 30cm), Temp unter 28°C.',causes:['Hitzestress','LED zu nah']},
  {id:'curl-down',q:'Blätter hängen/klauen nach UNTEN',a:'Overwatering ODER N-Überschuss. Topf-Gewicht prüfen. Wenn schwer: austrocknen lassen.',causes:['Overwatering','N-Überschuss']},
  {id:'purple-stem',q:'Stängel lila/rötlich',a:'Bei Sorten wie Orion F1 oft Genetik. Wenn Wachstum ok: kein Problem. Sonst P-Mangel prüfen.',causes:['Genetik','P-Mangel','Kältestress']},
  {id:'brown-spots',q:'Braune Flecken auf Blättern',a:'Ca/Mg-Mangel typisch bei BioBizz ohne Zusatz. Alg-A-Mic erhöhen oder Ca/Mg-Booster.',causes:['Ca-Mangel','Mg-Mangel']},
  {id:'mold',q:'Weiße/graue Flecken an Buds',a:'SCHIMMEL! Sofort befallene Buds entfernen, RH unter 40% drücken, Luftzirkulation erhöhen. Bei starkem Befall: früh ernten.',causes:['Schimmel (Botrytis)','RH zu hoch'],urgent:true},
  {id:'bugs',q:'Kleine Tiere/Spinnweben',a:'Spinnmilben oder Thripse. Isolieren, Neem-Öl abends applizieren, Blattunterseiten nicht vergessen.',causes:['Spinnmilben','Thripse','Trauermücken']},
  {id:'wilting',q:'Pflanze hängt schlapp obwohl feucht',a:'Wurzelfäule oder Topf staunass. Drainage prüfen, ggf. Topf kippen zum Abtropfen.',causes:['Wurzelfäule','Überwässerung']}
];

// ─── STATE ───
let S = {
  started: null,
  pot: 11,
  light: '18/6',
  totalDays: 70,
  plants: [
    {id:'p1',name:'Pflanze 1',color:'#22C55E'},
    {id:'p2',name:'Pflanze 2',color:'#4ADE80'},
    {id:'p3',name:'Pflanze 3',color:'#86EFAC'}
  ],
  watering: [],
  journal: [],
  weights: [],
  photos: [],
  symptoms: [],
  potDry: null,
  potWet: null,
  reminders: false,
  // Kosten-Konfiguration
  costs: {
    kwhPrice: 0.30,        // €/kWh (günstiger Tarif)
    ledWatts: 200,         // LED-Leistung
    fanWatts: 25,          // Abluft/Lüfter (durchgängig)
    fanAlways: true,       // Abluft 24h oder nur mit Licht?
    extraWatts: 60,        // Entfeuchter (200W × ~30% Duty Cycle) + andere Geräte
    waterPrice: 0.005,     // €/L (Deutschland ~4-5€/m³ = 0,004-0,005€/L)
    // BioBizz Flaschenpreise (500ml Standard; aus Handel 2024-2026)
    bbPrices: {
      rj: 22.00,  // Root Juice 500ml
      bg: 17.00,  // Bio Grow 500ml
      bb: 18.00,  // Bio Bloom 500ml
      tm: 25.00,  // Top Max 500ml
      am: 18.00   // Alg-A-Mic 500ml
    },
    bbSize: 500,  // ml pro Flasche
    oneTime: []   // [{id, name, price, date}]
  }
};
let RO = false;
let SHARE_META = null;
let TLF = 'all';
let PLANT_FILTER = null; // null = all plants
let UNDO = null;          // {data, action, timeout}

const LS = 'orion-grow-v4';

function save(){ if(RO) return; localStorage.setItem(LS, JSON.stringify(S)); }
function load(){
  const d = localStorage.getItem(LS);
  if(d){ try { S = Object.assign(S, JSON.parse(d)) } catch(e){} }
  // Migration: Alte Default-Werte (v4/v5) auf neue setzen, falls User sie noch nicht geändert hat
  if(S.costs && S.costs.kwhPrice === 0.37 && S.costs.ledWatts === 150 && S.costs.extraWatts === 0){
    S.costs.kwhPrice = 0.30;
    S.costs.ledWatts = 200;
    S.costs.fanWatts = 25;
    S.costs.extraWatts = 60;
    save();
  }
}

// ─── HELPERS ───
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
function dayFromStart(refDate){
  if(!S.started) return 0;
  const start = new Date(S.started);
  const now = refDate ? new Date(refDate) : new Date();
  return Math.max(1, Math.floor((now - start) / 86400000) + 1);
}
function currentPhase(d){
  d = d || dayFromStart();
  return PH.find(p => d > p.s && d <= p.e) || PH[PH.length - 1];
}
function fmtDate(d){ return new Date(d).toLocaleDateString('de-DE',{day:'2-digit',month:'short'}) }
function fmtTime(d){ return new Date(d).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}) }
function fmtDateTime(d){ return new Date(d).toLocaleString('de-DE',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) }
function esc(s){ return String(s).replace(/[<>&"]/g, c => ({ '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;' })[c]) }
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,6) }

function toast(msg, undoFn){
  const t = $('#ts');
  t.innerHTML = esc(msg) + (undoFn ? ' <button id="undoBtn">Rückgängig</button>' : '');
  t.classList.add('a');
  if(UNDO && UNDO.timeout) clearTimeout(UNDO.timeout);
  if(undoFn){
    UNDO = { fn: undoFn, timeout: setTimeout(() => { t.classList.remove('a'); UNDO = null }, 5000) };
    $('#undoBtn').onclick = () => { undoFn(); t.classList.remove('a'); if(UNDO) clearTimeout(UNDO.timeout); UNDO = null };
  } else {
    setTimeout(() => t.classList.remove('a'), 2200);
  }
}

function openSheet(html){ $('#shC').innerHTML = html; $('#ov').classList.add('a'); $('#sh').classList.add('a') }
function closeSheet(){ $('#ov').classList.remove('a'); $('#sh').classList.remove('a') }
window.closeSheet = closeSheet;

// ═══════════════════════════════════════════════════════════
// INDEXEDDB für Fotos (Blobs)
// ═══════════════════════════════════════════════════════════
let DB = null;
function initDB(){
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('orion-grow', 1);
    req.onerror = () => reject(req.error);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if(!db.objectStoreNames.contains('photos')) db.createObjectStore('photos');
    };
    req.onsuccess = () => { DB = req.result; resolve(DB) };
  });
}
async function storePhoto(id, blob){
  if(!DB) await initDB();
  return new Promise((resolve, reject) => {
    const tx = DB.transaction('photos', 'readwrite');
    tx.objectStore('photos').put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function getPhoto(id){
  if(!DB) await initDB();
  return new Promise((resolve) => {
    const tx = DB.transaction('photos', 'readonly');
    const req = tx.objectStore('photos').get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}
async function deletePhoto(id){
  if(!DB) await initDB();
  return new Promise((resolve) => {
    const tx = DB.transaction('photos', 'readwrite');
    tx.objectStore('photos').delete(id);
    tx.oncomplete = () => resolve();
  });
}

// Foto komprimieren auf max 1000px JPEG 75%
async function compressImage(file){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const max = 1200;
      let w = img.width, h = img.height;
      if(w > max || h > max){
        const r = Math.min(max/w, max/h);
        w = Math.round(w*r); h = Math.round(h*r);
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(resolve, 'image/jpeg', 0.78);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

// ═══════════════════════════════════════════════════════════
// SHARE (URL-basiert, gzip-komprimiert)
// Fotos sind NICHT im Share-Link (zu groß), nur Metadaten + Texte
// ═══════════════════════════════════════════════════════════
const CS_OK = typeof CompressionStream !== 'undefined';

async function compress(obj){
  const json = JSON.stringify(obj);
  const stream = new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'));
  const buf = await new Response(stream).arrayBuffer();
  const b = new Uint8Array(buf); let s = '';
  for(let i=0; i<b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
async function decompress(b64){
  const norm = b64.replace(/-/g,'+').replace(/_/g,'/');
  const bin = atob(norm);
  const b = new Uint8Array(bin.length);
  for(let i=0; i<bin.length; i++) b[i] = bin.charCodeAt(i);
  const stream = new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'));
  return JSON.parse(await new Response(stream).text());
}

async function tryLoadShared(){
  const hash = location.hash;
  if(!hash.startsWith('#s=')) return false;
  try {
    const payload = await decompress(hash.slice(3));
    if(!payload || !payload.d) return false;
    S = Object.assign(
      {started:null,pot:11,light:'18/6',totalDays:70,plants:[],watering:[],journal:[],weights:[],photos:[],symptoms:[]},
      payload.d
    );
    RO = true;
    SHARE_META = { ts: payload.t };
    return true;
  } catch(e){
    console.error('Share-Link nicht ladbar:', e);
    alert('Share-Link konnte nicht geladen werden.');
    location.hash = '';
    return false;
  }
}

async function openShareSheet(){
  if(RO){ toast('Im Read-Only-Modus nicht möglich'); return }
  if(!CS_OK){
    openSheet(`<h2>Teilen nicht verfügbar</h2><p class="ss">Browser zu alt. Nutze Export stattdessen.</p><button class="bg" onclick="closeSheet()">Schließen</button>`);
    return;
  }
  openSheet(`
    <h2>Grow teilen</h2>
    <p class="ss">Erzeugt einen Link mit deinen Daten als Momentaufnahme (nur lesen). <b>Fotos werden nicht übertragen</b> (zu groß für URL) — nur Text-Daten.</p>
    <div class="al i">Nichts wird auf Server gesendet. Daten sind im Link selbst.</div>
    <div id="shareOut"><div class="emp"><p>Link wird generiert…</p></div></div>
  `);
  try {
    // Fotos aus dem Share-Payload entfernen (nur Metadaten behalten, aber ohne thumbId)
    const shareState = JSON.parse(JSON.stringify(S));
    shareState.photos = shareState.photos.map(p => ({ ...p, thumbId: null, noPhoto: true }));
    const payload = { v:4, t:Date.now(), d:shareState };
    const compressed = await compress(payload);
    const base = location.origin + location.pathname;
    const link = `${base}#s=${compressed}`;
    const kb = (compressed.length / 1024).toFixed(1);
    $('#shareOut').innerHTML = `
      <div class="fr"><label>Share-Link · ${kb} KB</label>
        <textarea id="shareLink" rows="4" readonly style="font-family:ui-monospace,monospace;font-size:11px;word-break:break-all">${esc(link)}</textarea>
      </div>
      <button class="bp" id="copyBtn">Link kopieren</button>
      ${navigator.share ? `<button class="bp bd" id="sysShareBtn" style="margin-top:8px">Teilen via System</button>` : ''}
      <button class="bg" onclick="closeSheet()">Schließen</button>`;
    $('#copyBtn').onclick = async () => {
      try { await navigator.clipboard.writeText(link); toast('Link kopiert ✓') }
      catch(e){ $('#shareLink').select(); document.execCommand('copy'); toast('Link kopiert ✓') }
    };
    if(navigator.share){
      $('#sysShareBtn').onclick = () => navigator.share({title:'Mein Grow · Orion', url:link}).catch(()=>{});
    }
  } catch(e){
    $('#shareOut').innerHTML = `<div class="al d">Fehler: ${esc(e.message)}</div><button class="bg" onclick="closeSheet()">Schließen</button>`;
  }
}

function renderShareBanner(){
  const el = $('#shareBanner');
  if(!RO){ el.innerHTML = ''; return }
  const ts = SHARE_META?.ts ? new Date(SHARE_META.ts).toLocaleString('de-DE',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) : '';
  el.innerHTML = `<div class="al g" style="margin-bottom:12px">
    <div><b>Geteilter Grow</b> · nur lesen${ts?' · Stand '+ts:''}</div>
    <button class="tka" id="impShare">Importieren</button>
    <button class="tka" id="exitShare">×</button>
  </div>`;
  $('#impShare').onclick = () => {
    if(!confirm('Diesen Grow als eigenen übernehmen? Deine aktuellen lokalen Daten werden überschrieben.')) return;
    RO = false; localStorage.setItem(LS, JSON.stringify(S));
    location.hash = ''; location.reload();
  };
  $('#exitShare').onclick = () => { location.hash = ''; location.reload() };
}

// ═══════════════════════════════════════════════════════════
// NOTIFICATIONS (für Gieß-Reminder)
// ═══════════════════════════════════════════════════════════
async function requestNotifications(){
  if(!('Notification' in window)) return false;
  const perm = await Notification.requestPermission();
  return perm === 'granted';
}
function scheduleReminder(){
  if(!S.reminders || !('Notification' in window) || Notification.permission !== 'granted') return;
  // Simple: check bei App-Öffnung ob Gabe fällig ist
  const d = dayFromStart();
  const p = currentPhase(d);
  const last = S.watering.filter(w => w.ml > 0).slice(-1)[0];
  if(!last) return;
  const daysSince = Math.floor((Date.now() - new Date(last.date)) / 86400000);
  if(daysSince >= p.wat.every && 'serviceWorker' in navigator){
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification('Gießen fällig 💧', {
        body: `Tag ${d} · ${p.name}. Empfohlen: ${p.wat.ml[0]}–${p.wat.ml[1]} ml`,
        icon: './icon-192.png',
        tag: 'watering-reminder',
        silent: false
      }).catch(()=>{});
    });
  }
}

// ═══════════════════════════════════════════════════════════
// RENDER: HOME
// ═══════════════════════════════════════════════════════════
function renderHome(){
  const d = dayFromStart();
  const p = currentPhase(d);
  const pct = Math.min(100, (d / S.totalDays) * 100);

  $('#hDay').textContent = d;
  $('#hTotal').textContent = S.totalDays;
  $('#hPhase').textContent = p.name;
  $('#hDot').style.background = p.color;
  $('#hProg').style.width = pct + '%';
  $('#tDate').textContent = new Date().toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'short'});
  $('#hMarks').innerHTML = PH.map(ph => `<span>${ph.name.slice(0,4)}</span>`).join('');

  const waterings = S.watering.filter(w => w.ml > 0);
  const lw = waterings[waterings.length-1];
  if(lw){
    const dd = Math.floor((Date.now() - new Date(lw.date)) / 86400000);
    $('#sLast').textContent = dd === 0 ? 'heute' : dd === 1 ? 'gestern' : `vor ${dd} T`;
  } else $('#sLast').textContent = '—';

  if(waterings.length){
    const avg = waterings.reduce((s,w) => s+w.ml, 0) / waterings.length;
    $('#sAvg').innerHTML = `${Math.round(avg)}<small>ml</small>`;
  } else $('#sAvg').textContent = '—';
  $('#sHarv').innerHTML = `${Math.max(0, S.totalDays - d)}<small>T</small>`;

  $('#hRanges').innerHTML = [
    ['Temp', `${p.env.temp[0]}–${p.env.temp[1]} °C`],
    ['Luftf.', `${p.env.rh[0]}–${p.env.rh[1]} %`],
    ['pH', `${p.env.ph[0].toFixed(1)}–${p.env.ph[1].toFixed(1)}`],
    ['EC', p.env.ec[1] ? `${p.env.ec[0].toFixed(1)}–${p.env.ec[1].toFixed(1)}` : '—']
  ].map(r => `<div class="rb"><div class="rbl">${r[0]}</div><div class="rbv">${r[1]}</div></div>`).join('');

  const items = Object.keys(BB).filter(k => p.bb[k] > 0);
  $('#bbToday').innerHTML = items.length
    ? items.map(k => `<div class="bbi"><span class="n">${BB[k].name}</span><span class="v">${p.bb[k]}<small> ml/L</small></span></div>`).join('') + `<p class="sub" style="font-size:12px;margin-top:8px;line-height:1.5">${p.bb.note}</p>`
    : `<p class="sub">${p.bb.note}</p>`;

  // Kontextuelle Tipps: nur 2-3 relevanteste, dynamisch
  const contextTips = getContextualTips(d, p);
  $('#tTips').innerHTML = contextTips.map(t => {
    const w = /unter|schimmel|nicht|kein|achtung|häufigste/i.test(t);
    return `<li${w?' class="w"':''}>${esc(t)}</li>`;
  }).join('');

  renderWeightWidget();
  renderTasks(d, p);
  renderAlerts(d, p);
}

function getContextualTips(d, p){
  // Nur 2-3 Tipps, der Situation angepasst
  const tips = [];
  const w = S.watering.filter(x => x.ml > 0).slice(-1)[0];

  // Phase-spezifische Schlüssel-Tipps (erster + besonderer)
  if(p.id === 'seed' && d < 10) tips.push(p.tips[3]); // Nicht überwässern
  if(p.id === 'veg' && d >= 21) tips.push('Bald Vorblüte: Ca/Mg-Vorrat prüfen, Alg-A-Mic nutzen');
  if(p.id === 'pre') tips.push(p.tips[4]); // Keine Trainings mehr
  if(p.id === 'flower') tips.push(p.tips[1]); // RH unter 50%
  if(p.id === 'ripe') tips.push(p.tips[0]); // Trichome check
  if(p.id === 'flush') tips.push('Bei rein organischem BioBizz ist Flushing oft unnötig – entscheide selbst');

  // Topf-Gewicht Tipp wenn noch nicht gesetzt
  if(!S.potDry && d > 3) tips.push('Tipp: Topfgewicht trocken & gegossen eintragen – verlässlicher als Gieß-Intervall');

  // Foto-Tipp wenn lange keins
  const lastPhoto = S.photos[S.photos.length-1];
  const daysSincePhoto = lastPhoto ? Math.floor((Date.now() - new Date(lastPhoto.date)) / 86400000) : 999;
  if(daysSincePhoto > 3 && d > 7) tips.push('Lange kein Foto – Visueller Verlauf hilft beim Vergleich');

  // Generischer Phase-Tipp als Fallback
  if(tips.length < 2) tips.push(p.tips[0]);
  if(tips.length < 3 && p.tips[2]) tips.push(p.tips[2]);

  return tips.slice(0, 4);
}

function renderTasks(d, p){
  const waterings = S.watering.filter(w => w.ml > 0);
  const last = waterings[waterings.length-1];
  const daysSince = last ? Math.floor((Date.now() - new Date(last.date)) / 86400000) : 999;
  const needs = daysSince >= p.wat.every;
  const tasks = [];

  if(needs){
    const nu = Object.keys(BB).filter(k => p.bb[k] > 0).map(k => `${BB[k].name} ${p.bb[k]}ml/L`).join(' · ');
    tasks.push({i:'w',t:'Gießen fällig',m:`${p.wat.ml[0]}–${p.wat.ml[1]} ml · ${nu || 'nur Wasser'}`,a:RO?null:'Log',fn:openWaterSheet,done:false});
  } else {
    tasks.push({i:'w',t:'Gießen ok',m:`Nächste Gabe in ${p.wat.every - daysSince} T`,a:null,done:true});
  }

  // Env-Check: heute schon einer gemacht?
  const today = new Date().toDateString();
  const envToday = S.watering.some(w => (w.temp || w.rh) && new Date(w.date).toDateString() === today);
  tasks.push({i:'e',t:'Umgebung',m:`${p.env.temp[0]}-${p.env.temp[1]}°C · ${p.env.rh[0]}-${p.env.rh[1]}% RH`,a:RO?null:'Log',fn:openEnvSheet,done:envToday});

  if(p.id === 'ripe' || p.id === 'flush'){
    tasks.push({i:'a',t:'Trichome prüfen',m:'60× Lupe · milchig vs bernstein',a:RO?null:'Notiz',fn:() => {switchView('journal'); setTimeout(() => {$('#jIn').value='Trichome: '; $('#jIn').focus()}, 250)},done:false});
  }

  // Foto-Task: heute schon eins?
  const photoToday = S.photos.some(p => new Date(p.date).toDateString() === today);
  if(!RO) tasks.push({i:'n',t:'Tagesfoto',m:photoToday ? 'Heute gemacht ✓' : 'Visueller Verlauf',a:photoToday?null:'Knipsen',fn:openPhotoCapture,done:photoToday});

  tasks.push({i:'d',t:'Mangel-Check',m:'Symptome erkennen',a:RO?null:'Prüfen',fn:openSymptomDiagnosis,done:false});

  const ico = {w:'💧',e:'🌡',a:'🔬',n:'📸',d:'🩺'};
  $('#tTasks').innerHTML = tasks.map((t, i) => `
    <div class="tk${t.done?' done':''}">
      <div class="tki ${t.i}">${ico[t.i]}</div>
      <div class="tkb"><div class="tt">${t.t}</div><div class="tm">${t.m}</div></div>
      ${t.a ? `<button class="tka${i===0&&!t.done?' prim':''}" data-tk="${i}">${t.a}</button>` : ''}
    </div>`).join('');
  $$('#tTasks .tka').forEach(b => {
    b.onclick = () => { const fn = tasks[+b.dataset.tk].fn; fn && fn() };
  });
}

function renderAlerts(d, p){
  const al = [];
  const last = S.watering.slice().reverse().find(w => w.rh);
  if(last && last.rh > 55 && ['flower','ripe'].includes(p.id))
    al.push({t:'d',m:`Luftfeuchte ${last.rh}% zu hoch für Blütephase – Schimmelgefahr bei Orion F1's dichten Buds. Ziel: <50%.`});
  if(d === 14) al.push({t:'i',m:'Ende Sämlingsphase · Bio Grow einführen (1ml/L). Light Mix Vordüngung ist aufgebraucht.'});
  if(d === 28) al.push({t:'i',m:'Übergang zur Vorblüte · Stretch beginnt. Bio Bloom + Top Max einführen.'});
  if(d === 63) al.push({t:'i',m:'Flush-Zeitfenster. Bei BioBizz organisch aber oft nicht nötig — entscheide nach Blattfarbe.'});
  if(d >= S.totalDays - 3 && d <= S.totalDays) al.push({t:'g',m:'Ernte-Fenster! Trichom-Check: 10-30% bernsteinfarben = ernten.'});
  $('#alerts').innerHTML = al.map(a => `<div class="al ${a.t}"><div>${esc(a.m)}</div></div>`).join('');
}

// ─── Topf-Gewicht Widget ───
function renderWeightWidget(){
  const box = $('#weightWidget');
  if(!box) return;
  const last = S.weights.slice(-1)[0];
  if(!S.potDry || !S.potWet){
    box.innerHTML = `
      <div class="ct" style="margin:0 0 8px">Topfgewicht<span class="ln"></span></div>
      <p class="sub" style="font-size:12px">Referenzwerte fehlen. Zuverlässigere Methode als Zeit-Intervalle.</p>
      <button class="bp bd" id="setupWeightBtn" style="margin-top:8px">Referenz eintragen</button>
    `;
    $('#setupWeightBtn').onclick = openWeightSetup;
    return;
  }
  const range = S.potWet - S.potDry;
  const current = last ? last.grams : null;
  const pct = current ? Math.max(0, Math.min(100, ((current - S.potDry) / range) * 100)) : 0;
  const status = !current ? 'Kein Eintrag' : pct < 20 ? 'Trocken – gießen!' : pct < 50 ? 'Anbaubereit' : pct < 80 ? 'Feucht' : 'Frisch gegossen';
  box.innerHTML = `
    <div class="ct" style="margin:0 0 8px">Topfgewicht<span class="ln"></span>${current?`<span class="mono" style="font-size:11px">${current}g</span>`:''}</div>
    <div class="weight-gauge">
      <div class="fill" style="width:${pct}%"></div>
    </div>
    <div class="weight-labels"><span>${S.potDry}g trocken</span><span>${status}</span><span>${S.potWet}g feucht</span></div>
    <button class="bp bd" id="logWeightBtn" style="margin-top:10px">Neu messen</button>
  `;
  $('#logWeightBtn').onclick = openWeightLog;
}

function openWeightSetup(){
  openSheet(`
    <h2>Topfgewicht-Referenz</h2>
    <p class="ss">Miss das Gewicht einmal trocken (vor Gießen, wenn Pflanze durstig ist) und einmal direkt nach dem Gießen (gut abgetropft). Zukünftige Messungen zeigen dir den Feuchtigkeits-Stand.</p>
    <div class="g2">
      <div class="fr"><label>Trocken (g)</label><input type="number" id="wD" placeholder="z.B. 1800"></div>
      <div class="fr"><label>Frisch gegossen (g)</label><input type="number" id="wW" placeholder="z.B. 3500"></div>
    </div>
    <button class="bp" id="wSave">Speichern</button>
    <button class="bg" onclick="closeSheet()">Abbrechen</button>
  `);
  $('#wSave').onclick = () => {
    const dry = +$('#wD').value;
    const wet = +$('#wW').value;
    if(!dry || !wet || wet <= dry){ toast('Werte ungültig – feucht muss > trocken'); return }
    S.potDry = dry; S.potWet = wet;
    save(); closeSheet(); refresh(); toast('Referenz gespeichert ✓');
  };
}

function openWeightLog(){
  const d = dayFromStart();
  const plants = S.plants.length;
  openSheet(`
    <h2>Gewicht messen</h2>
    <p class="ss">Tag ${d} · Referenz: ${S.potDry}g trocken, ${S.potWet}g feucht</p>
    ${plants > 1 ? `
    <div class="fr"><label>Welche Pflanze?</label>
      <div class="ch" id="wPl">
        <button class="chp a" data-p="">Alle (Ø)</button>
        ${S.plants.map(p => `<button class="chp" data-p="${p.id}">${esc(p.name)}</button>`).join('')}
      </div>
    </div>` : ''}
    <div class="fr"><label>Aktuelles Gewicht (g)</label><input type="number" id="wG" placeholder="z.B. 2200"></div>
    <button class="bp" id="wSave">Speichern</button>
    <button class="bg" onclick="closeSheet()">Abbrechen</button>
  `);
  if(plants > 1){
    $$('#wPl .chp').forEach(b => { b.onclick = () => { $$('#wPl .chp').forEach(x => x.classList.remove('a')); b.classList.add('a') }});
  }
  $('#wSave').onclick = () => {
    const g = +$('#wG').value;
    if(!g){ toast('Gewicht fehlt'); return }
    const plantId = plants > 1 ? ($('#wPl .chp.a')?.dataset.p || null) : null;
    S.weights.push({ id:uid(), date:new Date().toISOString(), day:d, plantId, grams:g });
    save(); closeSheet(); refresh(); toast('Gewicht geloggt ✓');
  };
}

// ═══════════════════════════════════════════════════════════
// RENDER: WATER
// ═══════════════════════════════════════════════════════════
function renderWater(){
  const d = dayFromStart(), p = currentPhase(d);
  $('#wRec').textContent = `${p.wat.ml[0]}–${p.wat.ml[1]} ml`;
  $('#wRecNote').textContent = p.wat.note;
  $('#wTg').innerHTML = `pH ${p.env.ph[0].toFixed(1)}–${p.env.ph[1].toFixed(1)} · EC ${p.env.ec[1] ? p.env.ec[0].toFixed(1) + '–' + p.env.ec[1].toFixed(1) : '0'}`;
  renderCalc();

  const ws = S.watering.filter(w => w.ml > 0).slice().reverse().slice(0, 15);
  $('#wCount').textContent = `${S.watering.filter(w => w.ml > 0).length} gesamt`;
  if(!ws.length){
    $('#wHist').innerHTML = `<div class="emp"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.5s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z"/></svg><p>Noch keine Einträge</p></div>`;
    return;
  }
  $('#wHist').innerHTML = ws.map(w => renderWaterItem(w)).join('');
  if(!RO) $$('#wHist .ld').forEach(b => { b.onclick = () => delWater(b.dataset.del) });
}

function renderWaterItem(w){
  const phCol = w.ph ? (w.ph >= 5.8 && w.ph <= 6.5 ? 'var(--g)' : 'var(--warn)') : null;
  const nutes = w.nutes && Object.keys(w.nutes).filter(k => w.nutes[k] > 0);
  const nstr = nutes && nutes.length ? nutes.map(k => BB[k] ? BB[k].name.split(' ')[0] : k).join(' · ') : '';
  return `<div class="li">
    <div class="lic" style="background:rgba(56,189,248,.12);color:var(--wat)">💧</div>
    <div class="lib">
      <div class="lt mono">${w.ml} ml ${w.ph?`<span style="color:${phCol};font-weight:400;margin-left:4px;font-size:12px">pH ${w.ph}</span>`:''}${w.ec?`<span class="sub" style="margin-left:4px;font-size:12px">EC ${w.ec}</span>`:''}</div>
      <div class="lm">${fmtDateTime(w.date)}${nstr?' · '+nstr:''}${w.note?' · '+esc(w.note):''}</div>
    </div>
    ${RO ? '' : `<button class="ld" data-del="${w.id}">×</button>`}
  </div>`;
}

function renderCalc(){
  const d = dayFromStart(), p = currentPhase(d);
  const L = parseFloat($('#calcL').value) || 1;
  const items = Object.keys(BB).filter(k => p.bb[k] > 0);
  if(!items.length){
    $('#calcOut').innerHTML = `<div class="bbi"><span class="n">Nur Wasser</span><span class="v">${L}<small> L</small></span></div>`;
    $('#calcNote').textContent = p.bb.note + ' · pH auf 6.3 einstellen (Zitronensäure / pH-Down).';
    return;
  }
  $('#calcOut').innerHTML = items.map(k => {
    const v = (p.bb[k] * L).toFixed(1);
    return `<div class="bbi"><span class="n">${BB[k].name}</span><span class="v">${v}<small> ml</small></span></div>`;
  }).join('');
  $('#calcNote').textContent = p.bb.note + ' · pH auf 6.3 einstellen (Zitronensäure / pH-Down).';
}

// ═══════════════════════════════════════════════════════════
// RENDER: PHASES
// ═══════════════════════════════════════════════════════════
function renderPhases(){
  const d = dayFromStart(), p = currentPhase(d);
  const flushNote = p.id === 'flush'
    ? `<div class="al i" style="margin-top:10px"><div><b>Flush bei BioBizz organisch:</b> Viele erfahrene Grower flushen bei reinem BioBizz-Setup <b>nicht</b>, weil organische Dünger keine Salze akkumulieren wie mineralische. Beobachte deine Pflanzen — wenn sie gesund aussehen, kannst du direkt ernten. Bei starkem Grün: 3-5 Tage leicht reduziert füttern.</div></div>`
    : '';
  $('#curPhase').innerHTML = `
    <div class="bdg" style="margin-bottom:8px"><span class="pd" style="background:${p.color}"></span>Aktuelle Phase</div>
    <h2 class="fd" style="font-size:26px">${p.name}</h2>
    <p class="sub">Tag ${p.s+1}–${p.e} · aktuell Tag ${d}</p>
    <div class="rl">
      <div class="rb"><div class="rbl">Temp</div><div class="rbv">${p.env.temp[0]}–${p.env.temp[1]} °C</div></div>
      <div class="rb"><div class="rbl">Luftf.</div><div class="rbv">${p.env.rh[0]}–${p.env.rh[1]} %</div></div>
      <div class="rb"><div class="rbl">pH</div><div class="rbv">${p.env.ph[0].toFixed(1)}–${p.env.ph[1].toFixed(1)}</div></div>
      <div class="rb"><div class="rbl">EC</div><div class="rbv">${p.env.ec[1] ? p.env.ec[0].toFixed(1) + '–' + p.env.ec[1].toFixed(1) : '—'}</div></div>
    </div>
    ${flushNote}
    <div class="ct" style="margin-top:12px">BioBizz · ml/L<span class="ln"></span></div>
    ${Object.keys(BB).filter(k => p.bb[k] > 0).map(k => `<div class="bbi"><span class="n">${BB[k].name}</span><span class="v">${p.bb[k]}<small> ml/L</small></span></div>`).join('') || '<p class="sub">Nur Wasser</p>'}
    <p class="sub" style="font-size:12px;margin-top:8px">${p.bb.note}</p>
    <div class="ct" style="margin-top:14px">Fokus<span class="ln"></span></div>
    <ul class="tp">${p.tips.map(t => { const w = /unter|schimmel|nicht|kein|achtung|häufigste/i.test(t); return `<li${w?' class="w"':''}>${esc(t)}</li>` }).join('')}</ul>
  `;
  $('#road').innerHTML = PH.map(ph => {
    const done = d > ph.e, cur = d > ph.s && d <= ph.e;
    return `<div class="pn${done?' dn':cur?' cu':''}">
      <div class="pnt">${ph.name}</div>
      <div class="pnd mono">Tag ${ph.s+1}–${ph.e} · ${ph.e-ph.s} Tage</div>
      <div class="pnc">${ph.bb.note}</div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════
// RENDER: VERLAUF (Timeline)
// ═══════════════════════════════════════════════════════════
function buildTimeline(){
  const items = [];
  S.watering.forEach(w => {
    const isEnv = !w.ml || w.ml === 0;
    items.push({ type:isEnv?'env':'water', id:'w-'+w.id, date:w.date, day:w.day || dayFromStart(w.date), plantId:w.plantId, data:w });
  });
  S.journal.forEach(j => items.push({ type:'note', id:'j-'+j.id, date:j.date, day:j.day, plantId:j.plantId, data:j }));
  S.weights.forEach(w => items.push({ type:'weight', id:'g-'+w.id, date:w.date, day:w.day, plantId:w.plantId, data:w }));
  S.photos.forEach(p => items.push({ type:'photo', id:'f-'+p.id, date:p.date, day:p.day, plantId:p.plantId, data:p }));
  S.symptoms.forEach(sy => items.push({ type:'symptom', id:'s-'+sy.id, date:sy.date, day:sy.day, plantId:sy.plantId, data:sy }));

  if(S.started){
    const start = new Date(S.started);
    const curDay = dayFromStart();
    items.push({ type:'phase', id:'p-start', date:S.started, day:1, data:{phase:PH[0], isStart:true} });
    PH.forEach((p, i) => {
      if(i === 0) return;
      if(curDay > p.s){
        const d = new Date(start);
        d.setDate(d.getDate() + p.s);
        items.push({ type:'phase', id:'p-'+p.id, date:d.toISOString(), day:p.s+1, data:{phase:p} });
      }
    });
  }
  items.sort((a,b) => new Date(b.date) - new Date(a.date));
  return items;
}

function renderJournal(){
  let all = buildTimeline();
  // Plant filter
  if(PLANT_FILTER) all = all.filter(i => i.plantId === PLANT_FILTER || i.type === 'phase' || !i.plantId);
  // Type filter
  const items = TLF === 'all' ? all : all.filter(i => i.type === TLF || (TLF === 'photo' && i.type === 'photo'));

  if(!items.length){
    $('#jList').innerHTML = `<div class="emp"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h13a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-3 2V6a2 2 0 0 1 2-2z"/></svg><p>${TLF === 'all' ? 'Noch keine Einträge' : 'Keine Einträge in diesem Filter'}</p></div>`;
    return;
  }
  const byDay = {};
  items.forEach(it => { (byDay[it.day] = byDay[it.day] || []).push(it) });
  const days = Object.keys(byDay).sort((a,b) => +b - +a);

  $('#jList').innerHTML = days.map(d => {
    const ph = PH.find(p => +d > p.s && +d <= p.e) || PH[0];
    const first = new Date(byDay[d][0].date);
    const dateStr = first.toLocaleDateString('de-DE',{day:'2-digit',month:'short'});
    return `<div style="margin-bottom:14px">
      <div class="dgh">
        <span class="bdg"><span class="pd" style="background:${ph.color}"></span>Tag ${d}</span>
        <span style="opacity:.7">${ph.name}</span>
        <span class="ln"></span>
        <span class="mono" style="font-size:11px">${dateStr}</span>
      </div>
      ${byDay[d].map(renderTLItem).join('')}
    </div>`;
  }).join('');
  if(!RO) $$('#jList .ld').forEach(b => { b.onclick = () => delTLItem(b.dataset.tlid) });

  // Photo-click handlers
  $$('#jList .photo-trigger').forEach(el => {
    el.onclick = () => openPhotoViewer(el.dataset.pid);
  });
}

function plantBadge(plantId){
  if(!plantId) return '';
  const p = S.plants.find(x => x.id === plantId);
  return p ? `<span class="pbadge" style="color:${p.color}">${esc(p.name)}</span>` : '';
}

function renderTLItem(it){
  const time = fmtTime(it.date);
  const pb = plantBadge(it.plantId);

  if(it.type === 'water'){
    const w = it.data;
    const phCol = w.ph ? (w.ph >= 5.8 && w.ph <= 6.5 ? 'var(--g)' : 'var(--warn)') : null;
    const nutes = w.nutes && Object.keys(w.nutes).filter(k => w.nutes[k] > 0);
    const nstr = nutes && nutes.length ? nutes.map(k => BB[k] ? `${BB[k].name} ${w.nutes[k]}ml/L` : k).join(' · ') : '';
    return `<div class="li">
      <div class="lic" style="background:rgba(56,189,248,.12);color:var(--wat)">💧</div>
      <div class="lib">
        <div class="lt mono">${w.ml || 0} ml${w.ph?` <span style="color:${phCol};font-weight:400;margin-left:4px;font-size:12px">pH ${w.ph}</span>`:''}${w.ec?` <span class="sub" style="margin-left:4px;font-size:12px">EC ${w.ec}</span>`:''}${pb}</div>
        <div class="lm">${time}${nstr?' · '+nstr:''}${w.note?' · '+esc(w.note):''}</div>
      </div>
      ${RO?'':`<button class="ld" data-tlid="${it.id}">×</button>`}
    </div>`;
  }
  if(it.type === 'env'){
    const w = it.data;
    return `<div class="li">
      <div class="lic" style="background:rgba(167,139,250,.14);color:var(--flow)">🌡</div>
      <div class="lib">
        <div class="lt mono">${w.temp?w.temp+'°C':''}${w.temp&&w.rh?' · ':''}${w.rh?w.rh+'% RH':''}${pb}</div>
        <div class="lm">${time} · Umgebungs-Check</div>
      </div>
      ${RO?'':`<button class="ld" data-tlid="${it.id}">×</button>`}
    </div>`;
  }
  if(it.type === 'note'){
    const j = it.data;
    return `<div class="li">
      <div class="lic" style="background:rgba(245,158,11,.14);color:var(--amber)">📝</div>
      <div class="lib">
        <div class="lt" style="white-space:pre-wrap;font-weight:400">${esc(j.text)}${pb}</div>
        <div class="lm">${time}</div>
      </div>
      ${RO?'':`<button class="ld" data-tlid="${it.id}">×</button>`}
    </div>`;
  }
  if(it.type === 'weight'){
    const w = it.data;
    const pct = S.potDry && S.potWet ? Math.round(((w.grams - S.potDry) / (S.potWet - S.potDry)) * 100) : null;
    return `<div class="li">
      <div class="lic" style="background:rgba(34,197,94,.12);color:var(--g)">⚖️</div>
      <div class="lib">
        <div class="lt mono">${w.grams} g${pct!==null?` · ${pct}% Feuchte`:''}${pb}</div>
        <div class="lm">${time} · Gewicht</div>
      </div>
      ${RO?'':`<button class="ld" data-tlid="${it.id}">×</button>`}
    </div>`;
  }
  if(it.type === 'photo'){
    const p = it.data;
    if(p.noPhoto){
      return `<div class="li">
        <div class="lic" style="background:rgba(245,158,11,.14);color:var(--amber)">📸</div>
        <div class="lib">
          <div class="lt">Foto (nicht geteilt)${pb}</div>
          <div class="lm">${time}${p.caption?' · '+esc(p.caption):''}</div>
        </div>
      </div>`;
    }
    return `<div class="li photo-trigger" data-pid="${p.id}" style="cursor:pointer">
      <div class="lic" style="background:rgba(245,158,11,.14);color:var(--amber)">📸</div>
      <div class="lib">
        <div class="lt">Foto${pb}</div>
        <div class="lm">${time}${p.caption?' · '+esc(p.caption):''}</div>
      </div>
      ${RO?'':`<button class="ld" data-tlid="${it.id}" onclick="event.stopPropagation()">×</button>`}
    </div>`;
  }
  if(it.type === 'symptom'){
    const sy = it.data;
    const sym = SYMPTOMS.find(s => s.id === sy.symptomId);
    return `<div class="li">
      <div class="lic" style="background:rgba(248,113,113,.12);color:var(--danger)">🩺</div>
      <div class="lib">
        <div class="lt">${sym ? esc(sym.q) : 'Symptom'}${pb}</div>
        <div class="lm">${time}${sy.note ? ' · ' + esc(sy.note) : ''}</div>
      </div>
      ${RO?'':`<button class="ld" data-tlid="${it.id}">×</button>`}
    </div>`;
  }
  if(it.type === 'phase'){
    const p = it.data.phase;
    const title = it.data.isStart ? 'Grow gestartet' : `Neue Phase: ${p.name}`;
    return `<div class="li mile">
      <div class="lic" style="background:${p.color}22;color:${p.color}">✦</div>
      <div class="lib"><div class="lt">${title}</div><div class="lm">automatisch · ${time}</div></div>
    </div>`;
  }
  return '';
}

async function delTLItem(id){
  if(RO) return;
  if(!confirm('Eintrag löschen?')) return;
  let deleted = null;
  if(id.startsWith('w-')){
    const w = S.watering.find(x => 'w-'+x.id === id);
    if(w){ deleted = {type:'watering', data:w}; S.watering = S.watering.filter(x => x !== w) }
  } else if(id.startsWith('j-')){
    const j = S.journal.find(x => 'j-'+x.id === id);
    if(j){ deleted = {type:'journal', data:j}; S.journal = S.journal.filter(x => x !== j) }
  } else if(id.startsWith('g-')){
    const w = S.weights.find(x => 'g-'+x.id === id);
    if(w){ deleted = {type:'weights', data:w}; S.weights = S.weights.filter(x => x !== w) }
  } else if(id.startsWith('f-')){
    const p = S.photos.find(x => 'f-'+x.id === id);
    if(p){ deleted = {type:'photos', data:p, thumbId:p.thumbId}; await deletePhoto(p.thumbId); S.photos = S.photos.filter(x => x !== p) }
  } else if(id.startsWith('s-')){
    const s = S.symptoms.find(x => 's-'+x.id === id);
    if(s){ deleted = {type:'symptoms', data:s}; S.symptoms = S.symptoms.filter(x => x !== s) }
  }
  save(); refresh();
  if(deleted){
    toast('Gelöscht', async () => {
      if(deleted.type === 'photos' && deleted.thumbId){
        // Can't undo photo delete because blob is gone. Skip.
        toast('Foto kann nicht wiederhergestellt werden');
        return;
      }
      S[deleted.type].push(deleted.data);
      save(); refresh();
      toast('Wiederhergestellt ✓');
    });
  }
}

function delWater(id){
  if(RO) return;
  if(!confirm('Eintrag löschen?')) return;
  const w = S.watering.find(x => x.id === id);
  if(!w) return;
  S.watering = S.watering.filter(x => x !== w);
  save(); refresh();
  toast('Gelöscht', () => { S.watering.push(w); save(); refresh(); toast('Wiederhergestellt ✓') });
}

// ═══════════════════════════════════════════════════════════
// RENDER: PFLANZEN-VERGLEICH
// ═══════════════════════════════════════════════════════════
function renderCompare(){
  if(S.plants.length <= 1){
    $('#v-compare').innerHTML = `<h2 class="vt">Vergleich</h2><div class="emp"><p>Du hast nur eine Pflanze. Vergleich erst ab 2 Pflanzen.</p></div>`;
    return;
  }
  $('#v-compare').innerHTML = `
    <h2 class="vt">Pflanzen-Vergleich</h2>
    <div class="compare-grid">
      ${S.plants.map(plant => {
        const notes = S.journal.filter(j => j.plantId === plant.id).length;
        const photos = S.photos.filter(p => p.plantId === plant.id).length;
        const symptoms = S.symptoms.filter(s => s.plantId === plant.id).length;
        const weights = S.weights.filter(w => w.plantId === plant.id);
        const lastW = weights[weights.length - 1];
        return `<div class="compare-plant" style="border-color:${plant.color}33">
          <h3><span class="pd" style="width:10px;height:10px;border-radius:50%;background:${plant.color};display:inline-block"></span>${esc(plant.name)}</h3>
          <div class="sub">Alle teilen Tag ${dayFromStart()} · ${currentPhase().name}</div>
          <div class="mini-stats">
            <div class="ms"><div class="v">${notes}</div><div class="l">Notizen</div></div>
            <div class="ms"><div class="v">${photos}</div><div class="l">Fotos</div></div>
            <div class="ms"><div class="v">${symptoms}</div><div class="l">Symptome</div></div>
          </div>
          ${lastW ? `<p class="sub" style="margin-top:10px;font-size:12px">Letztes Gewicht: <b>${lastW.grams}g</b> (Tag ${lastW.day})</p>` : ''}
          <button class="bp bd" style="margin-top:10px" data-plant="${plant.id}">Nur diese Pflanze anzeigen</button>
        </div>`;
      }).join('')}
    </div>
    <button class="bp bd" style="margin-top:14px" id="managePlants">Pflanzen verwalten</button>
  `;
  $$('#v-compare [data-plant]').forEach(b => {
    b.onclick = () => { PLANT_FILTER = b.dataset.plant; switchView('journal') };
  });
  $('#managePlants').onclick = openPlantsManager;
}

function openPlantsManager(){
  if(RO){ toast('Nur lesen'); return }
  openSheet(`
    <h2>Pflanzen verwalten</h2>
    <p class="ss">Alle starten am gleichen Tag. Du kannst sie umbenennen oder hinzufügen/entfernen.</p>
    <div id="plantEditList">
      ${S.plants.map(p => `
        <div class="fr" style="display:flex;gap:8px;align-items:center">
          <input type="color" value="${p.color}" data-pc="${p.id}" style="width:44px;padding:2px;flex-shrink:0">
          <input type="text" value="${esc(p.name)}" data-pn="${p.id}" style="flex:1">
          <button class="ib" data-pd="${p.id}" style="color:var(--danger)">×</button>
        </div>
      `).join('')}
    </div>
    <button class="bp bd" id="addPlant" style="margin-top:10px">+ Pflanze hinzufügen</button>
    <button class="bp" id="savePlants">Speichern</button>
    <button class="bg" onclick="closeSheet()">Abbrechen</button>
  `);
  $('#addPlant').onclick = () => {
    S.plants.push({ id:'p' + uid(), name:`Pflanze ${S.plants.length+1}`, color:'#22C55E' });
    openPlantsManager();
  };
  $$('#plantEditList [data-pd]').forEach(b => {
    b.onclick = () => {
      if(S.plants.length <= 1){ toast('Mindestens 1 Pflanze'); return }
      if(!confirm('Pflanze entfernen? (Einträge bleiben erhalten, aber ohne Zuordnung)')) return;
      S.plants = S.plants.filter(p => p.id !== b.dataset.pd);
      openPlantsManager();
    };
  });
  $('#savePlants').onclick = () => {
    $$('#plantEditList [data-pn]').forEach(i => {
      const plant = S.plants.find(p => p.id === i.dataset.pn);
      if(plant) plant.name = i.value.trim() || plant.name;
    });
    $$('#plantEditList [data-pc]').forEach(i => {
      const plant = S.plants.find(p => p.id === i.dataset.pc);
      if(plant) plant.color = i.value;
    });
    save(); closeSheet(); refresh(); toast('Gespeichert ✓');
  };
}

// ═══════════════════════════════════════════════════════════
// RENDER: DATEN (Charts)
// ═══════════════════════════════════════════════════════════
function renderData(){
  const w14 = S.watering.filter(w => w.ml > 0 && (Date.now() - new Date(w.date)) < 14*86400000);
  drawBar('#chW', w14.map(w => ({ x:new Date(w.date).getTime(), y:w.ml })), '#38BDF8');
  const phD = S.watering.filter(w => w.ph).map(w => {
    const day = dayFromStart(w.date); const p = currentPhase(day);
    return { x:day, y:w.ph, min:p.env.ph[0], max:p.env.ph[1] };
  });
  drawLineBand('#chP', phD, '#22C55E', 5.5, 7.0);
  const ecD = S.watering.filter(w => w.ec > 0).map(w => {
    const day = dayFromStart(w.date); const p = currentPhase(day);
    return { x:day, y:w.ec, min:p.env.ec[0], max:p.env.ec[1] };
  });
  drawLineBand('#chE', ecD, '#4ADE80', 0, 2.0);

  const ws = S.watering.filter(w => w.ml > 0);
  $('#sumN').textContent = ws.length;
  const tW = ws.reduce((s,w) => s+w.ml, 0);
  $('#sumW').innerHTML = tW >= 1000 ? `${(tW/1000).toFixed(1)}<small>L</small>` : `${tW}<small>ml</small>`;
  const phs = S.watering.filter(w => w.ph).map(w => w.ph);
  $('#sumPh').textContent = phs.length ? (phs.reduce((s,x) => s+x, 0) / phs.length).toFixed(2) : '—';
}

function drawBar(sel, data, color){
  const svg = $(sel);
  const box = svg.getBoundingClientRect();
  const W = box.width || 300, H = box.height || 170, P = 20;
  if(!data.length){ svg.innerHTML = `<text x="${W/2}" y="${H/2}" fill="#546056" font-size="12" text-anchor="middle">Keine Daten</text>`; return }
  const maxY = Math.max(...data.map(d => d.y), 100);
  const bw = Math.min((W-2*P) / Math.max(data.length, 4) - 4, 36);
  let html = '';
  data.forEach((d, i) => {
    const x = P + (i * (W-2*P) / Math.max(data.length, 1));
    const h = (d.y/maxY) * (H - 2*P - 14);
    html += `<rect x="${x}" y="${H-P-h}" width="${bw}" height="${h}" rx="3" fill="${color}" opacity="0.8"/>`;
    html += `<text x="${x+bw/2}" y="${H-P-h-4}" fill="${color}" font-size="9" text-anchor="middle">${d.y}</text>`;
    html += `<text x="${x+bw/2}" y="${H-4}" fill="#546056" font-size="9" text-anchor="middle">${fmtDate(d.x)}</text>`;
  });
  svg.innerHTML = html;
}

function drawLineBand(sel, data, color, yMin, yMax){
  const svg = $(sel);
  const box = svg.getBoundingClientRect();
  const W = box.width || 300, H = box.height || 170, P = 22;
  if(!data.length){ svg.innerHTML = `<text x="${W/2}" y="${H/2}" fill="#546056" font-size="12" text-anchor="middle">Keine Daten</text>`; return }
  const xs = data.map(d => d.x);
  const xMin = Math.min(...xs), xMax = Math.max(...xs, xMin+1);
  const sx = x => P + ((x-xMin) / (xMax-xMin||1)) * (W-2*P);
  const sy = y => H - P - ((y-yMin) / (yMax-yMin)) * (H-2*P);
  let html = '';
  if(data[0].min !== undefined){
    const top = data.map((d,i) => `${i===0?'M':'L'}${sx(d.x)},${sy(d.max)}`).join(' ');
    const bot = data.slice().reverse().map(d => `L${sx(d.x)},${sy(d.min)}`).join(' ');
    html += `<path d="${top} ${bot} Z" fill="rgba(255,255,255,0.06)"/>`;
  }
  [yMin, (yMin+yMax)/2, yMax].forEach(y => {
    html += `<line x1="${P}" y1="${sy(y)}" x2="${W-P}" y2="${sy(y)}" stroke="#18211B" stroke-width="1"/>`;
    html += `<text x="${P-4}" y="${sy(y)+3}" fill="#546056" font-size="9" text-anchor="end">${y.toFixed(1)}</text>`;
  });
  const path = data.map((d,i) => `${i===0?'M':'L'}${sx(d.x)},${sy(d.y)}`).join(' ');
  html += `<path d="${path}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  data.forEach(d => { html += `<circle cx="${sx(d.x)}" cy="${sy(d.y)}" r="3" fill="${color}"/>` });
  svg.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════
// SHEETS: Water, Env, Settings, Symptom, Photo
// ═══════════════════════════════════════════════════════════
function openWaterSheet(){
  if(RO){ toast('Nur lesen'); return }
  const d = dayFromStart(), p = currentPhase(d);
  openSheet(`
    <h2>Gießung loggen</h2>
    <p class="ss">Tag ${d} · ${p.name} · Ziel ${p.wat.ml[0]}–${p.wat.ml[1]} ml</p>
    <div class="g2">
      <div class="fr"><label>Menge (ml)</label><input type="number" id="wML" placeholder="${Math.round((p.wat.ml[0]+p.wat.ml[1])/2)}"></div>
      <div class="fr"><label>pH</label><input type="number" id="wPh" step="0.1" placeholder="6.3"></div>
    </div>
    <div class="g2">
      <div class="fr"><label>EC</label><input type="number" id="wEc" step="0.1" placeholder="${p.env.ec[1]||''}"></div>
      <div class="fr"><label>Temp °C</label><input type="number" id="wT" step="0.5"></div>
    </div>
    <div class="fr"><label>RH %</label><input type="number" id="wRh" step="1"></div>
    <div class="fr"><label>BioBizz (aus Phase vorausgewählt)</label>
      <div class="ch" id="wBb">
        ${Object.keys(BB).map(k => `<button class="chp${p.bb[k]>0?' a':''}" data-bb="${k}">${BB[k].name}</button>`).join('')}
      </div>
    </div>
    <div class="fr"><label>Notiz</label><input type="text" id="wN" placeholder="Runoff, Auffälligkeiten…"></div>
    <button class="bp" id="wSave">Speichern</button>
    <button class="bg" onclick="closeSheet()">Abbrechen</button>
  `);
  $$('#wBb .chp').forEach(b => { b.onclick = () => b.classList.toggle('a') });
  $('#wSave').onclick = () => {
    const ml = parseFloat($('#wML').value) || Math.round((p.wat.ml[0]+p.wat.ml[1])/2);
    const ph = parseFloat($('#wPh').value) || null;
    const ec = parseFloat($('#wEc').value) || null;
    const t = parseFloat($('#wT').value) || null;
    const rh = parseFloat($('#wRh').value) || null;
    const note = $('#wN').value.trim();
    const nutes = {};
    $$('#wBb .chp.a').forEach(b => { nutes[b.dataset.bb] = p.bb[b.dataset.bb] });
    S.watering.push({ id:uid(), date:new Date().toISOString(), ml, ph, ec, temp:t, rh, nutes, note, day:d });
    save(); closeSheet(); refresh(); toast('Gießung gespeichert ✓');
  };
}

function openEnvSheet(){
  if(RO){ toast('Nur lesen'); return }
  const d = dayFromStart(), p = currentPhase(d);
  openSheet(`
    <h2>Umgebung</h2>
    <p class="ss">Tag ${d} · Ziel: ${p.env.temp[0]}-${p.env.temp[1]}°C · ${p.env.rh[0]}-${p.env.rh[1]}% RH</p>
    <div class="g2">
      <div class="fr"><label>Temp °C</label><input type="number" id="eT" step="0.5"></div>
      <div class="fr"><label>RH %</label><input type="number" id="eRh" step="1"></div>
    </div>
    <button class="bp" id="eSave">Speichern</button>
    <button class="bg" onclick="closeSheet()">Abbrechen</button>
  `);
  $('#eSave').onclick = () => {
    const t = parseFloat($('#eT').value) || null;
    const rh = parseFloat($('#eRh').value) || null;
    if(!t && !rh){ closeSheet(); return }
    S.watering.push({ id:uid(), date:new Date().toISOString(), temp:t, rh, ml:0, note:'', day:d });
    save(); closeSheet(); refresh(); toast('Umgebung geloggt ✓');
  };
}

function openSettings(){
  if(RO){
    openSheet(`<h2>Geteilter Grow</h2><p class="ss">Einstellungen sind im Read-Only-Modus deaktiviert.</p><button class="bg" onclick="closeSheet()">Schließen</button>`);
    return;
  }
  const notifSupported = 'Notification' in window;
  const notifGranted = notifSupported && Notification.permission === 'granted';
  openSheet(`
    <h2>Einstellungen</h2>
    <div class="fr"><label>Start-Datum</label><input type="date" id="stDate" value="${S.started?S.started.slice(0,10):''}"></div>
    <div class="fr"><label>Pot-Volumen (L)</label><input type="number" id="stPot" value="${S.pot}"></div>
    <div class="fr"><label>Lichtzyklus</label><div class="ch" id="stLight">
      ${['18/6','20/4','24/0'].map(v => `<button class="chp${v===S.light?' a':''}" data-v="${v}">${v}</button>`).join('')}
    </div></div>
    ${notifSupported ? `
    <div class="fr"><label>Gieß-Erinnerungen</label>
      <button class="bp bd" id="notifBtn">${notifGranted ? '✓ Aktiviert · Deaktivieren' : 'Aktivieren'}</button>
      <p class="sub" style="font-size:11px;margin-top:6px">Push-Benachrichtigung, wenn Gabe fällig ist.</p>
    </div>` : ''}
    <button class="bp" id="stSave">Speichern</button>
    <button class="bp bd" id="exportBtn" style="margin-top:10px">Als JSON exportieren</button>
    <button class="bp dng" id="stReset" style="margin-top:10px">Alle Daten zurücksetzen</button>
    <button class="bg" onclick="closeSheet()">Schließen</button>
  `);
  $$('#stLight .chp').forEach(b => { b.onclick = () => { $$('#stLight .chp').forEach(x => x.classList.remove('a')); b.classList.add('a') }});
  if(notifSupported){
    $('#notifBtn').onclick = async () => {
      if(notifGranted){
        S.reminders = false; save(); toast('Deaktiviert'); closeSheet();
      } else {
        const ok = await requestNotifications();
        if(ok){ S.reminders = true; save(); toast('Aktiviert ✓'); closeSheet() }
        else toast('Erlaubnis verweigert');
      }
    };
  }
  $('#stSave').onclick = () => {
    const dv = $('#stDate').value;
    if(dv) S.started = new Date(dv).toISOString();
    S.pot = +$('#stPot').value || 11;
    const ls = $('#stLight .chp.a');
    if(ls) S.light = ls.dataset.v;
    save(); closeSheet(); refresh(); toast('Gespeichert ✓');
  };
  $('#exportBtn').onclick = async () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `orion-grow-${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(url);
    toast('Exportiert ✓');
  };
  $('#stReset').onclick = async () => {
    if(!confirm('Wirklich alle Daten löschen? Auch Fotos!')) return;
    // Delete all photos from IndexedDB
    for(const p of S.photos){ await deletePhoto(p.thumbId) }
    localStorage.removeItem(LS); location.hash=''; location.reload();
  };
}

function openSymptomDiagnosis(){
  if(RO){ toast('Nur lesen'); return }
  const hasMultiPlants = S.plants.length > 1;
  openSheet(`
    <h2>Mangel-Diagnose</h2>
    <p class="ss">Wähle das Symptom, das am ehesten passt. BioBizz Light Mix ist organisch — Fehler entwickeln sich langsamer, aber brauchen auch länger zur Korrektur.</p>
    ${hasMultiPlants ? `
    <div class="fr"><label>Welche Pflanze?</label>
      <div class="ch" id="syPl">
        <button class="chp a" data-p="">Alle / Unklar</button>
        ${S.plants.map(p => `<button class="chp" data-p="${p.id}">${esc(p.name)}</button>`).join('')}
      </div>
    </div>` : ''}
    <div id="symList">
      ${SYMPTOMS.map(s => `
        <div class="li" data-sy="${s.id}" style="cursor:pointer">
          <div class="lic" style="background:rgba(248,113,113,.12);color:var(--danger)">${s.urgent?'⚠️':'🩺'}</div>
          <div class="lib"><div class="lt">${esc(s.q)}</div></div>
        </div>
      `).join('')}
    </div>
    <button class="bg" onclick="closeSheet()">Abbrechen</button>
  `);
  if(hasMultiPlants){
    $$('#syPl .chp').forEach(b => { b.onclick = () => { $$('#syPl .chp').forEach(x => x.classList.remove('a')); b.classList.add('a') }});
  }
  $$('#symList [data-sy]').forEach(el => {
    el.onclick = () => {
      const sym = SYMPTOMS.find(s => s.id === el.dataset.sy);
      showSymptomResult(sym, hasMultiPlants ? $('#syPl .chp.a')?.dataset.p : null);
    };
  });
}

function showSymptomResult(sym, plantId){
  openSheet(`
    <h2>${sym.urgent?'⚠️ ':''}${esc(sym.q)}</h2>
    <div class="al ${sym.urgent?'d':'i'}" style="margin-bottom:14px"><div>${esc(sym.a)}</div></div>
    <p class="sub" style="margin-bottom:14px">Mögliche Ursachen: ${sym.causes.map(c => `<b>${esc(c)}</b>`).join(', ')}</p>
    <div class="fr"><label>Zusätzliche Notiz (optional)</label><textarea id="syN" rows="2" placeholder="Wann bemerkt, welche Blätter, etc."></textarea></div>
    <button class="bp" id="sySave">Im Verlauf speichern</button>
    <button class="bg" onclick="closeSheet()">Schließen ohne speichern</button>
  `);
  $('#sySave').onclick = () => {
    S.symptoms.push({
      id:uid(), date:new Date().toISOString(), day:dayFromStart(),
      plantId:plantId || null, symptomId:sym.id, note:$('#syN').value.trim()
    });
    save(); closeSheet(); refresh(); toast('Im Verlauf gespeichert ✓');
  };
}

function openPhotoCapture(){
  if(RO){ toast('Nur lesen'); return }
  const hasMultiPlants = S.plants.length > 1;
  openSheet(`
    <h2>Foto hinzufügen</h2>
    <p class="ss">Wird lokal gespeichert (IndexedDB), nicht in der Cloud. Automatisch komprimiert auf 1200px.</p>
    <div class="fr"><label>Foto</label>
      <input type="file" id="photoFile" accept="image/*" capture="environment" style="padding:8px">
    </div>
    ${hasMultiPlants ? `
    <div class="fr"><label>Welche Pflanze?</label>
      <div class="ch" id="phPl">
        <button class="chp a" data-p="">Alle / Übersicht</button>
        ${S.plants.map(p => `<button class="chp" data-p="${p.id}">${esc(p.name)}</button>`).join('')}
      </div>
    </div>` : ''}
    <div class="fr"><label>Beschreibung (optional)</label><input type="text" id="phCap" placeholder="z.B. Neue Pistillen, Mangel an Blatt 3…"></div>
    <button class="bp" id="phSave">Speichern</button>
    <button class="bg" onclick="closeSheet()">Abbrechen</button>
  `);
  if(hasMultiPlants){
    $$('#phPl .chp').forEach(b => { b.onclick = () => { $$('#phPl .chp').forEach(x => x.classList.remove('a')); b.classList.add('a') }});
  }
  $('#phSave').onclick = async () => {
    const file = $('#photoFile').files[0];
    if(!file){ toast('Kein Foto gewählt'); return }
    toast('Komprimiere…');
    try {
      const compressed = await compressImage(file);
      const photoId = uid();
      await storePhoto(photoId, compressed);
      const plantId = hasMultiPlants ? ($('#phPl .chp.a')?.dataset.p || null) : null;
      S.photos.push({
        id:uid(), date:new Date().toISOString(), day:dayFromStart(),
        plantId, caption:$('#phCap').value.trim(), thumbId:photoId
      });
      save(); closeSheet(); refresh(); toast('Foto gespeichert ✓');
    } catch(e){
      toast('Fehler beim Verarbeiten'); console.error(e);
    }
  };
}

async function openPhotoViewer(photoId){
  const photo = S.photos.find(p => p.id === photoId);
  if(!photo) return;
  const blob = await getPhoto(photo.thumbId);
  if(!blob){ toast('Foto nicht gefunden'); return }
  const url = URL.createObjectURL(blob);
  const viewer = $('#photoViewer');
  viewer.classList.add('a');
  const ph = PH.find(p => photo.day > p.s && photo.day <= p.e) || PH[0];
  const plant = photo.plantId ? S.plants.find(x => x.id === photo.plantId) : null;
  viewer.innerHTML = `
    <div class="pv-head">
      <div>
        <div class="fd" style="font-size:18px">Tag ${photo.day} · ${ph.name}${plant?' · '+esc(plant.name):''}</div>
        <div class="sub" style="font-size:12px">${fmtDateTime(photo.date)}</div>
      </div>
      <button class="ib" id="pvClose">✕</button>
    </div>
    <div class="pv-img"><img src="${url}" alt=""></div>
    ${photo.caption ? `<div class="pv-cap">${esc(photo.caption)}</div>` : ''}
  `;
  $('#pvClose').onclick = () => { viewer.classList.remove('a'); URL.revokeObjectURL(url) };
  viewer.onclick = (e) => { if(e.target === viewer){ viewer.classList.remove('a'); URL.revokeObjectURL(url) }};
}

// ═══════════════════════════════════════════════════════════
// KOSTEN-KALKULATION
// ═══════════════════════════════════════════════════════════
function calcCosts(){
  const c = S.costs;
  const day = dayFromStart();
  const endDay = S.totalDays;

  // ─── STROM ───
  // Lichtzyklus-Stunden pro Tag (z.B. 18/6 = 18h Licht)
  const lightHours = parseInt(S.light.split('/')[0]) || 18;

  // LED-Verbrauch bis heute (Wh)
  const ledWhSoFar = c.ledWatts * lightHours * day;
  const ledWhTotal = c.ledWatts * lightHours * endDay;

  // Abluft: entweder 24h oder nur mit Licht
  const fanHours = c.fanAlways ? 24 : lightHours;
  const fanWhSoFar = c.fanWatts * fanHours * day;
  const fanWhTotal = c.fanWatts * fanHours * endDay;

  // Extra-Geräte: 24h
  const extraWhSoFar = c.extraWatts * 24 * day;
  const extraWhTotal = c.extraWatts * 24 * endDay;

  const kwhSoFar = (ledWhSoFar + fanWhSoFar + extraWhSoFar) / 1000;
  const kwhTotal = (ledWhTotal + fanWhTotal + extraWhTotal) / 1000;

  const electricitySoFar = kwhSoFar * c.kwhPrice;
  const electricityTotal = kwhTotal * c.kwhPrice;

  // Breakdown
  const ledKwhSoFar = ledWhSoFar / 1000;
  const ledKwhTotal = ledWhTotal / 1000;
  const fanKwhSoFar = fanWhSoFar / 1000;
  const fanKwhTotal = fanWhTotal / 1000;
  const extraKwhSoFar = extraWhSoFar / 1000;
  const extraKwhTotal = extraWhTotal / 1000;

  // ─── WASSER ───
  const litersSoFar = S.watering.filter(w => w.ml > 0).reduce((s,w) => s + w.ml, 0) / 1000;
  // Durchschnittliche Gabe pro Tag aus bisherigen Daten hochrechnen
  const waterPerDay = day > 0 ? litersSoFar / day : 0;
  const waterTotal = day > 0 ? waterPerDay * endDay : 30; // Schätzung 30L für 70 Tage
  const waterCostSoFar = litersSoFar * c.waterPrice;
  const waterCostTotal = waterTotal * c.waterPrice;

  // ─── DÜNGER (BioBizz) ───
  // Aus Gießungen: pro Düngerart kumulieren, wie viele ml verbraucht wurden
  const usedMl = { rj:0, bg:0, bb:0, tm:0, am:0 };
  S.watering.forEach(w => {
    if(!w.nutes || !w.ml) return;
    const liters = w.ml / 1000;
    Object.keys(w.nutes).forEach(k => {
      if(usedMl[k] !== undefined) usedMl[k] += w.nutes[k] * liters;
    });
  });

  // Hochrechnung für gesamten Grow (pro Phase × Tage × durchschnittliche Menge)
  const projected = { rj:0, bg:0, bb:0, tm:0, am:0 };
  PH.forEach(p => {
    const phaseDays = p.e - p.s;
    const giessungenInPhase = phaseDays / p.wat.every;
    const avgMl = (p.wat.ml[0] + p.wat.ml[1]) / 2 / 1000; // Liter
    Object.keys(p.bb).forEach(k => {
      if(projected[k] !== undefined && p.bb[k] > 0){
        projected[k] += giessungenInPhase * avgMl * p.bb[k];
      }
    });
  });

  const fertSoFar = Object.keys(usedMl).reduce((s,k) => s + (usedMl[k] / c.bbSize) * c.bbPrices[k], 0);
  const fertTotal = Object.keys(projected).reduce((s,k) => s + (projected[k] / c.bbSize) * c.bbPrices[k], 0);

  // ─── EINMALKOSTEN ───
  const oneTimeSum = c.oneTime.reduce((s,o) => s + (o.price || 0), 0);

  return {
    day, endDay,
    electricity: {
      soFar: electricitySoFar, total: electricityTotal,
      kwhSoFar, kwhTotal,
      breakdown: {
        led:   { kwhSoFar: ledKwhSoFar,   kwhTotal: ledKwhTotal,   costSoFar: ledKwhSoFar*c.kwhPrice,   costTotal: ledKwhTotal*c.kwhPrice,   hours:lightHours, watts:c.ledWatts },
        fan:   { kwhSoFar: fanKwhSoFar,   kwhTotal: fanKwhTotal,   costSoFar: fanKwhSoFar*c.kwhPrice,   costTotal: fanKwhTotal*c.kwhPrice,   hours:fanHours,   watts:c.fanWatts },
        extra: { kwhSoFar: extraKwhSoFar, kwhTotal: extraKwhTotal, costSoFar: extraKwhSoFar*c.kwhPrice, costTotal: extraKwhTotal*c.kwhPrice, hours:24,         watts:c.extraWatts }
      }
    },
    water:    { soFar: waterCostSoFar, total: waterCostTotal, litersSoFar, litersTotal: waterTotal },
    fertilizer:{ soFar: fertSoFar, total: fertTotal, usedMl, projectedMl: projected },
    oneTime:  { sum: oneTimeSum, items: c.oneTime },
    totalSoFar:  electricitySoFar + waterCostSoFar + fertSoFar + oneTimeSum,
    totalProjected: electricityTotal + waterCostTotal + fertTotal + oneTimeSum
  };
}

function eur(n){ return (n||0).toFixed(2).replace('.', ',') + ' €' }

function renderCosts(){
  const root = $('#v-costs');
  if(!S.started){
    root.innerHTML = `<h2 class="vt">Kosten</h2><div class="emp"><p>Grow muss erst gestartet sein.</p></div>`;
    return;
  }
  const k = calcCosts();
  const pct = k.day / k.endDay * 100;
  const grams = 40 * S.plants.length; // Schätzung: ~40g pro Pflanze Orion F1
  const pricePerGram = k.totalProjected / grams;

  root.innerHTML = `
    <h2 class="vt">Kosten</h2>

    <div class="hero" style="margin-bottom:12px">
      <div class="hrow">
        <div>
          <div class="bdg"><span class="pd" style="background:var(--g)"></span>Tag ${k.day} von ${k.endDay}</div>
          <div class="sub">Bisher · Hochrechnung · Ernte</div>
        </div>
        <div class="dbig">${Math.round(k.totalProjected)}<sub>€</sub></div>
      </div>
      <div class="pw">
        <div class="pt"><div class="pf" style="width:${Math.min(100,(k.totalSoFar/k.totalProjected)*100)}%"></div></div>
        <div class="pm"><span>0 €</span><span>${eur(k.totalSoFar)} bisher</span><span>${eur(k.totalProjected)}</span></div>
      </div>
      <div class="sg">
        <div class="st"><div class="sl">Bisher</div><div class="sv mono">${eur(k.totalSoFar)}</div></div>
        <div class="st"><div class="sl">noch kommt</div><div class="sv mono">${eur(k.totalProjected - k.totalSoFar)}</div></div>
        <div class="st"><div class="sl">€ / Gramm</div><div class="sv mono">${eur(pricePerGram)}</div></div>
      </div>
    </div>

    <div class="c">
      <div class="ct">Strom<span class="ln"></span><span class="mono" style="font-size:11px">${k.electricity.kwhTotal.toFixed(1)} kWh gesamt</span></div>
      <div class="cost-row">
        <div class="cr-label"><span class="cr-ico" style="background:rgba(245,158,11,.14);color:var(--amber)">💡</span> LED · ${S.costs.ledWatts}W · ${k.electricity.breakdown.led.hours}h/Tag</div>
        <div class="cr-val"><span class="sub mono">${k.electricity.breakdown.led.kwhSoFar.toFixed(1)} / ${k.electricity.breakdown.led.kwhTotal.toFixed(1)} kWh</span><span class="mono fd">${eur(k.electricity.breakdown.led.costTotal)}</span></div>
      </div>
      ${S.costs.fanWatts > 0 ? `
      <div class="cost-row">
        <div class="cr-label"><span class="cr-ico" style="background:rgba(56,189,248,.12);color:var(--wat)">🌀</span> Abluft · ${S.costs.fanWatts}W · ${k.electricity.breakdown.fan.hours}h/Tag</div>
        <div class="cr-val"><span class="sub mono">${k.electricity.breakdown.fan.kwhSoFar.toFixed(1)} / ${k.electricity.breakdown.fan.kwhTotal.toFixed(1)} kWh</span><span class="mono fd">${eur(k.electricity.breakdown.fan.costTotal)}</span></div>
      </div>` : ''}
      ${S.costs.extraWatts > 0 ? `
      <div class="cost-row">
        <div class="cr-label"><span class="cr-ico" style="background:rgba(167,139,250,.14);color:var(--flow)">💨</span> Entfeuchter etc. · ${S.costs.extraWatts}W Ø · 24h</div>
        <div class="cr-val"><span class="sub mono">${k.electricity.breakdown.extra.kwhSoFar.toFixed(1)} / ${k.electricity.breakdown.extra.kwhTotal.toFixed(1)} kWh</span><span class="mono fd">${eur(k.electricity.breakdown.extra.costTotal)}</span></div>
      </div>` : ''}
      <div class="cost-total"><span>Gesamt Strom</span><span class="fd mono">${eur(k.electricity.total)}</span></div>
      <p class="sub" style="font-size:11px;margin-top:8px">Bei ${S.costs.kwhPrice.toFixed(2).replace('.',',')} €/kWh · ${S.light} Lichtzyklus</p>
    </div>

    <div class="c">
      <div class="ct">BioBizz-Dünger<span class="ln"></span></div>
      ${Object.keys(BB).map(key => {
        const used = k.fertilizer.usedMl[key] || 0;
        const proj = k.fertilizer.projectedMl[key] || 0;
        if(proj < 0.1) return '';
        const flaschen = proj / S.costs.bbSize;
        const euro = flaschen * S.costs.bbPrices[key];
        return `<div class="cost-row">
          <div class="cr-label"><span class="cr-ico" style="background:rgba(34,197,94,.12);color:var(--g)">🌿</span> ${BB[key].name}</div>
          <div class="cr-val"><span class="sub mono">${used.toFixed(0)} / ${proj.toFixed(0)} ml</span><span class="mono fd">${eur(euro)}</span></div>
        </div>`;
      }).join('')}
      <div class="cost-total"><span>Gesamt Dünger</span><span class="fd mono">${eur(k.fertilizer.total)}</span></div>
      <p class="sub" style="font-size:11px;margin-top:8px">Basis: 500ml-Flaschen zu aktuellen Marktpreisen. Reste für nächsten Grow bleiben natürlich übrig.</p>
    </div>

    <div class="c">
      <div class="ct">Wasser<span class="ln"></span></div>
      <div class="cost-row">
        <div class="cr-label"><span class="cr-ico" style="background:rgba(56,189,248,.12);color:var(--wat)">💧</span> Leitungswasser</div>
        <div class="cr-val"><span class="sub mono">${k.water.litersSoFar.toFixed(1)} / ${k.water.litersTotal.toFixed(0)} L</span><span class="mono fd">${eur(k.water.total)}</span></div>
      </div>
      <p class="sub" style="font-size:11px;margin-top:8px">Bei ${(S.costs.waterPrice*1000).toFixed(2).replace('.',',')} €/m³ (Leitungswasser)</p>
    </div>

    <div class="c">
      <div class="ct">Einmalkosten · Setup<span class="ln"></span><span class="sub mono" style="font-size:11px">${k.oneTime.items.length} Einträge</span></div>
      ${k.oneTime.items.length ? k.oneTime.items.map(o => `
        <div class="cost-row">
          <div class="cr-label"><span class="cr-ico" style="background:rgba(167,139,250,.14);color:var(--flow)">📦</span> ${esc(o.name)}</div>
          <div class="cr-val"><span class="mono fd">${eur(o.price)}</span>${RO?'':`<button class="ld" data-otd="${o.id}" style="margin-left:4px">×</button>`}</div>
        </div>
      `).join('') : '<p class="sub" style="font-size:12px">Noch keine Einträge. Samen, Erde, Töpfe etc. hier eintragen.</p>'}
      <div class="cost-total"><span>Gesamt Setup</span><span class="fd mono">${eur(k.oneTime.sum)}</span></div>
      ${RO?'':'<button class="bp bd" id="addOneTimeBtn" style="margin-top:10px">+ Einmalposten hinzufügen</button>'}
    </div>

    <div class="c" style="background:rgba(34,197,94,.06);border-color:rgba(34,197,94,.2)">
      <div class="ct">Zusammenfassung · Ende Grow<span class="ln"></span></div>
      <div class="cost-row"><div class="cr-label">Strom</div><div class="cr-val mono">${eur(k.electricity.total)}</div></div>
      <div class="cost-row"><div class="cr-label">Dünger</div><div class="cr-val mono">${eur(k.fertilizer.total)}</div></div>
      <div class="cost-row"><div class="cr-label">Wasser</div><div class="cr-val mono">${eur(k.water.total)}</div></div>
      <div class="cost-row"><div class="cr-label">Setup (einmalig)</div><div class="cr-val mono">${eur(k.oneTime.sum)}</div></div>
      <div class="cost-total" style="border-top:2px solid var(--g);padding-top:10px"><span class="fd" style="font-size:16px">Gesamt</span><span class="fd mono" style="font-size:20px;color:var(--g)">${eur(k.totalProjected)}</span></div>
      <p class="sub" style="font-size:12px;margin-top:10px;line-height:1.55">Bei einer geschätzten Ernte von ~${grams}g (${S.plants.length} Orion F1, je ~40g trocken) ergibt das <b>${eur(pricePerGram)} pro Gramm</b>. Die genaue Ausbeute hängt von Bedingungen und Training ab.</p>
    </div>

    ${RO?'':`<button class="bp bd" id="editCostsBtn" style="margin-top:10px">Kosten-Einstellungen ändern</button>`}
  `;

  if(!RO){
    $('#editCostsBtn').onclick = openCostsSettings;
    const addBtn = $('#addOneTimeBtn');
    if(addBtn) addBtn.onclick = openOneTimeSheet;
    $$('#v-costs [data-otd]').forEach(b => {
      b.onclick = () => {
        if(!confirm('Eintrag löschen?')) return;
        S.costs.oneTime = S.costs.oneTime.filter(o => o.id !== b.dataset.otd);
        save(); renderCosts();
      };
    });
  }
}

function openCostsSettings(){
  const c = S.costs;
  openSheet(`
    <h2>Kosten-Einstellungen</h2>
    <p class="ss">Die Werte werden für alle Berechnungen verwendet. Strompreis und LED-Watt sind die wichtigsten Hebel.</p>

    <div class="ct" style="margin-top:14px">Strom<span class="ln"></span></div>
    <div class="g2">
      <div class="fr"><label>Preis (€/kWh)</label><input type="number" id="cK" step="0.01" value="${c.kwhPrice}"></div>
      <div class="fr"><label>LED (Watt)</label><input type="number" id="cL" value="${c.ledWatts}"></div>
    </div>
    <div class="g2">
      <div class="fr"><label>Abluft (Watt)</label><input type="number" id="cF" value="${c.fanWatts}"></div>
      <div class="fr"><label>Entfeuchter/Sonst. (Watt)</label><input type="number" id="cE" value="${c.extraWatts}"></div>
    </div>
    <p class="sub" style="font-size:11px;margin-top:-6px;margin-bottom:10px">Tipp: Entfeuchter haben ~200W Nennleistung, laufen aber nur ca. 30% der Zeit (Hygrostat-geregelt). 60W Durchschnitt ist realistisch.</p>
    <div class="fr"><label>Abluft-Laufzeit</label>
      <div class="ch" id="cFA">
        <button class="chp${c.fanAlways?' a':''}" data-v="1">24 h durchgehend</button>
        <button class="chp${!c.fanAlways?' a':''}" data-v="0">Nur mit Licht</button>
      </div>
    </div>

    <div class="ct" style="margin-top:14px">Wasser<span class="ln"></span></div>
    <div class="fr"><label>Preis (€/m³ = 1000L)</label><input type="number" id="cW" step="0.01" value="${(c.waterPrice*1000).toFixed(2)}"></div>

    <div class="ct" style="margin-top:14px">BioBizz-Preise (€ pro 500ml)<span class="ln"></span></div>
    <div class="g2">
      <div class="fr"><label>Root Juice</label><input type="number" id="cRj" step="0.5" value="${c.bbPrices.rj}"></div>
      <div class="fr"><label>Bio Grow</label><input type="number" id="cBg" step="0.5" value="${c.bbPrices.bg}"></div>
    </div>
    <div class="g2">
      <div class="fr"><label>Bio Bloom</label><input type="number" id="cBb" step="0.5" value="${c.bbPrices.bb}"></div>
      <div class="fr"><label>Top Max</label><input type="number" id="cTm" step="0.5" value="${c.bbPrices.tm}"></div>
    </div>
    <div class="fr"><label>Alg-A-Mic</label><input type="number" id="cAm" step="0.5" value="${c.bbPrices.am}"></div>

    <button class="bp" id="costsSave">Speichern</button>
    <button class="bg" onclick="closeSheet()">Abbrechen</button>
  `);
  $$('#cFA .chp').forEach(b => {
    b.onclick = () => { $$('#cFA .chp').forEach(x => x.classList.remove('a')); b.classList.add('a') };
  });
  $('#costsSave').onclick = () => {
    S.costs.kwhPrice = parseFloat($('#cK').value) || 0.30;
    S.costs.ledWatts = parseInt($('#cL').value) || 0;
    S.costs.fanWatts = parseInt($('#cF').value) || 0;
    S.costs.extraWatts = parseInt($('#cE').value) || 0;
    S.costs.fanAlways = $('#cFA .chp.a').dataset.v === '1';
    S.costs.waterPrice = (parseFloat($('#cW').value) || 5) / 1000;
    S.costs.bbPrices.rj = parseFloat($('#cRj').value) || 22;
    S.costs.bbPrices.bg = parseFloat($('#cBg').value) || 17;
    S.costs.bbPrices.bb = parseFloat($('#cBb').value) || 18;
    S.costs.bbPrices.tm = parseFloat($('#cTm').value) || 25;
    S.costs.bbPrices.am = parseFloat($('#cAm').value) || 18;
    save(); closeSheet(); renderCosts(); toast('Gespeichert ✓');
  };
}

function openOneTimeSheet(){
  const presets = [
    {n:'Samen Auto Orion F1 (3er)', p:30},
    {n:'BioBizz Light Mix 50L', p:18},
    {n:'Stofftopf 11L (3×)', p:15},
    {n:'Abluft + AK-Filter Set', p:80},
    {n:'LED-Lampe', p:150},
    {n:'Grow-Zelt', p:100},
    {n:'pH-Messgerät', p:20},
    {n:'Thermo-Hygrometer', p:15}
  ];
  openSheet(`
    <h2>Setup-Kosten hinzufügen</h2>
    <p class="ss">Einmalkosten für diesen Grow. Presets anklicken oder frei eingeben.</p>
    <div class="ch" style="margin-bottom:14px">
      ${presets.map((p,i) => `<button class="chp" data-pre="${i}">${esc(p.n)} · ${p.p}€</button>`).join('')}
    </div>
    <div class="fr"><label>Bezeichnung</label><input type="text" id="otN" placeholder="z.B. Erde, Topf, Filter…"></div>
    <div class="fr"><label>Preis (€)</label><input type="number" id="otP" step="0.01" placeholder="0,00"></div>
    <button class="bp" id="otSave">Speichern</button>
    <button class="bg" onclick="closeSheet()">Abbrechen</button>
  `);
  $$('.chp[data-pre]').forEach(b => {
    b.onclick = () => {
      const p = presets[+b.dataset.pre];
      $('#otN').value = p.n; $('#otP').value = p.p;
    };
  });
  $('#otSave').onclick = () => {
    const name = $('#otN').value.trim();
    const price = parseFloat($('#otP').value);
    if(!name || !price){ toast('Name und Preis nötig'); return }
    S.costs.oneTime.push({ id:uid(), name, price, date:new Date().toISOString() });
    save(); closeSheet(); renderCosts(); toast('Eintrag hinzugefügt ✓');
  };
}

// ═══════════════════════════════════════════════════════════
// ROUTER + INIT
// ═══════════════════════════════════════════════════════════
function switchView(v){
  $$('.view').forEach(x => x.classList.remove('a'));
  $(`#v-${v}`).classList.add('a');
  $$('.tab').forEach(t => t.classList.toggle('a', t.dataset.v === v));
  $('#fab').style.display = (['home','water','journal'].includes(v) && !RO) ? 'flex' : 'none';
  if(v === 'data') setTimeout(renderData, 50);
  if(v === 'compare') renderCompare();
  if(v === 'costs') renderCosts();
  window.scrollTo(0, 0);
}

function renderPlantSwitcher(){
  if(S.plants.length <= 1){ $('#plantSwitcher').innerHTML = ''; return }
  $('#plantSwitcher').innerHTML = `
    <div class="plants">
      <button class="pchip${!PLANT_FILTER?' a':''}" data-pf="">Alle</button>
      ${S.plants.map(p => `<button class="pchip${PLANT_FILTER===p.id?' a':''}" data-pf="${p.id}" style="${PLANT_FILTER===p.id?'':'border-left:3px solid '+p.color}"><span class="pd" style="background:${p.color}"></span>${esc(p.name)}</button>`).join('')}
    </div>
  `;
  $$('#plantSwitcher .pchip').forEach(b => {
    b.onclick = () => {
      PLANT_FILTER = b.dataset.pf || null;
      renderPlantSwitcher(); renderJournal();
    };
  });
}

function refresh(){
  renderShareBanner();
  renderPlantSwitcher();
  renderHome(); renderWater(); renderPhases(); renderJournal();
  if($('#v-data').classList.contains('a')) renderData();
  if($('#v-compare').classList.contains('a')) renderCompare();
  if($('#v-costs').classList.contains('a')) renderCosts();
  if(RO){
    $('#jNoteCard').classList.add('ro-hide');
    $('#fab').style.display = 'none';
  } else {
    $('#jNoteCard').classList.remove('ro-hide');
  }
}

function initStart(){
  $('#sDate').value = new Date().toISOString().slice(0, 10);
  $$('#sLight .chp').forEach(b => { b.onclick = () => { $$('#sLight .chp').forEach(x => x.classList.remove('a')); b.classList.add('a') }});
  $('#startBtn').onclick = () => {
    S.started = new Date($('#sDate').value).toISOString();
    S.pot = +$('#sPot').value || 11;
    S.light = $('#sLight .chp.a').dataset.v;
    const n = +$('#sPlants').value || 3;
    S.plants = Array.from({length:Math.min(Math.max(n,1),6)}, (_, i) => ({
      id:'p' + (i+1), name:`Pflanze ${i+1}`,
      color:['#22C55E','#4ADE80','#86EFAC','#FBBF24','#F59E0B','#A78BFA'][i]
    }));
    save(); showApp();
  };
}

function showApp(){
  $('#startScreen').classList.add('h');
  $('#app').style.display = 'block';
  $('#tb').style.display = 'block';
  refresh();
  bindApp();
  scheduleReminder();
}

function bindApp(){
  $$('.tab').forEach(t => { t.onclick = () => switchView(t.dataset.v) });
  $('#fab').onclick = () => {
    const active = document.querySelector('.view.a').id.replace('v-', '');
    if(active === 'journal'){ $('#jIn').focus(); return }
    openWaterSheet();
  };
  $('#stBtn').onclick = openSettings;
  $('#shareBtn').onclick = openShareSheet;
  $('#ov').onclick = closeSheet;
  $('#calcL').oninput = renderCalc;
  $('#jAdd').onclick = () => {
    if(RO) return;
    const t = $('#jIn').value.trim();
    if(!t) return;
    const plantId = $('#jPl .chp.a')?.dataset.p || null;
    S.journal.push({ id:uid(), date:new Date().toISOString(), day:dayFromStart(), text:t, plantId });
    $('#jIn').value = '';
    save(); refresh(); toast('Notiz gespeichert ✓');
  };
  $$('#tlFilter .chp').forEach(b => {
    b.onclick = () => {
      $$('#tlFilter .chp').forEach(x => x.classList.remove('a'));
      b.classList.add('a');
      TLF = b.dataset.f;
      renderJournal();
    };
  });
  // Plant selector in note form (for multi-plant)
  if(S.plants.length > 1){
    $('#jPlantWrap').innerHTML = `
      <label>Zu welcher Pflanze? (optional)</label>
      <div class="ch" id="jPl">
        <button class="chp a" data-p="">Allgemein</button>
        ${S.plants.map(p => `<button class="chp" data-p="${p.id}">${esc(p.name)}</button>`).join('')}
      </div>
    `;
    $$('#jPl .chp').forEach(b => { b.onclick = () => { $$('#jPl .chp').forEach(x => x.classList.remove('a')); b.classList.add('a') }});
  }
}

// Service Worker
if('serviceWorker' in navigator){
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

// ═ BOOT ═
(async function boot(){
  load();
  await initDB().catch(() => {});
  const hasShared = await tryLoadShared();
  if(hasShared){
    showApp();
    return;
  }
  if(S.started){
    showApp();
  } else {
    $('#startScreen').classList.remove('h');
    initStart();
  }
})();
