# DevPro-DEV — Project Map

> Generado: 2026-06-16 | Stack: React 19 + Vite + Tailwind CSS + Framer Motion

---

## Arquitectura general

```
src/
├── App.jsx                         ← Root: ThemeProvider + LandingView
├── main.jsx                        ← Entry point (StrictMode)
├── index.css                       ← Tailwind, smooth scroll, snap sections, marquee keyframe
├── Context/
│   └── ThemeContext/index.jsx      ← { theme, toggleTheme } — dark/light (localStorage)
├── Hooks/
│   └── useScrollAnimation.jsx      ← { ref, inView } — Intersection Observer
├── lib/
│   └── utils.js                    ← cn(...classes), formatDate(date)
├── data/
│   ├── process.js                  ← processSteps (6 pasos)
│   ├── services.js                 ← services (6 servicios)
│   ├── projects.js                 ← projects (6 proyectos)
│   ├── technologies.js             ← techGroups (Backend/Frontend/DevOps/Tools)
│   └── testimonials.js             ← testimonials (3 clientes)
├── animations/
│   ├── FadeInUp/index.jsx          ← Fade + slide-up on viewport enter
│   ├── SplitText/index.jsx         ← Word-by-word stagger con blur
│   ├── RotatingText/index.jsx      ← Cicla palabras con stagger por caracter
│   ├── StaggerContainer/index.jsx  ← Container + Item para listas staggered
│   ├── CycleText/index.jsx         ← Cicla texto con blur + slide (no usado actualmente)
│   ├── ScrollFloat/index.jsx       ← Letras entran con scale+blur sincronizadas al scroll
│   ├── SectionReveal/index.jsx     ← Scale+opacity+blur al scroll-into-view (usado en varias secciones)
│   ├── AuroraBackground/index.jsx  ← 3 blobs animados + textura SVG ruido
│   └── CurvedLoop/index.jsx        ← Texto curvo SVG animado (draggable)
├── Components/
│   ├── Navbar/index.jsx            ← Sticky navbar: logo + links + ThemeToggle + CTA; se convierte en pill al scroll
│   ├── Footer/index.jsx            ← Marca + nav (2 col) + contacto + socials + copyright
│   ├── QuoteChat/index.jsx         ← Chat flotante bottom-right, 5 pasos (nombre→tipo→descripción→presupuesto→email)
│   ├── Cube3D/index.jsx            ← Cubo 3D React-Three-Fiber (.NET/React/C#/Azure/SQL/API) + badges flotantes
│   ├── DeviceShowcase/index.jsx    ← MacBook CSS + iPhone CSS, métricas animadas (actualiza c/3s), parallax mouse
│   ├── LaptopMockup/index.jsx      ← MacBook standalone con dashboard + barras animadas
│   ├── StackCards/index.jsx        ← 6 tarjetas apiladas auto-rotantes (Velocity/Quality/Commitment/…)
│   ├── MarqueeBand/index.jsx       ← Band infinita scrolling con 12 badges de tech/features
│   ├── ThemeToggle/index.jsx       ← Botón Sol/Luna para alternar tema
│   └── UI/
│       ├── Badge/index.jsx         ← Badge inline: variants (default, blue, indigo, green)
│       ├── ButtonPrimary/index.jsx ← Botón naranja con hover scale + glow
│       ├── ButtonOutline/index.jsx ← Botón outline con border + backdrop blur
│       └── SectionTitle/index.jsx  ← Header de sección reutilizable: badge + title + highlight + subtitle
└── Pages/
    └── Landing/
        ├── View/index.jsx          ← Orquestador: Navbar → secciones → Footer + QuoteChat flotante
        └── Components/
            ├── HeroSection/        ← Hero: RotatingText + DeviceShowcase + AuroraBackground + scroll indicator
            ├── ServicesSection/    ← 6 servicios en snap slides, texto|línea|card, conector naranja animado
            ├── ProcessSection/     ← Timeline horizontal 6 pasos, progress bar hover-driven, grid-cols-6
            ├── ProjectsSection/    ← 4 project cards (2x2) + Logo Generator (SVG/PNG download)
            ├── TestimonialsSection/← 3 tarjetas glassmorphism horizontales, card central destacada
            ├── CtaSection/         ← Formulario de contacto (nombre/email/teléfono/presupuesto/tipo/mensaje)
            ├── BenefitsSection/    ← 7 beneficios + 3 stats (+15 proyectos / +3 años / 100% entregas)
            ├── TechSection/        ← Badges agrupados por categoría (Backend/.NET, Frontend/React, DevOps, Tools)
            └── LogoBar/            ← Marquee horizontal de logos de tecnologías
```

---

## Layout de la página

```
Navbar (sticky, transparente → pill al scroll)
│
├── HeroSection        (snap-section)
├── ServicesSection    (maneja su propio snap internamente por servicio)
├── ProcessSection     (snap-section)
├── BenefitsSection    (snap-section)
├── TechSection        (snap-section)
├── ProjectsSection    (snap-section)
├── TestimonialsSection(snap-section)
├── CtaSection         (snap-section)
└── Footer

QuoteChat (flotante, fixed bottom-right, z-50)
```

---

## Colores del design system

| Token | Valor | Uso |
|-------|-------|-----|
| Fondo base | `#09090b` | Todas las secciones dark |
| Naranja primario | `#F97316` | CTAs, highlights, accents |
| Naranja oscuro | `#EA580C` | Hover, gradientes |
| Borde sutil | `rgba(255,255,255,0.08)` | Bordes de cards |
| Texto secundario | `rgba(255,255,255,0.4–0.5)` | Subtítulos, body |

---

## Animaciones disponibles

| Componente | Cuándo usar |
|------------|-------------|
| `SectionReveal` | Wrap de toda una sección para revelar al scroll |
| `FadeInUp` | Ítems individuales dentro de una sección |
| `SectionTitle` | Ya incluye FadeInUp internamente |
| `RotatingText` | Ciclar palabras clave en títulos |
| `StaggerContainer` | Listas o grids que entran escalonados |
| `AuroraBackground` | Fondo animado para secciones hero/destacadas |

---

## Formularios

- `CtaSection`: formulario estático con validación visual básica (sin librería — validación manual)
- `QuoteChat`: flujo conversacional de 5 pasos con estado local
- **Sin backend conectado** — ambos formularios son frontend only

---

## Scroll behavior

- `scroll-snap-type: y proximity` en `html` (index.css)
- Cada sección principal tiene clase `snap-section`
- ServicesSection maneja su propio snap interno (intro + 6 slides de servicio)
- Anchor links: `#servicios` `#proceso` `#tecnologias` `#proyectos` `#contacto`

---

## Pendiente / Issues conocidos

- Formulario CtaSection y QuoteChat sin backend → pendiente conectar API o servicio de email
- `CycleText` animation definida pero sin uso activo → candidato a eliminar
- `LaptopMockup` componente duplicado con `DeviceShowcase` — revisar si ambos se usan
- Assets `hero.png`, `react.svg`, `vite.svg` — verificar si están en uso activo
- Light mode incompleto — ThemeContext existe pero pocas secciones tienen estilos light
