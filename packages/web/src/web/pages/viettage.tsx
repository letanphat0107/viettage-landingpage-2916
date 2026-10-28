import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Search,
  Menu,
  X,
  Pause,
  Play,
  Leaf,
  Sprout,
  ChefHat,
  MapPin,
  Clock3,
  Bookmark,
  Check,
  Mail,
  Phone,
  SlidersHorizontal,
} from "lucide-react";
import { products, recipes, nav, normalize } from "../lib/catalog";

type Product = (typeof products)[number];
function Reveal({
  children,
  disabled,
  className = "",
}: {
  children: ReactNode;
  disabled: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={disabled ? false : { opacity: 0, y: 28 }}
      animate={disabled ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: disabled ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function ButtonLink({
  to,
  children,
  light = false,
}: {
  to: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link to={to} className={`button ${light ? "light" : ""}`}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
function Packaging({ product: p, large = false }: { product: Product; large?: boolean }) {
  return (
    <div
      className={`pack-scene ${large ? "large" : ""}`}
      style={{ "--pack": p.color } as React.CSSProperties}
    >
      <div className={`package ${p.kind}`}>
        <div className="cap" />
        <div className="package-label">
          <img src="/images/logo.png" alt="Viettage" />
          <span className="pack-rule" />
          <strong>{p.name}</strong>
          <span className="pack-en">THE TASTE OF VIETNAM</span>
          <Leaf size={30} strokeWidth={0.8} />
          <small>{p.size}</small>
        </div>
      </div>
      <div className="pack-shadow" />
      <span className="concept-tag">BAO BÌ Ý TƯỞNG</span>
    </div>
  );
}
function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link to={`/san-pham/${p.slug}`} className="product-card">
      <Packaging product={p} />
      <div className="product-meta">
        <div>
          <span className="eyebrow">{p.flavor}</span>
          <h3>{p.name}</h3>
          <p>
            {p.size} <span>·</span> Danh mục đề xuất
          </p>
        </div>
        <span className="circle-arrow">
          <ArrowUpRight size={21} />
        </span>
      </div>
    </Link>
  );
}
function Botanical() {
  return (
    <svg className="botanical" viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <path
        d="M105 238C111 165 99 78 133 12M108 179C45 184 34 145 27 112C74 112 101 133 108 179ZM108 142C145 142 177 115 182 85C139 87 116 105 108 142ZM109 102C60 97 58 65 57 37C88 46 104 64 109 102ZM118 58C148 55 164 36 164 14C142 19 127 37 118 58Z"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function Viettage() {
  const [path, setLocation] = useLocation();
  const systemReduce = useReducedMotion();
  const [motionOff, setMotionOff] = useState(
    () => localStorage.getItem("viettage-motion") === "off",
  );
  const disabled = !!systemReduce || motionOff;
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
    searchRef.current?.close();
    const titles: Record<string, string> = {
      "/": "Gia vị Việt, tinh hoa nguyên bản",
      "/san-pham": "Bộ sưu tập gia vị",
      "/cau-chuyen": "Câu chuyện thương hiệu",
      "/cong-thuc": "Góc ẩm thực",
      "/diem-ban": "Tìm điểm mua",
      "/lien-he": "Kết nối & hợp tác",
    };
    document.title = `${titles[path] || "Khám phá hương vị"} | Viettage`;
  }, [path]);
  useEffect(() => {
    document.documentElement.dataset.motion = disabled ? "off" : "on";
  }, [disabled]);
  function toggleMotion() {
    setMotionOff((v) => {
      localStorage.setItem("viettage-motion", v ? "on" : "off");
      return !v;
    });
  }
  const results = products.filter((p) => normalize(p.name).includes(normalize(query)));
  let content: ReactNode;
  if (path === "/")
    content = (
      <>
        <Hero disabled={disabled} />
        <TrustStrip />
        <Introduction disabled={disabled} />
        <ProductSection disabled={disabled} />
        <Story disabled={disabled} />
        <RecipeSection disabled={disabled} />
        <Voices disabled={disabled} />
        <Connect />
      </>
    );
  else if (path === "/san-pham") content = <Catalog disabled={disabled} />;
  else if (path.startsWith("/san-pham/"))
    content = <ProductDetail slug={path.split("/")[2]} disabled={disabled} />;
  else if (path === "/cau-chuyen")
    content = (
      <>
        <PageTitle
          label="GỐC VIỆT. VỊ NGUYÊN BẢN."
          title={
            <>
              Mỗi hương vị,
              <br />
              <em>một câu chuyện.</em>
            </>
          }
          text="Từ cảm hứng nông sản Việt đến những bữa ăn hiện đại, Viettage gìn giữ sự kết nối giữa hương vị và ký ức."
        />
        <Introduction disabled={disabled} />
        <Story disabled={disabled} />
        <section className="container section">
          <span className="eyebrow">THƯƠNG HIỆU THUỘC CITIFOODS</span>
          <h2>
            Chất lượng làm nên
            <br />
            <em>sự tin cậy.</em>
          </h2>
          <p className="body-copy">
            Citifoods giới thiệu Viettage là thương hiệu gia vị cao cấp mang bản sắc Việt. Thông tin
            vùng nguyên liệu, quy trình và chứng nhận của từng sản phẩm sẽ được bổ sung sau khi xác
            minh.
          </p>
          <a
            className="text-link"
            href="https://citifoods.com.vn/products"
            target="_blank"
            rel="noreferrer"
          >
            Tìm hiểu tại Citifoods <ArrowUpRight size={18} />
          </a>
        </section>
        <Connect />
      </>
    );
  else if (path === "/cong-thuc") content = <RecipesPage disabled={disabled} />;
  else if (path.startsWith("/cong-thuc/")) content = <RecipeDetail key={path} slug={path.split("/")[2]} />;
  else if (path === "/diem-ban") content = <Stores />;
  else if (path === "/lien-he") content = <Contact />;
  else
    content = (
      <section className="container section">
        <h1>Trang chưa tồn tại</h1>
        <ButtonLink to="/">Về trang chủ</ButtonLink>
      </section>
    );
  return (
    <>
      <a className="skip" href="#main">
        Đến nội dung chính
      </a>
      <div className="topline">
        Hương vị Việt. Cảm hứng cho mỗi bữa ăn.<span>MỘT THƯƠNG HIỆU CỦA CITIFOODS</span>
      </div>
      <header>
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label="Viettage — Trang chủ">
            <img src="/images/logo.png" alt="Viettage Foods" />
          </Link>
          <nav className={menu ? "open" : ""} aria-label="Điều hướng chính">
            {nav.map(([href, label]) => (
              <Link key={href} to={href} className={path.startsWith(href) ? "active" : ""}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button"
              aria-label="Tìm sản phẩm"
              onClick={() => {
                setQuery("");
                searchRef.current?.showModal();
              }}
            >
              <Search size={21} />
            </button>
            <Link to="/lien-he" className="contact-link">
              Kết nối B2B <ArrowUpRight size={16} />
            </Link>
            <button
              className="icon-button mobile-toggle"
              aria-label={menu ? "Đóng menu" : "Mở menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">{content}</main>
      <footer>
        <div className="container footer-grid">
          <div>
            <img className="footer-logo" src="/images/logo.png" alt="Viettage Foods" />
            <p>
              Gia vị Việt.
              <br />
              Tinh hoa nguyên bản.
            </p>
            <span className="eyebrow">A BRAND BY CITIFOODS</span>
          </div>
          <div>
            <h4>Khám phá Viettage</h4>
            {nav.map(([href, label]) => (
              <Link key={href} to={href}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Kết nối & hợp tác</h4>
            <Link to="/lien-he">Trở thành đối tác</Link>
            <a href="mailto:info@citifoods.com.vn">info@citifoods.com.vn</a>
            <a href="tel:+84845599969">+84 845 599 969</a>
            <a href="https://citifoods.com.vn/" target="_blank" rel="noreferrer">
              Citifoods <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="footer-note">
            <h4>
              Một chút gia vị.
              <br />
              Một bữa ăn đáng nhớ.
            </h4>
            <p>
              Bản trải nghiệm thiết kế. Sản phẩm, bao bì và công thức là minh họa; chưa mở bán trên
              website.
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Viettage · Website concept</span>
          <button onClick={toggleMotion} className="motion-switch" aria-pressed={!disabled}>
            {disabled ? <Play size={14} /> : <Pause size={14} />}{" "}
            {disabled ? "Chuyển động: Tắt" : "Chuyển động: Bật"}
            {systemReduce ? " (theo thiết bị)" : ""}
          </button>
          <Link to="/lien-he">Liên hệ & thông tin dữ liệu</Link>
        </div>
      </footer>
      <dialog ref={searchRef} className="search-dialog">
        <div className="dialog-top">
          <h2>
            Tìm một <em>hương vị.</em>
          </h2>
          <button
            className="icon-button"
            aria-label="Đóng tìm kiếm"
            onClick={() => searchRef.current?.close()}
          >
            <X />
          </button>
        </div>
        <label className="search-field">
          <Search size={20} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tên gia vị…"
            aria-label="Tên gia vị"
          />
        </label>
        <p className="small-muted">{results.length} sản phẩm minh họa</p>
        <div className="search-results">
          {results.map((p) => (
            <button
              key={p.slug}
              onClick={() => {
                searchRef.current?.close();
                setLocation(`/san-pham/${p.slug}`);
              }}
            >
              <span>
                {p.name}
                <small>{p.category}</small>
              </span>
              <ArrowUpRight size={20} />
            </button>
          ))}
          {!results.length && <p>Chưa tìm thấy. Thử “tiêu”, “ớt” hoặc “nước mắm”.</p>}
        </div>
      </dialog>
    </>
  );
}

function Hero({ disabled }: { disabled: boolean }) {
  const [slide, setSlide] = useState(0),
    [paused, setPaused] = useState(false),
    [visible, setVisible] = useState(!document.hidden);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  useEffect(() => {
    const fn = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", fn);
    return () => document.removeEventListener("visibilitychange", fn);
  }, []);
  useEffect(() => {
    if (disabled || paused || !visible || !inView) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % 3), 7000);
    return () => clearInterval(id);
  }, [disabled, paused, visible, inView]);
  const slides = [
    {
      label: "TINH HOA GIA VỊ VIỆT",
      top: "Gia vị Việt.",
      bottom: "Tinh hoa nguyên bản.",
      text: "Chắt lọc cảm hứng từ nông sản Việt, đánh thức hương vị trong mỗi bữa ăn.",
      image: "/images/spices.jpg",
      cta: "Khám phá gia vị",
      to: "/san-pham",
    },
    {
      label: "TỪ GỐC VIỆT, ĐẾN BẾP NHÀ",
      top: "Gìn giữ gốc Việt.",
      bottom: "Nâng niu từng vị.",
      text: "Hương vị không chỉ làm nên món ăn. Hương vị còn kể câu chuyện của nơi ta thuộc về.",
      image: "/images/landscape.jpg",
      cta: "Câu chuyện Viettage",
      to: "/cau-chuyen",
    },
    {
      label: "CẢM HỨNG TRONG GIAN BẾP",
      top: "Một chút gia vị.",
      bottom: "Một bữa ăn đáng nhớ.",
      text: "Tìm ý tưởng cho bữa cơm hôm nay, để mỗi món quen mang thêm một điều mới.",
      image: "/images/pork.jpg",
      cta: "Vào bếp cùng Viettage",
      to: "/cong-thuc",
    },
  ];
  const s = slides[slide];
  return (
    <section
      className={`hero ${!inView || !visible || disabled || paused ? "motion-paused" : ""}`}
      ref={ref}
    >
      <div className="hero-grain" />
      <div className="hero-lines" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={disabled ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: disabled ? 0 : -12 }}
              transition={{ duration: disabled ? 0 : 0.55 }}
            >
              <span className="eyebrow gold">
                <span className="tiny-line" />
                {s.label}
              </span>
              <h1>
                {s.top}
                <br />
                <em>{s.bottom}</em>
              </h1>
              <p>{s.text}</p>
              <div className="hero-buttons">
                <ButtonLink to={s.to} light>
                  {s.cta}
                </ButtonLink>
                <Link to="/cong-thuc" className="hero-text-link">
                  Cảm hứng nấu ăn <ArrowRight size={17} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="hero-bottom">
            <span className="slide-number">
              0{slide + 1}
              <small> / 03</small>
            </span>
            <div className="slide-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Banner ${i + 1}`}
                  aria-pressed={slide === i}
                  onClick={() => setSlide(i)}
                  className={i === slide ? "selected" : ""}
                />
              ))}
            </div>
            <div className="hero-controls">
              <button aria-label="Banner trước" onClick={() => setSlide((s) => (s + 2) % 3)}>
                <ArrowLeft size={18} />
              </button>
              <button aria-label="Banner tiếp theo" onClick={() => setSlide((s) => (s + 1) % 3)}>
                <ArrowRight size={18} />
              </button>
              <button
                aria-label={paused ? "Phát banner" : "Tạm dừng banner"}
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
                disabled={disabled}
              >
                {paused || disabled ? <Play size={15} /> : <Pause size={15} />}
              </button>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="photo-orbit" />
          <AnimatePresence mode="sync">
            <motion.img
              key={s.image}
              src={s.image}
              alt={
                slide === 0
                  ? "Gia vị và hạt tiêu trên thìa gỗ"
                  : slide === 1
                    ? "Cảnh ruộng bậc thang Việt Nam minh họa"
                    : "Món thịt kho minh họa"
              }
              initial={disabled ? false : { opacity: 0, scale: 1.07 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: disabled ? 0 : 1.3 }}
              className="hero-photo"
            />
          </AnimatePresence>
          <div className="heritage-seal">
            <Leaf size={25} strokeWidth={1} />
            <span>GỐC VIỆT</span>
            <i>Vị nguyên bản</i>
          </div>
          <Botanical />
          <div className="photo-caption">
            THE ART OF VIETNAMESE FLAVOUR <span>— VIETTAGE</span>
          </div>
        </div>
      </div>
      <div className="scroll-note">
        <span /> CUỘN ĐỂ KHÁM PHÁ
      </div>
    </section>
  );
}
function TrustStrip() {
  return (
    <div className="trust-strip">
      <div>
        <Sprout size={21} />
        <span>Cảm hứng nông sản Việt</span>
      </div>
      <span className="dot-divider" />
      <div>
        <Leaf size={21} />
        <span>Trân trọng vị nguyên bản</span>
      </div>
      <span className="dot-divider" />
      <div>
        <ChefHat size={21} />
        <span>Đồng hành cùng bếp nhà</span>
      </div>
    </div>
  );
}
function Introduction({ disabled }: { disabled: boolean }) {
  return (
    <section className="container section introduction">
      <Reveal disabled={disabled}>
        <span className="eyebrow">XIN CHÀO, CHÚNG TÔI LÀ VIETTAGE</span>
        <h2>
          Thân quen trong vị.
          <br />
          <em>Tinh tế trong từng chọn lựa.</em>
        </h2>
      </Reveal>
      <Reveal disabled={disabled} className="intro-copy">
        <p>
          Từ hạt tiêu nồng ấm đến chén nước mắm đậm đà, gia vị là nét chấm phá làm nên bản sắc của
          bữa cơm Việt.
        </p>
        <p>
          Viettage — thương hiệu gia vị cao cấp thuộc Citifoods — mang cảm hứng ấy đến gian bếp hiện
          đại, để mỗi món ăn đều có câu chuyện riêng.
        </p>
        <Link to="/cau-chuyen" className="text-link">
          Khám phá câu chuyện <ArrowUpRight size={19} />
        </Link>
      </Reveal>
    </section>
  );
}
function ProductSection({ disabled }: { disabled: boolean }) {
  return (
    <section className="products-section section">
      <div className="container">
        <Reveal disabled={disabled} className="section-heading">
          <div>
            <span className="eyebrow">BỘ SƯU TẬP HƯƠNG VỊ</span>
            <h2>
              Nhỏ trong gian bếp.
              <br />
              <em>Lớn trong hương vị.</em>
            </h2>
          </div>
          <Link to="/san-pham" className="text-link">
            Tất cả sản phẩm <ArrowUpRight size={20} />
          </Link>
        </Reveal>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <Reveal key={p.slug} disabled={disabled}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <p className="asset-note">
          Danh mục và bao bì ý tưởng, chưa phải SKU chính thức của Viettage.
        </p>
      </div>
    </section>
  );
}
function Story({ disabled }: { disabled: boolean }) {
  return (
    <section className="story-section">
      <Reveal className="story-image" disabled={disabled}>
        <img
          src="/images/landscape.jpg"
          alt="Ruộng bậc thang Việt Nam, ảnh cảm hứng nông sản"
          loading="lazy"
        />
        <span>VIỆT NAM — NGUỒN CẢM HỨNG BẤT TẬN</span>
      </Reveal>
      <Reveal className="story-copy" disabled={disabled}>
        <span className="eyebrow gold">TỪ ĐẤT LÀNH ĐẾN BẾP ẤM</span>
        <h2>
          Hương vị có gốc.
          <br />
          <em>Câu chuyện có hồn.</em>
        </h2>
        <p>
          Đằng sau mỗi gia vị là sắc màu của đất, nhịp sống của người và ký ức của những bữa cơm
          nhà.
        </p>
        <p>Chúng tôi chọn kể câu chuyện Việt bằng ngôn ngữ gần gũi nhất: hương vị.</p>
        <ButtonLink to="/cau-chuyen" light>
          Tìm hiểu Viettage
        </ButtonLink>
        <span className="story-disclaimer">Ảnh cảm hứng, không xác nhận vùng nguyên liệu.</span>
        <Botanical />
      </Reveal>
    </section>
  );
}
function RecipeCard({ recipe: r }: { recipe: (typeof recipes)[number] }) {
  return (
    <Link to={`/cong-thuc/${r.slug}`} className="recipe-card">
      <div className="recipe-photo">
        <img
          src={r.image}
          alt={
            r.name + (r.slug === "thit-kho" ? " — ảnh món ăn tham khảo" : " — ảnh gia vị minh họa")
          }
          loading="lazy"
        />
        <span>{r.type}</span>
        <div className="recipe-arrow">
          <ArrowUpRight />
        </div>
      </div>
      <p className="recipe-time">
        <Clock3 size={15} />
        {r.time} phút <span>·</span> Công thức minh họa
      </p>
      <h3>{r.name}</h3>
    </Link>
  );
}
function RecipeSection({ disabled }: { disabled: boolean }) {
  return (
    <section className="container section">
      <Reveal disabled={disabled} className="section-heading">
        <div>
          <span className="eyebrow">GÓC ẨM THỰC VIETTAGE</span>
          <h2>
            Nêm chút cảm hứng.
            <br />
            <em>Thêm vị yêu thương.</em>
          </h2>
        </div>
        <Link to="/cong-thuc" className="text-link">
          Khám phá công thức <ArrowUpRight size={20} />
        </Link>
      </Reveal>
      <div className="recipe-grid">
        {recipes.map((r) => (
          <Reveal key={r.slug} disabled={disabled}>
            <RecipeCard recipe={r} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
function Voices({ disabled }: { disabled: boolean }) {
  return (
    <Reveal disabled={disabled} className="voices">
      <span className="eyebrow">ĐIỀU CHÚNG TÔI MUỐN GÌN GIỮ</span>
      <span className="quote-mark">“</span>
      <h2>
        Một bữa ăn ngon không chỉ ở công thức.
        <br />
        <em>Mà ở hương vị khiến ta nhớ về nhà.</em>
      </h2>
      <p>Tinh thần thương hiệu Viettage</p>
      <small>Vị trí này dành cho đánh giá khách hàng đã xác minh khi ra mắt.</small>
    </Reveal>
  );
}
function Connect() {
  return (
    <section className="connect">
      <div className="container">
        <div>
          <span className="eyebrow gold">MANG HƯƠNG VỊ VIỆT ĐI XA HƠN</span>
          <h2>
            Cùng Viettage, <em>kết nối những gian bếp.</em>
          </h2>
        </div>
        <ButtonLink to="/lien-he" light>
          Trở thành đối tác
        </ButtonLink>
      </div>
    </section>
  );
}
function PageTitle({ label, title, text }: { label: string; title: ReactNode; text: string }) {
  return (
    <section className="page-title container">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
function Catalog({ disabled }: { disabled: boolean }) {
  const [category, setCategory] = useState("Tất cả"),
    [dish, setDish] = useState("Mọi món ăn"),
    [q, setQ] = useState("");
  const list = products.filter(
    (p) =>
      (category === "Tất cả" || p.category === category) &&
      (dish === "Mọi món ăn" || p.dishes.includes(dish)) &&
      normalize(p.name).includes(normalize(q)),
  );
  return (
    <>
      <PageTitle
        label="BỘ SƯU TẬP HƯƠNG VỊ"
        title={
          <>
            Tìm vị riêng.
            <br />
            <em>Nêm món quen.</em>
          </>
        }
        text="Khám phá danh mục gia vị đề xuất cho Viettage. Chọn theo dòng sản phẩm hoặc món ăn bạn muốn nấu."
      />
      <section className="container catalog">
        <div className="filters">
          <div className="tabs" aria-label="Danh mục sản phẩm">
            {["Tất cả", "Tiêu & ớt", "Nước mắm", "Sốt & hạt nêm"].map((c) => (
              <button
                key={c}
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
                className={c === category ? "active" : ""}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="select-wrap">
            <SlidersHorizontal size={16} />
            <select
              value={dish}
              onChange={(e) => setDish(e.target.value)}
              aria-label="Lọc theo món ăn"
            >
              {["Mọi món ăn", "Món kho", "Món nướng", "Món xào", "Món canh", "Món chấm"].map(
                (d) => (
                  <option key={d}>{d}</option>
                ),
              )}
            </select>
          </label>
        </div>
        <label className="search-field catalog-search">
          <Search size={19} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm gia vị theo tên…"
            aria-label="Tìm gia vị theo tên"
          />
        </label>
        <p className="small-muted" aria-live="polite">
          {list.length} sản phẩm minh họa
        </p>
        <div className="product-grid catalog-grid">
          {list.map((p) => (
            <Reveal key={p.slug} disabled={disabled}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        {!list.length && (
          <div className="empty-state">
            <Leaf />
            <h3>Chưa tìm thấy hương vị phù hợp.</h3>
            <button
              className="button"
              onClick={() => {
                setCategory("Tất cả");
                setDish("Mọi món ăn");
                setQ("");
              }}
            >
              Xóa bộ lọc <ArrowRight size={18} />
            </button>
          </div>
        )}
        <p className="asset-note">
          Bao bì, quy cách và mô tả là dữ liệu concept; chưa xác nhận thành phần, xuất xứ hoặc thông
          số SKU.
        </p>
      </section>
      <Connect />
    </>
  );
}
function ProductDetail({ slug, disabled }: { slug: string; disabled: boolean }) {
  const p = products.find((p) => p.slug === slug);
  if (!p)
    return (
      <section className="container section">
        <h1>Không tìm thấy sản phẩm.</h1>
        <ButtonLink to="/san-pham">Về danh mục</ButtonLink>
      </section>
    );
  return (
    <>
      <section className="container detail section">
        <div>
          <Link to="/san-pham" className="text-link">
            <ArrowLeft size={16} /> Bộ sưu tập gia vị
          </Link>
          <Packaging product={p} large />
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{p.category} · Ý TƯỞNG SẢN PHẨM</span>
          <h1>{p.name}</h1>
          <p className="flavor">{p.flavor}</p>
          <p>{p.description}</p>
          <div className="detail-spec">
            <span>Quy cách minh họa</span>
            <strong>{p.size}</strong>
          </div>
          <div className="detail-spec">
            <span>Gợi ý sử dụng</span>
            <strong>{p.dishes.join(" · ")}</strong>
          </div>
          <p className="notice">
            Chưa có dữ liệu SKU chính thức. Không suy luận thành phần, độ đạm, độ cay, chứng nhận
            hay công dụng từ bản mẫu này.
          </p>
          <ButtonLink to="/diem-ban">Tìm kênh mua hàng</ButtonLink>
          <details>
            <summary>Thành phần & thông tin sản phẩm</summary>
            <p>
              Chờ thông tin được Viettage phê duyệt: thành phần, dị ứng, nguồn gốc, hạn dùng, bảo
              quản và hướng dẫn sử dụng.
            </p>
          </details>
        </div>
      </section>
      <section className="container section">
        <span className="eyebrow">KẾT HỢP CÙNG HƯƠNG VỊ NÀY</span>
        <h2>
          Hôm nay, <em>nấu gì?</em>
        </h2>
        <div className="recipe-grid">
          {recipes
            .filter((r) => r.spices.includes(slug))
            .map((r) => (
              <Reveal key={r.slug} disabled={disabled}>
                <RecipeCard recipe={r} />
              </Reveal>
            ))}
        </div>
      </section>
    </>
  );
}
function RecipesPage({ disabled }: { disabled: boolean }) {
  const [type, setType] = useState("Tất cả");
  return (
    <>
      <PageTitle
        label="CẢM HỨNG CHO GIAN BẾP"
        title={
          <>
            Mỗi ngày một món.
            <br />
            <em>Mỗi món một niềm vui.</em>
          </>
        }
        text="Những công thức minh họa và cách kết hợp gia vị để bạn tìm cảm hứng cho bữa cơm hôm nay."
      />
      <section className="container section compact">
        <div className="tabs">
          {["Tất cả", "Món kho", "Món nướng", "Món chấm"].map((t) => (
            <button
              key={t}
              aria-pressed={type === t}
              className={type === t ? "active" : ""}
              onClick={() => setType(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="recipe-grid">
          {recipes
            .filter((r) => type === "Tất cả" || r.type === type)
            .map((r) => (
              <Reveal key={r.slug} disabled={disabled}>
                <RecipeCard recipe={r} />
              </Reveal>
            ))}
        </div>
      </section>
    </>
  );
}
function RecipeDetail({ slug }: { slug: string }) {
  const r = recipes.find((r) => r.slug === slug);
  const [saved, setSaved] = useState(() =>
    JSON.parse(localStorage.getItem("viettage-saved") || "[]").includes(slug),
  );
  if (!r)
    return (
      <section className="container section">
        <h1>Không tìm thấy công thức.</h1>
        <ButtonLink to="/cong-thuc">Về góc ẩm thực</ButtonLink>
      </section>
    );
  function save() {
    const current: string[] = JSON.parse(localStorage.getItem("viettage-saved") || "[]");
    localStorage.setItem(
      "viettage-saved",
      JSON.stringify(saved ? current.filter((s) => s !== slug) : [...current, slug]),
    );
    setSaved(!saved);
  }
  return (
    <section className="container section recipe-detail">
      <Link className="text-link" to="/cong-thuc">
        <ArrowLeft size={16} /> Góc ẩm thực
      </Link>
      <div className="recipe-detail-head">
        <div>
          <span className="eyebrow">
            {r.type} · {r.time} PHÚT
          </span>
          <h1>{r.name}</h1>
          <p>{r.intro}</p>
          <button className="button outline" aria-pressed={saved} onClick={save}>
            {saved ? <Check size={18} /> : <Bookmark size={18} />}{" "}
            {saved ? "Đã lưu trên thiết bị" : "Lưu công thức"}
          </button>
        </div>
        <img src={r.image} alt={r.name + " — ảnh tham khảo"} />
      </div>
      <div className="recipe-instructions">
        <aside>
          <h2>Nguyên liệu</h2>
          <ul>
            {r.ingredients.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <p className="notice">
            Công thức tham khảo, không phải hướng dẫn sử dụng SKU chính thức. Điều chỉnh theo dị ứng
            và khẩu vị của bạn.
          </p>
        </aside>
        <div>
          <h2>Cùng vào bếp</h2>
          {r.steps.map((s, i) => (
            <div className="step" key={s}>
              <span>0{i + 1}</span>
              <p>{s}</p>
            </div>
          ))}
          <h3>Gợi ý gia vị đi kèm</h3>
          <div className="recipe-spices">
            {products
              .filter((p) => r.spices.includes(p.slug))
              .map((p) => (
                <Link key={p.slug} to={`/san-pham/${p.slug}`}>
                  {p.name}
                  <ArrowUpRight size={17} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Stores() {
  const [city, setCity] = useState("TP. Hồ Chí Minh"),
    [channel, setChannel] = useState("Tất cả kênh");
  return (
    <>
      <PageTitle
        label="TÌM VIETTAGE GẦN BẠN"
        title={
          <>
            Một hương vị quen.
            <br />
            <em>Nhiều cách kết nối.</em>
          </>
        }
        text="Website định hướng giới thiệu thương hiệu và kết nối đến điểm bán, không thanh toán trực tiếp."
      />
      <section className="container section compact">
        <div className="store-filters">
          <label>
            Tỉnh / thành phố
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              {["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Tỉnh / thành khác"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Kênh mua hàng
            <select value={channel} onChange={(e) => setChannel(e.target.value)}>
              {["Tất cả kênh", "Cửa hàng / siêu thị", "Sàn thương mại điện tử"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="store-empty" aria-live="polite">
          <div className="map-art">
            <MapPin size={55} strokeWidth={1} />
            <span>VIETTAGE</span>
          </div>
          <div>
            <span className="eyebrow">
              {city} · {channel}
            </span>
            <h2>
              Điểm mua đang
              <br />
              <em>được cập nhật.</em>
            </h2>
            <p>
              Bản mẫu chưa có danh sách nhà phân phối, tồn kho hoặc gian hàng chính thức đã xác
              minh. Không hiển thị địa chỉ hay nút mua giả.
            </p>
            <a
              className="button"
              href="https://citifoods.com.vn/contact"
              target="_blank"
              rel="noreferrer"
            >
              Hỏi Citifoods về kênh mua <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <p className="asset-note">
          Khi có dữ liệu thật: kết quả sẽ gồm địa chỉ, giờ mở cửa, hotline, chỉ đường và liên kết
          gian hàng chính thức.
        </p>
      </section>
      <Connect />
    </>
  );
}
function Contact() {
  const [sent, setSent] = useState(false),
    [name, setName] = useState("");
  return (
    <>
      <PageTitle
        label="KẾT NỐI & HỢP TÁC"
        title={
          <>
            Cùng đưa vị Việt
            <br />
            <em>đến nhiều gian bếp.</em>
          </>
        }
        text="Dành cho nhà phân phối, đối tác F&B và những người muốn tìm hiểu thêm về Viettage."
      />
      <section className="container contact-section section compact">
        <aside>
          <span className="eyebrow">CITIFOODS · THÔNG TIN CÔNG KHAI</span>
          <h2>
            Bắt đầu từ
            <br />
            <em>một cuộc trò chuyện.</em>
          </h2>
          <a href="mailto:info@citifoods.com.vn">
            <Mail size={20} />
            info@citifoods.com.vn
          </a>
          <a href="tel:+84845599969">
            <Phone size={20} />
            +84 845 599 969
          </a>
          <p>
            Thông tin liên hệ đối chiếu từ website Citifoods. Form bên cạnh chỉ mô phỏng trải
            nghiệm, không gửi dữ liệu.
          </p>
          <a
            href="https://citifoods.com.vn/contact"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Trang liên hệ chính thức <ArrowUpRight size={18} />
          </a>
        </aside>
        <div className="form-panel">
          {sent ? (
            <div className="form-confirm" aria-live="polite">
              <Check size={40} />
              <h2>
                Cảm ơn, <em>{name}.</em>
              </h2>
              <p>
                Bạn đã hoàn tất form minh họa. Thông tin{" "}
                <strong>chưa được gửi hoặc lưu lên máy chủ</strong>. Để liên hệ thật, hãy dùng email
                hoặc website Citifoods.
              </p>
              <button className="button" onClick={() => setSent(false)}>
                Nhập lại <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h3>Chia sẻ nhu cầu hợp tác</h3>
              <p className="small-muted">FORM TRẢI NGHIỆM · KHÔNG GỬI DỮ LIỆU</p>
              <div className="form-grid">
                <label>
                  Họ và tên *
                  <input
                    aria-label="Họ và tên"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tên của bạn"
                    maxLength={100}
                  />
                </label>
                <label>
                  Email *<input aria-label="Email" required type="email" placeholder="ban@congty.vn" />
                </label>
                <label>
                  Công ty
                  <input aria-label="Công ty" placeholder="Tên doanh nghiệp" />
                </label>
                <label>
                  Vai trò
                  <select>
                    <option>Nhà phân phối / đại lý</option>
                    <option>Nhà hàng / đối tác F&B</option>
                    <option>Người tiêu dùng</option>
                    <option>Khác</option>
                  </select>
                </label>
              </div>
              <label>
                Nhu cầu hợp tác *
                <textarea
                  aria-label="Nhu cầu hợp tác"
                  required
                  rows={4}
                  placeholder="Khu vực phân phối, nhóm sản phẩm quan tâm…"
                  maxLength={2000}
                />
              </label>
              <label className="checkbox">
                <input aria-label="Tôi hiểu đây là bản mẫu và thông tin không được gửi" type="checkbox" required />
                Tôi hiểu đây là bản mẫu và thông tin không được gửi.
              </label>
              <button className="button" type="submit">
                Xem bước hoàn tất <ArrowUpRight size={18} />
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
