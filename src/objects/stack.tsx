import { Stack } from "~/gamestate/stacks";
import { CardDimensions } from "./card";
import forestCardPath from "~/assets/cards/forest.jpg";
import treeCardPath from "~/assets/cards/tree.jpg";
import { Mesh, TextureLoader } from "three";
import { useRef, useLayoutEffect } from "react";
const cardTextureLoader = new TextureLoader();

// TODO pull from card class definitions
const treeCardTexture = cardTextureLoader.load(treeCardPath);
const forestCardTexture = cardTextureLoader.load(forestCardPath);

interface StackProps {
  stack: Stack;
}
export function RenderStack(props: StackProps) {
  const { stack } = props;
  const ref = useRef<Mesh>(null);
  useLayoutEffect(() => {
    if (ref.current) {
      stack.attach(ref.current);
    }
  });
  return (
    <mesh position={stack.initialPosition} ref={ref}>
      <boxGeometry
        args={[
          CardDimensions.width,
          (stack.cards.length - 1) * CardDimensions.depth,
          CardDimensions.height,
        ]}
      />
      <meshLambertMaterial color="#693030" attach={"material-0"} />
      <meshLambertMaterial color="#693030" attach={"material-1"} />
      <meshLambertMaterial map={treeCardTexture} attach={"material-2"} />
      <meshLambertMaterial map={forestCardTexture} attach={"material-3"} />
      <meshLambertMaterial color="#693030" attach={"material-4"} />
      <meshLambertMaterial color="#693030" attach={"material-5"} />
    </mesh>
  );
}
