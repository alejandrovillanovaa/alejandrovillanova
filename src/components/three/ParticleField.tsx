import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  color?: string;
  speed?: number;
  className?: string;
}

const Particles = ({
  count = 150,
  color = "#2dd4bf",
  speed = 0.3,
}: {
  count: number;
  color: string;
  speed: number;
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i] = Math.random() * 0.02 + 0.005;
    }
    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const attr = pointsRef.current.geometry.attributes.position;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += velocities[i] * speed;
      if (arr[i * 3 + 1] > 5.5) arr[i * 3 + 1] = -5.5;
    }
    attr.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0008;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const ParticleField = ({
  count = 150,
  color = "#2dd4bf",
  speed = 0.3,
  className = "",
}: ParticleFieldProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      <Canvas
        dpr={[0.5, 1]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 20 }}
      >
        <Suspense fallback={null}>
          <Particles count={count} color={color} speed={speed} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ParticleField;
