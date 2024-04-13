import { RootState } from "@react-three/fiber";
import { cards } from "./cards";

export function tick(state: RootState, delta: number) {
  cards.trees.forEach((tree) => tree.think(state, delta));
}
