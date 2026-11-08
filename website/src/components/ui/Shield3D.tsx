"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function Shield3D() {
  const meshRef = useRef<THREE.Group>(null);
  
  // Custom faceted, 5-point flat-top shield shape
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    // Start at top-left shoulder
    s.moveTo(-2.5, 2);
    // Flat top edge to top-right shoulder
    s.lineTo(2.5, 2);
    // Straight edge down the right side
    s.lineTo(2.5, -0.5);
    // Taper to single bottom point
    s.lineTo(0, -3.5);
    // Taper back to left side
    s.lineTo(-2.5, -0.5);
    // Straight edge up the left side
    s.lineTo(-2.5, 2);
    return s;
  }, []);

  const extrudeSettings = {
    depth: 0.8,
    bevelEnabled: true,
    bevelSegments: 1, 
    steps: 1,
    bevelSize: 0.4,
    bevelThickness: 0.4,
    curveSegments: 1 // Force straight faceted edges
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15 + (state.pointer.x * 0.2);
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05 - (state.pointer.y * 0.2);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={meshRef} position={[0, 0.75, 0]} scale={0.7}>
        
        {/* Main Solid Shield Body */}
        <mesh>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial 
            color="#021C1B" 
            metalness={0.9} 
            roughness={0.2}
            flatShading={true} 
          />
        </mesh>

        {/* Glowing Faceted Outline */}
        <mesh position={[0, 0, 0.02]}>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial 
            color="#06B6D4" 
            wireframe={true}
            emissive="#06B6D4"
            emissiveIntensity={2.5}
            transparent={true}
            opacity={0.8}
          />
        </mesh>

      </group>
    </Float>
  );
}
