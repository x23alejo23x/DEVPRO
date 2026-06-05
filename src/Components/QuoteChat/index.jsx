import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send, Sparkles } from "lucide-react";

/* ─── Flujo de conversación ─── */
const FLOW = [
  {
    id: "welcome",
    ai: "¡Hola! 👋 Soy el asistente de **DevPro**. Puedo ayudarte a cotizar tu proyecto de software en menos de 2 minutos.\n\n¿Cuál es tu nombre?",
    inputType: "text",
    placeholder: "Escribe tu nombre...",
    nextKey: "name",
  },
  {
    id: "project",
    ai: (name) => `Hola **${name}**! 🚀\n\n¿Qué tipo de proyecto necesitas desarrollar?`,
    inputType: "options",
    options: ["API / Backend", "Aplicación Web", "Dashboard admin", "Software a Medida", "Integración de sistemas", "Quiero asesoría primero"],
    nextKey: "project",
  },
  {
    id: "description",
    ai: (_, answers) => `Entendido, **${answers.project}**.\n\nCuéntame brevemente de qué se trata tu idea o el problema que quieres resolver:`,
    inputType: "text",
    placeholder: "Describe tu proyecto...",
    nextKey: "description",
  },
  {
    id: "budget",
    ai: () => "¿Tienes un presupuesto estimado en mente?",
    inputType: "options",
    options: ["< $1.000 USD", "$1.000 – $3.000 USD", "$3.000 – $8.000 USD", "> $8.000 USD", "Lo defino con la propuesta"],
    nextKey: "budget",
  },
  {
    id: "contact",
    ai: () => "Perfecto ✅ ¿A qué correo te envío la propuesta?",
    inputType: "text",
    placeholder: "tu@email.com",
    nextKey: "email",
  },
  {
    id: "done",
    ai: (_, answers) => `¡Gracias **${answers.name}**! 🎉\n\nRecibirás una propuesta personalizada en **menos de 24h** en ${answers.email}.\n\nSi tienes dudas urgentes, escríbeme directamente.`,
    inputType: null,
  },
];

function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-4 py-3">
      {[0,1,2].map(i => (
        <motion.div key={i} className="w-2 h-2 rounded-full bg-zinc-400"
          animate={{ y:[0,-4,0], opacity:[0.4,1,0.4] }}
          transition={{ duration:0.8, repeat:Infinity, delay:i*0.15 }} />
      ))}
    </div>
  );
}

function formatText(text) {
  // **bold** → <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") ? <strong key={i} className="text-white font-semibold">{p.slice(2,-2)}</strong> : p
  );
}

function AIMessage({ text, isTyping }) {
  if (isTyping) return (
    <div className="flex gap-2.5 items-end">
      <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
        <Sparkles size={13} className="text-orange-400" />
      </div>
      <div className="bg-white/6 border border-white/8 rounded-2xl rounded-bl-none">
        <TypingDots />
      </div>
    </div>
  );

  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.3}}
      className="flex gap-2.5 items-end">
      <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
        <Sparkles size={13} className="text-orange-400" />
      </div>
      <div className="bg-white/6 border border-white/8 rounded-2xl rounded-bl-none px-4 py-3 text-sm text-zinc-300 leading-relaxed max-w-[85%]"
        style={{ whiteSpace:"pre-wrap" }}>
        {text.split("\n").map((line, i) => (
          <span key={i}>{formatText(line)}{i < text.split("\n").length - 1 && <br />}</span>
        ))}
      </div>
    </motion.div>
  );
}

function UserMessage({ text }) {
  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.3}}
      className="flex justify-end">
      <div className="bg-orange-500 rounded-2xl rounded-br-none px-4 py-3 text-sm text-white max-w-[85%] leading-relaxed">
        {text}
      </div>
    </motion.div>
  );
}

