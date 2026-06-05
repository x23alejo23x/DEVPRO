import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  LayoutDashboard, Code2, BarChart3, Settings, Calculator, Palette,
  ShoppingBag, Heart, Utensils, Truck, GraduationCap, Building2,
  CreditCard, Bell, Users, FileText, Shield, Globe, Smartphone, Monitor,
  CheckCircle, ArrowRight, Zap, Clock, DollarSign, Star, ChevronRight,
  Sparkles, Layers, Box, Hexagon, Triangle, Coffee, Leaf, Flame,
  Mountain, Anchor, Feather, Crown, Diamond, Copy, Download
} from "lucide-react";

/* ══════════════════════════════════
   PROYECTOS — con imagen/screenshot
══════════════════════════════════ */
/* ══════════════════════════════════
   GENERADOR DE LOGO & FIRMA
══════════════════════════════════ */
const LOGO_ICONS = [
  { id:"sparkles", Icon:Sparkles }, { id:"zap",     Icon:Zap      },
  { id:"layers",   Icon:Layers   }, { id:"globe",   Icon:Globe    },
  { id:"box",      Icon:Box      }, { id:"shield",  Icon:Shield   },
  { id:"coffee",   Icon:Coffee   }, { id:"leaf",    Icon:Leaf     },
  { id:"flame",    Icon:Flame    }, { id:"anchor",  Icon:Anchor   },
  { id:"feather",  Icon:Feather  }, { id:"crown",   Icon:Crown    },
  { id:"diamond",  Icon:Diamond  }, { id:"mountain",Icon:Mountain },
  { id:"triangle", Icon:Triangle }, { id:"hexagon", Icon:Hexagon  },
];

const LOGO_PALETTES = [
  { id:"orange", primary:"#F97316", bg:"#09090b", text:"#fff"  },
  { id:"blue",   primary:"#3B82F6", bg:"#09090b", text:"#fff"  },
  { id:"purple", primary:"#8B5CF6", bg:"#09090b", text:"#fff"  },
  { id:"green",  primary:"#10B981", bg:"#09090b", text:"#fff"  },
  { id:"red",    primary:"#EF4444", bg:"#09090b", text:"#fff"  },
  { id:"white",  primary:"#ffffff", bg:"#09090b", text:"#fff"  },
  { id:"dark",   primary:"#1c1c1e", bg:"#f5f5f5", text:"#1c1c1e" },
  { id:"gold",   primary:"#F59E0B", bg:"#09090b", text:"#fff"  },
];

const LOGO_STYLES = [
  { id:"horizontal", label:"Horizontal" },
  { id:"stacked",    label:"Apilado"    },
  { id:"icon",       label:"Solo ícono" },
  { id:"initials",   label:"Iniciales"  },
];

const FONT_STYLES = [
  { id:"bold",  label:"Bold",  cls:"font-black tracking-tight"       },
  { id:"thin",  label:"Thin",  cls:"font-light tracking-widest"      },
  { id:"mono",  label:"Mono",  cls:"font-mono font-bold"             },
  { id:"serif", label:"Serif", cls:"font-bold italic tracking-tight" },
];

/* ── Preview del logo ── */
function LogoPreview({ name, tagline, iconId, paletteId, style, fontId, size=1 }) {
  const pal  = LOGO_PALETTES.find(p=>p.id===paletteId) || LOGO_PALETTES[0];
  const font = FONT_STYLES.find(f=>f.id===fontId) || FONT_STYLES[0];
  const iconObj = LOGO_ICONS.find(i=>i.id===iconId) || LOGO_ICONS[0];
  const Icon = iconObj.Icon;
  const displayName = name || "Mi Marca";
  const initials = displayName.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const fs = size;

  const iconBox = (
    <div style={{
      width:40*fs, height:40*fs, borderRadius:10*fs,
      background:pal.primary,
      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
    }}>
      {style==="initials"
        ? <span style={{color:pal.bg, fontWeight:900, fontSize:15*fs, fontFamily:"system-ui"}}>{initials}</span>
        : <Icon size={20*fs} color={pal.bg}/>}
    </div>
  );

  const nameEl = (
    <span className={font.cls} style={{
      color:pal.text, fontSize:18*fs, lineHeight:1,
      fontFamily: fontId==="mono"?"monospace":fontId==="serif"?"Georgia, serif":"system-ui",
    }}>{displayName}</span>
  );

  const tagEl = tagline && (
    <span style={{color:`${pal.text}60`, fontSize:9*fs, letterSpacing:2*fs, textTransform:"uppercase", marginTop:2*fs}}>
      {tagline}
    </span>
  );

  if (style==="icon") return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:6*fs}}>
      {iconBox}
    </div>
  );

  if (style==="stacked") return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:8*fs}}>
      {iconBox}
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:2*fs}}>{nameEl}{tagEl}</div>
    </div>
  );

  if (style==="initials") return (
    <div style={{display:"flex", alignItems:"center", gap:10*fs}}>
      {iconBox}
      <div style={{display:"flex", flexDirection:"column"}}>{nameEl}{tagEl}</div>
    </div>
  );

  // horizontal (default)
  return (
    <div style={{display:"flex", alignItems:"center", gap:10*fs}}>
      {iconBox}
      <div style={{display:"flex", flexDirection:"column"}}>{nameEl}{tagEl}</div>
    </div>
  );
}

