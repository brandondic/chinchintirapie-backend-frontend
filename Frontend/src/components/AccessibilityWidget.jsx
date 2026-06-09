import { useState } from "react";

const icons = {
  contraste: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" stroke="none"/></svg>),
  texto: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V5h16v2" strokeLinecap="round"/><path d="M9 5v14" strokeLinecap="round"/><path d="M15 5v14" strokeLinecap="round"/><path d="M9 12h6" strokeLinecap="round"/></svg>),
  enlaces: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>),
  cursor: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l7.07 17 2.51-7.39L21 11.07z"/></svg>),
  animaciones: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>),
  imagenes: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/><line x1="4" y1="4" x2="20" y2="20" strokeWidth="2.5" stroke="red"/></svg>),
  dislexia: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><text x="2" y="16" fontSize="13" fontWeight="bold" stroke="none" fill="currentColor" fontFamily="serif">Df</text><line x1="2" y1="19" x2="14" y2="19" strokeWidth="2"/><path d="M17 8c0-2 1.5-3 3-2s2 3 0 4l-3 2v2" strokeLinecap="round"/><circle cx="20" cy="18" r="1" fill="currentColor" stroke="none"/></svg>),
  espaciado: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10H3M21 6H3M21 14H3M21 18H3"/></svg>),
  linea: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6" strokeDasharray="2 2"/><line x1="3" y1="18" x2="21" y2="18" strokeDasharray="2 2"/></svg>),
  saturacion: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L12 22M12 2C12 2 19 8 19 14a7 7 0 0 1-14 0C5 8 12 2 12 2z"/></svg>),
  info: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3"/></svg>),
  alineado: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>),
};

const IconoAccesibilidad = ({ color = "black", size = 28 }) => (
  <svg viewBox="0 0 68 68" fill="none" width={size} height={size}>
    <circle cx="34" cy="34" r="31" stroke={color} strokeWidth="4.5"/>
    <circle cx="34" cy="15" r="6" fill={color}/>
    <path d="M34 21 L34 42" stroke={color} strokeWidth="7" strokeLinecap="round"/>
    <path d="M34 30 L16 23" stroke={color} strokeWidth="6.5" strokeLinecap="round"/>
    <path d="M34 30 L52 23" stroke={color} strokeWidth="6.5" strokeLinecap="round"/>
    <path d="M34 42 L22 58" stroke={color} strokeWidth="6.5" strokeLinecap="round"/>
    <path d="M34 42 L46 58" stroke={color} strokeWidth="6.5" strokeLinecap="round"/>
  </svg>
);

const menuOptions = [
  { id: "contraste",   label: "Contraste +",           icon: icons.contraste,   action: "toggle-contrast" },
  { id: "enlaces",     label: "Resaltar enlaces",       icon: icons.enlaces,     action: "toggle-links" },
  { id: "espaciado",   label: "Espaciado de texto",     icon: icons.espaciado,   action: "toggle-spacing" },
  { id: "animaciones", label: "Reproducir animaciones", icon: icons.animaciones, action: "toggle-animations" },
  { id: "imagenes",    label: "Ocultar imágenes",       icon: icons.imagenes,    action: "toggle-images" },
  { id: "dislexia",    label: "Apto para dislexia",     icon: icons.dislexia,    action: "toggle-dyslexia" },
  { id: "cursor",      label: "Cursor grande",          icon: icons.cursor,      action: "toggle-cursor" },
  { id: "info",        label: "Información",            icon: icons.info,        action: "show-info" },
  { id: "linea",       label: "Altura de la línea",     icon: icons.linea,       action: "toggle-lineheight" },
  { id: "alineado",    label: "Texto alineado",         icon: icons.alineado,    action: "toggle-align" },
  { id: "saturacion",  label: "Saturación",             icon: icons.saturacion,  action: "toggle-saturation" },
];

