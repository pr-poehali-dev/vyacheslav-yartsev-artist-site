import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/9a8509ba-4403-41dd-9e18-45c3c97e5a7d/files/c4d973ed-7f5a-4c4e-8d4e-71e5bbcc7bb8.jpg";
const CROWD_IMG = "https://cdn.poehali.dev/projects/9a8509ba-4403-41dd-9e18-45c3c97e5a7d/files/b3d25852-0396-400a-8fb2-f81aea5176c3.jpg";

const SECTIONS = ["главная", "о нас", "туры", "билеты", "документы", "галерея", "контакты"];

const TOURS = [
  { city: "Владивосток", venue: "Концерт-Холл Года", date: "АПРЕЛЬ 2026", status: "доступно" },
  { city: "Петропавловск-Камчатский", venue: "КЗ Октябрьский", date: "МАЙ 2026", status: "доступно" },
  { city: "Южно-Сахалинск", venue: "Сити Мол", date: "НОЯБРЬ 2026", status: "доступно" },
  { city: "Хабаровск", venue: "Городской Дом Культуры", date: "МАРТ 2027", status: "доступно" },
];

const GALLERY = [
  { src: HERO_IMG, label: "Студия 2024" },
  { src: CROWD_IMG, label: "Тур 2024" },
  { src: HERO_IMG, label: "Stadium Live" },
  { src: CROWD_IMG, label: "Backstage" },
  { src: HERO_IMG, label: "Фотосессия" },
  { src: CROWD_IMG, label: "Концерт СПБ" },
];

