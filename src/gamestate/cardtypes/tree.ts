import { RootState } from "@react-three/fiber";
import { BaseCard } from "./basecard";

export class TreeCard extends BaseCard {
  think(state: RootState, delta: number): void {
    this.position.setX(
      this.position.x - Math.sin(state.clock.getElapsedTime()) * delta
    );
  }
}
