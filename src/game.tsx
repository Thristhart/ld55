import {
  CameraControls,
  InstanceProps,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CardDimensions, TreeCards } from "./objects/card";
import { Table } from "./objects/table";
import { millimeters } from "./util/units";

const trees: InstanceProps[] = [];

for (let i = 0; i < 100; i++) {
  trees.push({ position: [i * CardDimensions.width * 1.2 - 1, 0, 0] });
}

export function Game() {
  return (
    <Canvas gl={{ logarithmicDepthBuffer: true }}>
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

      <TreeCards trees={trees} />
    </Canvas>
  );
}
