import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Lightbulb,
  FileText,
  Rocket,
  Clock,
} from "lucide-react";

const IOS_SPRING = { type: "spring", stiffness: 300, damping: 28 };

const BUDGETS = [
  "< $1.000 USD",
  "$1.000 – $3.000 USD",
  "$3.000 – $8.000 USD",
  "> $8.000 USD",
  "Lo defino con la propuesta",
];
const TYPES = [
  "Aplicación Web",
  "App Móvil",
  "API / Backend",
  "Dashboard Admin",
  "Software a Medida",
  "Consultoría técnica",
];

const STEPS = [
  { icon: Phone, label: "Hablamos", desc: "Llamada de 30 min" },
  { icon: Lightbulb, label: "Proponemos", desc: "Propuesta técnica" },
  { icon: FileText, label: "Acordamos", desc: "Contrato claro" },
  { icon: Rocket, label: "Construimos", desc: "Kickoff ágil" },
];

export default function CtaSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    type: "",
    message: "",
    privacy: false,
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  const canSubmit = form.name && form.email && form.message && form.privacy;

  return (
    <section
      id="contacto"
      className="bg-[#09090b] relative overflow-hidden"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "60px 0",
      }}
    >
      {/* Glow naranja */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "30%",
            width: 500,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "20%",
            width: 350,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={IOS_SPRING}
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
            ¡Asesoría Gratis!
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            ¿Listo para transformar
            <br />
            <span className="text-orange-400">tu idea en software?</span>
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto text-sm">
            Cuéntanos tu proyecto. Te respondemos en menos de 24 horas.
          </p>
        </motion.div>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          {/* ── Formulario ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...IOS_SPRING, delay: 0.1 }}
            className="relative rounded-2xl border border-white/8 bg-[#111113] overflow-hidden"
            style={{ flex: 1, minWidth: 0 }}
          >
            {/* Glow top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            <div className="p-6">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={IOS_SPRING}
                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ ...IOS_SPRING, delay: 0.1 }}
                      className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center"
                    >
                      <CheckCircle size={28} className="text-orange-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-zinc-400 text-sm max-w-xs">
                      Te responderemos en menos de 24 horas con una propuesta
                      personalizada.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          budget: "",
                          type: "",
                          message: "",
                          privacy: false,
                        });
                      }}
                      className="text-xs text-zinc-400 hover:text-zinc-400 transition-colors mt-2"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                  >
                    {/* Fila 1 */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1 block">
                          Nombre *
                        </label>
                        <input
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          required
                          placeholder="Tu nombre completo"
                          className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition-colors"
                          style={{
                            color: "#fff",
                            background: "rgba(255,255,255,0.06)",
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1 block">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          required
                          placeholder="tu@email.com"
                          className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition-colors"
                          style={{
                            color: "#fff",
                            background: "rgba(255,255,255,0.06)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Fila 2 */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1 block">
                          WhatsApp
                        </label>
                        <input
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+57 300 000 0000"
                          className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition-colors"
                          style={{
                            color: "#fff",
                            background: "rgba(255,255,255,0.06)",
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1 block">
                          Presupuesto
                        </label>
                        <select
                          value={form.budget}
                          onChange={(e) => update("budget", e.target.value)}
                          className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/60 transition-colors"
                          style={{
                            color: "#fff",
                            background: "rgba(255,255,255,0.06)",
                          }}
                          style={{ color: form.budget ? "#fff" : "#52525b" }}
                        >
                          <option value="" disabled className="bg-[#111113]">
                            Seleccionar
                          </option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b} className="bg-[#111113]">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Tipo */}
                    <div>
                      <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1.5 block">
                        Tipo de proyecto
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {TYPES.map((t) => (
                          <motion.button
                            type="button"
                            key={t}
                            onClick={() => update("type", t)}
                            whileTap={{ scale: 0.95 }}
                            transition={IOS_SPRING}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all"
                            style={{
                              borderColor:
                                form.type === t
                                  ? "#F97316"
                                  : "rgba(255,255,255,0.08)",
                              background:
                                form.type === t
                                  ? "rgba(249,115,22,0.1)"
                                  : "rgba(255,255,255,0.02)",
                              color: form.type === t ? "#fff" : "#71717a",
                            }}
                          >
                            {t}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1 block">
                        Cuéntanos tu proyecto *
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        required
                        rows={6}
                        placeholder="Describe tu idea, qué problema resuelve y qué funcionalidades necesitas..."
                        className="w-full rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none resize-none transition-colors"
                        style={{
                          color: "#fff",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />
                    </div>

                    {/* Privacy + submit */}
                    <div className="flex items-start gap-2">
                      <button
                        type="button"
                        onClick={() => update("privacy", !form.privacy)}
                        className="mt-0.5 shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-all"
                        style={{
                          borderColor: form.privacy
                            ? "#F97316"
                            : "rgba(255,255,255,0.2)",
                          background: form.privacy ? "#F97316" : "transparent",
                        }}
                      >
                        {form.privacy && (
                          <CheckCircle size={10} className="text-white" />
                        )}
                      </button>
                      <p className="text-[10px] text-zinc-400 leading-relaxed">
                        Acepto la Política de Privacidad y autorizo el
                        tratamiento de mis datos personales.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={!canSubmit || loading}
                      whileHover={canSubmit ? { scale: 1.02 } : {}}
                      whileTap={canSubmit ? { scale: 0.97 } : {}}
                      transition={IOS_SPRING}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                      style={{
                        background: canSubmit
                          ? "linear-gradient(135deg,#F97316,#EA580C)"
                          : "rgba(255,255,255,0.06)",
                        color: canSubmit ? "#fff" : "#52525b",
                        cursor: canSubmit ? "pointer" : "not-allowed",
                        boxShadow: canSubmit
                          ? "0 0 30px rgba(249,115,22,0.25)"
                          : "none",
                      }}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Send size={14} /> Enviar mensaje
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[10px] text-zinc-500 mt-6">
                      Sin compromisos. Sin llamadas de ventas agresivas.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Sidebar derecho ── */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...IOS_SPRING, delay: 0.15 }}
            style={{ width: 360, flexShrink: 0 }}
          >
            {/* Qué pasa después */}
            <div className="rounded-2xl border border-white/8 bg-[#111113] p-5">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                ¿Qué pasa después?
              </p>
              <div className="flex flex-col gap-3">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...IOS_SPRING, delay: i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {s.label}
                        </p>
                        <p className="text-[10px] text-zinc-400">{s.desc}</p>
                      </div>
                      {i < STEPS.length - 1 && (
                        <ArrowRight
                          size={12}
                          className="text-zinc-500 ml-auto"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Contacto directo */}
            <div className="rounded-2xl border border-white/8 bg-[#111113] p-5 flex flex-col gap-3">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Contacto directo
              </p>
              {[
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+57 300 000 0000",
                  href: "https://wa.me/573000000000",
                  color: "#25D366",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "hola@devpro.app",
                  href: "mailto:hola@devpro.app",
                  color: "#F97316",
                },
                {
                  icon: MapPin,
                  label: "Ubicación",
                  value: "Colombia 🇨🇴",
                  href: "#",
                  color: "#60a5fa",
                },
                {
                  icon: Clock,
                  label: "Respuesta",
                  value: "< 24 horas",
                  href: "#",
                  color: "#34d399",
                },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    whileHover={{ x: 3 }}
                    transition={IOS_SPRING}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: `${c.color}15`,
                        border: `1px solid ${c.color}25`,
                      }}
                    >
                      <Icon size={13} style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400">{c.label}</p>
                      <p className="text-xs font-medium text-white group-hover:text-orange-400 transition-colors">
                        {c.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Badge */}
            <div className="text-center">
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Solo aceptamos proyectos donde
                <br />
                podemos marcar la diferencia ✨
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