export default function QuoteChat() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef             = useRef(null);

  // Scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, typing]);

  // Inicia conversación cuando se abre
  const startChat = () => {
    if (started) return;
    setStarted(true);
    showAI(FLOW[0].ai, {});
  };

  const showAI = (aiText, currentAnswers) => {
    const text = typeof aiText === "function" ? aiText(currentAnswers.name, currentAnswers) : aiText;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { role:"ai", text }]);
    }, 900 + text.length * 8);
  };

  const handleSend = (value) => {
    const val = (value || input).trim();
    if (!val) return;
    setInput("");

    const currentStep = FLOW[stepIdx];
    const newAnswers = { ...answers, [currentStep.nextKey]: val };
    setAnswers(newAnswers);
    setMessages(m => [...m, { role:"user", text: val }]);

    const nextIdx = stepIdx + 1;
    if (nextIdx < FLOW.length) {
      setStepIdx(nextIdx);
      showAI(FLOW[nextIdx].ai, newAnswers);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => startChat(), 300);
  };

  const currentStep = FLOW[stepIdx];
  const lastIsAI = messages.length > 0 && messages[messages.length - 1].role === "ai";
  const isDone   = stepIdx >= FLOW.length - 1 && lastIsAI;

  return (
    <>
      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:20, scale:0.95 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:20, scale:0.95 }}
            transition={{ duration:0.25, ease:[0.25,0.1,0.25,1] }}
            className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
            style={{ width:360, height:520, border:"1px solid rgba(255,255,255,0.09)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ background:"linear-gradient(135deg,#c2410c,#f97316)" }}>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Sparkles size={17} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm leading-tight">DevPro AI</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <p className="text-orange-100 text-[10px]">Activo ahora · responde en 24h</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
                <X size={17} />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-[#0d0d10]">
              {messages.map((msg, i) =>
                msg.role === "ai"
                  ? <AIMessage key={i} text={msg.text} />
                  : <UserMessage key={i} text={msg.text} />
              )}
              {typing && <AIMessage isTyping />}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {!isDone && !typing && lastIsAI && (
              <div className="shrink-0 bg-[#111113] border-t border-white/6">
                {currentStep?.inputType === "options" ? (
                  <div className="p-3 flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                    {currentStep.options.map(opt => (
                      <button key={opt} onClick={() => handleSend(opt)}
                        className="text-left text-xs px-3 py-2.5 rounded-xl border border-white/8 bg-white/3 text-zinc-300 hover:border-orange-500/40 hover:bg-orange-500/6 hover:text-white transition-all">
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : currentStep?.inputType === "text" ? (
                  <div className="flex gap-2 p-3">
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSend()}
                      placeholder={currentStep.placeholder || "Escribe aquí..."}
                      autoFocus
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                    <button onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-30 flex items-center justify-center transition-colors shrink-0">
                      <Send size={15} className="text-white" />
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            {/* CTA final */}
            {isDone && (
              <div className="shrink-0 bg-[#111113] border-t border-white/6 p-3">
                <button onClick={() => { setMessages([]); setStepIdx(0); setAnswers({}); setStarted(false); setTimeout(()=>startChat(),100); }}
                  className="w-full py-2.5 text-xs rounded-xl border border-white/8 text-zinc-400 hover:text-white hover:border-white/20 transition-all">
                  Nueva consulta
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Botón flotante ── */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale:1.08 }}
        whileTap={{ scale:0.93 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/25 transition-colors"
        style={{ background:"linear-gradient(135deg,#ea580c,#f97316)" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.18}}>
              <X size={21} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.18}}>
              <Sparkles size={21} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulso */}
        {!open && (
          <motion.span className="absolute inset-0 rounded-full bg-orange-400"
            animate={{ scale:[1,1.6], opacity:[0.35,0] }}
            transition={{ duration:2, repeat:Infinity }} />
        )}

        {/* Badge */}
        {!open && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#09090b] animate-pulse" />
        )}
      </motion.button>
    </>
  );
}
