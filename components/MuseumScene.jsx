"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text } from "@react-three/drei";
import { Component, useRef } from "react";
class SceneErrorBoundary extends Component {
  constructor(props){super(props);this.state={hasError:false}}
  static getDerivedStateFromError(){return {hasError:true}}
  componentDidCatch(error){console.error("Museum 3D scene failed to render",error)}
  render(){return this.state.hasError?<div className="sceneFallback" role="status"><strong>3D gallery unavailable</strong><span>Please refresh or use the collection below.</span></div>:this.props.children}
}
function Pyramid({position=[0,0,0],scale=1,speed=.08}){const ref=useRef();useFrame((_,delta)=>{if(ref.current)ref.current.rotation.y+=delta*speed});return <group ref={ref} position={position} scale={scale}><mesh position={[0,1.35,0]}><coneGeometry args={[1.8,2.7,4]}/><meshStandardMaterial color="#c7a46b" roughness={.82}/></mesh><mesh position={[0,.02,0]} scale={[2.3,.08,2.3]}><boxGeometry args={[1,1,1]}/><meshStandardMaterial color="#7c6040" roughness={1}/></mesh></group>}
function Scene({compact}){return <Canvas dpr={[1,1.5]} camera={{position:[5,3.5,7],fov:45}} gl={{antialias:true}}><ambientLight intensity={1.15}/><directionalLight position={[4,7,3]} intensity={2.2}/><Pyramid/><Pyramid position={[-3,-.1,-2]} scale={.62} speed={-.05}/><Pyramid position={[3,-.1,-2.4]} scale={.48} speed={.06}/>{!compact&&<Text position={[0,4.2,0]} fontSize={.42} color="#f4ead7" anchorX="center">EGYPT</Text>}<OrbitControls enablePan={false} minDistance={4} maxDistance={11} enableDamping/><Environment preset="sunset"/></Canvas>}
export default function MuseumScene({compact=false}){return <div className={compact?"scene sceneCompact":"scene"} role="img" aria-label="Interactive 3D Egyptian pyramid gallery"><SceneErrorBoundary><Scene compact={compact}/></SceneErrorBoundary></div>}