function applyAccessibility(action, isActive) {
  const root = document.documentElement;
  const toggleClass = (cls) => isActive ? root.classList.add(cls) : root.classList.remove(cls);
  switch (action) {
    case "toggle-contrast":   toggleClass("a11y-contrast"); break;
    case "toggle-links":      toggleClass("a11y-links"); break;
    case "toggle-spacing":    toggleClass("a11y-spacing"); break;
    case "toggle-animations": toggleClass("a11y-animations"); break;
    case "toggle-images":     toggleClass("a11y-no-images"); break;
    case "toggle-dyslexia":   toggleClass("a11y-dyslexia"); break;
    case "toggle-cursor":     toggleClass("a11y-cursor"); break;
    case "toggle-lineheight": toggleClass("a11y-lineheight"); break;
    case "toggle-align":      toggleClass("a11y-align"); break;
    case "toggle-saturation": toggleClass("a11y-saturation"); break;
    default: break;
  }
}

// Cursor SVG grande encodado correctamente en base64
const CURSOR_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'><path fill='black' stroke='white' stroke-width='1' d='M4 4l7.07 17 2.51-7.39L21 11.07z'/></svg>`;
const CURSOR_B64 = btoa(CURSOR_SVG);
const CURSOR_URL = `url("data:image/svg+xml;base64,${CURSOR_B64}") 0 0, auto`;

const globalStyles = `
  html.a11y-contrast body :not(.a11y-widget, .a11y-widget *) { filter: contrast(150%) brightness(110%); }
  html.a11y-links a:not(.a11y-widget a, .a11y-widget *) { outline: 3px solid #ff0 !important; background: #000 !important; color: #ff0 !important; }
  html.a11y-text-md *:not(.a11y-widget, .a11y-widget *) { font-size: 115% !important; }
  html.a11y-text-lg *:not(.a11y-widget, .a11y-widget *) { font-size: 130% !important; }
  html.a11y-text-xl *:not(.a11y-widget, .a11y-widget *) { font-size: 150% !important; }
  html.a11y-spacing *:not(.a11y-widget, .a11y-widget *) { letter-spacing: 0.12em !important; word-spacing: 0.2em !important; }
  html.a11y-animations *:not(.a11y-widget, .a11y-widget *),
  html.a11y-animations *:not(.a11y-widget, .a11y-widget *)::before,
  html.a11y-animations *:not(.a11y-widget, .a11y-widget *)::after { animation: none !important; transition: none !important; }
  html.a11y-no-images img:not(.a11y-widget img, .a11y-widget *) { visibility: hidden !important; }
  html.a11y-dyslexia *:not(.a11y-widget, .a11y-widget *) { font-family: "Lexend", "OpenDyslexic", "Comic Sans MS", cursive !important; letter-spacing: 0.05em !important; word-spacing: 0.15em !important; line-height: 1.8 !important; }
  html.a11y-lineheight *:not(.a11y-widget, .a11y-widget *) { line-height: 2 !important; }
  html.a11y-align *:not(.a11y-widget, .a11y-widget *) { text-align: left !important; }
  html.a11y-saturation body :not(.a11y-widget, .a11y-widget *) { filter: grayscale(100%); }
`;

// El cursor se aplica via JS directamente para evitar problemas con data URI en CSS
function applyCursorStyle(isActive) {
  const style = document.getElementById("a11y-cursor-style") || (() => {
    const s = document.createElement("style");
    s.id = "a11y-cursor-style";
    document.head.appendChild(s);
    return s;
  })();
  if (isActive) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'><path fill='black' stroke='white' stroke-width='1.5' d='M4 4l7.07 17 2.51-7.39L21 11.07z'/></svg>`;
    const encoded = encodeURIComponent(svg);
    style.textContent = `*:not(.a11y-widget, .a11y-widget *) { cursor: url("data:image/svg+xml,${encoded}") 4 4, auto !important; }`;
  } else {
    style.textContent = "";
  }
}

