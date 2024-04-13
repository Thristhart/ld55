import { Vector3 } from "three";
import { TreeCard } from "./cardtypes/tree";
import { CardDimensions } from "~/objects/card";

export const cards = {
  trees: [] as TreeCard[],
};

for (let i = 0; i < 100; i++) {
  cards.trees.push(
    new TreeCard(new Vector3(i * CardDimensions.width * 1.2 - 1, 0, 0))
  );
}

// @ts-ignore
window.debug ??= {};
// @ts-ignore
window.debug.cards = cards;
