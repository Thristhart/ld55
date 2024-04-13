import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { cards } from "./gamestate/cards";
import { TreeCards } from "./objects/card";
import { Table } from "./objects/table";
import { millimeters } from "./util/units";
import { tick } from "./gamestate/tick";
import { stacks } from "./gamestate/stacks";
import { RenderStack } from "./objects/stack";
import { useState } from "react";

export let forceRender = () => {};

function CanvasContents() {
  useFrame(tick);

  const [_, setRenderHack] = useState(0);
  forceRender = () => setRenderHack((i) => i + 1);
  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <PerspectiveCamera makeDefault position={[0, 1, 0.3]} />
      <CameraControls
        maxAzimuthAngle={0.2}
        minAzimuthAngle={-0.2}
        maxPolarAngle={Math.PI * 0.25}
        minPolarAngle={0}
        minDistance={0.3}
        maxDistance={2.5}
      />
      <Table
        position={[0, millimeters(-1), 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      {stacks.map((stack) => (
        <RenderStack key={stack.id} stack={stack} />
      ))}
      <TreeCards trees={cards.trees} />
    </>
  );
}

export function Game() {
  return (
    <Canvas>
      <CanvasContents />
    </Canvas>
  );
}
