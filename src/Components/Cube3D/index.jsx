import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshTransmissionMaterial, Environment, Float, Text } from "@react-three/drei";
import { BoxGeometry } from "three";
import { motion } from "framer-motion";

/* ─── Caras del cubo con etiquetas ─── */
const FACE_LABELS = [".NET", "React", "C#", "API", "SQL", "Azure"];
const FACE_COLORS = [
  "#2563EB", // front
  "#4F46E5", // back
  "#0EA5E9", // left
  "#7C3AED", // right
  "#2563EB", // top
  "#4F46E5", // bottom
];

function TechCube({ hovered, setHovered }) {
  const meshRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  useFrame((_, delta) => {
    if (!isDragging && meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 0.3 : 0.6);
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={meshRef}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
        >
          <boxGeometry args={[2, 2, 2]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.3}
            roughness={0.05}
            transmission={0.95}
            ior={1.5}
            chromaticAberration={0.06}
            color="#a5b4fc"
          />
        </mesh>

        {/* Aristas brillantes */}
        <lineSegments>
          <edgesGeometry args={[new BoxGeometry(2.01, 2.01, 2.01)]} />
          <lineBasicMaterial color="#6366f1" linewidth={1} />
        </lineSegments>
      </group>
    </Float>
  );
}

function FloatingBadges() {
  const badges = [
    { pos: [3.2, 1.2, 0], label: ".NET", color: "#818cf8" },
    { pos: [-3.0, 0.5, 0], label: "React", color: "#38bdf8" },
    { pos: [2.8, -1.0, 0.5], label: "C#", color: "#a78bfa" },
    { pos: [-2.6, -0.8, -0.5], label: "Azure", color: "#60a5fa" },
  ];

  return (
    <>
      {badges.map(({ pos, label, color }, i) => (
        <Float key={i} speed={1 + i * 0.3} floatIntensity={0.6}>
          <Text
            position={pos}
            fontSize={0.22}
            color={color}
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {"{ " + label + " }"}
          </Text>
        </Float>
      ))}
    </>
  );
}

export default function Cube3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative w-full h-[440px] lg:h-[520px]"
    >
      {/* Hint de interacción */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5 z-10 pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        Arrastra para rotar
      </motion.p>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ cursor: hovered ? "grab" : "default" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#2563EB" />
        <pointLight position={[-10, -5, -10]} intensity={0.6} color="#4F46E5" />
        <spotLight position={[0, 8, 4]} intensity={1.5} color="#ffffff" angle={0.4} />

        <TechCube hovered={hovered} setHovered={setHovered} />
        <FloatingBadges />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.08}
          rotateSpeed={0.7}
        />
        <Environment preset="city" />
      </Canvas>

      {/* Glow de fondo */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-transparent blur-2xl pointer-events-none" />
    </motion.div>
  );
}
