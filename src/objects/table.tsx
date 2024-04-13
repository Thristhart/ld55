import { Plane } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";
import tableCardPath from "~/assets/table.jpg";

const tableTextureLoader = new TextureLoader();

const size = 256;

const tableTexture = tableTextureLoader.load(tableCardPath);
tableTexture.repeat.set(size * 2, size * 2);
tableTexture.wrapS = RepeatWrapping;
tableTexture.wrapT = RepeatWrapping;

export function Table(props: MeshProps) {
  return (
    <Plane {...props} args={[size, size]}>
      <meshPhongMaterial map={tableTexture} />
    </Plane>
  );
}
