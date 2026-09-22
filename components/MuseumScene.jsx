"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text } from "@react-three/drei";
import { useRef } from "react";

function Pyramid({ position = [0,0,0], scale = 1 }) {
  const ref = useRef();
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.08; });
  return <group ref={ref} position={position} scale={scale}>
    <mesh position={[0,1.35,0]}><coneGeometry args={[1.8,2.7,4]} /><meshStandardMaterial color="#c7a46b" roughness={0.82} /></mesh>
    <mesh position={[0,0.02,0]} scale={[2.3,0.08,2.3]}><boxGeometry args={[1,1,1]} /><meshStandardMaterial color="#7c6040" roughness={1} /></mesh>
  </group>;
}

function Scene() {
  return <Canvas camera={{position:[5,3.5,7],fov:45}}>
    <ambientLight intensity={1.4}/><directionalLight position={[4,7,3]} intensity={3}/>
    <Pyramid/><Pyramid position={[-3,-0.1,-2]} scale={0.62}/><Pyramid position={[3,-0.1,-2.4]} scale={0.48}/>
    <Text position={[0,4.2,0]} fontSize={0.42} color="#f4ead7" anchorX="center">EGYPT</Text>
    <OrbitControls enablePan={false} minDistance={4} maxDistance={11}/><Environment preset="sunset"/>
  </Canvas>;
}

export default function MuseumScene({ compact = false }) {
  return <div className={compact ? "scene sceneCompact" : "scene"}><Scene/></div>;
}