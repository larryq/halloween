import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { getProject } from '@theatre/core'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { editable as e, SheetProvider } from '@theatre/r3f'
import { PerspectiveCamera } from '@theatre/r3f'
import { useGLTF, Environment } from '@react-three/drei'

studio.initialize()
studio.extend(extension)

// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject('Demo Project').sheet('Demo Sheet')

const App = () => {
  return (
    <Canvas
    >
       <Environment preset="city" />
      <SheetProvider sheet={getProject('Demo Project').sheet('Demo Sheet')}>
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75} />
      <ambientLight />
      <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
      <e.mesh theatreKey='Cube'>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </e.mesh>
      <Fish theatreKey='Fish'/>
      </SheetProvider>
    </Canvas>
  )
}

export function Fish(props: any) {
  const { nodes, materials } = useGLTF('/fish.glb')
  console.log(nodes)
  return (
<e.group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['fish body - wave']}
        position={[0.173, -0.029, 0.013]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials['eyeball white']}
        position={[1.02, 0.276, 1.006]}
        scale={0.263}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials['eye iris']}
        position={[1.02, 0.276, 1.232]}
        scale={[0.105, 0.105, 0.06]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials['eyeball white']}
        position={[-0.673, 0.276, 1.006]}
        scale={0.263}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials['eye iris']}
        position={[-0.673, 0.276, 1.232]}
        scale={[0.105, 0.105, 0.06]}
      />
    </e.group>
  )
}


createRoot(document.getElementById('root')!).render(<App />)