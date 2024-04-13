import { RootState } from "@react-three/fiber";
import { cards } from "./cards";
import { stacks } from "./stacks";

export function tick(state: RootState, delta: number) {
  cards.trees.forEach((tree) => {
    if (tree.stack) {
      return;
    }
    if (Math.random() < 0.1) {
      stacks[0].addCard(tree);
    }
    tree.think(state, delta);
  });
}
