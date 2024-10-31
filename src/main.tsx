
//@ts-nocheck
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import { /*useRef, useState,*/ useEffect } from 'react'
import { Canvas, /*useFrame */} from '@react-three/fiber'
import { getProject } from '@theatre/core'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { editable as e, SheetProvider } from '@theatre/r3f'
import { PerspectiveCamera } from '@theatre/r3f'
import { useGLTF, Environment, Clouds, Cloud } from '@react-three/drei'
import demoProjectState from './Demo Project.theatre-project-state.json'

// Vite
if (import.meta.env.DEV) {
  studio.initialize()
  studio.extend(extension)
}

// our Theatre.js project sheet, we'll use this later
//const demoSheet = getProject('Demo Project').sheet('Demo Sheet')
const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet')

const App = () => {

  useEffect(() => {
    demoSheet.project.ready.then(() => demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 14] }))
  }, [])
  return (
    <Canvas
    >
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud
          seed={1}
          scale={3}
          volume={9}
          color="violet"
          fade={100}
          speed={1.7}
        />
      </Clouds>
      <SheetProvider sheet={demoSheet}>
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75} />
      {/* <ambientLight color={0xfefefe} intensity={0.2}/> */}
      <Environment preset="city" />
      <directionalLight position={[0, 3, 5]} color="green" />
      <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
 {/*      <e.mesh theatreKey='Cube'>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </e.mesh> */}
      {/* <Fish theatreKey='Fish'/> */}
      <Pumpkin theatreKey='Pumpkin'/>
      <Ghost theatreKey='Ghost'/>
      <Tombstone theatreKey='Tombstone'/>
      </SheetProvider>
    </Canvas>
  )
}

export function Fish(props: any) {
  const { nodes, materials } = useGLTF('/fish.glb')
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
        //@ts-ignore
        geometry={nodes.Sphere003.geometry}
        material={materials['eye iris']}
        position={[-0.673, 0.276, 1.232]}
        scale={[0.105, 0.105, 0.06]}
      />
    </e.group>
  )
}

export function Ghost(props: any) {
  const { nodes, materials } = useGLTF('/ghost.glb')
  return (
    <e.group {...props} dispose={null}>
      <group position={[0.003, 0.297, 0.031]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials['ghost eyes']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials.ghost}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.right_eye.geometry}
        material={materials['ghost iris']}
        position={[0.198, 1.788, -0.3]}
        scale={0.023}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.left_eye.geometry}
        material={materials['ghost iris']}
        position={[0.006, 1.788, -0.3]}
        scale={0.023}
      />
    </e.group>
  )
}

useGLTF.preload('/ghost.glb')

export function Pumpkin(props: any) {
  const { nodes, materials } = useGLTF('/pumpkin.glb')
  return (
    <e.group {...props} dispose={null}>
      <group position={[-0.016, 0.996, -0.004]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001.geometry}
          material={materials['pumpkin light.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001_1.geometry}
          material={materials.pumpkin}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001_2.geometry}
          material={materials.stem}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001_3.geometry}
          material={materials.black}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials['pumpkin eye']}
        position={[-0.838, 1.199, -0.296]}
        scale={0.078}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials['pumpkin eye']}
        position={[-0.838, 1.199, 0.424]}
        scale={0.078}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials['pumpin eye white']}
        position={[-0.899, 1.194, -0.29]}
        scale={0.031}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials['pumpin eye white']}
        position={[-0.902, 1.194, 0.429]}
        scale={0.031}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials['orange glow']}
        position={[-0.016, 2.269, -1.154]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.56}
      />
    </e.group>
  )
}

export function Tombstone(props: any) {
  const { nodes, materials } = useGLTF('/tombstone.glb')
  return (
    <e.group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.gravestone}
        scale={[0.159, 1, 0.468]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials.Lettering}
        position={[-0.167, 0.075, -0.213]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.302}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text001.geometry}
        material={materials.Lettering}
        position={[-0.167, -0.144, -0.15]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.235}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text002.geometry}
        material={materials.Lettering}
        position={[-0.167, -0.401, -0.339]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.235}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text003.geometry}
        material={materials.Lettering}
        position={[-0.167, -0.667, -0.258]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.235}
      />
    </e.group>
  )
}


createRoot(document.getElementById('root')!).render(<App />)