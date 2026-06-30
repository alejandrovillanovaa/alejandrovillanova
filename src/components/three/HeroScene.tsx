import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshWobbleMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

/* ── Floating geometric shape ─────────────────────────────────── */
const FloatingShape = ({
  position,
  scale = 1,
  color = "#2dd4bf",
  speed = 1,
  geometry,
  wireframe = false,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
  geometry: "icosahedron" | "torusKnot" | "octahedron" | "dodecahedron" | "torus";
  wireframe?: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => {
    const detail = wireframe ? 2 : 1;
    switch (geometry) {
      case "icosahedron":
        return new THREE.IcosahedronGeometry(1, detail);
      case "torusKnot":
        return new THREE.TorusKnotGeometry(0.7, 0.25, 100, 16);
      case "octahedron":
        return new THREE.OctahedronGeometry(0.8, detail);
      case "dodecahedron":
        return new THREE.DodecahedronGeometry(0.9, detail);
      case "torus":
        return new THREE.TorusGeometry(0.7, 0.25, 32, 64);
    }
  }, [geometry, wireframe]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.4;
    meshRef.current.rotation.y += 0.004 * speed;
    meshRef.current.rotation.z = Math.cos(t * 0.25) * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.5;
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <primitive object={geo} attach="geometry" />
        {wireframe ? (
          <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
        ) : (
          <MeshWobbleMaterial
            color={color}
            factor={0.2}
            speed={0.4 * speed}
            transparent
            opacity={0.35}
            metalness={0.1}
            roughness={0.7}
          />
        )}
      </mesh>
    </Float>
  );
};

/* ── Ambient particles ────────────────────────────────────────── */
const AmbientParticles = ({ count = 200 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * viewport.width * 2.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sz[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, sz];
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#2dd4bf"
        sizeAttenuation
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ── Orbiting accent light ────────────────────────────────────── */
const OrbitalLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime * 0.3;
    lightRef.current.position.x = Math.cos(t) * 4;
    lightRef.current.position.y = Math.sin(t * 0.7) * 2.5;
    lightRef.current.position.z = 3;
  });

  return (
    <pointLight
      ref={lightRef}
      color="#2dd4bf"
      intensity={35}
      distance={8}
      decay={2}
    />
  );
};

/* ── Scene content ────────────────────────────────────────────── */
const SceneContent = () => {
  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#ffffff", 8, 25]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <OrbitalLight />

      <AmbientParticles count={250} />

      {/* Central accent shapes */}
      <FloatingShape
        geometry="icosahedron"
        position={[3.5, 1.5, -2]}
        scale={1.2}
        color="#14b8a6"
        speed={0.7}
        wireframe
      />
      <FloatingShape
        geometry="torusKnot"
        position={[-3.8, -1.2, -1.5]}
        scale={1.0}
        color="#2dd4bf"
        speed={0.5}
      />
      <FloatingShape
        geometry="octahedron"
        position={[2.2, -2.5, -1]}
        scale={0.8}
        color="#0d9488"
        speed={0.9}
      />
      <FloatingShape
        geometry="dodecahedron"
        position={[-2.8, 2.0, -2.5]}
        scale={0.9}
        color="#14b8a6"
        speed={0.6}
      />

      {/* Smaller distant shapes */}
      <FloatingShape
        geometry="torus"
        position={[5.5, -2.0, -3.5]}
        scale={0.6}
        color="#2dd4bf"
        speed={0.4}
        wireframe
      />
      <FloatingShape
        geometry="icosahedron"
        position={[-5.2, 1.0, -3]}
        scale={0.55}
        color="#0d9488"
        speed={0.75}
      />
      <FloatingShape
        geometry="octahedron"
        position={[0.5, 3.5, -4]}
        scale={0.5}
        color="#14b8a6"
        speed={0.55}
      />
      <FloatingShape
        geometry="dodecahedron"
        position={[-1.2, -3.2, -3]}
        scale={0.65}
        color="#2dd4bf"
        speed={0.65}
        wireframe
      />

      {/* Emissive sphere accents */}
      <Float speed={0.3} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[0.15, 32, 32]} position={[4.5, 3.0, -1]}>
          <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={2} roughness={0.2} />
        </Sphere>
      </Float>
      <Float speed={0.35} rotationIntensity={0.2} floatIntensity={0.4}>
        <Sphere args={[0.12, 32, 32]} position={[-4.8, -2.5, -2]}>
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={1.5} roughness={0.2} />
        </Sphere>
      </Float>
    </>
  );
};

/* ── Exported component ───────────────────────────────────────── */
const HeroScene = () => {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 6], fov: 40, near: 0.1, far: 30 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