function LogoModule() {
  const [name,     setName]     = useState("DevPro");
  const [tagline,  setTagline]  = useState("Software a medida");
  const [iconId,   setIconId]   = useState("sparkles");
  const [palette,  setPalette]  = useState("orange");
  const [style,    setStyle]    = useState("horizontal");
  const [fontId,   setFontId]   = useState("bold");
  const [copied,   setCopied]   = useState(false);

  const pal = LOGO_PALETTES.find(p=>p.id===palette) || LOGO_PALETTES[0];

  const buildSVG = () => {
    const displayName = name || "Mi Marca";
    const initials = displayName.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    const isHoriz = style==="horizontal"||style==="initials";
    const w = isHoriz ? 240 : 120;
    const h = isHoriz ? 60 : 90;
    const fn = fontId==="mono"?"monospace":fontId==="serif"?"Georgia, serif":"system-ui, sans-serif";
    const fw = fontId==="thin"?300:900;
    const fi = fontId==="serif"?"italic":"normal";
    let content = "";
    if(style!=="initials") {
      content += `<rect x="0" y="${isHoriz?10:10}" width="40" height="40" rx="10" fill="${pal.primary}"/>`;
      content += `<text x="20" y="${isHoriz?35:35}" text-anchor="middle" font-size="18" font-weight="900" fill="${pal.bg}" font-family="system-ui">${initials[0]||"?"}</text>`;
    } else {
      content += `<rect x="0" y="${isHoriz?10:10}" width="40" height="40" rx="10" fill="${pal.primary}"/>`;
      content += `<text x="20" y="${isHoriz?35:35}" text-anchor="middle" font-size="16" font-weight="900" fill="${pal.bg}" font-family="system-ui">${initials}</text>`;
    }
    if(style!=="icon") {
      const tx = isHoriz?50:0, ty = isHoriz?32:(h/2+5), anchor=isHoriz?"start":"middle", x2=isHoriz?50:(w/2);
      content += `<text x="${tx}" y="${ty}" text-anchor="${anchor}" font-size="18" font-weight="${fw}" font-style="${fi}" fill="${pal.text}" font-family="${fn}">${displayName}</text>`;
      if(tagline) content += `<text x="${x2}" y="${isHoriz?46:ty+14}" text-anchor="${anchor}" font-size="8" fill="${pal.text}80" font-family="system-ui" letter-spacing="1.5">${tagline.toUpperCase()}</text>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${content}</svg>`;
  };

  const downloadSVG = () => {
    const svg = buildSVG();
    const blob = new Blob([svg], {type:"image/svg+xml"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=`${(name||"logo").replace(/\s/g,"-")}.svg`; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    const svg = buildSVG();
    const canvas = document.createElement("canvas"); canvas.width=480; canvas.height=120;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const blob = new Blob([svg],{type:"image/svg+xml"});
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.scale(2,2); ctx.drawImage(img,0,0);
      canvas.toBlob(b=>{ const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download=`${(name||"logo").replace(/\s/g,"-")}.png`; a.click(); },"image/png");
    };
    img.src = url;
  };

  const copySVG = () => {
    navigator.clipboard.writeText(buildSVG()).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); });
  };

  return (
    <div className="flex flex-col gap-2" style={{minWidth:0}}>

      {/* Preview */}
      <div className="flex items-center justify-center rounded-xl border border-white/8 py-3 px-4 relative overflow-hidden"
        style={{background:pal.id==="dark"?"#f5f5f5":"#111113", minHeight:54}}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{backgroundImage:"radial-gradient(circle,#ffffff 1px,transparent 1px)",backgroundSize:"18px 18px"}}/>
        <LogoPreview name={name} tagline={tagline} iconId={iconId} paletteId={palette} style={style} fontId={fontId} size={0.7}/>
      </div>

      {/* Controles en 3 columnas */}
      <div className="grid gap-2" style={{gridTemplateColumns:"1fr 1fr 1fr", minWidth:0, flex:1}}>

        {/* Col 1 — nombre + tagline + estilo */}
        <div className="flex flex-col gap-1.5">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre"
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[11px] text-white placeholder-zinc-600 focus:outline-none"/>
          <input value={tagline} onChange={e=>setTagline(e.target.value)} placeholder="Tagline"
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[11px] text-white placeholder-zinc-600 focus:outline-none"/>
          <div className="text-[8px] text-zinc-600 uppercase tracking-widest mt-1">Estilo</div>
          <div className="grid grid-cols-2 gap-1">
            {LOGO_STYLES.map(s=>(
              <button key={s.id} onClick={()=>setStyle(s.id)}
                className="py-1 rounded text-[9px] font-medium border transition-all"
                style={{borderColor:style===s.id?"#f472b6":"rgba(255,255,255,0.08)",background:style===s.id?"rgba(244,114,182,0.12)":"rgba(255,255,255,0.02)",color:style===s.id?"#fff":"#71717a"}}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="text-[8px] text-zinc-600 uppercase tracking-widest mt-0.5">Tipografía</div>
          <div className="grid grid-cols-2 gap-1">
            {FONT_STYLES.map(f=>(
              <button key={f.id} onClick={()=>setFontId(f.id)}
                className="py-1 rounded text-[9px] border transition-all"
                style={{borderColor:fontId===f.id?"#f472b6":"rgba(255,255,255,0.08)",background:fontId===f.id?"rgba(244,114,182,0.12)":"rgba(255,255,255,0.02)",color:fontId===f.id?"#fff":"#71717a",fontWeight:f.id==="bold"||f.id==="mono"?700:300,fontFamily:f.id==="mono"?"monospace":"system-ui",fontStyle:f.id==="serif"?"italic":"normal"}}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Col 2 — color + íconos */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[8px] text-zinc-600 uppercase tracking-widest">Color</div>
          <div className="grid grid-cols-4 gap-1">
            {LOGO_PALETTES.map(p=>(
              <button key={p.id} onClick={()=>setPalette(p.id)}
                className="w-full rounded border-2 transition-all" style={{aspectRatio:"1",background:p.primary,borderColor:palette===p.id?"#fff":"transparent"}}/>
            ))}
          </div>
          <div className="text-[8px] text-zinc-600 uppercase tracking-widest mt-0.5">Ícono</div>
          <div className="grid grid-cols-4 gap-1">
            {LOGO_ICONS.map(({id,Icon})=>(
              <button key={id} onClick={()=>setIconId(id)}
                className="rounded flex items-center justify-center border transition-all" style={{aspectRatio:"1",borderColor:iconId===id?"#f472b6":"rgba(255,255,255,0.08)",background:iconId===id?"rgba(244,114,182,0.15)":"rgba(255,255,255,0.03)"}}>
                <Icon size={12} style={{color:iconId===id?"#f472b6":"#52525b"}}/>
              </button>
            ))}
          </div>
        </div>{/* fin col 2 */}

        {/* Col 3 — descargas + preview mini extra */}
        <div className="flex flex-col gap-2 justify-between">
          <div>
            <div className="text-[8px] text-zinc-600 uppercase tracking-widest mb-1.5">Preview variante</div>
            <div className="rounded-lg border border-white/6 p-2 flex items-center justify-center"
              style={{background:"#f5f5f5", minHeight:50}}>
              <LogoPreview name={name} tagline={tagline} iconId={iconId} paletteId={"dark"} style={style} fontId={fontId} size={0.6}/>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-auto">
            <div className="text-[8px] text-zinc-600 uppercase tracking-widest mb-0.5">Exportar</div>
            <button onClick={downloadSVG}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
              style={{background:"rgba(244,114,182,0.15)",color:"#f472b6",border:"1px solid #f472b625"}}>
              <Download size={10}/>SVG
            </button>
            <button onClick={downloadPNG}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
              style={{background:"rgba(249,115,22,0.12)",color:"#F97316",border:"1px solid #F9731625"}}>
              <Download size={10}/>PNG
            </button>
            <button onClick={copySVG}
              className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-medium transition-all"
              style={{background:"rgba(255,255,255,0.04)",color:"#71717a",border:"1px solid rgba(255,255,255,0.08)"}}>
              {copied?<><CheckCircle size={10}/>OK!</>:<><Copy size={10}/>Copiar</>}
            </button>
          </div>
        </div>{/* fin col 3 */}

      </div>{/* fin grid 3 cols */}
    </div>
  );
}

const PROJECTS = [
  {
    id: "dashboard",
    title: "Panel Administrativo",
    badge: "Dashboard",
    color: "#F97316",
    icon: LayoutDashboard,
    img: null, // usamos mini-UI generada en CSS
    tags: [".NET", "React"],
  },
  {
    id: "api",
    title: "API Gateway",
    badge: "Backend",
    color: "#60a5fa",
    icon: Code2,
    img: null,
    tags: ["ASP.NET", "Docker"],
  },
  {
    id: "reports",
    title: "Plataforma Reportes",
    badge: "Analytics",
    color: "#a78bfa",
    icon: BarChart3,
    img: null,
    tags: ["React", "MySQL"],
  },
  {
    id: "settings",
    title: "Sistema SaaS",
    badge: "SaaS",
    color: "#34d399",
    icon: Settings,
    img: null,
    tags: [".NET", "Angular"],
  },
];

/* ── Mini preview CSS por proyecto ── */
function ProjectPreview({ project }) {
  const c = project.color;
  if (project.id === "dashboard") return (
    <div className="w-full h-full bg-[#0d0d0f] p-3 flex flex-col gap-2">
      <div className="flex gap-1.5 mb-1">{["#ff5f57","#febc2e","#28c840"].map((x,i)=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:x}}/>)}</div>
      <div className="grid grid-cols-3 gap-1.5">
        {[c,"#a78bfa","#34d399"].map((x,i)=><div key={i} className="rounded p-2" style={{background:"#111113"}}><div className="text-[6px] text-zinc-600 mb-1">KPI {i+1}</div><div className="text-sm font-bold" style={{color:x}}>{["$48k","1.2k","3.8%"][i]}</div></div>)}
      </div>
      <div className="flex-1 bg-[#111113] rounded p-2"><div className="flex items-end gap-1 h-8">{[65,80,45,90,70,55,85].map((h,i)=><div key={i} className="flex-1 rounded-t" style={{height:`${h}%`,background:i===3?c:"#ffffff15"}}/>)}</div></div>
    </div>
  );
  if (project.id === "api") return (
    <div className="w-full h-full bg-[#0d0d0f] p-3 flex flex-col gap-1.5">
      <div className="flex gap-1.5 mb-1">{["#ff5f57","#febc2e","#28c840"].map((x,i)=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:x}}/>)}</div>
      {[{m:"GET",p:"/api/users",c:"#34d399"},{m:"POST",p:"/api/orders",c:"#60a5fa"},{m:"PUT",p:"/api/config",c:"#F97316"},{m:"DELETE",p:"/api/cache",c:"#f87171"}].map((e,i)=>(
        <div key={i} className="flex items-center gap-2 bg-[#111113] rounded px-2 py-1.5">
          <span className="text-[7px] font-bold px-1 rounded" style={{color:e.c,background:`${e.c}15`}}>{e.m}</span>
          <span className="text-[7px] font-mono text-zinc-500">{e.p}</span>
        </div>
      ))}
    </div>
  );
  if (project.id === "reports") return (
    <div className="w-full h-full bg-[#0d0d0f] p-3 flex flex-col gap-2">
      <div className="flex gap-1.5 mb-1">{["#ff5f57","#febc2e","#28c840"].map((x,i)=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:x}}/>)}</div>
      <div className="flex-1 bg-[#111113] rounded p-2 flex flex-col gap-1">
        <div className="text-[6px] text-zinc-600">Revenue mensual</div>
        <div className="flex items-end gap-1 flex-1">{[40,65,50,80,60,90,75].map((h,i)=><div key={i} className="flex-1 rounded-t" style={{height:`${h}%`,background:`linear-gradient(to top,${c},${c}88)`}}/>)}</div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {["$12k","$8k","$6k"].map((v,i)=><div key={i} className="bg-[#111113] rounded px-1.5 py-1 text-center"><div className="text-[7px] font-bold" style={{color:c}}>{v}</div></div>)}
      </div>
    </div>
  );
  return (
    <div className="w-full h-full bg-[#0d0d0f] p-3 flex flex-col gap-2">
      <div className="flex gap-1.5 mb-1">{["#ff5f57","#febc2e","#28c840"].map((x,i)=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:x}}/>)}</div>
      {[{l:"Auth JWT",on:true},{l:"Redis Cache",on:true},{l:"Logs",on:false},{l:"Backups",on:true},{l:"Notifications",on:true}].map((s,i)=>(
        <div key={i} className="flex items-center justify-between bg-[#111113] rounded px-2 py-1.5">
          <span className="text-[7px] text-zinc-400">{s.l}</span>
          <div className="w-6 h-3 rounded-full relative" style={{background:s.on?c:"rgba(255,255,255,0.1)"}}>
            <div className="absolute top-0.5 w-2 h-2 rounded-full bg-white" style={{left:s.on?"auto":"2px",right:s.on?"2px":"auto"}}/>
          </div>
        </div>
      ))}
    </div>
  );
}