let stylesInjected = false;
function injectGlobalStyles() {
  if (stylesInjected) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&display=swap";
  document.head.appendChild(link);
  const style = document.createElement("style");
  style.textContent = globalStyles;
  document.head.appendChild(style);
  stylesInjected = true;
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState({});
  const [textSize, setTextSize] = useState(0);

  injectGlobalStyles();

  const toggle = (opt) => {
    const next = !active[opt.id];
    setActive((prev) => ({ ...prev, [opt.id]: next }));
    // El cursor se maneja aparte con JS
    if (opt.action === "toggle-cursor") {
      applyCursorStyle(next);
    } else {
      applyAccessibility(opt.action, next);
    }
  };

  const changeTextSize = (level) => {
    const root = document.documentElement;
    root.classList.remove("a11y-text-md", "a11y-text-lg", "a11y-text-xl");
    if (level === 1) root.classList.add("a11y-text-md");
    if (level === 2) root.classList.add("a11y-text-lg");
    if (level === 3) root.classList.add("a11y-text-xl");
    setTextSize(level);
  };

  const resetAll = () => {
    setActive({});
    setTextSize(0);
    applyCursorStyle(false);
    document.documentElement.className = document.documentElement.className
      .split(" ").filter((c) => !c.startsWith("a11y-")).join(" ");
  };

  return (
    <>
      <div role="dialog" aria-label="Menú de accesibilidad" className="a11y-widget" style={{
        position: "fixed", top: 0, right: open ? 0 : "-340px", width: "320px",
        height: "100vh", background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,.18)",
        zIndex: 99999, transition: "right .35s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif", overflowY: "auto",
      }}>
        <div style={{ background: "#1a56db", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <IconoAccesibilidad color="white" size={30} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, flex: 1 }}>Menú de Accesibilidad</span>
          <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,.2)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: 16, flex: 1 }}>

          <div style={{ gridColumn: "1 / -1", background: textSize > 0 ? "#eef2ff" : "#f9fafb", border: textSize > 0 ? "2px solid #1a56db" : "2px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", transition: "all .2s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 22, height: 22, color: textSize > 0 ? "#1a56db" : "#374151" }}>{icons.texto}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: textSize > 0 ? "#1a56db" : "#374151" }}>Tamaño de texto</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { level: 0, size: 12, desc: "Normal" },
                { level: 1, size: 15, desc: "Mediano" },
                { level: 2, size: 19, desc: "Grande" },
                { level: 3, size: 24, desc: "Muy grande" },
              ].map(({ level, size, desc }) => (
                <button key={level} onClick={() => changeTextSize(level)} aria-pressed={textSize === level}
                  style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: textSize === level ? "2px solid #1a56db" : "2px solid #e5e7eb", background: textSize === level ? "#dbeafe" : "#fff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, transition: "all .15s" }}>
                  <span style={{ fontSize: size, fontWeight: 700, color: textSize === level ? "#1a56db" : "#374151", lineHeight: 1 }}>A</span>
                  <span style={{ fontSize: 9, color: textSize === level ? "#1a56db" : "#9ca3af", textAlign: "center" }}>{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {menuOptions.map((opt) => (
            <button key={opt.id} onClick={() => toggle(opt)} aria-pressed={!!active[opt.id]}
              style={{ background: active[opt.id] ? "#eef2ff" : "#f9fafb", border: active[opt.id] ? "2px solid #1a56db" : "2px solid #e5e7eb", borderRadius: 12, padding: "14px 8px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all .2s", position: "relative" }}>
              {active[opt.id] && (
                <span style={{ position: "absolute", top: 6, right: 8, background: "#1a56db", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
              )}
              <span className="a11y-icon" style={{ width: 32, height: 32, color: active[opt.id] ? "#1a56db" : "#374151" }}>{opt.icon}</span>
              <span style={{ fontSize: 12, color: active[opt.id] ? "#1a56db" : "#374151", fontWeight: active[opt.id] ? 700 : 500, textAlign: "center", lineHeight: 1.3 }}>{opt.label}</span>
            </button>
          ))}
        </div>

        <div style={{ padding: "10px 16px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={resetAll} style={{ background: "#1a56db", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Restablecer</button>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>Accesibilidad web</span>
        </div>
      </div>

      <button onClick={() => setOpen((v) => !v)} aria-label="Abrir menú de accesibilidad" aria-expanded={open}
        style={{ position: "fixed", bottom: 96, right: 28, width: 56, height: 56, borderRadius: "50%", background: "#FFD600", color: "#000", border: "3px solid #fff", boxShadow: "0 4px 20px rgba(255,214,0,.5)", cursor: "pointer", zIndex: 99998, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .2s, box-shadow .2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.12)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(255,214,0,.7)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,214,0,.5)"; }}>
        <IconoAccesibilidad color="black" size={34} />
      </button>
    </>
  );
}