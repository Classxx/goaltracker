
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

function loadSettings(){ try{ return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { notificationsEnabled: true, reminderTime: '09:00', theme: 'dark', language: 'ru' } }catch(e){ return { notificationsEnabled: true, reminderTime: '09:00', theme: 'dark', language: 'ru' } } }
function saveSettings(){ localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings)); }
function pct(n){ return Math.max(0, Math.min(100, Math.round(n))) }
function currency(n){ return `${fmt.format(Math.max(0, n|0))} ₽` }

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
    appSubtitle: 'AI • Аналитика • Геймификация',
    searchPlaceholder: '🔍 Поиск целей…',
    newGoal: 'Новая цель',
    goalName: 'Название',
    goalNamePlaceholder: 'Например: Накопить 3 000 000 ₽',
    description: 'Описание (необязательно)',
    descriptionPlaceholder: 'Добавьте описание цели, мотивацию или дополнительные детали...',
    goalType: 'Тип цели',
    category: 'Категория',
    priority: 'Приоритет',
    deadline: 'Дедлайн (необязательно)',
    reminder: 'Напоминание за',
    templates: 'Быстрые шаблоны',
    noTemplates: '— Не использовать —',
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    duplicate: 'Дублировать',
    archive: 'Архивировать',
    share: 'Поделиться',
    stats: 'Статистика',
    achievements: 'Достижения',
    export: 'Экспорт данных',
    import: 'Импорт данных',
    settings: 'Настройки',
    emptyState: 'Пока нет целей. Нажмите «+», чтобы добавить первую цель.',
    motivationalQuotes: [
      "Не важно, как медленно ты идёшь — главное, не останавливаться. — Конфуций",
      "Кто никогда не совершал ошибок, тот никогда не пробовал ничего нового. — Альберт Эйнштейн",
      "Вы никогда не пересечёте океан, если не наберётесь мужества потерять берег из виду. — Кристофер Колумб",
      "Лучший способ начать — перестать говорить и начать делать. — Марк Твен",
      "Не бойтесь идти медленно. бойтесь только стоять на месте. — китайская пословица",
      "Что бы ты ни мог сделать или мечтаешь — начни. Смелость обладает гениальностью, силой и волшебством. — Иоганн Вольфганг фон Гёте",
      "Неудача — это возможность начать заново, но уже более разумно. — Генри Форд",
      "Если хочешь жить жизнью — перестань ждать одобрения. — Уилл Смит",
      "Тот, кто говорит, что это невозможно, не должен мешать тому, кто это делает. — Китайская пословица",
      "Секрет продвижения вперёд — начать. — Марк Твен",
      "Успех — это идти от неудачи к неудаче, не теряя энтузиазма. — Уинстон Черчилль",
      "Становитесь неудачником быстрее и чаще — это путь к инновациям. — Джейсон Фрид",
      "Необходимость — мать изобретения. — Платон",
      "Ваша работа займёт большую часть вашей жизни — и единственный способ быть по-настоящему удовлетворённым — делать то, что, по вашему мнению, великое дело. — Стив Джобс",
      "Будущее принадлежит тем, кто верит в красоту своих мечтаний. — Элеонора Рузвельт",
      "Мы становимся тем, о чём думаем большую часть времени. — Ральф Уолдо Эмерсон",
      "Сначала они тебя игнорируют, потом смеются над тобой, затем борются с тобой, потом ты побеждаешь. — Махатма Ганди",
      "Не ограничивай себя. Многие люди ограничивают себя тем, что считают возможным. — Мэри Кей Аш",
      "Если ты ставишь цель, которую не можешь достичь прямо сейчас, это мотивирует тебя развиваться. — Джерри Локер",
      "Не спрашивай, что мир может сделать для тебя. Спроси, что ты можешь сделать для мира. — Джон Ф. Кеннеди",
      "Самое большое удовольствие в жизни — делать то, что, по мнению других, ты не сможешь. — Уолтер Бэджхот",
      "Не тратьте время на объяснения. Люди слышат только то, что хотят слышать. — Пауло Коэльо",
      "Не важно, сколько раз вас сбивают — важно, сколько раз вы поднимаетесь. — Винс Ломбарди",
      "То, что не убивает нас, делает нас сильнее. — Фридрих Ницше",
      "Живи так, как будто ты умрёшь завтра. Учись так, как будто ты будешь жить вечно. — Махатма Ганди",
      "Становись лучшей версией себя, а не копией кого-то другого. — Джуди Гарленд",
      "Мысли глобально, действуй локально. — Рене Дебре",
      "Только те, кто рискуют зайти слишком далеко, узнают, как далеко можно зайти. — Т. С. Элиот",
      "Неудача не поражение. Поражение — это отказ от попыток. — Джон Вуден",
      "Мечты сбываются у тех, кто в них верит. — Уолт Дисней",
      "Инвестируйте в себя. Никто другой этого не сделает. — Роуз Ла Рош",
      "Когда ты знаешь, чего хочешь, весь мир способствет тому, чтобы ты это получил. — Пауло Коэльо",
      "Не откладывай на завтра то, что можешь сделать сегодня. — Бенджамин Франклин",
      "Ваше время ограничено — не тратьте его, живя чужой жизнью. — Стив Джобс",
      "Счастье не цель — это побочный эффект. — Элеонор Рузвельт",
      "Каждое достижение начинается с решения попробовать. — Гейл Диббс",
      "Будьте изменением, которое вы хотите видеть в мире. — Махатма Ганди",
      "Самый темный час — перед рассветом. — Томас Фуллер",
      "Сила не в том, чтобы никогда не падать, а в том, чтобы каждый раз подниматься. — Нельсон Мандела",
      "Не бойтесь совершенства — вы никогда его не достигнете. — Сальвадор Дали",
      "Невозможно осуществить всё сразу, но можно сделать следующий шаг. — Пауло Коэльо",
      "Лидер — это не тот, кто ведёт, а тот, кому другие хотят следовать. — Джон М. Максвелл",
      "Истинный успех — это когда вы живёте по собственным ценностям. — Опра Уинфри",
      "Работайте так, будто вы не нуждаетесь в деньгах. Любите так, будто вас никогда не обидят. Танцуйте, как будто никто не смотрит. — Марк Твен",
      "Не надо ждать идеального момента. Возьмите момент и сделайте его идеальным. — Зиг Зиглар",
      "Секрет перемен — сосредоточить всю энергию не на борьбе со старым, а на строительстве нового. — Сократ",
      "Когда цели велики, недостатков не видно. — Уильям Шекспир",
      "Зная, что жизнь скоротечна — живи сегодня. — Сенека",
      "Величайшее богатство — жить по своим условиям. — Клиффорд Столл",
      "Чтобы что-то добиться, нужно верить в невозможное. — Ник Вуйчич",
      "Никогда не поздно быть тем, кем вы могли бы быть. — Джордж Элиот",
      "Трудности закаляют характер. — Сэмюэл Смайлз",
      "Неудача — просто опыт. — Генри Форд",
      "Настоящая мужественность — преодолеть себя. — Фридрих Шиллер",
      "Сила в постоянстве. — Марк Аврелий",
      "Наш величайший страх — не быть недостоинными, а быть действительно великими. — Марианна Уильямсон",
      "На пути к цели всегда будут препятствия — но они проверяют твою решимость. — Пауло Коэльо",
      "Верь в то, что ты можешь — и путь найдётся. — Теодор Рузвельт",
      "Невозможно изменить направление ветра, но можно настроить паруса. — Долли Партон",
      "Судите себя по тому, что вы делаете, а не по тому, что намеревайтесь делать. — Леонардо да Винчи",
      "Когда ты начинаешь делать то, что можешь — ты удивишься, на что способен. — Луиза Хей",
      "Ограничения существуют лишь в воздухе твоего разума. — Наполеон Хилл",
      "Мир ломается не для слабых. — Симона де Бовуар",
      "Где много любви, там много силы. — Махатма Ганди",
      "Сбавь темп и увидишь — лучшая часть начинается тихо. — Ралф Уолдо Эмерсон",
      "Чтобы подняться выше — откажись от балласта. — Ричард Брэнсон",
      "Каждый день — новая возможность. — Карл Сэндберг",
      "Неудача — первый шаг к успеху, если ты учишься. — Уильям Делберт Гэннон",
      "Если хочешь масштабного — начни с малого. — Лао-цзы",
      "Сделай сейчас то, о чём потом не пожалеешь. — Лу Холдс",
      "Нельзя добиться успеха, если ты не готов терпеть поражения. — Винс Ломбарди",
      "Сила характера проявляется в преодолении трудностей. — Джон Максвелл",
      "Не умаляй свой путь — он весь твой. — Фридрих Ницше",
      "Действие — мост между мечтой и результатом. — Уилл Смит",
      "Верь в себя, даже если никто другой не верит. — Рональд Рейган",
      "Чем труднее битва, тем слаще победа. — Герман Мелвилл",
      "Чтобы достичь великих целей, нужно начать с малого. — Антуан де Сент-Экзюпери",
      "Тот, кто хочет идти — найдет путь. — Публилий Сир",
      "Люби труд — и он полюбит тебя. — Сенека"
    ]

  },
  en: {
    appTitle: 'GoalTrack Pro',
    appSubtitle: 'AI • Analytics • Gamification',
    searchPlaceholder: '🔍 Search goals…',
    newGoal: 'New Goal',
    goalName: 'Name',
    goalNamePlaceholder: 'e.g.: Save $50,000',
    description: 'Description (optional)',
    descriptionPlaceholder: 'Add goal description, motivation or additional details...',
    goalType: 'Goal Type',
    category: 'Category',
    priority: 'Priority',
    deadline: 'Deadline (optional)',
    reminder: 'Remind me',
    templates: 'Quick Templates',
    noTemplates: '— Don\'t use —',
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
      "It does not matter how slowly you go as long as you do not stop. — Confucius",
      "Anyone who has never made a mistake has never tried anything new. — Albert Einstein",
      "You can never cross the ocean until you have the courage to lose sight of the shore. — Christopher Columbus",
      "The secret of getting ahead is getting started. — Mark Twain",
      "Do not be afraid of going slowly; be afraid only of standing still. — Chinese proverb",
      "Whatever you can do or dream you can, begin it. Boldness has genius, power, and magic in it. — Johann Wolfgang von Goethe",
      "Failure is simply the opportunity to begin again, this time more intelligently. — Henry Ford",
      "If you want to live your life — stop waiting for approval. — Will Smith",
      "He who says it cannot be done should not interrupt the one who is doing it. — Chinese proverb",
      "The secret of getting ahead is getting started. — Mark Twain",
      "Success is going from failure to failure without losing enthusiasm. — Winston Churchill",
      "Become a failure faster and more often — that’s the path to innovation. — Jason Fried",
      "Necessity is the mother of invention. — Plato",
      "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. — Steve Jobs",
      "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
      "We become what we think about most of the time. — Ralph Waldo Emerson",
      "First they ignore you, then they laugh at you, then they fight you, then you win. — Mahatma Gandhi",
      "Don’t limit yourself. Many people limit themselves to what they think they can do. — Mary Kay Ash",
      "If you set a goal that you can’t reach yet, it will motivate you to grow. — Gerry Locker",
      "Ask not what your country can do for you – ask what you can do for your country. — John F. Kennedy",
      "The greatest pleasure in life is doing what people say you cannot do. — Walter Bagehot",
      "Don’t waste your time on explanations; people only hear what they want to hear. — Paulo Coelho",
      "It’s not whether you get knocked down; it’s whether you get up. — Vince Lombardi",
      "That which does not kill us makes us stronger. — Friedrich Nietzsche",
      "Live as if you were to die tomorrow. Learn as if you were to live forever. — Mahatma Gandhi",
      "Always be a first-rate version of yourself, instead of a second-rate version of somebody else. — Judy Garland",
      "Think globally, act locally. — René Dubos",
      "Only those who risk going too far can possibly find out how far one can go. — T. S. Eliot",
      "Failure is not fatal. Failure is refusing to try again. — John Wooden",
      "All our dreams can come true if we have the courage to pursue them. — Walt Disney",
      "Invest in yourself. No one else will do it for you. — Rose La Roche",
      "When you want something, all the universe conspires in helping you to achieve it. — Paulo Coelho",
      "Never put off till tomorrow what you can do today. — Benjamin Franklin",
      "Your time is limited, so don’t waste it living someone else’s life. — Steve Jobs",
      "Happiness is not a goal; it’s a by-product. — Eleanor Roosevelt",
      "Every accomplishment starts with the decision to try. — Gail Devers",
      "Be the change that you wish to see in the world. — Mahatma Gandhi",
      "The darkest hour is just before the dawn. — Thomas Fuller",
      "The greatest glory in living lies not in never falling, but in rising every time we fall. — Nelson Mandela",
      "Don’t be afraid of perfection – you’ll never reach it. — Salvador Dalí",
      "You can’t do everything at once, but you can do the next thing. — Paulo Coelho",
      "A leader is one who knows the way, goes the way, and shows the way. — John C. Maxwell",
      "True success is when you live according to your own values. — Oprah Winfrey",
      "Work like you don’t need the money. Love like you’ve never been hurt. Dance like nobody’s watching. — Mark Twain",
      "Don’t wait for the perfect moment. Take the moment and make it perfect. — Zig Ziglar",
      "The secret of change is to focus all your energy not on fighting the old, but on building the new. — Socrates",
      "When the goal is great, flaws are invisible. — William Shakespeare",
      "Knowing life is short – live today. — Seneca",
      "The greatest wealth is to live according to your own terms. — Clifford Stoll",
      "To achieve anything, you must believe in the impossible. — Nick Vujicic",
      "It’s never too late to be what you might have been. — George Eliot",
      "Difficulties strengthen the mind, as labor does the body. — Samuel Smiles",
      "Failure is simply experience. — Henry Ford",
      "True manhood is conquering oneself. — Friedrich Schiller",
      "Strength lies in consistency. — Marcus Aurelius",
      "Our deepest fear is not that we are inadequate, but that we are powerful beyond measure. — Marianne Williamson",
      "On the way to your goal there will always be obstacles — they test your determination. — Paulo Coelho",
      "Believe you can and you’re halfway there. — Theodore Roosevelt",
      "We cannot direct the wind, but we can adjust the sails. — Dolly Parton",
      "Judge yourself by what you do, not by what you intend to do. — Leonardo da Vinci",
      "When you start doing what you can, you’ll be amazed at what you can achieve. — Louise Hay",
      "Limitations exist only in the air of your mind. — Napoleon Hill",
      "The world is not made for the weak. — Simone de Beauvoir",
      "Where there is much love, there is much strength. — Mahatma Gandhi",
      "Slow down and you’ll see — the best part begins quietly. — Ralph Waldo Emerson",
      "To rise higher, you must let go of the ballast. — Richard Branson",
      "Every day is a new opportunity. — Carl Sandburg",
      "Failure is the first step to success if you learn from it. — William Delbert Gann",
      "If you want to achieve something big, start small. — Lao Tzu",
      "Do it now so you won’t regret it later. — Lou Holtz",
      "You can’t achieve success if you’re not willing to fail. — Vince Lombardi",
      "Character is built through adversity. — John Maxwell",
      "Do not diminish your own path — it’s yours alone. — Friedrich Nietzsche",
      "Action is the bridge between dreams and results. — Will Smith",
      "Believe in yourself even if no one else does. — Ronald Reagan",
      "The harder the battle, the sweeter the victory. — Herman Melville",
      "To accomplish great things, we must begin with small ones. — Antoine de Saint-Exupéry",
      "He who wishes to travel far will find a way. — Publilius Syrus",
      "Love work, and it will love you back. — Seneca"
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
    'f_reminder': t('reminder'),
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
  { id: 'first_goal', title: 'Первые шаги', description: 'Создайте первую цель', icon: '🎯', unlocked: false },
  { id: 'first_complete', title: 'Победитель', description: 'Завершите первую цель', icon: '🏆', unlocked: false },
  { id: 'streak_7', title: 'Неделя силы', description: '7 дней подряд активность', icon: '🔥', unlocked: false },
  { id: 'streak_30', title: 'Месяц дисциплины', description: '30 дней подряд активность', icon: '💪', unlocked: false },
  { id: 'goals_10', title: 'Целеустремленный', description: 'Создайте 10 целей', icon: '📈', unlocked: false },
  { id: 'goals_50', title: 'Мастер целей', description: 'Создайте 50 целей', icon: '👑', unlocked: false },
  { id: 'complete_5', title: 'Достигатор', description: 'Завершите 5 целей', icon: '⭐', unlocked: false },
  { id: 'complete_25', title: 'Легенда', description: 'Завершите 25 целей', icon: '🌟', unlocked: false },
  { id: 'money_million', title: 'Миллионер', description: 'Накопите 1 000 000 ₽', icon: '💰', unlocked: false },
  { id: 'challenge_100', title: 'Стойкий', description: 'Завершите 100-дневный челлендж', icon: '💎', unlocked: false }
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
      Продолжить
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
    'personal': 'Личное развитие',
    'health': 'Здоровье',
    'career': 'Карьера',
    'finance': 'Финансы',
    'education': 'Образование',
    'hobby': 'Хобби',
    'social': 'Социальное',
    'spiritual': 'Духовное'
  };
  
  statsGrid.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${state.stats.totalGoals}</div>
      <div class="stat-label">Всего целей</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${state.stats.completedGoals}</div>
      <div class="stat-label">Завершено</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${state.stats.completionRate}%</div>
      <div class="stat-label">Успешность</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${state.stats.streak}</div>
      <div class="stat-label">Дней подряд</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${Object.keys(categoryStats).length}</div>
      <div class="stat-label">Категорий</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${Object.keys(typeStats).length}</div>
      <div class="stat-label">Типов целей</div>
    </div>
    <div class="stat-card" style="grid-column: 1 / -1;">
      <h4 style="margin: 0 0 16px 0; color: var(--text);">📊 Аналитика по категориям</h4>
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
  if(g.type==='financial'){ topText = `${currency(g.currentAmount)} / ${currency(g.targetAmount)}`; typeText = 'Финансовая цель'; }
  if(g.type==='challenge'){ topText = `${g.completedDays.length} / ${g.totalDays} дней`; typeText = g.actionsPerDay?`Челлендж · ${g.actionsPerDay}/день`:'Челлендж'; }
  if(g.type==='counter'){ topText = `${g.currentCount} / ${g.totalCount}`; typeText = 'Счётчик'; }
  if(g.type==='reading'){ topText = `${g.readPages} / ${g.totalPages} стр.`; typeText = 'Чтение'; }
  if(g.type==='learning'){ topText = `${(g.spentMin/60).toFixed(1)} / ${g.targetHours} ч`; typeText = 'Учёба'; }
  if(g.type==='weight'){ topText = `${g.w_current} → ${g.w_target} кг (было ${g.w_start})`; typeText = 'Вес'; }
  const done = percent>=100;
  
  // Category mapping
  const categoryMap = {
    'personal': 'Личное развитие',
    'health': 'Здоровье', 
    'career': 'Карьера',
    'finance': 'Финансы',
    'education': 'Образование',
    'hobby': 'Хобби',
    'social': 'Социальное',
    'spiritual': 'Духовное'
  };
  
  const priorityMap = {
    'low': 'Низкий',
    'medium': 'Средний', 
    'high': 'Высокий',
    'critical': 'Критический'
  };
  
  const el = document.createElement('article');
  el.className = 'card'+(done?' completed':'');
  el.innerHTML = `
    <div class="card-header">
      <div class="meta">
            <span class="category-badge category-${g.category || 'personal'}">
                ${categoryMap[g.category] || 'Личное развитие'}
            </span>
            <span class="dot"></span>
            <span class="label">
                ${typeText}${g.daily ? ` • ${g.daily}/день` : ''}
            </span>
        </div>
    </div>
    <h3 class="name">${g.name}</h3>
    ${g.deadline ? `<div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
      📅 Дедлайн: ${new Date(g.deadline).toLocaleDateString('ru-RU')}
      ${new Date(g.deadline) < new Date() ? ' ⚠️ Просрочено' : ''}
    </div>` : ''}
    ${g.subtasks && g.subtasks.length > 0 ? `<div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
      📋 Подзадачи: ${g.subtasks.filter(t => t.completed).length}/${g.subtasks.length} выполнено
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
  $('#formTitle').textContent = 'Новая цель';
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
    $('#f_name').value='Накопить 3 000 000 ₽';
    $('#f_targetAmount').value=3000000; $('#f_currentAmount').value=1250000;
  }
  if(v==='tpl_pushups'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='100 дней по 300 отжиманий';
    $('#f_days').value=100; $('#f_daysDone').value=0; $('#f_daily').value=300;
  }
  if(v==='tpl_read'){
    $('#f_type').value='reading'; updateFormVisibility();
    $('#f_name').value='Прочитать 1 500 страниц';
    $('#f_totalPages').value=1500; $('#f_readPages').value=0;
  }
  if(v==='tpl_learning'){
    $('#f_type').value='learning'; updateFormVisibility();
    $('#f_name').value='Выучить Python: 100 часов';
    $('#f_targetHours').value=100; $('#f_spentMin').value=0;
  }
  if(v==='tpl_run'){
    $('#f_type').value='counter'; updateFormVisibility();
    $('#f_name').value='Пробежать 500 км';
    $('#f_totalCount').value=500; $('#f_currentCount').value=0;
  }
  if(v==='tpl_weight'){
    $('#f_type').value='weight'; updateFormVisibility();
    $('#f_name').value='Сбросить вес к лету';
    $('#f_w_start').value=95; $('#f_w_target').value=80; $('#f_w_current').value=95;
  }
  if(v==='tpl_meditation'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='30 дней медитации';
    $('#f_days').value=30; $('#f_daysDone').value=0; $('#f_daily').value=1;
    $('#f_category').value='spiritual';
  }
  if(v==='tpl_water'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='Пить 2 литра воды в день';
    $('#f_days').value=30; $('#f_daysDone').value=0; $('#f_daily').value=1;
    $('#f_category').value='health';
  }
  if(v==='tpl_sleep'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='Спать 8 часов в день';
    $('#f_days').value=30; $('#f_daysDone').value=0; $('#f_daily').value=1;
    $('#f_category').value='health';
  }
  if(v==='tpl_books'){
    $('#f_type').value='reading'; updateFormVisibility();
    $('#f_name').value='Прочитать 12 книг в год';
    $('#f_totalPages').value=3600; $('#f_readPages').value=0;
    $('#f_category').value='education';
  }
  if(v==='tpl_language'){
    $('#f_type').value='learning'; updateFormVisibility();
    $('#f_name').value='Изучить английский язык';
    $('#f_targetHours').value=200; $('#f_spentMin').value=0;
    $('#f_category').value='education';
  }
  if(v==='tpl_fitness'){
    $('#f_type').value='challenge'; updateFormVisibility();
    $('#f_name').value='Тренироваться 3 раза в неделю';
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
  const reminder = parseInt($('#f_reminder').value);
  if(!name) return;
  let g;
  if(type==='financial'){
    const targetAmount = parseInt($('#f_targetAmount').value||'0',10);
    const currentAmount = parseInt($('#f_currentAmount').value||'0',10);
    g = { id: uid(), type, name, description, category, priority, targetAmount, currentAmount, deadline, reminder, createdAt: Date.now(), completedAt: null };
  }
  if(type==='challenge'){
    const totalDays = parseInt($('#f_days').value||'1',10);
    const done = Math.min(totalDays, parseInt($('#f_daysDone').value||'0',10));
    const actionsPerDay = parseInt($('#f_daily').value||'0',10) || null;
    const completedDays = Array.from({length: done}, (_,i)=> i+1);
    g = { id: uid(), type, name, description, category, priority, totalDays, completedDays, actionsPerDay, deadline, reminder, createdAt: Date.now(), completedAt: null };
  }
  if(type==='counter'){
    const totalCount = parseInt($('#f_totalCount').value||'1',10);
    const currentCount = Math.min(totalCount, parseInt($('#f_currentCount').value||'0',10));
    g = { id: uid(), type, name, description, category, priority, totalCount, currentCount, deadline, reminder, createdAt: Date.now(), completedAt: null };
  }
  if(type==='reading'){
    const totalPages = parseInt($('#f_totalPages').value||'1',10);
    const readPages = Math.min(totalPages, parseInt($('#f_readPages').value||'0',10));
    g = { id: uid(), type, name, description, category, priority, totalPages, readPages, deadline, reminder, createdAt: Date.now(), completedAt: null };
  }
  if(type==='learning'){
    const targetHours = parseInt($('#f_targetHours').value||'1',10);
    const spentMin = parseInt($('#f_spentMin').value||'0',10);
    g = { id: uid(), type, name, description, category, priority, targetHours, spentMin, deadline, reminder, createdAt: Date.now(), completedAt: null };
  }
  if(type==='weight'){
    const w_start = parseFloat($('#f_w_start').value||'0');
    const w_target = parseFloat($('#f_w_target').value||'0');
    const w_current = parseFloat($('#f_w_current').value||w_start);
    g = { id: uid(), type, name, description, category, priority, w_start, w_target, w_current, deadline, reminder, createdAt: Date.now(), completedAt: null };
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
        <span class="badge">Финансовая цель</span>
        <span class="badge">Прогресс: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      ${g.description ? `<div style="margin: 16px 0; padding: 16px; background: var(--card); border-radius: 12px; border-left: 4px solid var(--accent);">
        <strong>Описание:</strong><br>
        ${g.description}
      </div>` : ''}
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted ruble">${currency(g.currentAmount)} / ${currency(g.targetAmount)}</div>
        </div>
      </div>
      <label>Обновить текущую сумму (₽)</label>
      <input id="inpMoney" type="number" min="0" step="100" value="${g.currentAmount}" />
      <div style="margin: 20px 0;">
        <label>Подзадачи</label>
        <div id="subtasksList" style="margin: 10px 0;">
          ${(g.subtasks || []).map((task, i) => `
            <div style="display: flex; align-items: center; gap: 8px; margin: 8px 0; padding: 8px; background: var(--card); border-radius: 8px;">
              <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleSubtask('${g.id}', ${i})" />
              <span style="flex: 1; ${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.text}</span>
              <button onclick="removeSubtask('${g.id}', ${i})" style="background: var(--danger); color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer;">×</button>
            </div>
          `).join('')}
        </div>
        <div style="display: flex; gap: 8px;">
          <input id="newSubtask" placeholder="Добавить подзадачу..." style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,.15); background: var(--card); color: var(--text);" />
          <button onclick="addSubtask('${g.id}')" style="background: var(--accent); color: white; border: none; border-radius: 8px; padding: 8px 16px; cursor: pointer;">Добавить</button>
        </div>
      </div>
      <div class="actions">
        <button class="btn danger" id="btnDelete">Удалить</button>
        <button class="btn" id="btnDuplicate">Дублировать</button>
        <button class="btn" id="btnArchive">Архивировать</button>
        <button class="btn" id="btnShare">Поделиться</button>
        <button class="btn" id="btnSaveMoney">Сохранить</button>
        <button class="btn primary" id="btnAddMoney">+ Добавить 1 000 ₽</button>
      </div>
      <div id="congrats" class="big-congrats">🎉 Цель достигнута! Великолепно!</div>`;
    $('#btnSaveMoney').onclick = ()=>{ g.currentAmount = Math.max(0, parseInt($('#inpMoney').value||'0',10)); finalize(); };
    $('#btnAddMoney').onclick = ()=>{ g.currentAmount = (g.currentAmount|0) + 1000; finalize(); };
    $('#btnDuplicate').onclick = ()=>{
      const duplicate = {...g, id: uid(), name: g.name + ' (копия)', createdAt: Date.now(), completedAt: null};
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
      const shareText = `🎯 Достижение в GoalTrack Pro!\n\nЦель: ${g.name}\nПрогресс: ${percent}%\n\n${g.description ? `Описание: ${g.description}\n\n` : ''}Продолжаю работать над своими целями! 💪`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Мое достижение в GoalTrack Pro',
          text: shareText,
          url: window.location.href
        });
      } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
          alert('Текст скопирован в буфер обмена!');
        });
      }
    };
    $('#btnDelete').onclick = ()=>{ if(confirm('Удалить цель?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
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
        <span class="badge">Челлендж${g.actionsPerDay?` • ${g.actionsPerDay}/день`:''}</span>
        <span class="badge">Прогресс: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${g.completedDays.length} из ${g.totalDays} дней выполнено</div>
        </div>
      </div>
      <label>Отмечайте выполненные дни</label>
      <div class="calendar" id="calendar">${cells}</div>
      <div class="actions">
        <button class="btn danger" id="btnDelete">Удалить</button>
        <button class="btn" id="btnReset">Сбросить прогресс</button>
      </div>
      <div id="congrats" class="big-congrats">🎉 Челлендж завершен! Мощно!</div>`;
    $('#calendar').onclick = (e)=>{
      const cell = e.target.closest('.cell'); if(!cell) return;
      const d = parseInt(cell.dataset.day,10);
      const idx = g.completedDays.indexOf(d);
      if(idx>-1){ g.completedDays.splice(idx,1) } else { g.completedDays.push(d) }
      finalize();
    };
    $('#btnReset').onclick = ()=>{ if(confirm('Сбросить прогресс?')){ g.completedDays = []; g.completedAt=null; finalize(); } };
    $('#btnDelete').onclick = ()=>{ if(confirm('Удалить цель?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
  if(g.type==='counter'){
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">Счётчик</span>
        <span class="badge">Прогресс: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${g.currentCount} / ${g.totalCount}</div>
        </div>
      </div>
      <label>Текущее значение</label>
      <input id="inpCnt" type="number" min="0" step="1" value="${g.currentCount}" />
      <div class="actions">
        <button class="btn danger" id="btnDelete">Удалить</button>
        <button class="btn" id="btnSaveCnt">Сохранить</button>
        <button class="btn primary" id="btnIncCnt">+ Добавить 1</button>
      </div>
      <div id="congrats" class="big-congrats">🎉 Цель достигнута!</div>`;
    $('#btnSaveCnt').onclick = ()=>{ g.currentCount = Math.min(g.totalCount, Math.max(0, parseInt($('#inpCnt').value||'0',10))); finalize(); };
    $('#btnIncCnt').onclick = ()=>{ g.currentCount = Math.min(g.totalCount, (g.currentCount|0) + 1); finalize(); };
    $('#btnDelete').onclick = ()=>{ if(confirm('Удалить цель?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
  if(g.type==='reading'){
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">Чтение</span>
        <span class="badge">Прогресс: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${g.readPages} / ${g.totalPages} стр.</div>
        </div>
      </div>
      <label>Прочитано страниц</label>
      <input id="inpRead" type="number" min="0" step="1" value="${g.readPages}" />
      <div class="actions">
        <button class="btn danger" id="btnDelete">Удалить</button>
        <button class="btn" id="btnSaveRead">Сохранить</button>
        <button class="btn primary" id="btnPlus10">+10 стр.</button>
      </div>
      <div id="congrats" class="big-congrats">🎉 Прочитано всё! Браво!</div>`;
    $('#btnSaveRead').onclick = ()=>{ g.readPages = Math.min(g.totalPages, Math.max(0, parseInt($('#inpRead').value||'0',10))); finalize(); };
    $('#btnPlus10').onclick = ()=>{ g.readPages = Math.min(g.totalPages, (g.readPages|0) + 10); finalize(); };
    $('#btnDelete').onclick = ()=>{ if(confirm('Удалить цель?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
  if(g.type==='learning'){
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">Учёба</span>
        <span class="badge">Прогресс: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${(g.spentMin/60).toFixed(1)} / ${g.targetHours} ч</div>
        </div>
      </div>
      <label>Добавить (минут)</label>
      <input id="inpMin" type="number" min="0" step="10" value="30" />
      <div class="actions">
        <button class="btn danger" id="btnDelete">Удалить</button>
        <button class="btn" id="btnAddMin">Добавить</button>
      </div>
      <div id="congrats" class="big-congrats">🎉 Учебная цель достигнута!</div>`;
    $('#btnAddMin').onclick = ()=>{ g.spentMin = Math.min(g.targetHours*60, (g.spentMin|0) + Math.max(0, parseInt($('#inpMin').value||'0',10))); finalize(); };
    $('#btnDelete').onclick = ()=>{ if(confirm('Удалить цель?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
    if(percent>=100){ $('#congrats').classList.add('show'); }
    showModal('#modalDetails'); return;
  }
  if(g.type==='weight'){
    detailsContent.innerHTML = `
      <div class="goal-meta">
        <span class="badge">Вес</span>
        <span class="badge">Прогресс: <strong style="color:#fff">${percent}%</strong></span>
      </div>
      <div class="progress-row" style="margin:10px 0 6px">
        <div class="ring" style="--deg:${(percent/100)*360}deg"><span>${percent}%</span></div>
        <div class="progress-text" style="flex:1">
          <div class="line"><i style="--w:${percent}%"></i></div>
          <div class="muted">${g.w_current} → ${g.w_target} кг (было ${g.w_start})</div>
        </div>
      </div>
      <label>Текущий вес (кг)</label>
      <input id="inpW" type="number" min="1" step="0.1" value="${g.w_current}" />
      <div class="actions">
        <button class="btn danger" id="btnDelete">Удалить</button>
        <button class="btn" id="btnSaveW">Сохранить</button>
      </div>
      <div id="congrats" class="big-congrats">🎉 Цель по весу достигнута!</div>`;
    $('#btnSaveW').onclick = ()=>{ g.w_current = parseFloat($('#inpW').value||g.w_current); finalize(); };
    $('#btnDelete').onclick = ()=>{ if(confirm('Удалить цель?')){ state.goals = state.goals.filter(x=>x.id!==g.id); save(); hideModal('#modalDetails'); render(); } };
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
          if (confirm('Импорт заменит все текущие данные. Продолжить?')) {
            state.goals = data.goals;
            state.achievements = data.achievements || [];
            state.stats = data.stats || { totalGoals: 0, completedGoals: 0, totalDays: 0, streak: 0 };
            save();
            saveAchievements();
            saveStats();
            render();
            updateStats();
            checkAchievements();
            alert('Данные успешно импортированы!');
          }
        } else {
          alert('Неверный формат файла');
        }
      } catch (error) {
        alert('Ошибка при чтении файла: ' + error.message);
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
  $('#notificationsEnabled').value = state.settings.notificationsEnabled;
  $('#reminderTime').value = state.settings.reminderTime;
  $('#theme').value = state.settings.theme;
  $('#language').value = state.settings.language;
  showModal('#modalSettings');
});

$('#saveSettings').addEventListener('click', ()=>{
  state.settings.notificationsEnabled = $('#notificationsEnabled').value === 'true';
  state.settings.reminderTime = $('#reminderTime').value;
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
// ===== Notifications System =====
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}
function showNotification(title, body, icon = '🎯') {
    if (state.settings.notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon });
    }
}
function scheduleReminders() {
  if (!state.settings.notificationsEnabled) return;
  
  const now = new Date();
  const reminderTime = state.settings.reminderTime.split(':');
  const reminderDate = new Date();
  reminderDate.setHours(parseInt(reminderTime[0]), parseInt(reminderTime[1]), 0, 0);
  
  if (reminderDate <= now) {
    reminderDate.setDate(reminderDate.getDate() + 1);
  }
  
  const timeUntilReminder = reminderDate.getTime() - now.getTime();
  
  setTimeout(() => {
    const activeGoals = state.goals.filter(g => !g.completedAt);
    if (activeGoals.length > 0) {
      showNotification(
        'GoalTrack Pro - Напоминание',
        `У вас ${activeGoals.length} активных целей. Время работать над ними!`,
        '🎯'
      );
    }
    scheduleReminders(); // Schedule next reminder
  }, timeUntilReminder);
}
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
// Initialize notifications
//requestNotificationPermission();
//scheduleReminders();
// Initial render
render();
updateStats();
checkAchievements();
showMotivationalQuote();
updateLanguage();