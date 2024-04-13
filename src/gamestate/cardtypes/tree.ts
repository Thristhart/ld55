import { RootState } from "@react-three/fiber";
import { BaseCard } from "./basecard";
import { Vector3 } from "three";

export class TreeCard extends BaseCard {
  name = "Teferi, Time Raveler";
  description = 
  `Opponents can cast spells only as though they were sorceries and can attack Teferi as though he were you. Put 4 loyalty (use counters) on Teferi. Any damage he suffers depletes that much loyalty. If Teferi has no loyalty, he abandons you. During your turn, you may add 1 loyalty to allow you to cast sorceries as though they were instants until your next turn; or you may spend 3 loyalty, then the owner of target artifact, creature, or enchantment returns it to hand and you draw a card. Any enchantments on it are discarded.`;
  
  constructor(public initialPosition: Vector3) {
    super(initialPosition)
  }
  
  think(state: RootState, delta: number): void {
  }
}
