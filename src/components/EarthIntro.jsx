import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

const Earth = () => {
  const texture = new THREE.TextureLoader().load(
    "https://unpkg.com/three-globe/example/img/earth-dark.jpg",
  );

  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const EarthIntro = ({ onFinish }) => {
  const [zoom, setZoom] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setZoom((z) => {
        if (z <= 2.5) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
          return z;
        }
        return z - 0.05;
      });
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-black">
      <Canvas camera={{ position: [0, 0, zoom] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} />

        <Earth />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default EarthIntro;
