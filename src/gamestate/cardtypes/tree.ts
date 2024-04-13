import { RootState } from "@react-three/fiber";
import { BaseCard } from "./basecard";
import { Vector3, TextureLoader, Texture } from "three";
import forestCardPath from "~/assets/cards/forest.jpg";
import treeCardPath from "~/assets/cards/tree.jpg";

const cardTextureLoader = new TextureLoader();
const treeCardTexture = cardTextureLoader.load(treeCardPath);
const forestCardTexture = cardTextureLoader.load(forestCardPath);

export class TreeCard extends BaseCard {
  name = "Teferi, Time Raveler";
  description = `Opponents can cast spells only as though they were sorceries and can attack Teferi as though he were you. Put 4 loyalty (use counters) on Teferi. Any damage he suffers depletes that much loyalty. If Teferi has no loyalty, he abandons you. During your turn, you may add 1 loyalty to allow you to cast sorceries as though they were instants until your next turn; or you may spend 3 loyalty, then the owner of target artifact, creature, or enchantment returns it to hand and you draw a card. Any enchantments on it are discarded.`;
  static frontTexture: Texture = treeCardTexture;
  static backTexture: Texture = forestCardTexture;

  constructor(public initialPosition: Vector3) {
    super(initialPosition);
  }

  think(state: RootState, delta: number): void {}
}
