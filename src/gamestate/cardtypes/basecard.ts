import { RootState } from "@react-three/fiber";
import { Object3D, Vector3 } from "three";

let globalIdCounter = 0;

export class BaseCard {
  public object3D: Object3D | undefined;
  public id: number;
  constructor(public initialPosition: Vector3) {
    this.id = globalIdCounter++;
  }

  attach(newObject: Object3D) {
    this.object3D = newObject;
  }

  get position() {
    return this.object3D?.position!;
  }

  think(state: RootState, delta: number) {}
}
