import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapesProps {
  count?: number;
  color?: string;
  className?: string;
}

const Shapes = ({ count = 12, color = "#2dd4bf" }: { count: number; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const geoType = i % 4;
      let geo: THREE.BufferGeometry;
      switch (geoType) {
        case 0:
          geo = new THREE.IcosahedronGeometry(0.25 + Math.random() * 0.3, 1);
          break;
        case 1:
          geo = new THREE.OctahedronGeometry(0.2 + Math.random() * 0.35, 1);
          break;
        case 2:
          geo = new THREE.TetrahedronGeometry(0.2 + Math.random() * 0.35, 1);
          break;
        default:
          geo = new THREE.TorusGeometry(0.2 + Math.random() * 0.25, 0.06, 16, 24);
          break;
      }
      return {
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5 - 1,
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: 0.6 + Math.random() * 0.8,
        speed: 0.3 + Math.random() * 0.7,
        wireframe: Math.random() > 0.65,
        geo,
        opacity: 0.08 + Math.random() * 0.12,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.4} floatIntensity={0.5}>
          <mesh position={s.position} rotation={s.rotation} scale={s.scale}>
            <primitive object={s.geo} attach="geometry" />
            {s.wireframe ? (
              <meshBasicMaterial color={color} wireframe transparent opacity={s.opacity} />
            ) : (
              <meshStandardMaterial
                color={color}
                transparent
                opacity={s.opacity}
                metalness={0.2}
                roughness={0.8}
              />
            )}
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const FloatingShapes = ({
  count = 12,
  color = "#2dd4bf",
  className = "",
}: FloatingShapesProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      <Canvas
        dpr={[0.5, 1]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        }}
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 20 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <Shapes count={count} color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
