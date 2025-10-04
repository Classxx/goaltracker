
// ===== Enhanced Utilities =====
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const fmt = new Intl.NumberFormat('ru-RU');
const LS_KEY = 'goaltrack_goals_v3';
const ACHIEVEMENTS_KEY = 'goaltrack_achievements_v1';
const STATS_KEY = 'goaltrack_stats_v1';
const SETTINGS_KEY = 'goaltrack_settings_v1';
function uid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36) }
function load(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)) || [] }catch(e){ return [] } }
function save(){ localStorage.setItem(LS_KEY, JSON.stringify(state.goals)); }

function loadAchievements(){ try{ return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY)) || [] }catch(e){ return [] } }
function saveAchievements(){ localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(state.achievements)); }

function loadStats(){ try{ return JSON.parse(localStorage.getItem(STATS_KEY)) || { totalGoals: 0, completedGoals: 0, totalDays: 0, streak: 0 } }catch(e){ return { totalGoals: 0, completedGoals: 0, totalDays: 0, streak: 0 } } }
function saveStats(){ localStorage.setItem(STATS_KEY, JSON.stringify(state.stats)); }

function loadSettings(){
  const defaults = { theme: 'dark', language: 'ru' };
  try {
    return { ...defaults, ...(JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}) };
  } catch (e) {
    return { ...defaults };
  }
}
function saveSettings(){ localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings)); }
function pct(n){ return Math.max(0, Math.min(100, Math.round(n))) }
function currency(n){ return `${fmt.format(Math.max(0, n|0))} в‚Ѕ` }
// ===== Animated Background Particles =====
function createParticles() {
  const container = document.getElementById('bgParticles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}
// ===== Enhanced Confetti =====
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
let confettiPieces = [];
function resizeCanvas(){ confettiCanvas.width = innerWidth; confettiCanvas.height = innerHeight }
addEventListener('resize', resizeCanvas); resizeCanvas();
function launchConfetti(){
  const colors = ['#f4d03f','#7aa7ff','#46d393','#ffffff'];
  confettiPieces = Array.from({length: 200}, () => ({
    x: Math.random()*confettiCanvas.width,
    y: -20 - Math.random()*innerHeight*.3,
    r: 4+Math.random()*6,
    c: colors[Math.floor(Math.random()*colors.length)],
    vy: 2+Math.random()*3,
    vx: -2+Math.random()*4,
    rot: Math.random()*Math.PI,
    vr: -0.1 + Math.random()*0.2,
    shape: Math.random()>.5?'rect':'circle',
    life: 160+Math.random()*80
  }));
  let frame = 0;
  function draw(){
    ctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr; p.vy*=0.995; p.vx*=0.995; p.life--;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.c;
      if(p.shape==='rect'){ ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2*0.6) } else { ctx.beginPath(); ctx.arc(0,0,p.r,0,Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    confettiPieces = confettiPieces.filter(p=>p.life>0 && p.y<confettiCanvas.height+20);
    frame++;
    if(frame<300) requestAnimationFrame(draw); else ctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
  }
  draw();
}
// ===== Enhanced State =====
const state = { 
    goals: Array.isArray(load()) ? load() : [],
    filter: '',
    achievements: loadAchievements(),
    stats: loadStats(),
    settings: loadSettings()
}
// ===== Translation System =====
const translations = {
  ru: {
    appTitle: 'GoalTrack Pro',
    appSubtitle: 'AI вЂў РђРЅР°Р»РёС‚РёРєР° вЂў Р“РµР№РјРёС„РёРєР°С†РёСЏ',
    searchPlaceholder: 'рџ”Ќ РџРѕРёСЃРє С†РµР»РµР№вЂ¦',
    newGoal: 'РќРѕРІР°СЏ С†РµР»СЊ',
    goalName: 'РќР°Р·РІР°РЅРёРµ',
    goalNamePlaceholder: 'РќР°РїСЂРёРјРµСЂ: РќР°РєРѕРїРёС‚СЊ 3 000 000 в‚Ѕ',
    description: 'РћРїРёСЃР°РЅРёРµ (РЅРµРѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)',
    descriptionPlaceholder: 'Р”РѕР±Р°РІСЊС‚Рµ РѕРїРёСЃР°РЅРёРµ С†РµР»Рё, РјРѕС‚РёРІР°С†РёСЋ РёР»Рё РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РґРµС‚Р°Р»Рё...',
    goalType: 'РўРёРї С†РµР»Рё',
    category: 'РљР°С‚РµРіРѕСЂРёСЏ',
    priority: 'РџСЂРёРѕСЂРёС‚РµС‚',
    deadline: 'Р”РµРґР»Р°Р№РЅ (РЅРµРѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)',
    templates: 'Р‘С‹СЃС‚СЂС‹Рµ С€Р°Р±Р»РѕРЅС‹',
    noTemplates: 'вЂ” РќРµ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ вЂ”',
    save: 'РЎРѕС…СЂР°РЅРёС‚СЊ',
    cancel: 'РћС‚РјРµРЅР°',
    delete: 'РЈРґР°Р»РёС‚СЊ',
    duplicate: 'Р”СѓР±Р»РёСЂРѕРІР°С‚СЊ',
    archive: 'РђСЂС…РёРІРёСЂРѕРІР°С‚СЊ',
    share: 'РџРѕРґРµР»РёС‚СЊСЃСЏ',
    stats: 'РЎС‚Р°С‚РёСЃС‚РёРєР°',
    achievements: 'Р”РѕСЃС‚РёР¶РµРЅРёСЏ',
    export: 'Р­РєСЃРїРѕСЂС‚ РґР°РЅРЅС‹С…',
    import: 'РРјРїРѕСЂС‚ РґР°РЅРЅС‹С…',
    settings: 'РќР°СЃС‚СЂРѕР№РєРё',
    emptyState: 'РџРѕРєР° РЅРµС‚ С†РµР»РµР№. РќР°Р¶РјРёС‚Рµ В«+В», С‡С‚РѕР±С‹ РґРѕР±Р°РІРёС‚СЊ РїРµСЂРІСѓСЋ С†РµР»СЊ.',
    motivationalQuotes: [
      "РќРµ РІР°Р¶РЅРѕ, РєР°Рє РјРµРґР»РµРЅРЅРѕ С‚С‹ РёРґС‘С€СЊ вЂ” РіР»Р°РІРЅРѕРµ, РЅРµ РѕСЃС‚Р°РЅР°РІР»РёРІР°С‚СЊСЃСЏ. вЂ” РљРѕРЅС„СѓС†РёР№",
      "РљС‚Рѕ РЅРёРєРѕРіРґР° РЅРµ СЃРѕРІРµСЂС€Р°Р» РѕС€РёР±РѕРє, С‚РѕС‚ РЅРёРєРѕРіРґР° РЅРµ РїСЂРѕР±РѕРІР°Р» РЅРёС‡РµРіРѕ РЅРѕРІРѕРіРѕ. вЂ” РђР»СЊР±РµСЂС‚ Р­Р№РЅС€С‚РµР№РЅ",
      "Р’С‹ РЅРёРєРѕРіРґР° РЅРµ РїРµСЂРµСЃРµС‡С‘С‚Рµ РѕРєРµР°РЅ, РµСЃР»Рё РЅРµ РЅР°Р±РµСЂС‘С‚РµСЃСЊ РјСѓР¶РµСЃС‚РІР° РїРѕС‚РµСЂСЏС‚СЊ Р±РµСЂРµРі РёР· РІРёРґСѓ. вЂ” РљСЂРёСЃС‚РѕС„РµСЂ РљРѕР»СѓРјР±",
      "Р›СѓС‡С€РёР№ СЃРїРѕСЃРѕР± РЅР°С‡Р°С‚СЊ вЂ” РїРµСЂРµСЃС‚Р°С‚СЊ РіРѕРІРѕСЂРёС‚СЊ Рё РЅР°С‡Р°С‚СЊ РґРµР»Р°С‚СЊ. вЂ” РњР°СЂРє РўРІРµРЅ",
      "РќРµ Р±РѕР№С‚РµСЃСЊ РёРґС‚Рё РјРµРґР»РµРЅРЅРѕ. Р±РѕР№С‚РµСЃСЊ С‚РѕР»СЊРєРѕ СЃС‚РѕСЏС‚СЊ РЅР° РјРµСЃС‚Рµ. вЂ” РєРёС‚Р°Р№СЃРєР°СЏ РїРѕСЃР»РѕРІРёС†Р°",
      "Р§С‚Рѕ Р±С‹ С‚С‹ РЅРё РјРѕРі СЃРґРµР»Р°С‚СЊ РёР»Рё РјРµС‡С‚Р°РµС€СЊ вЂ” РЅР°С‡РЅРё. РЎРјРµР»РѕСЃС‚СЊ РѕР±Р»Р°РґР°РµС‚ РіРµРЅРёР°Р»СЊРЅРѕСЃС‚СЊСЋ, СЃРёР»РѕР№ Рё РІРѕР»С€РµР±СЃС‚РІРѕРј. вЂ” РРѕРіР°РЅРЅ Р’РѕР»СЊС„РіР°РЅРі С„РѕРЅ Р“С‘С‚Рµ",
      "РќРµСѓРґР°С‡Р° вЂ” СЌС‚Рѕ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊ РЅР°С‡Р°С‚СЊ Р·Р°РЅРѕРІРѕ, РЅРѕ СѓР¶Рµ Р±РѕР»РµРµ СЂР°Р·СѓРјРЅРѕ. вЂ” Р“РµРЅСЂРё Р¤РѕСЂРґ",
      "Р•СЃР»Рё С…РѕС‡РµС€СЊ Р¶РёС‚СЊ Р¶РёР·РЅСЊСЋ вЂ” РїРµСЂРµСЃС‚Р°РЅСЊ Р¶РґР°С‚СЊ РѕРґРѕР±СЂРµРЅРёСЏ. вЂ” РЈРёР»Р» РЎРјРёС‚",
      "РўРѕС‚, РєС‚Рѕ РіРѕРІРѕСЂРёС‚, С‡С‚Рѕ СЌС‚Рѕ РЅРµРІРѕР·РјРѕР¶РЅРѕ, РЅРµ РґРѕР»Р¶РµРЅ РјРµС€Р°С‚СЊ С‚РѕРјСѓ, РєС‚Рѕ СЌС‚Рѕ РґРµР»Р°РµС‚. вЂ” РљРёС‚Р°Р№СЃРєР°СЏ РїРѕСЃР»РѕРІРёС†Р°",
      "РЎРµРєСЂРµС‚ РїСЂРѕРґРІРёР¶РµРЅРёСЏ РІРїРµСЂС‘Рґ вЂ” РЅР°С‡Р°С‚СЊ. вЂ” РњР°СЂРє РўРІРµРЅ",
      "РЈСЃРїРµС… вЂ” СЌС‚Рѕ РёРґС‚Рё РѕС‚ РЅРµСѓРґР°С‡Рё Рє РЅРµСѓРґР°С‡Рµ, РЅРµ С‚РµСЂСЏСЏ СЌРЅС‚СѓР·РёР°Р·РјР°. вЂ” РЈРёРЅСЃС‚РѕРЅ Р§РµСЂС‡РёР»Р»СЊ",
      "РЎС‚Р°РЅРѕРІРёС‚РµСЃСЊ РЅРµСѓРґР°С‡РЅРёРєРѕРј Р±С‹СЃС‚СЂРµРµ Рё С‡Р°С‰Рµ вЂ” СЌС‚Рѕ РїСѓС‚СЊ Рє РёРЅРЅРѕРІР°С†РёСЏРј. вЂ” Р”Р¶РµР№СЃРѕРЅ Р¤СЂРёРґ",
      "РќРµРѕР±С…РѕРґРёРјРѕСЃС‚СЊ вЂ” РјР°С‚СЊ РёР·РѕР±СЂРµС‚РµРЅРёСЏ. вЂ” РџР»Р°С‚РѕРЅ",
      "Р’Р°С€Р° СЂР°Р±РѕС‚Р° Р·Р°Р№РјС‘С‚ Р±РѕР»СЊС€СѓСЋ С‡Р°СЃС‚СЊ РІР°С€РµР№ Р¶РёР·РЅРё вЂ” Рё РµРґРёРЅСЃС‚РІРµРЅРЅС‹Р№ СЃРїРѕСЃРѕР± Р±С‹С‚СЊ РїРѕ-РЅР°СЃС‚РѕСЏС‰РµРјСѓ СѓРґРѕРІР»РµС‚РІРѕСЂС‘РЅРЅС‹Рј вЂ” РґРµР»Р°С‚СЊ С‚Рѕ, С‡С‚Рѕ, РїРѕ РІР°С€РµРјСѓ РјРЅРµРЅРёСЋ, РІРµР»РёРєРѕРµ РґРµР»Рѕ. вЂ” РЎС‚РёРІ Р”Р¶РѕР±СЃ",
      "Р‘СѓРґСѓС‰РµРµ РїСЂРёРЅР°РґР»РµР¶РёС‚ С‚РµРј, РєС‚Рѕ РІРµСЂРёС‚ РІ РєСЂР°СЃРѕС‚Сѓ СЃРІРѕРёС… РјРµС‡С‚Р°РЅРёР№. вЂ” Р­Р»РµРѕРЅРѕСЂР° Р СѓР·РІРµР»СЊС‚",
      "РњС‹ СЃС‚Р°РЅРѕРІРёРјСЃСЏ С‚РµРј, Рѕ С‡С‘Рј РґСѓРјР°РµРј Р±РѕР»СЊС€СѓСЋ С‡Р°СЃС‚СЊ РІСЂРµРјРµРЅРё. вЂ” Р Р°Р»СЊС„ РЈРѕР»РґРѕ Р­РјРµСЂСЃРѕРЅ",
      "РЎРЅР°С‡Р°Р»Р° РѕРЅРё С‚РµР±СЏ РёРіРЅРѕСЂРёСЂСѓСЋС‚, РїРѕС‚РѕРј СЃРјРµСЋС‚СЃСЏ РЅР°Рґ С‚РѕР±РѕР№, Р·Р°С‚РµРј Р±РѕСЂСЋС‚СЃСЏ СЃ С‚РѕР±РѕР№, РїРѕС‚РѕРј С‚С‹ РїРѕР±РµР¶РґР°РµС€СЊ. вЂ” РњР°С…Р°С‚РјР° Р“Р°РЅРґРё",
      "РќРµ РѕРіСЂР°РЅРёС‡РёРІР°Р№ СЃРµР±СЏ. РњРЅРѕРіРёРµ Р»СЋРґРё РѕРіСЂР°РЅРёС‡РёРІР°СЋС‚ СЃРµР±СЏ С‚РµРј, С‡С‚Рѕ СЃС‡РёС‚Р°СЋС‚ РІРѕР·РјРѕР¶РЅС‹Рј. вЂ” РњСЌСЂРё РљРµР№ РђС€",
      "Р•СЃР»Рё С‚С‹ СЃС‚Р°РІРёС€СЊ С†РµР»СЊ, РєРѕС‚РѕСЂСѓСЋ РЅРµ РјРѕР¶РµС€СЊ РґРѕСЃС‚РёС‡СЊ РїСЂСЏРјРѕ СЃРµР№С‡Р°СЃ, СЌС‚Рѕ РјРѕС‚РёРІРёСЂСѓРµС‚ С‚РµР±СЏ СЂР°Р·РІРёРІР°С‚СЊСЃСЏ. вЂ” Р”Р¶РµСЂСЂРё Р›РѕРєРµСЂ",
      "РќРµ СЃРїСЂР°С€РёРІР°Р№, С‡С‚Рѕ РјРёСЂ РјРѕР¶РµС‚ СЃРґРµР»Р°С‚СЊ РґР»СЏ С‚РµР±СЏ. РЎРїСЂРѕСЃРё, С‡С‚Рѕ С‚С‹ РјРѕР¶РµС€СЊ СЃРґРµР»Р°С‚СЊ РґР»СЏ РјРёСЂР°. вЂ” Р”Р¶РѕРЅ Р¤. РљРµРЅРЅРµРґРё",
      "РЎР°РјРѕРµ Р±РѕР»СЊС€РѕРµ СѓРґРѕРІРѕР»СЊСЃС‚РІРёРµ РІ Р¶РёР·РЅРё вЂ” РґРµР»Р°С‚СЊ С‚Рѕ, С‡С‚Рѕ, РїРѕ РјРЅРµРЅРёСЋ РґСЂСѓРіРёС…, С‚С‹ РЅРµ СЃРјРѕР¶РµС€СЊ. вЂ” РЈРѕР»С‚РµСЂ Р‘СЌРґР¶С…РѕС‚",
      "РќРµ С‚СЂР°С‚СЊС‚Рµ РІСЂРµРјСЏ РЅР° РѕР±СЉСЏСЃРЅРµРЅРёСЏ. Р›СЋРґРё СЃР»С‹С€Р°С‚ С‚РѕР»СЊРєРѕ С‚Рѕ, С‡С‚Рѕ С…РѕС‚СЏС‚ СЃР»С‹С€Р°С‚СЊ. вЂ” РџР°СѓР»Рѕ РљРѕСЌР»СЊРѕ",
      "РќРµ РІР°Р¶РЅРѕ, СЃРєРѕР»СЊРєРѕ СЂР°Р· РІР°СЃ СЃР±РёРІР°СЋС‚ вЂ” РІР°Р¶РЅРѕ, СЃРєРѕР»СЊРєРѕ СЂР°Р· РІС‹ РїРѕРґРЅРёРјР°РµС‚РµСЃСЊ. вЂ” Р’РёРЅСЃ Р›РѕРјР±Р°СЂРґРё",
      "РўРѕ, С‡С‚Рѕ РЅРµ СѓР±РёРІР°РµС‚ РЅР°СЃ, РґРµР»Р°РµС‚ РЅР°СЃ СЃРёР»СЊРЅРµРµ. вЂ” Р¤СЂРёРґСЂРёС… РќРёС†С€Рµ",
      "Р–РёРІРё С‚Р°Рє, РєР°Рє Р±СѓРґС‚Рѕ С‚С‹ СѓРјСЂС‘С€СЊ Р·Р°РІС‚СЂР°. РЈС‡РёСЃСЊ С‚Р°Рє, РєР°Рє Р±СѓРґС‚Рѕ С‚С‹ Р±СѓРґРµС€СЊ Р¶РёС‚СЊ РІРµС‡РЅРѕ. вЂ” РњР°С…Р°С‚РјР° Р“Р°РЅРґРё",
      "РЎС‚Р°РЅРѕРІРёСЃСЊ Р»СѓС‡С€РµР№ РІРµСЂСЃРёРµР№ СЃРµР±СЏ, Р° РЅРµ РєРѕРїРёРµР№ РєРѕРіРѕ-С‚Рѕ РґСЂСѓРіРѕРіРѕ. вЂ” Р”Р¶СѓРґРё Р“Р°СЂР»РµРЅРґ",
      "РњС‹СЃР»Рё РіР»РѕР±Р°Р»СЊРЅРѕ, РґРµР№СЃС‚РІСѓР№ Р»РѕРєР°Р»СЊРЅРѕ. вЂ” Р РµРЅРµ Р”РµР±СЂРµ",
      "РўРѕР»СЊРєРѕ С‚Рµ, РєС‚Рѕ СЂРёСЃРєСѓСЋС‚ Р·Р°Р№С‚Рё СЃР»РёС€РєРѕРј РґР°Р»РµРєРѕ, СѓР·РЅР°СЋС‚, РєР°Рє РґР°Р»РµРєРѕ РјРѕР¶РЅРѕ Р·Р°Р№С‚Рё. вЂ” Рў. РЎ. Р­Р»РёРѕС‚",
      "РќРµСѓРґР°С‡Р° РЅРµ РїРѕСЂР°Р¶РµРЅРёРµ. РџРѕСЂР°Р¶РµРЅРёРµ вЂ” СЌС‚Рѕ РѕС‚РєР°Р· РѕС‚ РїРѕРїС‹С‚РѕРє. вЂ” Р”Р¶РѕРЅ Р’СѓРґРµРЅ",
      "РњРµС‡С‚С‹ СЃР±С‹РІР°СЋС‚СЃСЏ Сѓ С‚РµС…, РєС‚Рѕ РІ РЅРёС… РІРµСЂРёС‚. вЂ” РЈРѕР»С‚ Р”РёСЃРЅРµР№",
      "РРЅРІРµСЃС‚РёСЂСѓР№С‚Рµ РІ СЃРµР±СЏ. РќРёРєС‚Рѕ РґСЂСѓРіРѕР№ СЌС‚РѕРіРѕ РЅРµ СЃРґРµР»Р°РµС‚. вЂ” Р РѕСѓР· Р›Р° Р РѕС€",
      "РљРѕРіРґР° С‚С‹ Р·РЅР°РµС€СЊ, С‡РµРіРѕ С…РѕС‡РµС€СЊ, РІРµСЃСЊ РјРёСЂ СЃРїРѕСЃРѕР±СЃС‚РІРµС‚ С‚РѕРјСѓ, С‡С‚РѕР±С‹ С‚С‹ СЌС‚Рѕ РїРѕР»СѓС‡РёР». вЂ” РџР°СѓР»Рѕ РљРѕСЌР»СЊРѕ",
      "РќРµ РѕС‚РєР»Р°РґС‹РІР°Р№ РЅР° Р·Р°РІС‚СЂР° С‚Рѕ, С‡С‚Рѕ РјРѕР¶РµС€СЊ СЃРґРµР»Р°С‚СЊ СЃРµРіРѕРґРЅСЏ. вЂ” Р‘РµРЅРґР¶Р°РјРёРЅ Р¤СЂР°РЅРєР»РёРЅ",
      "Р’Р°С€Рµ РІСЂРµРјСЏ РѕРіСЂР°РЅРёС‡РµРЅРѕ вЂ” РЅРµ С‚СЂР°С‚СЊС‚Рµ РµРіРѕ, Р¶РёРІСЏ С‡СѓР¶РѕР№ Р¶РёР·РЅСЊСЋ. вЂ” РЎС‚РёРІ Р”Р¶РѕР±СЃ",
      "РЎС‡Р°СЃС‚СЊРµ РЅРµ С†РµР»СЊ вЂ” СЌС‚Рѕ РїРѕР±РѕС‡РЅС‹Р№ СЌС„С„РµРєС‚. вЂ” Р­Р»РµРѕРЅРѕСЂ Р СѓР·РІРµР»СЊС‚",
      "РљР°Р¶РґРѕРµ РґРѕСЃС‚РёР¶РµРЅРёРµ РЅР°С‡РёРЅР°РµС‚СЃСЏ СЃ СЂРµС€РµРЅРёСЏ РїРѕРїСЂРѕР±РѕРІР°С‚СЊ. вЂ” Р“РµР№Р» Р”РёР±Р±СЃ",
      "Р‘СѓРґСЊС‚Рµ РёР·РјРµРЅРµРЅРёРµРј, РєРѕС‚РѕСЂРѕРµ РІС‹ С…РѕС‚РёС‚Рµ РІРёРґРµС‚СЊ РІ РјРёСЂРµ. вЂ” РњР°С…Р°С‚РјР° Р“Р°РЅРґРё",
      "РЎР°РјС‹Р№ С‚РµРјРЅС‹Р№ С‡Р°СЃ вЂ” РїРµСЂРµРґ СЂР°СЃСЃРІРµС‚РѕРј. вЂ” РўРѕРјР°СЃ Р¤СѓР»Р»РµСЂ",
      "РЎРёР»Р° РЅРµ РІ С‚РѕРј, С‡С‚РѕР±С‹ РЅРёРєРѕРіРґР° РЅРµ РїР°РґР°С‚СЊ, Р° РІ С‚РѕРј, С‡С‚РѕР±С‹ РєР°Р¶РґС‹Р№ СЂР°Р· РїРѕРґРЅРёРјР°С‚СЊСЃСЏ. вЂ” РќРµР»СЊСЃРѕРЅ РњР°РЅРґРµР»Р°",
      "РќРµ Р±РѕР№С‚РµСЃСЊ СЃРѕРІРµСЂС€РµРЅСЃС‚РІР° вЂ” РІС‹ РЅРёРєРѕРіРґР° РµРіРѕ РЅРµ РґРѕСЃС‚РёРіРЅРµС‚Рµ. вЂ” РЎР°Р»СЊРІР°РґРѕСЂ Р”Р°Р»Рё",
      "РќРµРІРѕР·РјРѕР¶РЅРѕ РѕСЃСѓС‰РµСЃС‚РІРёС‚СЊ РІСЃС‘ СЃСЂР°Р·Сѓ, РЅРѕ РјРѕР¶РЅРѕ СЃРґРµР»Р°С‚СЊ СЃР»РµРґСѓСЋС‰РёР№ С€Р°Рі. вЂ” РџР°СѓР»Рѕ РљРѕСЌР»СЊРѕ",
      "Р›РёРґРµСЂ вЂ” СЌС‚Рѕ РЅРµ С‚РѕС‚, РєС‚Рѕ РІРµРґС‘С‚, Р° С‚РѕС‚, РєРѕРјСѓ РґСЂСѓРіРёРµ С…РѕС‚СЏС‚ СЃР»РµРґРѕРІР°С‚СЊ. вЂ” Р”Р¶РѕРЅ Рњ. РњР°РєСЃРІРµР»Р»",
      "РСЃС‚РёРЅРЅС‹Р№ СѓСЃРїРµС… вЂ” СЌС‚Рѕ РєРѕРіРґР° РІС‹ Р¶РёРІС‘С‚Рµ РїРѕ СЃРѕР±СЃС‚РІРµРЅРЅС‹Рј С†РµРЅРЅРѕСЃС‚СЏРј. вЂ” РћРїСЂР° РЈРёРЅС„СЂРё",
      "Р Р°Р±РѕС‚Р°Р№С‚Рµ С‚Р°Рє, Р±СѓРґС‚Рѕ РІС‹ РЅРµ РЅСѓР¶РґР°РµС‚РµСЃСЊ РІ РґРµРЅСЊРіР°С…. Р›СЋР±РёС‚Рµ С‚Р°Рє, Р±СѓРґС‚Рѕ РІР°СЃ РЅРёРєРѕРіРґР° РЅРµ РѕР±РёРґСЏС‚. РўР°РЅС†СѓР№С‚Рµ, РєР°Рє Р±СѓРґС‚Рѕ РЅРёРєС‚Рѕ РЅРµ СЃРјРѕС‚СЂРёС‚. вЂ” РњР°СЂРє РўРІРµРЅ",
      "РќРµ РЅР°РґРѕ Р¶РґР°С‚СЊ РёРґРµР°Р»СЊРЅРѕРіРѕ РјРѕРјРµРЅС‚Р°. Р’РѕР·СЊРјРёС‚Рµ РјРѕРјРµРЅС‚ Рё СЃРґРµР»Р°Р№С‚Рµ РµРіРѕ РёРґРµР°Р»СЊРЅС‹Рј. вЂ” Р—РёРі Р—РёРіР»Р°СЂ",
      "РЎРµРєСЂРµС‚ РїРµСЂРµРјРµРЅ вЂ” СЃРѕСЃСЂРµРґРѕС‚РѕС‡РёС‚СЊ РІСЃСЋ СЌРЅРµСЂРіРёСЋ РЅРµ РЅР° Р±РѕСЂСЊР±Рµ СЃРѕ СЃС‚Р°СЂС‹Рј, Р° РЅР° СЃС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРµ РЅРѕРІРѕРіРѕ. вЂ” РЎРѕРєСЂР°С‚",
      "РљРѕРіРґР° С†РµР»Рё РІРµР»РёРєРё, РЅРµРґРѕСЃС‚Р°С‚РєРѕРІ РЅРµ РІРёРґРЅРѕ. вЂ” РЈРёР»СЊСЏРј РЁРµРєСЃРїРёСЂ",
      "Р—РЅР°СЏ, С‡С‚Рѕ Р¶РёР·РЅСЊ СЃРєРѕСЂРѕС‚РµС‡РЅР° вЂ” Р¶РёРІРё СЃРµРіРѕРґРЅСЏ. вЂ” РЎРµРЅРµРєР°",
      "Р’РµР»РёС‡Р°Р№С€РµРµ Р±РѕРіР°С‚СЃС‚РІРѕ вЂ” Р¶РёС‚СЊ РїРѕ СЃРІРѕРёРј СѓСЃР»РѕРІРёСЏРј. вЂ” РљР»РёС„С„РѕСЂРґ РЎС‚РѕР»Р»",
      "Р§С‚РѕР±С‹ С‡С‚Рѕ-С‚Рѕ РґРѕР±РёС‚СЊСЃСЏ, РЅСѓР¶РЅРѕ РІРµСЂРёС‚СЊ РІ РЅРµРІРѕР·РјРѕР¶РЅРѕРµ. вЂ” РќРёРє Р’СѓР№С‡РёС‡",
      "РќРёРєРѕРіРґР° РЅРµ РїРѕР·РґРЅРѕ Р±С‹С‚СЊ С‚РµРј, РєРµРј РІС‹ РјРѕРіР»Рё Р±С‹ Р±С‹С‚СЊ. вЂ” Р”Р¶РѕСЂРґР¶ Р­Р»РёРѕС‚",
      "РўСЂСѓРґРЅРѕСЃС‚Рё Р·Р°РєР°Р»СЏСЋС‚ С…Р°СЂР°РєС‚РµСЂ. вЂ” РЎСЌРјСЋСЌР» РЎРјР°Р№Р»Р·",
      "РќРµСѓРґР°С‡Р° вЂ” РїСЂРѕСЃС‚Рѕ РѕРїС‹С‚. вЂ” Р“РµРЅСЂРё Р¤РѕСЂРґ",
      "РќР°СЃС‚РѕСЏС‰Р°СЏ РјСѓР¶РµСЃС‚РІРµРЅРЅРѕСЃС‚СЊ вЂ” РїСЂРµРѕРґРѕР»РµС‚СЊ СЃРµР±СЏ. вЂ” Р¤СЂРёРґСЂРёС… РЁРёР»Р»РµСЂ",
      "РЎРёР»Р° РІ РїРѕСЃС‚РѕСЏРЅСЃС‚РІРµ. вЂ” РњР°СЂРє РђРІСЂРµР»РёР№",
      "РќР°С€ РІРµР»РёС‡Р°Р№С€РёР№ СЃС‚СЂР°С… вЂ” РЅРµ Р±С‹С‚СЊ РЅРµРґРѕСЃС‚РѕРёРЅРЅС‹РјРё, Р° Р±С‹С‚СЊ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ РІРµР»РёРєРёРјРё. вЂ” РњР°СЂРёР°РЅРЅР° РЈРёР»СЊСЏРјСЃРѕРЅ",
      "РќР° РїСѓС‚Рё Рє С†РµР»Рё РІСЃРµРіРґР° Р±СѓРґСѓС‚ РїСЂРµРїСЏС‚СЃС‚РІРёСЏ вЂ” РЅРѕ РѕРЅРё РїСЂРѕРІРµСЂСЏСЋС‚ С‚РІРѕСЋ СЂРµС€РёРјРѕСЃС‚СЊ. вЂ” РџР°СѓР»Рѕ РљРѕСЌР»СЊРѕ",
      "Р’РµСЂСЊ РІ С‚Рѕ, С‡С‚Рѕ С‚С‹ РјРѕР¶РµС€СЊ вЂ” Рё РїСѓС‚СЊ РЅР°Р№РґС‘С‚СЃСЏ. вЂ” РўРµРѕРґРѕСЂ Р СѓР·РІРµР»СЊС‚",
      "РќРµРІРѕР·РјРѕР¶РЅРѕ РёР·РјРµРЅРёС‚СЊ РЅР°РїСЂР°РІР»РµРЅРёРµ РІРµС‚СЂР°, РЅРѕ РјРѕР¶РЅРѕ РЅР°СЃС‚СЂРѕРёС‚СЊ РїР°СЂСѓСЃР°. вЂ” Р”РѕР»Р»Рё РџР°СЂС‚РѕРЅ",
      "РЎСѓРґРёС‚Рµ СЃРµР±СЏ РїРѕ С‚РѕРјСѓ, С‡С‚Рѕ РІС‹ РґРµР»Р°РµС‚Рµ, Р° РЅРµ РїРѕ С‚РѕРјСѓ, С‡С‚Рѕ РЅР°РјРµСЂРµРІР°Р№С‚РµСЃСЊ РґРµР»Р°С‚СЊ. вЂ” Р›РµРѕРЅР°СЂРґРѕ РґР° Р’РёРЅС‡Рё",
      "РљРѕРіРґР° С‚С‹ РЅР°С‡РёРЅР°РµС€СЊ РґРµР»Р°С‚СЊ С‚Рѕ, С‡С‚Рѕ РјРѕР¶РµС€СЊ вЂ” С‚С‹ СѓРґРёРІРёС€СЊСЃСЏ, РЅР° С‡С‚Рѕ СЃРїРѕСЃРѕР±РµРЅ. вЂ” Р›СѓРёР·Р° РҐРµР№",
      "РћРіСЂР°РЅРёС‡РµРЅРёСЏ СЃСѓС‰РµСЃС‚РІСѓСЋС‚ Р»РёС€СЊ РІ РІРѕР·РґСѓС…Рµ С‚РІРѕРµРіРѕ СЂР°Р·СѓРјР°. вЂ” РќР°РїРѕР»РµРѕРЅ РҐРёР»Р»",
      "РњРёСЂ Р»РѕРјР°РµС‚СЃСЏ РЅРµ РґР»СЏ СЃР»Р°Р±С‹С…. вЂ” РЎРёРјРѕРЅР° РґРµ Р‘РѕРІСѓР°СЂ",
      "Р“РґРµ РјРЅРѕРіРѕ Р»СЋР±РІРё, С‚Р°Рј РјРЅРѕРіРѕ СЃРёР»С‹. вЂ” РњР°С…Р°С‚РјР° Р“Р°РЅРґРё",
      "РЎР±Р°РІСЊ С‚РµРјРї Рё СѓРІРёРґРёС€СЊ вЂ” Р»СѓС‡С€Р°СЏ С‡Р°СЃС‚СЊ РЅР°С‡РёРЅР°РµС‚СЃСЏ С‚РёС…Рѕ. вЂ” Р Р°Р»С„ РЈРѕР»РґРѕ Р­РјРµСЂСЃРѕРЅ",
      "Р§С‚РѕР±С‹ РїРѕРґРЅСЏС‚СЊСЃСЏ РІС‹С€Рµ вЂ” РѕС‚РєР°Р¶РёСЃСЊ РѕС‚ Р±Р°Р»Р»Р°СЃС‚Р°. вЂ” Р РёС‡Р°СЂРґ Р‘СЂСЌРЅСЃРѕРЅ",
      "РљР°Р¶РґС‹Р№ РґРµРЅСЊ вЂ” РЅРѕРІР°СЏ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊ. вЂ” РљР°СЂР» РЎСЌРЅРґР±РµСЂРі",
      "РќРµСѓРґР°С‡Р° вЂ” РїРµСЂРІС‹Р№ С€Р°Рі Рє СѓСЃРїРµС…Сѓ, РµСЃР»Рё С‚С‹ СѓС‡РёС€СЊСЃСЏ. вЂ” РЈРёР»СЊСЏРј Р”РµР»Р±РµСЂС‚ Р“СЌРЅРЅРѕРЅ",
      "Р•СЃР»Рё С…РѕС‡РµС€СЊ РјР°СЃС€С‚Р°Р±РЅРѕРіРѕ вЂ” РЅР°С‡РЅРё СЃ РјР°Р»РѕРіРѕ. вЂ” Р›Р°Рѕ-С†Р·С‹",
      "РЎРґРµР»Р°Р№ СЃРµР№С‡Р°СЃ С‚Рѕ, Рѕ С‡С‘Рј РїРѕС‚РѕРј РЅРµ РїРѕР¶Р°Р»РµРµС€СЊ. вЂ” Р›Сѓ РҐРѕР»РґСЃ",
      "РќРµР»СЊР·СЏ РґРѕР±РёС‚СЊСЃСЏ СѓСЃРїРµС…Р°, РµСЃР»Рё С‚С‹ РЅРµ РіРѕС‚РѕРІ С‚РµСЂРїРµС‚СЊ РїРѕСЂР°Р¶РµРЅРёСЏ. вЂ” Р’РёРЅСЃ Р›РѕРјР±Р°СЂРґРё",
      "РЎРёР»Р° С…Р°СЂР°РєС‚РµСЂР° РїСЂРѕСЏРІР»СЏРµС‚СЃСЏ РІ РїСЂРµРѕРґРѕР»РµРЅРёРё С‚СЂСѓРґРЅРѕСЃС‚РµР№. вЂ” Р”Р¶РѕРЅ РњР°РєСЃРІРµР»Р»",
      "РќРµ СѓРјР°Р»СЏР№ СЃРІРѕР№ РїСѓС‚СЊ вЂ” РѕРЅ РІРµСЃСЊ С‚РІРѕР№. вЂ” Р¤СЂРёРґСЂРёС… РќРёС†С€Рµ",
      "Р”РµР№СЃС‚РІРёРµ вЂ” РјРѕСЃС‚ РјРµР¶РґСѓ РјРµС‡С‚РѕР№ Рё СЂРµР·СѓР»СЊС‚Р°С‚РѕРј. вЂ” РЈРёР»Р» РЎРјРёС‚",
      "Р’РµСЂСЊ РІ СЃРµР±СЏ, РґР°Р¶Рµ РµСЃР»Рё РЅРёРєС‚Рѕ РґСЂСѓРіРѕР№ РЅРµ РІРµСЂРёС‚. вЂ” Р РѕРЅР°Р»СЊРґ Р РµР№РіР°РЅ",
      "Р§РµРј С‚СЂСѓРґРЅРµРµ Р±РёС‚РІР°, С‚РµРј СЃР»Р°С‰Рµ РїРѕР±РµРґР°. вЂ” Р“РµСЂРјР°РЅ РњРµР»РІРёР»Р»",
      "Р§С‚РѕР±С‹ РґРѕСЃС‚РёС‡СЊ РІРµР»РёРєРёС… С†РµР»РµР№, РЅСѓР¶РЅРѕ РЅР°С‡Р°С‚СЊ СЃ РјР°Р»РѕРіРѕ. вЂ” РђРЅС‚СѓР°РЅ РґРµ РЎРµРЅС‚-Р­РєР·СЋРїРµСЂРё",
      "РўРѕС‚, РєС‚Рѕ С…РѕС‡РµС‚ РёРґС‚Рё вЂ” РЅР°Р№РґРµС‚ РїСѓС‚СЊ. вЂ” РџСѓР±Р»РёР»РёР№ РЎРёСЂ",
      "Р›СЋР±Рё С‚СЂСѓРґ вЂ” Рё РѕРЅ РїРѕР»СЋР±РёС‚ С‚РµР±СЏ. вЂ” РЎРµРЅРµРєР°"
    ]

  },
  en: {
    appTitle: 'GoalTrack Pro',
    appSubtitle: 'AI вЂў Analytics вЂў Gamification',
    searchPlaceholder: 'рџ”Ќ Search goalsвЂ¦',
    newGoal: 'New Goal',
    goalName: 'Name',
    goalNamePlaceholder: 'e.g.: Save $50,000',
    description: 'Description (optional)',
    descriptionPlaceholder: 'Add goal description, motivation or additional details...',
    goalType: 'Goal Type',
    category: 'Category',
    priority: 'Priority',
    deadline: 'Deadline (optional)',
    templates: 'Quick Templates',
    noTemplates: 'вЂ” Don\'t use вЂ”',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    duplicate: 'Duplicate',
    archive: 'Archive',
    share: 'Share',
    stats: 'Statistics',
    achievements: 'Achievements',
    export: 'Export Data',
    import: 'Import Data',
    settings: 'Settings',
    emptyState: 'No goals yet. Click "+" to add your first goal.',
    motivationalQuotes: [
      "It does not matter how slowly you go as long as you do not stop. вЂ” Confucius",
      "Anyone who has never made a mistake has never tried anything new. вЂ” Albert Einstein",
      "You can never cross the ocean until you have the courage to lose sight of the shore. вЂ” Christopher Columbus",
      "The secret of getting ahead is getting started. вЂ” Mark Twain",
      "Do not be afraid of going slowly; be afraid only of standing still. вЂ” Chinese proverb",
      "Whatever you can do or dream you can, begin it. Boldness has genius, power, and magic in it. вЂ” Johann Wolfgang von Goethe",
      "Failure is simply the opportunity to begin again, this time more intelligently. вЂ” Henry Ford",
      "If you want to live your life вЂ” stop waiting for approval. вЂ” Will Smith",
      "He who says it cannot be done should not interrupt the one who is doing it. вЂ” Chinese proverb",
      "The secret of getting ahead is getting started. вЂ” Mark Twain",
      "Success is going from failure to failure without losing enthusiasm. вЂ” Winston Churchill",
      "Become a failure faster and more often вЂ” thatвЂ™s the path to innovation. вЂ” Jason Fried",
      "Necessity is the mother of invention. вЂ” Plato",
      "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. вЂ” Steve Jobs",
      "The future belongs to those who believe in the beauty of their dreams. вЂ” Eleanor Roosevelt",
      "We become what we think about most of the time. вЂ” Ralph Waldo Emerson",
      "First they ignore you, then they laugh at you, then they fight you, then you win. вЂ” Mahatma Gandhi",
      "DonвЂ™t limit yourself. Many people limit themselves to what they think they can do. вЂ” Mary Kay Ash",
      "If you set a goal that you canвЂ™t reach yet, it will motivate you to grow. вЂ” Gerry Locker",
      "Ask not what your country can do for you вЂ“ ask what you can do for your country. вЂ” John F. Kennedy",
      "The greatest pleasure in life is doing what people say you cannot do. вЂ” Walter Bagehot",
      "DonвЂ™t waste your time on explanations; people only hear what they want to hear. вЂ” Paulo Coelho",
      "ItвЂ™s not whether you get knocked down; itвЂ™s whether you get up. вЂ” Vince Lombardi",
      "That which does not kill us makes us stronger. вЂ” Friedrich Nietzsche",
      "Live as if you were to die tomorrow. Learn as if you were to live forever. вЂ” Mahatma Gandhi",
      "Always be a first-rate version of yourself, instead of a second-rate version of somebody else. вЂ” Judy Garland",
      "Think globally, act locally. вЂ” RenГ© Dubos",
      "Only those who risk going too far can possibly find out how far one can go. вЂ” T. S. Eliot",
      "Failure is not fatal. Failure is refusing to try again. вЂ” John Wooden",
      "All our dreams can come true if we have the courage to pursue them. вЂ” Walt Disney",
      "Invest in yourself. No one else will do it for you. вЂ” Rose La Roche",
      "When you want something, all the universe conspires in helping you to achieve it. вЂ” Paulo Coelho",
      "Never put off till tomorrow what you can do today. вЂ” Benjamin Franklin",
      "Your time is limited, so donвЂ™t waste it living someone elseвЂ™s life. вЂ” Steve Jobs",
      "Happiness is not a goal; itвЂ™s a by-product. вЂ” Eleanor Roosevelt",
      "Every accomplishment starts with the decision to try. вЂ” Gail Devers",
      "Be the change that you wish to see in the world. вЂ” Mahatma Gandhi",
      "The darkest hour is just before the dawn. вЂ” Thomas Fuller",
      "The greatest glory in living lies not in never falling, but in rising every time we fall. вЂ” Nelson Mandela",
      "DonвЂ™t be afraid of perfection вЂ“ youвЂ™ll never reach it. вЂ” Salvador DalГ­",
      "You canвЂ™t do everything at once, but you can do the next thing. вЂ” Paulo Coelho",
      "A leader is one who knows the way, goes the way, and shows the way. вЂ” John C. Maxwell",
      "True success is when you live according to your own values. вЂ” Oprah Winfrey",
      "Work like you donвЂ™t need the money. Love like youвЂ™ve never been hurt. Dance like nobodyвЂ™s watching. вЂ” Mark Twain",
      "DonвЂ™t wait for the perfect moment. Take the moment and make it perfect. вЂ” Zig Ziglar",
      "The secret of change is to focus all your energy not on fighting the old, but on building the new. вЂ” Socrates",
      "When the goal is great, flaws are invisible. вЂ” William Shakespeare",
      "Knowing life is short вЂ“ live today. вЂ” Seneca",
      "The greatest wealth is to live according to your own terms. вЂ” Clifford Stoll",
      "To achieve anything, you must believe in the impossible. вЂ” Nick Vujicic",
      "ItвЂ™s never too late to be what you might have been. вЂ” George Eliot",
      "Difficulties strengthen the mind, as labor does the body. вЂ” Samuel Smiles",
      "Failure is simply experience. вЂ” Henry Ford",
      "True manhood is conquering oneself. вЂ” Friedrich Schiller",
      "Strength lies in consistency. вЂ” Marcus Aurelius",
      "Our deepest fear is not that we are inadequate, but that we are powerful beyond measure. вЂ” Marianne Williamson",
      "On the way to your goal there will always be obstacles вЂ” they test your determination. вЂ” Paulo Coelho",
      "Believe you can and youвЂ™re halfway there. вЂ” Theodore Roosevelt",
      "We cannot direct the wind, but we can adjust the sails. вЂ” Dolly Parton",
      "Judge yourself by what you do, not by what you intend to do. вЂ” Leonardo da Vinci",
      "When you start doing what you can, youвЂ™ll be amazed at what you can achieve. вЂ” Louise Hay",
      "Limitations exist only in the air of your mind. вЂ” Napoleon Hill",
      "The world is not made for the weak. вЂ” Simone de Beauvoir",
      "Where there is much love, there is much strength. вЂ” Mahatma Gandhi",
      "Slow down and youвЂ™ll see вЂ” the best part begins quietly. вЂ” Ralph Waldo Emerson",
      "To rise higher, you must let go of the ballast. вЂ” Richard Branson",
      "Every day is a new opportunity. вЂ” Carl Sandburg",
      "Failure is the first step to success if you learn from it. вЂ” William Delbert Gann",
      "If you want to achieve something big, start small. вЂ” Lao Tzu",
      "Do it now so you wonвЂ™t regret it later. вЂ” Lou Holtz",
      "You canвЂ™t achieve success if youвЂ™re not willing to fail. вЂ” Vince Lombardi",
      "Character is built through adversity. вЂ” John Maxwell",
      "Do not diminish your own path вЂ” itвЂ™s yours alone. вЂ” Friedrich Nietzsche",
      "Action is the bridge between dreams and results. вЂ” Will Smith",
      "Believe in yourself even if no one else does. вЂ” Ronald Reagan",
      "The harder the battle, the sweeter the victory. вЂ” Herman Melville",
      "To accomplish great things, we must begin with small ones. вЂ” Antoine de Saint-ExupГ©ry",
      "He who wishes to travel far will find a way. вЂ” Publilius Syrus",
      "Love work, and it will love you back. вЂ” Seneca"
    ]

  }
};
function t(key) {
  const lang = state.settings.language || 'ru';
  return translations[lang]?.[key] || translations.ru[key] || key;
}
function updateLanguage() {
  const lang = state.settings.language || 'ru';
  
  // Update UI elements
  document.querySelector('h1').textContent = t('appTitle');
  document.querySelector('.pill').textContent = t('appSubtitle');
  document.getElementById('search').placeholder = t('searchPlaceholder');
  document.getElementById('f_name').placeholder = t('goalNamePlaceholder');
  document.getElementById('f_description').placeholder = t('descriptionPlaceholder');
  document.getElementById('empty').innerHTML = `
    <div>${t('emptyState')}</div>
    <div id="motivationalQuote" style="margin-top: 20px; font-style: italic; color: var(--text-secondary);"></div>
  `;
  
  // Update form labels
  const labels = {
    'f_name': t('goalName'),
    'f_description': t('description'),
    'f_type': t('goalType'),
    'f_category': t('category'),
    'f_priority': t('priority'),
    'f_deadline': t('deadline'),
    'f_template': t('templates')
  };
  
  Object.entries(labels).forEach(([id, text]) => {
    const element = document.getElementById(id);
    if (element) {
      const label = element.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.textContent = text;
      }
    }
  });
  
  // Update motivational quotes
  showMotivationalQuote();
}
// ===== Achievement System =====
const ACHIEVEMENTS = [
  { id: 'first_goal', title: 'РџРµСЂРІС‹Рµ С€Р°РіРё', description: 'РЎРѕР·РґР°Р№С‚Рµ РїРµСЂРІСѓСЋ С†РµР»СЊ', icon: 'рџЋЇ', unlocked: false },
  { id: 'first_complete', title: 'РџРѕР±РµРґРёС‚РµР»СЊ', description: 'Р—Р°РІРµСЂС€РёС‚Рµ РїРµСЂРІСѓСЋ С†РµР»СЊ', icon: 'рџЏ†', unlocked: false },
  { id: 'streak_7', title: 'РќРµРґРµР»СЏ СЃРёР»С‹', description: '7 РґРЅРµР№ РїРѕРґСЂСЏРґ Р°РєС‚РёРІРЅРѕСЃС‚СЊ', icon: 'рџ”Ґ', unlocked: false },
  { id: 'streak_30', title: 'РњРµСЃСЏС† РґРёСЃС†РёРїР»РёРЅС‹', description: '30 РґРЅРµР№ РїРѕРґСЂСЏРґ Р°РєС‚РёРІРЅРѕСЃС‚СЊ', icon: 'рџ’Є', unlocked: false },
  { id: 'goals_10', title: 'Р¦РµР»РµСѓСЃС‚СЂРµРјР»РµРЅРЅС‹Р№', description: 'РЎРѕР·РґР°Р№С‚Рµ 10 С†РµР»РµР№', icon: 'рџ“€', unlocked: false },
  { id: 'goals_50', title: 'РњР°СЃС‚РµСЂ С†РµР»РµР№', description: 'РЎРѕР·РґР°Р№С‚Рµ 50 С†РµР»РµР№', icon: 'рџ‘‘', unlocked: false },
  { id: 'complete_5', title: 'Р”РѕСЃС‚РёРіР°С‚РѕСЂ', description: 'Р—Р°РІРµСЂС€РёС‚Рµ 5 С†РµР»РµР№', icon: 'в­ђ', unlocked: false },
  { id: 'complete_25', title: 'Р›РµРіРµРЅРґР°', description: 'Р—Р°РІРµСЂС€РёС‚Рµ 25 С†РµР»РµР№', icon: 'рџЊџ', unlocked: false },
  { id: 'money_million', title: 'РњРёР»Р»РёРѕРЅРµСЂ', description: 'РќР°РєРѕРїРёС‚Рµ 1 000 000 в‚Ѕ', icon: 'рџ’°', unlocked: false },
  { id: 'challenge_100', title: 'РЎС‚РѕР№РєРёР№', description: 'Р—Р°РІРµСЂС€РёС‚Рµ 100-РґРЅРµРІРЅС‹Р№ С‡РµР»Р»РµРЅРґР¶', icon: 'рџ’Ћ', unlocked: false }
];
function checkAchievements() {
  let newAchievements = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    if (state.achievements.includes(achievement.id)) return;
    
    let unlocked = false;
    switch(achievement.id) {
      case 'first_goal':
        unlocked = state.goals.length >= 1;
        break;
      case 'first_complete':
        unlocked = state.goals.some(g => g.completedAt);
        break;
      case 'goals_10':
        unlocked = state.goals.length >= 10;
        break;
      case 'goals_50':
        unlocked = state.goals.length >= 50;
        break;
      case 'complete_5':
        unlocked = state.goals.filter(g => g.completedAt).length >= 5;
        break;
      case 'complete_25':
        unlocked = state.goals.filter(g => g.completedAt).length >= 25;
        break;
      case 'money_million':
        const totalMoney = state.goals
          .filter(g => g.type === 'financial' && g.completedAt)
          .reduce((sum, g) => sum + g.targetAmount, 0);
        unlocked = totalMoney >= 1000000;
        break;
      case 'challenge_100':
        unlocked = state.goals.some(g => g.type === 'challenge' && g.totalDays >= 100 && g.completedAt);
        break;
    }
    
    if (unlocked) {
      state.achievements.push(achievement.id);
      newAchievements.push(achievement);
    }
  });
  
  if (newAchievements.length > 0) {
    saveAchievements();
    showAchievementNotification(newAchievements);
  }
}
function showAchievementNotification(achievements) {
  achievements.forEach((achievement, index) => {
    // Delay each achievement to show them one by one
    setTimeout(() => {
      showFullscreenAchievement(achievement);
    }, index * 2000);
  });
}
function showFullscreenAchievement(achievement) {
  // Create fullscreen overlay
  const overlay = document.createElement('div');
  overlay.className = 'achievement-overlay';
  
  // Create popup content
  const popup = document.createElement('div');
  popup.className = 'achievement-popup';
  popup.innerHTML = `
    <div class="achievement-icon">${achievement.icon}</div>
    <div class="achievement-title">${achievement.title}</div>
    <div class="achievement-description">${achievement.description}</div>
    <button class="achievement-close" onclick="this.parentElement.parentElement.remove()">
      РџСЂРѕРґРѕР»Р¶РёС‚СЊ
    </button>
  `;
  
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (overlay.parentElement) {
      overlay.style.animation = 'achievementFadeOut 0.5s ease';
      setTimeout(() => overlay.remove(), 500);
    }
  }, 5000);
  
  // Add click to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.animation = 'achievementFadeOut 0.5s ease';
      setTimeout(() => overlay.remove(), 500);
    }
  });
  
  // Launch confetti for celebration
  launchConfetti();
  
  // Add vibration if supported
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100, 50, 200]);
  }
}
// ===== Statistics Functions =====
function updateStats() {
  const completedGoals = state.goals.filter(g => g.completedAt).length;
  const totalDays = state.goals.reduce((sum, g) => {
    if (g.type === 'challenge') return sum + g.completedDays.length;
    return sum;
  }, 0);
  
  state.stats = {
    totalGoals: state.goals.length,
    completedGoals: completedGoals,
    totalDays: totalDays,
    streak: calculateStreak(),
    completionRate: state.goals.length > 0 ? Math.round((completedGoals / state.goals.length) * 100) : 0
  };
  
  saveStats();
}
function calculateStreak() {
  if (state.goals.length === 0) return 0;
  
  const today = new Date();
  const dates = new Set();
  
  // Collect all activity dates
  state.goals.forEach(goal => {
    if (goal.type === 'challenge') {
      goal.completedDays.forEach(day => {
        const date = new Date(goal.createdAt + (day - 1) * 24 * 60 * 60 * 1000);
        dates.add(date.toDateString());
      });
    } else if (goal.completedAt) {
      const date = new Date(goal.completedAt);
      dates.add(date.toDateString());
    }
  });
  
  // Calculate current streak
  let streak = 0;
  let currentDate = new Date(today);
  
  while (true) {
    const dateString = currentDate.toDateString();
    if (dates.has(dateString)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}
function renderStats() {
  const statsGrid = document.getElementById('statsGrid');
  if (!statsGrid) return;
  
  // Calculate additional analytics
  const categoryStats = {};
  const priorityStats = {};
  const typeStats = {};
  
  state.goals.forEach(goal => {
    // Category stats
    const category = goal.category || 'personal';
    if (!categoryStats[category]) categoryStats[category] = { total: 0, completed: 0 };
    categoryStats[category].total++;
    if (goal.completedAt) categoryStats[category].completed++;
    
    // Priority stats
    const priority = goal.priority || 'medium';
    if (!priorityStats[priority]) priorityStats[priority] = { total: 0, completed: 0 };
    priorityStats[priority].total++;
    if (goal.completedAt) priorityStats[priority].completed++;
    
    // Type stats
    if (!typeStats[goal.type]) typeStats[goal.type] = { total: 0, completed: 0 };
    typeStats[goal.type].total++;
    if (goal.completedAt) typeStats[goal.type].completed++;
  });
  
  const categoryNames = {
    'personal': 'Р›РёС‡РЅРѕРµ СЂР°Р·РІРёС‚РёРµ',
    'health': 'Р—РґРѕСЂРѕРІСЊРµ',
    'career': 'РљР°СЂСЊРµСЂР°',
    'finance': 'Р¤РёРЅР°РЅСЃС‹',
    'education': 'РћР±СЂР°Р·РѕРІР°РЅРёРµ',
    'hobby': 'РҐРѕР±Р±Рё',
    'social': 'РЎРѕС†РёР°Р»СЊРЅРѕРµ',
    'spiritual': 'Р”СѓС…РѕРІРЅРѕРµ'
  };
  
  statsGrid.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${state.stats.totalGoals}</div>
      <div class="stat-label">Р’СЃРµРіРѕ С†РµР»РµР№</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${state.stats.completedGoals}</div>
      <div class="stat-label">Р—Р°РІРµСЂС€РµРЅРѕ</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${state.stats.completionRate}%</div>
      <div class="stat-label">РЈСЃРїРµС€РЅРѕСЃС‚СЊ</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${state.stats.streak}</div>
      <div class="stat-label">Р”РЅРµР№ РїРѕРґСЂСЏРґ</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${Object.keys(categoryStats).length}</div>
      <div class="stat-label">РљР°С‚РµРіРѕСЂРёР№</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${Object.keys(typeStats).length}</div>
      <div class="stat-label">РўРёРїРѕРІ С†РµР»РµР№</div>
    </div>
    <div class="stat-card" style="grid-column: 1 / -1;">
      <h4 style="margin: 0 0 16px 0; color: var(--text);">рџ“Љ РђРЅР°Р»РёС‚РёРєР° РїРѕ РєР°С‚РµРіРѕСЂРёСЏРј</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        ${Object.entries(categoryStats).map(([category, stats]) => `
          <div style="padding: 12px; background: var(--card); border-radius: 8px; border-left: 4px solid var(--accent);">
            <div style="font-weight: 600; margin-bottom: 4px;">${categoryNames[category] || category}</div>
            <div style="font-size: 14px; color: var(--text-secondary);">
              ${stats.completed}/${stats.total} (${Math.round((stats.completed / stats.total) * 100)}%)
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
function renderAchievements() {
  const achievementsList = document.getElementById('achievementsList');
  if (!achievementsList) return;
  
  achievementsList.innerHTML = ACHIEVEMENTS.map(achievement => {
    const unlocked = state.achievements.includes(achievement.id);
    return `
      <div class="achievement ${unlocked ? 'unlocked' : 'locked'}">
        <div class="achievement-icon">${achievement.icon}</div>
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">${achievement.title}</div>
          <div style="font-size: 14px; color: var(--text-secondary);">${achievement.description}</div>
        </div>
      </div>
    `;
  }).join('');
}
// ===== Render list =====
const list = document.getElementById('list');
const empty = document.getElementById('empty');
function computeProgress(g){
  switch(g.type){
    case 'financial': return pct((g.currentAmount / Math.max(1, g.targetAmount))*100);
    case 'challenge': return pct((g.completedDays.length / Math.max(1, g.totalDays))*100);
    case 'counter':   return pct((g.currentCount / Math.max(1, g.totalCount))*100);
    case 'reading':   return pct((g.readPages / Math.max(1, g.totalPages))*100);
    case 'learning':  return pct(((g.spentMin/60) / Math.max(1, g.targetHours))*100);
    case 'weight': {
      const loseTotal = Math.max(0.0001, g.w_start - g.w_target);
      const loseNow = Math.max(0, g.w_start - g.w_current);
      return pct((loseNow/loseTotal)*100);
    }
    default: return 0;
  }
}
function card(g){
  const percent = computeProgress(g);
  const deg = (percent/100)*360;
  let topText = '';
  let typeText = '';
  if(g.type==='financial'){ topText = `${currency(g.currentAmount)} / ${currency(g.targetAmount)}`; typeText = 'Р¤РёРЅР°РЅСЃРѕРІР°СЏ С†РµР»СЊ'; }
  if(g.type==='challenge'){ topText = `${g.completedDays.length} / ${g.totalDays} РґРЅРµР№`; typeText = g.actionsPerDay?`Р§РµР»Р»РµРЅРґР¶ В· ${g.actionsPerDay}/РґРµРЅСЊ`:'Р§РµР»Р»РµРЅРґР¶'; }
  if(g.type==='counter'){ topText = `${g.currentCount} / ${g.totalCount}`; typeText = 'РЎС‡С‘С‚С‡РёРє'; }
  if(g.type==='reading'){ topText = `${g.readPages} / ${g.totalPages} СЃС‚СЂ.`; typeText = 'Р§С‚РµРЅРёРµ'; }
  if(g.type==='learning'){ topText = `${(g.spentMin/60).toFixed(1)} / ${g.targetHours} С‡`; typeText = 'РЈС‡С‘Р±Р°'; }
  if(g.type==='weight'){ topText = `${g.w_current} в†’ ${g.w_target} РєРі (Р±С‹Р»Рѕ ${g.w_start})`; typeText = 'Р’РµСЃ'; }
  const done = percent>=100;
  
  // Category mapping
  const categoryMap = {
    'personal': 'Р›РёС‡РЅРѕРµ СЂР°Р·РІРёС‚РёРµ',
    'health': 'Р—РґРѕСЂРѕРІСЊРµ', 
    'career': 'РљР°СЂСЊРµСЂР°',
    'finance': 'Р¤РёРЅР°РЅСЃС‹',
    'education': 'РћР±СЂР°Р·РѕРІР°РЅРёРµ',
    'hobby': 'РҐРѕР±Р±Рё',
    'social': 'РЎРѕС†РёР°Р»СЊРЅРѕРµ',
    'spiritual': 'Р”СѓС…РѕРІРЅРѕРµ'
  };
  
  const priorityMap = {
    'low': 'РќРёР·РєРёР№',
    'medium': 'РЎСЂРµРґРЅРёР№', 
    'high': 'Р’С‹СЃРѕРєРёР№',
    'critical': 'РљСЂРёС‚РёС‡РµСЃРєРёР№'
  };
  
  const el = document.createElement('article');
  el.className = 'card'+(done?' completed':'');
  el.innerHTML = `
    <div class="card-header">
      <div class="meta">
            <span class="category-badge category-${g.category || 'personal'}">
                ${categoryMap[g.category] || 'Р›РёС‡РЅРѕРµ СЂР°Р·РІРёС‚РёРµ'}
            </span>
            <span class="dot"></span>
            <span class="label">
                ${typeText}${g.daily ? ` вЂў ${g.daily}/РґРµРЅСЊ` : ''}
            </span>
        </div>
    </div>
    <h3 class="name">${g.name}</h3>
    ${g.deadline ? `<div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
      рџ“… Р”РµРґР»Р°Р№РЅ: ${new Date(g.deadline).toLocaleDateString('ru-RU')}
      ${new Date(g.deadline) < new Date() ? ' вљ пёЏ РџСЂРѕСЃСЂРѕС‡РµРЅРѕ' : ''}
    </div>` : ''}
    ${g.subtasks && g.subtasks.length > 0 ? `<div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
      рџ“‹ РџРѕРґР·Р°РґР°С‡Рё: ${g.subtasks.filter(t => t.completed).length}/${g.subtasks.length} РІС‹РїРѕР»РЅРµРЅРѕ
    </div>` : ''}
    <div class="progress-row">
      <div class="ring" style="--deg:${deg}deg"><span>${percent}%</span></div>
      <div class="progress-text" style="flex:1">
        <div class="line"><i style="--w:${percent}%"></i></div>
        <div class="muted">${topText}</div>
      </div>
    </div>`;
  el.addEventListener('click', ()=>openDetails(g.id));
  return el;
}
function render(){
  list.innerHTML = '';
  let filtered = state.goals.filter(g => 
    !g.archived && 
    g.name.toLowerCase().includes(state.filter.toLowerCase())
  );
  
  // Apply additional filters
  const filterBy = $('#filterBy').value;
  if (filterBy === 'active') {
    filtered = filtered.filter(g => !g.completedAt);
  } else if (filterBy === 'completed') {
    filtered = filtered.filter(g => g.completedAt);
  } else if (filterBy === 'financial') {
    filtered = filtered.filter(g => g.type === 'financial');
  } else if (filterBy === 'challenge') {
    filtered = filtered.filter(g => g.type === 'challenge');
  } else if (filterBy === 'health') {
    filtered = filtered.filter(g => g.category === 'health');
  } else if (filterBy === 'education') {
    filtered = filtered.filter(g => g.category === 'education');
  }
  
  // Apply sorting
  const sortBy = $('#sortBy').value;
  if (sortBy === 'progress') {
    filtered.sort((a,b)=> (computeProgress(b)-computeProgress(a)) || (b.createdAt - a.createdAt));
  } else if (sortBy === 'name') {
    filtered.sort((a,b)=> a.name.localeCompare(b.name));
  } else if (sortBy === 'date') {
    filtered.sort((a,b)=> b.createdAt - a.createdAt);
  } else if (sortBy === 'priority') {
    const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
    filtered.sort((a,b)=> (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2));
  } else if (sortBy === 'category') {
    filtered.sort((a,b)=> (a.category || 'personal').localeCompare(b.category || 'personal'));
  }
  
  empty.style.display = filtered.length===0 ? 'block':'none';
  filtered.forEach(g => list.appendChild(card(g)));
}
// ===== Modals helpers =====
function showModal(id){ $(id).classList.add('show') }
function hideModal(id){ $(id).classList.remove('show') }

// Close all modals immediately on load
document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('show'));
// ===== Create goal =====
const fab = document.getElementById('fab');
const modalForm = document.getElementById('modalForm');
const goalForm = document.getElementById('goalForm');
function resetForm(){
  goalForm.reset();
  $('#f_type').value = 'financial';
  $('#f_template').value = '';
  updateFormVisibility();
  $('#formTitle').textContent = 'РќРѕРІР°СЏ С†РµР»СЊ';
}
function updateFormVisibility(){
  const t = $('#f_type').value;
  $$('[data-for]').forEach(el=> el.style.display = (el.getAttribute('data-for')===t? (el.tagName==='DIV'?'grid':'block') : 'none'));
}
$('#f_type').addEventListener('change', updateFormVisibility);
// Templates
$('#f_template').addEventListener('change', (e)=>{
  const v = e.target.value;
  if(!v) return;
  if(v==='tpl_money'){
    $('#f_type').value='financial'; updateFormVisibility();
    $('#f_name').value='РќР°РєРѕРїРёС‚СЊ 3 000 000 в‚Ѕ';
    $('#f_targetAmount').value=3000000; $('#f_currentAmount').value=1250000;
  }
  if(v==='tpl_pushups'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='100 РґРЅРµР№ РїРѕ 300 РѕС‚Р¶РёРјР°РЅРёР№';
    $('#f_days').value=100; $('#f_daysDone').value=0; $('#f_daily').value=300;
  }
  if(v==='tpl_read'){
    $('#f_type').value='reading'; updateFormVisibility();
    $('#f_name').value='РџСЂРѕС‡РёС‚Р°С‚СЊ 1 500 СЃС‚СЂР°РЅРёС†';
    $('#f_totalPages').value=1500; $('#f_readPages').value=0;
  }
  if(v==='tpl_learning'){
    $('#f_type').value='learning'; updateFormVisibility();
    $('#f_name').value='Р’С‹СѓС‡РёС‚СЊ Python: 100 С‡Р°СЃРѕРІ';
    $('#f_targetHours').value=100; $('#f_spentMin').value=0;
  }
  if(v==='tpl_run'){
    $('#f_type').value='counter'; updateFormVisibility();
    $('#f_name').value='РџСЂРѕР±РµР¶Р°С‚СЊ 500 РєРј';
    $('#f_totalCount').value=500; $('#f_currentCount').value=0;
  }
  if(v==='tpl_weight'){
    $('#f_type').value='weight'; updateFormVisibility();
    $('#f_name').value='РЎР±СЂРѕСЃРёС‚СЊ РІРµСЃ Рє Р»РµС‚Сѓ';
    $('#f_w_start').value=95; $('#f_w_target').value=80; $('#f_w_current').value=95;
  }
  if(v==='tpl_meditation'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='30 РґРЅРµР№ РјРµРґРёС‚Р°С†РёРё';
    $('#f_days').value=30; $('#f_daysDone').value=0; $('#f_daily').value=1;
    $('#f_category').value='spiritual';
  }
  if(v==='tpl_water'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='РџРёС‚СЊ 2 Р»РёС‚СЂР° РІРѕРґС‹ РІ РґРµРЅСЊ';
    $('#f_days').value=30; $('#f_daysDone').value=0; $('#f_daily').value=1;
    $('#f_category').value='health';
  }
  if(v==='tpl_sleep'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='РЎРїР°С‚СЊ 8 С‡Р°СЃРѕРІ РІ РґРµРЅСЊ';
    $('#f_days').value=30; $('#f_daysDone').value=0; $('#f_daily').value=1;
    $('#f_category').value='health';
  }
  if(v==='tpl_books'){
    $('#f_type').value='reading'; updateFormVisibility();
    $('#f_name').value='РџСЂРѕС‡РёС‚Р°С‚СЊ 12 РєРЅРёРі РІ РіРѕРґ';
    $('#f_totalPages').value=3600; $('#f_readPages').value=0;
    $('#f_category').value='education';
  }
  if(v==='tpl_language'){
    $('#f_type').value='learning'; updateFormVisibility();
    $('#f_name').value='РР·СѓС‡РёС‚СЊ Р°РЅРіР»РёР№СЃРєРёР№ СЏР·С‹Рє';
    $('#f_targetHours').value=200; $('#f_spentMin').value=0;
    $('#f_category').value='education';
  }
  if(v==='tpl_fitness'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='РўСЂРµРЅРёСЂРѕРІР°С‚СЊСЃСЏ 3 СЂР°Р·Р° РІ РЅРµРґРµР»СЋ';
    $('#f_days').value=90; $('#f_daysDone').value=0; $('#f_daily').value=1;
    $('#f_category').value='health';
  }
});
fab.addEventListener('click', ()=>{ resetForm(); showModal('#modalForm') });
$('#cancelForm').addEventListener('click', ()=> hideModal('#modalForm'));
goalForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const type = $('#f_type').value;
  const name = $('#f_name').value.trim();
  const description = $('#f_description').value.trim();
  const category = $('#f_category').value;
  const priority = $('#f_priority').value;
  const deadline = $('#f_deadline').value;
  if(!name) return;
  let g;
  if(type==='financial'){
    const targetAmount = parseInt($('#f_targetAmount').value||'0',10);
    const currentAmount = parseInt($('#f_currentAmount').value||'0',10);
    g = { id: uid(), type, name, description, category, priority, targetAmount, currentAmount, deadline, createdAt: Date.now(), completedAt: null };
  }
  if(type==='challenge'){
    const totalDays = parseInt($('#f_days').value||'1',10);
    const done = Math.min(totalDays, parseInt($('#f_daysDone').value||'0',10));
    const actionsPerDay = parseInt($('#f_daily').value||'0',10) || null;
    const completedDays = Array.from({length: done}, (_,i)=> i+1);
    g = { id: uid(), type, name, description, category, priority, totalDays, completedDays, actionsPerDay, deadline, createdAt: Date.now(), completedAt: null };
  }
  if(type==='counter'){
    const totalCount = parseInt($('#f_totalCount').value||'1',10);
    const currentCount = Math.min(totalCount, parseInt($('#f_currentCount').value||'0',10));
    g = { id: uid(), type, name, description, category, priority, totalCount, currentCount, deadline, createdAt: Date.now(), completedAt: null };
  }
  if(type==='reading'){
    const totalPages = parseInt($('#f_totalPages').value||'1',10);
    const readPages = Math.min(totalPages, parseInt($('#f_readPages').value||'0',10));
    g = { id: uid(), type, name, description, category, priority, totalPages, readPages, deadline, createdAt: Date.now(), completedAt: null };
  }
  if(type==='learning'){
    const targetHours = parseInt($('#f_targetHours').value||'1',10);
    const spentMin = parseInt($('#f_spentMin').value||'0',10);
    g = { id: uid(), type, name, description, category, priority, targetHours, spentMin, deadline, createdAt: Date.now(), completedAt: null };
  }
  if(type==='weight'){
    const w_start = parseFloat($('#f_w_start').value||'0');
    const w_target = parseFloat($('#f_w_target').value||'0');
    const w_current = parseFloat($('#f_w_current').value||w_start);
    g = { id: uid(), type, name, description, category, priority, w_start, w_target, w_current, deadline, createdAt: Date.now(), completedAt: null };
  }
  state.goals.push(g);
  save(); hideModal('#modalForm'); render();
  checkAchievements();
  updateStats();
});
// ===== Details / Edit =====
const modalDetails = document.getElementById('modalDetails');
const detailsContent = document.getElementById('detailsContent');
function openDetails(id){
  const g = state.goals.find(x=>x.id===id); if(!g) return;
  $('#detailsTitle').textContent = g.name;
  const percent = computeProgress(g);
  // Helper to finalize
  function finalize(){ if(computeProgress(g)>=100 && !g.completedAt){ g.completedAt = Date.now(); celebrate(); } save(); openDetails(g.id); render(); }
  if(g.type==='financial'){
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">Р¤РёРЅР°РЅСЃРѕРІР°СЏ С†РµР»СЊ</span>
        <span class="badge">РџСЂРѕРіСЂРµСЃСЃ: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      ${g.description ? `<div style="margin: 16px 0; padding: 16px; background: var(--card); border-radius: 12px; border-left: 4px solid var(--accent);">
        <strong>РћРїРёСЃР°РЅРёРµ:</strong><br>
        ${g.description}
      </div>` : ''}
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted ruble">${currency(g.currentAmount)} / ${currency(g.targetAmount)}</div>
        </div>
      </div>
      <label>РћР±РЅРѕРІРёС‚СЊ С‚РµРєСѓС‰СѓСЋ СЃСѓРјРјСѓ (в‚Ѕ)</label>
      <input id="inpMoney" type="number" min="0" step="100" value="${g.currentAmount}" />
      <div style="margin: 20px 0;">
        <label>РџРѕРґР·Р°РґР°С‡Рё</label>
        <div id="subtasksList" style="margin: 10px 0;">
          ${(g.subtasks || []).map((task, i) => `
            <div style="display: flex; align-items: center; gap: 8px; margin: 8px 0; padding: 8px; background: var(--card); border-radius: 8px;">
              <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleSubtask('${g.id}', ${i})" />
              <span style="flex: 1; ${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.text}</span>
              <button onclick="removeSubtask('${g.id}', ${i})" style="background: var(--danger); color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer;">Г—</button>
            </div>
          `).join('')}
        </div>
        <div style="display: flex; gap: 8px;">
          <input id="newSubtask" placeholder="Р”РѕР±Р°РІРёС‚СЊ РїРѕРґР·Р°РґР°С‡Сѓ..." style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,.15); background: var(--card); color: var(--text);" />
          <button onclick="addSubtask('${g.id}')" style="background: var(--accent); color: white; border: none; border-radius: 8px; padding: 8px 16px; cursor: pointer;">Р”РѕР±Р°РІРёС‚СЊ</button>
        </div>
      </div>
      <div class="actions">
        <button class="btn danger" id="btnDelete">РЈРґР°Р»РёС‚СЊ</button>
        <button class="btn" id="btnDuplicate">Р”СѓР±Р»РёСЂРѕРІР°С‚СЊ</button>
        <button class="btn" id="btnArchive">РђСЂС…РёРІРёСЂРѕРІР°С‚СЊ</button>
        <button class="btn" id="btnShare">РџРѕРґРµР»РёС‚СЊСЃСЏ</button>
        <button class="btn" id="btnSaveMoney">РЎРѕС…СЂР°РЅРёС‚СЊ</button>
        <button class="btn primary" id="btnAddMoney">+ Р”РѕР±Р°РІРёС‚СЊ 1 000 в‚Ѕ</button>
      </div>
      <div id="congrats" class="big-congrats">рџЋ‰ Р¦РµР»СЊ РґРѕСЃС‚РёРіРЅСѓС‚Р°! Р’РµР»РёРєРѕР»РµРїРЅРѕ!</div>`;
    $('#btnSaveMoney').onclick = ()=>{ g.currentAmount = Math.max(0, parseInt($('#inpMoney').value||'0',10)); finalize(); };
    $('#btnAddMoney').onclick = ()=>{ g.currentAmount = (g.currentAmount|0) + 1000; finalize(); };
    $('#btnDuplicate').onclick = ()=>{
      const duplicate = {...g, id: uid(), name: g.name + ' (РєРѕРїРёСЏ)', createdAt: Date.now(), completedAt: null};
      if(duplicate.type === 'financial') duplicate.currentAmount = 0;
      if(duplicate.type === 'challenge') duplicate.completedDays = [];
      if(duplicate.type === 'counter') duplicate.currentCount = 0;
      if(duplicate.type === 'reading') duplicate.readPages = 0;
      if(duplicate.type === 'learning') duplicate.spentMin = 0;
      if(duplicate.type === 'weight') duplicate.w_current = duplicate.w_start;
      state.goals.push(duplicate);
      save(); hideModal('#modalDetails'); render();
    };
    $('#btnArchive').onclick = ()=>{ 
      g.archived = true; 
      save(); 
      hideModal('#modalDetails'); 
      render(); 
    };
    $('#btnShare').onclick = ()=>{
      const shareText = `рџЋЇ Р”РѕСЃС‚РёР¶РµРЅРёРµ РІ GoalTrack Pro!\n\nР¦РµР»СЊ: ${g.name}\nРџСЂРѕРіСЂРµСЃСЃ: ${percent}%\n\n${g.description ? `РћРїРёСЃР°РЅРёРµ: ${g.description}\n\n` : ''}РџСЂРѕРґРѕР»Р¶Р°СЋ СЂР°Р±РѕС‚Р°С‚СЊ РЅР°Рґ СЃРІРѕРёРјРё С†РµР»СЏРјРё! рџ’Є`;
      
      if (navigator.share) {
        navigator.share({
          title: 'РњРѕРµ РґРѕСЃС‚РёР¶РµРЅРёРµ РІ GoalTrack Pro',
          text: shareText,
          url: window.location.href
        });
      } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
          alert('РўРµРєСЃС‚ СЃРєРѕРїРёСЂРѕРІР°РЅ РІ Р±СѓС„РµСЂ РѕР±РјРµРЅР°!');
        });
      }
    };
    $('#btnDelete').onclick = ()=>{ if(confirm('РЈРґР°Р»РёС‚СЊ С†РµР»СЊ?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
  if(g.type==='challenge'){
    const cells = Array.from({length: g.totalDays}, (_,i)=>{
      const day = i+1; const done = g.completedDays.includes(day);
      return `<div class="cell ${done?'done':''}" data-day="${day}">${day}</div>`;
    }).join('');
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">Р§РµР»Р»РµРЅРґР¶${g.actionsPerDay?` вЂў ${g.actionsPerDay}/РґРµРЅСЊ`:''}</span>
        <span class="badge">РџСЂРѕРіСЂРµСЃСЃ: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${g.completedDays.length} РёР· ${g.totalDays} РґРЅРµР№ РІС‹РїРѕР»РЅРµРЅРѕ</div>
        </div>
      </div>
      <label>РћС‚РјРµС‡Р°Р№С‚Рµ РІС‹РїРѕР»РЅРµРЅРЅС‹Рµ РґРЅРё</label>
      <div class="calendar" id="calendar">${cells}</div>
      <div class="actions">
        <button class="btn danger" id="btnDelete">РЈРґР°Р»РёС‚СЊ</button>
        <button class="btn" id="btnReset">РЎР±СЂРѕСЃРёС‚СЊ РїСЂРѕРіСЂРµСЃСЃ</button>
      </div>
      <div id="congrats" class="big-congrats">рџЋ‰ Р§РµР»Р»РµРЅРґР¶ Р·Р°РІРµСЂС€РµРЅ! РњРѕС‰РЅРѕ!</div>`;
    $('#calendar').onclick = (e)=>{
      const cell = e.target.closest('.cell'); if(!cell) return;
      const d = parseInt(cell.dataset.day,10);
      const idx = g.completedDays.indexOf(d);
      if(idx>-1){ g.completedDays.splice(idx,1) } else { g.completedDays.push(d) }
      finalize();
    };
    $('#btnReset').onclick = ()=>{ if(confirm('РЎР±СЂРѕСЃРёС‚СЊ РїСЂРѕРіСЂРµСЃСЃ?')){ g.completedDays = []; g.completedAt=null; finalize(); } };
    $('#btnDelete').onclick = ()=>{ if(confirm('РЈРґР°Р»РёС‚СЊ С†РµР»СЊ?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
  if(g.type==='counter'){
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">РЎС‡С‘С‚С‡РёРє</span>
        <span class="badge">РџСЂРѕРіСЂРµСЃСЃ: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${g.currentCount} / ${g.totalCount}</div>
        </div>
      </div>
      <label>РўРµРєСѓС‰РµРµ Р·РЅР°С‡РµРЅРёРµ</label>
      <input id="inpCnt" type="number" min="0" step="1" value="${g.currentCount}" />
      <div class="actions">
        <button class="btn danger" id="btnDelete">РЈРґР°Р»РёС‚СЊ</button>
        <button class="btn" id="btnSaveCnt">РЎРѕС…СЂР°РЅРёС‚СЊ</button>
        <button class="btn primary" id="btnIncCnt">+ Р”РѕР±Р°РІРёС‚СЊ 1</button>
      </div>
      <div id="congrats" class="big-congrats">рџЋ‰ Р¦РµР»СЊ РґРѕСЃС‚РёРіРЅСѓС‚Р°!</div>`;
    $('#btnSaveCnt').onclick = ()=>{ g.currentCount = Math.min(g.totalCount, Math.max(0, parseInt($('#inpCnt').value||'0',10))); finalize(); };
    $('#btnIncCnt').onclick = ()=>{ g.currentCount = Math.min(g.totalCount, (g.currentCount|0) + 1); finalize(); };
    $('#btnDelete').onclick = ()=>{ if(confirm('РЈРґР°Р»РёС‚СЊ С†РµР»СЊ?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
  if(g.type==='reading'){
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">Р§С‚РµРЅРёРµ</span>
        <span class="badge">РџСЂРѕРіСЂРµСЃСЃ: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${g.readPages} / ${g.totalPages} СЃС‚СЂ.</div>
        </div>
      </div>
      <label>РџСЂРѕС‡РёС‚Р°РЅРѕ СЃС‚СЂР°РЅРёС†</label>
      <input id="inpRead" type="number" min="0" step="1" value="${g.readPages}" />
      <div class="actions">
        <button class="btn danger" id="btnDelete">РЈРґР°Р»РёС‚СЊ</button>
        <button class="btn" id="btnSaveRead">РЎРѕС…СЂР°РЅРёС‚СЊ</button>
        <button class="btn primary" id="btnPlus10">+10 СЃС‚СЂ.</button>
      </div>
      <div id="congrats" class="big-congrats">рџЋ‰ РџСЂРѕС‡РёС‚Р°РЅРѕ РІСЃС‘! Р‘СЂР°РІРѕ!</div>`;
    $('#btnSaveRead').onclick = ()=>{ g.readPages = Math.min(g.totalPages, Math.max(0, parseInt($('#inpRead').value||'0',10))); finalize(); };
    $('#btnPlus10').onclick = ()=>{ g.readPages = Math.min(g.totalPages, (g.readPages|0) + 10); finalize(); };
    $('#btnDelete').onclick = ()=>{ if(confirm('РЈРґР°Р»РёС‚СЊ С†РµР»СЊ?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
  if(g.type==='learning'){
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">РЈС‡С‘Р±Р°</span>
        <span class="badge">РџСЂРѕРіСЂРµСЃСЃ: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${(g.spentMin/60).toFixed(1)} / ${g.targetHours} С‡</div>
        </div>
      </div>
      <label>Р”РѕР±Р°РІРёС‚СЊ (РјРёРЅСѓС‚)</label>
      <input id="inpMin" type="number" min="0" step="10" value="30" />
      <div class="actions">
        <button class="btn danger" id="btnDelete">РЈРґР°Р»РёС‚СЊ</button>
        <button class="btn" id="btnAddMin">Р”РѕР±Р°РІРёС‚СЊ</button>
      </div>
      <div id="congrats" class="big-congrats">рџЋ‰ РЈС‡РµР±РЅР°СЏ С†РµР»СЊ РґРѕСЃС‚РёРіРЅСѓС‚Р°!</div>`;
    $('#btnAddMin').onclick = ()=>{ g.spentMin = Math.min(g.targetHours*60, (g.spentMin|0) + Math.max(0, parseInt($('#inpMin').value||'0',10))); finalize(); };
    $('#btnDelete').onclick = ()=>{ if(confirm('РЈРґР°Р»РёС‚СЊ С†РµР»СЊ?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
  if(g.type==='weight'){
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">Р’РµСЃ</span>
        <span class="badge">РџСЂРѕРіСЂРµСЃСЃ: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${g.w_current} в†’ ${g.w_target} РєРі (Р±С‹Р»Рѕ ${g.w_start})</div>
        </div>
      </div>
      <label>РўРµРєСѓС‰РёР№ РІРµСЃ (РєРі)</label>
      <input id="inpW" type="number" min="1" step="0.1" value="${g.w_current}" />
      <div class="actions">
        <button class="btn danger" id="btnDelete">РЈРґР°Р»РёС‚СЊ</button>
        <button class="btn" id="btnSaveW">РЎРѕС…СЂР°РЅРёС‚СЊ</button>
      </div>
      <div id="congrats" class="big-congrats">рџЋ‰ Р¦РµР»СЊ РїРѕ РІРµСЃСѓ РґРѕСЃС‚РёРіРЅСѓС‚Р°!</div>`;
    $('#btnSaveW').onclick = ()=>{ g.w_current = parseFloat($('#inpW').value||g.w_current); finalize(); };
    $('#btnDelete').onclick = ()=>{ if(confirm('РЈРґР°Р»РёС‚СЊ С†РµР»СЊ?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
}
// Celebrate
function celebrate(){
  launchConfetti();
  if(navigator.vibrate) try{ navigator.vibrate([30, 30, 30]); }catch(err){}
}
// Close on backdrop click
[modalForm, modalDetails].forEach(m=> m.addEventListener('click', (e)=>{ if(e.target===m) hideModal('#'+m.id) }));
// Search and filtering
$('#search').addEventListener('input', (e)=>{ state.filter = e.target.value; render(); });
$('#sortBy').addEventListener('change', ()=>{ render(); });
$('#filterBy')?.addEventListener('change', () => render());
// Export/Import functions
function exportData() {
  const data = {
    goals: state.goals,
    achievements: state.achievements,
    stats: state.stats,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `goaltrack_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.goals && Array.isArray(data.goals)) {
          if (confirm('РРјРїРѕСЂС‚ Р·Р°РјРµРЅРёС‚ РІСЃРµ С‚РµРєСѓС‰РёРµ РґР°РЅРЅС‹Рµ. РџСЂРѕРґРѕР»Р¶РёС‚СЊ?')) {
            state.goals = data.goals;
            state.achievements = data.achievements || [];
            state.stats = data.stats || { totalGoals: 0, completedGoals: 0, totalDays: 0, streak: 0 };
            save();
            saveAchievements();
            saveStats();
            render();
            updateStats();
            checkAchievements();
            alert('Р”Р°РЅРЅС‹Рµ СѓСЃРїРµС€РЅРѕ РёРјРїРѕСЂС‚РёСЂРѕРІР°РЅС‹!');
          }
        } else {
          alert('РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ С„Р°Р№Р»Р°');
        }
      } catch (error) {
        alert('РћС€РёР±РєР° РїСЂРё С‡С‚РµРЅРёРё С„Р°Р№Р»Р°: ' + error.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}
// Statistics and Achievements buttons
$('#statsBtn').addEventListener('click', ()=>{
  updateStats();
  renderStats();
  showModal('#modalStats');
});
$('#achievementsBtn').addEventListener('click', ()=>{
  renderAchievements();
  showModal('#modalAchievements');
});
$('#exportBtn').addEventListener('click', exportData);
$('#importBtn').addEventListener('click', importData);

// Settings
$('#settingsBtn').addEventListener('click', ()=>{
  // Load current settings
  $('#theme').value = state.settings.theme;
  $('#language').value = state.settings.language;
  showModal('#modalSettings');
});

$('#saveSettings').addEventListener('click', ()=>{
  state.settings.theme = $('#theme').value;
  state.settings.language = $('#language').value;
  saveSettings();
  hideModal('#modalSettings');
  
  // Apply theme
  if (state.settings.theme === 'light') {
    document.body.classList.add('light-theme');
  } else if (state.settings.theme === 'dark') {
    document.body.classList.remove('light-theme');
  } else {
    // Auto theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }
  
  // Update language
  updateLanguage();
});
$('#cancelSettings').addEventListener('click', ()=>{
  hideModal('#modalSettings');
});
// Close modals on backdrop click
[modalForm, modalDetails, $('#modalStats'), $('#modalAchievements'), $('#modalSettings')].forEach(m=> {
  if(m) m.addEventListener('click', (e)=>{ if(e.target===m) hideModal('#'+m.id) });
});
// ===== Subtasks System =====
function addSubtask(goalId) {
  const input = document.getElementById('newSubtask');
  const text = input.value.trim();
  if (!text) return;
  
  const goal = state.goals.find(g => g.id === goalId);
  if (!goal) return;
  
  if (!goal.subtasks) goal.subtasks = [];
  goal.subtasks.push({ text, completed: false });
  input.value = '';
  save();
  openDetails(goalId);
}

function toggleSubtask(goalId, index) {
  const goal = state.goals.find(g => g.id === goalId);
  if (!goal || !goal.subtasks) return;
  
  goal.subtasks[index].completed = !goal.subtasks[index].completed;
  save();
  openDetails(goalId);
}

function removeSubtask(goalId, index) {
  const goal = state.goals.find(g => g.id === goalId);
  if (!goal || !goal.subtasks) return;
  
  goal.subtasks.splice(index, 1);
  save();
  openDetails(goalId);
}
// ===== Motivational Quotes System =====
function showMotivationalQuote() {
  const quoteElement = document.getElementById('motivationalQuote');
  if (quoteElement) {
    const quotes = t('motivationalQuotes');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = `"${randomQuote}"`;
  }
}
// Initial render
render();
updateStats();
checkAchievements();
showMotivationalQuote();
updateLanguage();
















