import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import ButtonPrimary from "../UI/ButtonPrimary";

const navLinks = [
  { label: "Servicios",   href: "#servicios" },
  { label: "Proceso",     href: "#proceso" },
  { label: "Proyectos",   href: "#proyectos" },
  { label: "Contacto",    href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [hovered, setHovered]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Cuando no ha hecho scroll → navbar completa
  // Cuando ha hecho scroll → pastilla pequeña que se expande en hover
  const isCollapsed = scrolled && !hovered;
  const isExpanded  = !scrolled || hovered;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">

      <motion.nav
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          width: isCollapsed ? "auto" : undefined,
          paddingLeft: isCollapsed ? "14px" : undefined,
          paddingRight: isCollapsed ? "14px" : undefined,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className={`
          relative flex items-center justify-between gap-6
          h-12 rounded-2xl border border-white/10
          backdrop-blur-xl cursor-pointer
          transition-shadow duration-300
          ${scrolled
            ? "bg-[#09090b]/90 shadow-lg shadow-black/30"
            : "bg-white/[0.03]"}
          ${isCollapsed ? "px-4" : "px-4 w-full max-w-3xl"}
        `}
      >
        {/* Logo — siempre visible */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center">
            <Code2 size={13} className="text-white" />
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">
            DevPro
          </span>
        </a>

        {/* Contenido expandible */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="nav-content"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-4 overflow-hidden"
            >
              {/* Links desktop */}
              <ul className="hidden md:flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/8 transition-all duration-150 whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Acciones */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <ButtonPrimary
                  href="#contacto"
                  className="hidden sm:inline-flex !text-xs !px-3.5 !py-1.5 !rounded-lg whitespace-nowrap"
                >
                  Cotizar
                </ButtonPrimary>

                {/* Mobile toggle */}
                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/8 transition-colors"
                >
                  {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de collapsed */}
        <AnimatePresence>
          {isCollapsed && (
            <motion.div
              key="collapsed-dot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"
            />
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[68px] left-4 right-4 rounded-2xl border border-white/10 bg-[#09090b]/90 backdrop-blur-xl p-3 shadow-xl shadow-black/30"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/8 rounded-lg transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t border-white/8">
              <ButtonPrimary href="#contacto" className="w-full justify-center !text-sm">
                Solicitar cotización
              </ButtonPrimary>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
