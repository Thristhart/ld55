import { Instance, InstanceProps, Instances } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import React from "react";
import { Mesh, Texture, TextureLoader } from "three";
import forestCardPath from "~/assets/cards/forest.jpg";
import treeCardPath from "~/assets/cards/tree.jpg";
import { centimeters, millimeters } from "~/util/units";
const cardTextureLoader = new TextureLoader();

const treeCardTexture = cardTextureLoader.load(treeCardPath);
const forestCardTexture = cardTextureLoader.load(forestCardPath);

const width = centimeters(6.3);
const height = centimeters(9.01);
const depth = millimeters(0.3); // normally 0.3

export const CardDimensions = { width, height, depth };

interface CardProps {
  readonly frontTexture: Texture;
  readonly backTexture: Texture;
}
function Card(props: CardProps) {
  return (
    <>
      <boxGeometry args={[width, depth, height]} />
      <meshLambertMaterial color="#693030" attach={"material-0"} />
      <meshLambertMaterial color="#693030" attach={"material-1"} />
      <meshLambertMaterial map={props.frontTexture} attach={"material-2"} />
      <meshLambertMaterial map={props.backTexture} attach={"material-3"} />
      <meshLambertMaterial color="#693030" attach={"material-4"} />
      <meshLambertMaterial color="#693030" attach={"material-5"} />
    </>
  );
}

interface TreeCardProps extends MeshProps {
  meshRef: React.RefObject<Mesh>;
}
export function TreeCard(props: TreeCardProps) {
  return (
    <mesh {...props} ref={props.meshRef}>
      <Card frontTexture={treeCardTexture} backTexture={forestCardTexture} />
    </mesh>
  );
}

interface TreeCardsProps {
  trees: InstanceProps[];
}
export function TreeCards(props: TreeCardsProps) {
  return (
    <Instances>
      <Card frontTexture={treeCardTexture} backTexture={forestCardTexture} />
      {props.trees.map((tree, index) => (
        <Instance key={index} {...tree} />
      ))}
    </Instances>
  );
}
