import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, useTexture } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/models/forest/deforestation/deforestation.glb");
  const leafTexture = useTexture("/models/forest/deforestation/textures/oakbranchcolor.png");

  // Ensure texture colors are vibrant
  leafTexture.colorSpace = THREE.SRGBColorSpace;

  scene.traverse((child) => {
    if (child.isMesh) {
      const name = child.name.toLowerCase();

      // 1. Fix the Leaves/Branches
      if (name.includes("branch") || name.includes("leaf")) {
        child.material = new THREE.MeshStandardMaterial({
          map: leafTexture,
          transparent: true,
          alphaTest : 0.5,
          side: THREE.DoubleSide,
          // If they still look white, force the base color to a leaf green
          color: "#4d7c0f", 
        });
      }

      // 2. Fix the Reforestation Ground (Green)
      if (name.includes("grass") || (name.includes("ground") && child.position.x > 0)) {
        child.material.color.set("#55a630"); // Rich grass green
        child.material.map = null; // Remove map if it's causing the whiteness
      }

      // 3. Fix the Deforestation Ground (Brown/Dirt)
      if (name.includes("dirt") || (name.includes("ground") && child.position.x < 0)) {
        child.material.color.set("#7851a9"); // Or use a dirt brown: "#5d4037"
        child.material.map = null;
      }
    }
  });

  return <primitive object={scene} scale={1.2} position={[0, -1, 0]} />;
}

export default function ForestModel() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [0, 4, 10], fov: 40 }}>
        {/* Adjust Stage intensity so it doesn't wash out the colors */}
        <Stage environment="forest" intensity={0.4} contactShadow={false}>
          <Model />
        </Stage>

        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}