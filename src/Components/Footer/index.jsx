import { Code2, ExternalLink, GitBranch, Mail } from "lucide-react";

const footerLinks = {
  Servicios: ["APIs REST", "Apps Web", "Software a Medida", "Integraciones", "Consultoría", "Dashboards"],
  Empresa:   ["Proceso de trabajo", "Proyectos", "Testimonios"],
};

const socials = [
  { icon: ExternalLink, label: "LinkedIn", href: "#" },
  { icon: GitBranch,    label: "GitHub",   href: "#" },
  { icon: Mail,         label: "Email",    href: "mailto:tu@email.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#06000D] border-t border-purple-900/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Marca */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="font-bold text-white text-base">
                Dev<span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Pro</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Transformo ideas en soluciones de software escalables. Código limpio, arquitectura sólida, entrega real.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-purple-900/30 hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>📧 tu@email.com</li>
              <li>💬 +57 300 000 0000</li>
              <li>📍 Colombia</li>
            </ul>
            <a
              href="#contacto"
              className="inline-block mt-5 px-4 py-2 rounded-lg border border-orange-500/40 text-orange-400 text-sm font-medium hover:bg-orange-500/10 transition-all"
            >
              Hablemos →
            </a>
          </div>
        </div>

        <div className="border-t border-purple-900/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DevPro. Todos los derechos reservados.</p>
          <p>Hecho con pasión y mucho ☕</p>
        </div>
      </div>
    </footer>
  );
}
