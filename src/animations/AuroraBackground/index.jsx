/**
 * Fondo aurora animado estilo Framer:
 * - Blobs de color que se mueven lentamente con CSS keyframes
 * - Capa de ruido/grano SVG encima para textura premium
 */
export default function AuroraBackground() {
  return (
    <>
      {/* ── Blobs animados ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Blob naranja — esquina inferior izquierda */}
        <div
          className="absolute rounded-full blur-[130px] opacity-[0.12]"
          style={{
            width: 700, height: 700,
            left: "-15%", bottom: "-20%",
            background: "#F97316",
            animation: "blob1 18s ease-in-out infinite",
          }}
        />

        {/* Blob morado — esquina superior derecha */}
        <div
          className="absolute rounded-full blur-[160px] opacity-[0.10]"
          style={{
            width: 800, height: 600,
            right: "-20%", top: "-15%",
            background: "#7c3aed",
            animation: "blob2 22s ease-in-out infinite",
          }}
        />

        {/* Blob azul — centro */}
        <div
          className="absolute rounded-full blur-[140px] opacity-[0.06]"
          style={{
            width: 500, height: 500,
            left: "30%", top: "20%",
            background: "#2563eb",
            animation: "blob3 26s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Grano / Noise overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      {/* ── Keyframes inyectados inline ── */}
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0,    0)    scale(1); }
          33%       { transform: translate(60px, -40px) scale(1.1); }
          66%       { transform: translate(-30px, 60px) scale(0.95); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0,     0)     scale(1); }
          33%       { transform: translate(-80px, 40px)  scale(1.08); }
          66%       { transform: translate(50px,  -50px) scale(0.92); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0,    0)    scale(1); }
          50%       { transform: translate(40px, 30px) scale(1.12); }
        }
      `}</style>
    </>
  );
}
