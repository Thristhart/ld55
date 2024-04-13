import {
  Instance,
  InstanceProps,
  Instances,
  Plane,
  Text,
} from "@react-three/drei";
import { ForwardRefComponent } from "@react-three/drei/helpers/ts-utils";
import { ReactThreeFiber, ThreeElements, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { Mesh, Texture, TextureLoader, Vector3 } from "three";
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

type TextProps = typeof Text extends ForwardRefComponent<infer P, any>
  ? P
  : never;

interface TextWithBackgroundProps {
  textProps: Omit<TextProps, "children">;
  padding?: number;
}
function TextWithBackground(
  props: ThreeElements["group"] & TextWithBackgroundProps
) {
  const { padding = 0, textProps, ...groupProps } = props;

  const ref = useRef<Mesh>(null);
  const [measuredSize, setSize] = useState<Vector3 | undefined>(undefined);
  useFrame(() => {
    if (measuredSize) {
      return;
    }
    const size = new Vector3();
    ref.current?.geometry.boundingBox?.getSize(size);
    if (size.x !== 0) {
      if (padding) {
        size.x += padding * 2;
        size.y += padding * 2;
      }
      setSize(size);
    }
  });
  return (
    <group {...groupProps}>
      {measuredSize && (
        <Plane
          position={[
            textProps.anchorX === "left" ? (measuredSize?.x ?? 0) / 2 : 0,
            textProps.anchorY === "top"
              ? -(measuredSize?.y ?? 0) / 2
              : textProps.anchorY === "bottom"
              ? (measuredSize?.y ?? 0) / 2
              : 0,
            0,
          ]}
          args={measuredSize ? [measuredSize.x, measuredSize.y] : undefined}
        >
          <meshBasicMaterial color={"white"} depthWrite={false} />
        </Plane>
      )}
      <Text ref={ref} position={[0, padding, 0]} {...textProps}>
        {props.children}
      </Text>
    </group>
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
        <Instance key={index} {...tree}>
          <Suspense>
            <TextWithBackground
              textProps={{
                color: "black",
                fontSize: 0.005,
                anchorY: "top",
                anchorX: "left",
                maxWidth: width - centimeters(1),
              }}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[-width / 2, depth, -height / 2 + millimeters(1.5)]}
            >
              &nbsp;Teferi, Time Raveler&nbsp;
            </TextWithBackground>
            <TextWithBackground
              textProps={{
                color: "black",
                fontSize: 0.002,
                anchorY: "bottom",
                anchorX: "center",
                maxWidth: width - centimeters(1),
              }}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, depth, height / 2 - centimeters(0.5)]}
              padding={millimeters(1)}
            >
              Opponents can cast spells only as though they were sorcieries and
              can attack Teferi as though he were you. Put 4 loyalty (use
              counters) on Teferi. Any damage he suffers depletes that much
              loyalty. If Teferi has no loyalty, he abandons you. During your
              turn, you may add 1 loyalty to allow you to cast sorceries as
              though they were instants until your next turn; or you may spend 3
              loyalty, then the owner of target artifact, creature, or
              enchantment returns it to hand and you draw a card. Any
              enchantments on it are discarded.
            </TextWithBackground>
          </Suspense>
        </Instance>
      ))}
    </Instances>
  );
}