const DOCS = [
  { name: "Технический райдер", size: "245 KB", type: "PDF" },
  { name: "Бытовой райдер", size: "128 KB", type: "PDF" },
  { name: "Пресс-кит", size: "12 MB", type: "ZIP" },
  { name: "Договор — шаблон", size: "89 KB", type: "DOCX" },
  { name: "Фото для прессы (hi-res)", size: "84 MB", type: "ZIP" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("главная");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const key of SECTIONS) {
        const el = sectionsRef.current[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(key);
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionsRef.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const setRef = (key: string) => (el: HTMLElement | null) => {
    sectionsRef.current[key] = el;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("главная")} className="font-['Oswald'] text-xl tracking-widest text-neon animate-flicker">
            KLUSH
          </button>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`nav-link text-xs tracking-widest uppercase font-['Oswald'] font-medium transition-colors ${activeSection === s ? "text-neon active" : "text-white/60 hover:text-white"}`}
              >
                {s}
              </button>
            ))}
          </div>
          {/* Mobile hamburger */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`text-left text-sm tracking-widest uppercase font-['Oswald'] font-medium ${activeSection === s ? "text-neon" : "text-white/60"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section ref={setRef("главная")} className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Вячеслав Ярцев" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        {/* Neon horizontal line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <p className="text-neon text-xs tracking-[0.4em] uppercase font-['Golos_Text'] mb-4 animate-fade-in-up">
              Официальный сайт
            </p>
            <h1 className="font-['Oswald'] text-[clamp(3rem,10vw,8rem)] font-bold leading-none uppercase mb-2 animate-fade-in-up animate-delay-100">
              Вячеслав
            </h1>
            <h1 className="font-['Oswald'] text-[clamp(3rem,10vw,8rem)] font-bold leading-none uppercase text-neon text-glow mb-6 animate-fade-in-up animate-delay-200">
              Ярцев
            </h1>
            <div className="flex items-center gap-3 mb-8 animate-fade-in-up animate-delay-300">
              <div className="w-12 h-px bg-neon glow-neon" />
              <span className="text-white/50 text-sm tracking-widest uppercase font-['Oswald']">KLUSH</span>
            </div>
            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-400">
              <button
                onClick={() => scrollTo("билеты")}
                className="bg-neon text-black font-['Oswald'] font-semibold text-sm tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors duration-300 glow-neon"
              >
                Купить билет
              </button>
              <button
                onClick={() => scrollTo("туры")}
                className="border border-white/30 text-white font-['Oswald'] font-medium text-sm tracking-widest uppercase px-8 py-3 hover:border-neon hover:text-neon transition-colors duration-300"
              >
                Все туры
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] tracking-[0.3em] uppercase font-['Oswald'] rotate-90 mb-4">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-neon py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill("KLUSH — ВЯЧЕСЛАВ ЯРЦЕВ — НОВЫЙ ТУР 2025 — ").map((t, i) => (
            <span key={i} className="text-black font-['Oswald'] font-bold text-sm tracking-widest uppercase mr-8">{t}</span>
          ))}
        </div>
      </div>

      {/* О НАС */}
      <section ref={setRef("о нас")} className="py-28 px-6 max-w-7xl mx-auto">
        <div className="reveal grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-neon text-xs tracking-[0.4em] uppercase mb-4 font-['Oswald']">Об артисте</p>
            <h2 className="font-['Oswald'] text-5xl md:text-7xl font-bold uppercase mb-8 leading-none">
              О<br />НАС
            </h2>
            <div className="space-y-5 text-white/70 text-base leading-relaxed">
              <p>
                Вячеслав Ярцев — артист, известный под псевдонимом <span className="text-neon">KLUSH</span>. Его музыка стирает границы жанров, объединяя электронику, поп и живые инструменты в неповторимое звучание.
              </p>
              <p>
                За годы карьеры собрал аудиторию в миллионы слушателей по всей России и за рубежом. Живые выступления KLUSH — это полноценное шоу с визуальными эффектами и мощным звуком.
              </p>
              <p>
                Лауреат национальных музыкальных премий, хедлайнер крупнейших российских фестивалей.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={CROWD_IMG}
              alt="Концерт"
              className="w-full aspect-square object-cover"
            />
            <div className="absolute -bottom-4 -left-4 w-3/4 h-px bg-neon glow-neon" />
            <div className="absolute -bottom-4 -left-4 w-px h-3/4 bg-neon glow-neon" />
            <div className="absolute -top-4 -right-4 border border-neon/30 w-16 h-16" />
          </div>
        </div>

        {/* Stats */}
        <div className="reveal mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "5M+", label: "Слушателей в мес." },
            { n: "120+", label: "Концертов в год" },
            { n: "8", label: "Лет на сцене" },
            { n: "3", label: "Студийных альбома" },
          ].map((s) => (
            <div key={s.n} className="border border-white/10 p-6 hover:border-neon/50 transition-colors">
              <div className="font-['Oswald'] text-4xl font-bold text-neon mb-2">{s.n}</div>
              <div className="text-white/50 text-sm uppercase tracking-widest font-['Oswald']">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ТУРЫ */}
      <section ref={setRef("туры")} className="py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal mb-14 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-neon text-xs tracking-[0.4em] uppercase mb-3 font-['Oswald']">Расписание</p>
              <h2 className="font-['Oswald'] text-5xl md:text-7xl font-bold uppercase leading-none">ТУРЫ 2025</h2>
            </div>
            <div className="w-32 h-px bg-neon glow-neon" />
          </div>
          <div className="reveal space-y-px">
            {TOURS.map((t, i) => (
              <div
                key={i}
                className="ticket-card group flex flex-wrap items-center justify-between gap-4 border border-white/8 bg-white/[0.02] px-6 py-5 hover:border-neon/40 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-6 min-w-0">
                  <span className="font-['Oswald'] text-white/25 text-sm w-6">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="font-['Oswald'] text-xl font-semibold group-hover:text-neon transition-colors">{t.city}</div>
                    <div className="text-white/40 text-xs mt-0.5">{t.venue}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-['Oswald'] text-sm tracking-widest text-white/60">{t.date}</span>
                  <span className={`text-xs tracking-widest uppercase px-3 py-1 font-['Oswald'] ${
                    t.status === "мало мест"
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      : t.status === "скоро"
                      ? "bg-white/10 text-white/40 border border-white/20"
                      : "bg-neon/10 text-neon border border-neon/30"
                  }`}>
                    {t.status}
                  </span>
                  <Icon name="ArrowRight" size={16} className="text-white/20 group-hover:text-neon transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БИЛЕТЫ */}
      <section ref={setRef("билеты")} className="py-28 px-6 max-w-7xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-neon text-xs tracking-[0.4em] uppercase mb-3 font-['Oswald']">Купить</p>
          <h2 className="font-['Oswald'] text-5xl md:text-7xl font-bold uppercase leading-none">БИЛЕТЫ</h2>
        </div>
        <div className="reveal grid md:grid-cols-3 gap-4">
          {[
            { tier: "Фанзона", price: "от 2 500 ₽", perks: ["Стоячий партер", "Близко к сцене", "Стандартный вход"], hot: false },
            { tier: "VIP", price: "от 7 500 ₽", perks: ["Сидячие места", "Выделенный бар", "Ранний вход", "Встреча с артистом"], hot: true },
            { tier: "Трибуны", price: "от 1 800 ₽", perks: ["Сидячие места", "Обзор всей сцены", "Стандартный вход"], hot: false },
          ].map((b) => (
            <div key={b.tier} className={`border p-8 flex flex-col relative overflow-hidden ${b.hot ? "border-neon glow-neon" : "border-white/10 hover:border-neon/30"} transition-all duration-300`}>
              {b.hot && (
                <div className="absolute top-0 right-0 bg-neon text-black font-['Oswald'] font-bold text-xs tracking-widest px-3 py-1">
                  POPULAR
                </div>
              )}
              <div className="font-['Oswald'] text-xs tracking-[0.3em] uppercase text-white/40 mb-3">{b.tier}</div>
              <div className={`font-['Oswald'] text-4xl font-bold mb-6 ${b.hot ? "text-neon" : "text-white"}`}>{b.price}</div>
              <ul className="space-y-2 mb-8 flex-1">
                {b.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-white/60 text-sm">
                    <div className={`w-1 h-1 rounded-full ${b.hot ? "bg-neon" : "bg-white/30"}`} />
                    {p}
                  </li>
                ))}
              </ul>
              <button className={`font-['Oswald'] font-semibold text-sm tracking-widest uppercase py-3 transition-all duration-300 ${
                b.hot
                  ? "bg-neon text-black hover:bg-white"
                  : "border border-white/20 text-white hover:border-neon hover:text-neon"
              }`}>
                Выбрать места
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ДОКУМЕНТЫ */}
      <section ref={setRef("документы")} className="py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal mb-14">
            <p className="text-neon text-xs tracking-[0.4em] uppercase mb-3 font-['Oswald']">Для организаторов</p>
            <h2 className="font-['Oswald'] text-5xl md:text-7xl font-bold uppercase leading-none">ДОКУМЕНТЫ</h2>
          </div>
          <div className="reveal space-y-2">
            {DOCS.map((d, i) => (
              <div key={i} className="group flex items-center justify-between border border-white/8 px-6 py-5 hover:border-neon/40 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-neon/30 flex items-center justify-center group-hover:border-neon group-hover:bg-neon/10 transition-all">
                    <Icon name="FileText" size={16} className="text-neon" />
                  </div>
                  <div>
                    <div className="font-['Oswald'] text-base font-medium group-hover:text-neon transition-colors">{d.name}</div>
                    <div className="text-white/30 text-xs mt-0.5">{d.type} · {d.size}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/30 group-hover:text-neon transition-colors">
                  <span className="text-xs tracking-widest font-['Oswald'] uppercase">Скачать</span>
                  <Icon name="Download" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section ref={setRef("галерея")} className="py-28 px-6 max-w-7xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-neon text-xs tracking-[0.4em] uppercase mb-3 font-['Oswald']">Фото</p>
          <h2 className="font-['Oswald'] text-5xl md:text-7xl font-bold uppercase leading-none">ГАЛЕРЕЯ</h2>
        </div>
        <div className="reveal grid grid-cols-2 md:grid-cols-3 gap-2">
          {GALLERY.map((g, i) => (
            <div key={i} className={`relative overflow-hidden group cursor-pointer ${i === 0 ? "md:row-span-2" : ""}`}>
              <img
                src={g.src}
                alt={g.label}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 0 ? "h-full min-h-[300px]" : "aspect-video"}`}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-['Oswald'] text-sm tracking-widest uppercase text-white">{g.label}</span>
              </div>
              <div className="absolute top-2 right-2 w-px h-8 bg-neon opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 h-px w-8 bg-neon opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section ref={setRef("контакты")} className="py-28 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal mb-14">
            <p className="text-neon text-xs tracking-[0.4em] uppercase mb-3 font-['Oswald']">Связь</p>
            <h2 className="font-['Oswald'] text-5xl md:text-7xl font-bold uppercase leading-none">КОНТАКТЫ</h2>
          </div>
          <div className="reveal grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: "Mail", label: "Буккинг и гастроли", value: "booking@klush.ru" },
                { icon: "Phone", label: "Пресс-служба", value: "+7 (999) 000-00-00" },
                { icon: "Globe", label: "Сайт", value: "klush.ru" },
                { icon: "Instagram", label: "Instagram", value: "@klush_official" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-neon group-hover:bg-neon/10 transition-all shrink-0">
                    <Icon name={c.icon} size={18} className="text-neon" />
                  </div>
                  <div>
                    <div className="text-white/35 text-xs tracking-widest uppercase font-['Oswald']">{c.label}</div>
                    <div className="text-white font-['Golos_Text'] group-hover:text-neon transition-colors">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase font-['Oswald'] text-white/40 mb-2 block">Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-neon transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase font-['Oswald'] text-white/40 mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-neon transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase font-['Oswald'] text-white/40 mb-2 block">Тема</label>
                <input
                  type="text"
                  placeholder="Буккинг / Пресса / Сотрудничество"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-neon transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase font-['Oswald'] text-white/40 mb-2 block">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о вашем запросе..."
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-neon transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neon text-black font-['Oswald'] font-bold text-sm tracking-widest uppercase py-4 hover:bg-white transition-colors duration-300 glow-neon"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="font-['Oswald'] text-white/25 text-sm tracking-widest">
            © 2025 KLUSH / Вячеслав Ярцев. Все права защищены.
          </div>
          <div className="font-['Oswald'] text-neon text-lg tracking-widest animate-flicker">KLUSH</div>
        </div>
      </footer>
    </div>
  );
}