/* ══════════════════════════════════
   SECCIÓN PRINCIPAL
══════════════════════════════════ */
export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:["start 0.8","start 0.2"] });
  const smooth  = useSpring(scrollYProgress, { stiffness:40, damping:15 });
  const scale   = useTransform(smooth, [0,1], [0.88,1]);
  const opacity = useTransform(smooth, [0,0.3], [0,1]);
  const yAnim   = useTransform(smooth, [0,1], [60,0]);

  return (
    <section id="proyectos" className="py-10 bg-[#09090b]" style={{minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden",width:"100%"}} ref={sectionRef}>
      <motion.div style={{ scale, opacity, y:yAnim, transformOrigin:"50% 60%", boxSizing:"border-box" }}
        className="w-full max-w-[1400px] mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center mb-4">
          <motion.span initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
            Proyectos & Herramientas
          </motion.span>
          <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.1}}
            className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Diseñado para tu <span className="text-orange-400">negocio</span>
          </motion.h2>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-stretch w-full">

          {/* ── Izquierda: proyectos en grid 2×2 centrado ── */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold">Proyectos realizados</p>
            <div className="grid grid-cols-2 gap-3 w-full flex-1">
            {PROJECTS.map((p,i) => {
              const Icon = p.icon;
              const isActive = activeProject === i;
              return (
                <motion.button key={p.id} onClick={()=>setActiveProject(isActive?null:i)}
                  initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.07}}
                  whileHover={{x:3}}
                  className="text-left rounded-xl border overflow-hidden transition-all duration-300"
                  style={{borderColor:isActive?`${p.color}50`:"rgba(255,255,255,0.06)",boxShadow:isActive?`0 0 20px ${p.color}12`:"none"}}>

                  {/* Thumbnail */}
                  <div className="overflow-hidden relative" style={{height:100}}>
                    <ProjectPreview project={p} />
                    {!isActive && <div className="absolute inset-0 bg-black/20"/>}
                  </div>

                  {/* Info */}
                  <div className="px-3 py-2 flex items-center gap-2" style={{background:isActive?`${p.color}08`:"#111113"}}>
                    <Icon size={13} style={{color:p.color}}/>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{p.title}</div>
                      <div className="flex gap-1 mt-0.5">
                        {p.tags.map(t=><span key={t} className="text-[8px] text-zinc-600">{t}</span>)}
                      </div>
                    </div>
                    <ChevronRight size={11} className={`shrink-0 transition-transform ${isActive?"rotate-90":""}`} style={{color:p.color}}/>
                  </div>
                </motion.button>
              );
            })}
            </div> {/* cierra grid 2×2 */}
          </div> {/* cierra columna izquierda */}

          {/* ── Derecha: Generador de Logo ── */}
          <motion.div
            style={{boxShadow:"0 0 80px #f472b612, 0 0 0 1px #f472b620", border:"1px solid #f472b620"}}
            className="relative rounded-2xl overflow-hidden bg-[#0d0d0f]"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6 bg-[#111113]">
              <div className="flex gap-1.5">
                {["#ff5f57","#febc2e","#28c840"].map((c,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:c}}/>)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Palette size={13} className="text-pink-400"/>
                  <span className="text-sm font-semibold text-white">Generador de Logo & Firma</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full border border-pink-500/25 bg-pink-500/15 text-pink-400">GRATIS</span>
                </div>
                <p className="text-[10px] text-zinc-500 mt-0.5">Diseña el logo de tu marca en segundos</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                <span className="text-[9px] text-zinc-500">Interactivo</span>
              </div>
            </div>
            <div className="p-3 flex flex-col flex-1">
              <LogoModule />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
