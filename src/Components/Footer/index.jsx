import { motion } from "framer-motion";
import { Code2, GitBranch, Mail, ExternalLink, Phone, MapPin, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Servicios",    href: "#servicios"    },
  { label: "Proceso",      href: "#proceso"       },
  { label: "Proyectos",    href: "#proyectos"     },
  { label: "Testimonios",  href: "#testimonios"   },
  { label: "Tecnologías",  href: "#tecnologias"   },
  { label: "Contacto",     href: "#contacto"      },
];

const socials = [
  { icon: ExternalLink, label: "LinkedIn", href: "#" },
  { icon: GitBranch, label: "GitHub",  href: "#" },
  { icon: Mail,      label: "Email",   href: "mailto:tu@email.com" },
];

const SPRING = { type: "spring", stiffness: 300, damping: 28 };

export default function Footer() {
  return (
    <footer
      style={{ background: "#09090b", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      className="relative overflow-hidden"
    >
      {/* Glow ambiental */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: 700, height: 300,
          background: "radial-gradient(ellipse, rgba(249,115,22,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">

        {/* ── Top: marca + nav + contacto ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-14">

          {/* Marca */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5 w-fit">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
              >
                <Code2 size={17} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Dev<span style={{ color: "#F97316" }}>Pro</span>
              </span>
            </a>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.4)", maxWidth: 280 }}>
              Transformo ideas en software escalable. Código limpio, arquitectura sólida, entrega real.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.08 }}
                  transition={SPRING}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.45)",
                  }}
                  className="hover:!border-orange-500/40 hover:!text-orange-400 transition-colors duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Navegación
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-150 group flex items-center gap-1"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span className="group-hover:text-white transition-colors">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Contacto
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { icon: Mail,    text: "tu@email.com"       },
                { icon: Phone,   text: "+57 300 000 0000"   },
                { icon: MapPin,  text: "Colombia"            },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <Icon size={14} style={{ color: "#F97316", flexShrink: 0 }} />
                  {text}
                </li>
              ))}
            </ul>

            <motion.a
              href="#contacto"
              whileHover={{ x: 2 }}
              transition={SPRING}
              className="inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "#F97316" }}
            >
              Hablemos
              <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            © {new Date().getFullYear()} DevPro. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
            Hecho con ☕ y código limpio.
          </p>
        </div>

      </div>
    </footer>
  );
}
