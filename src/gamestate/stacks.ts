import { Object3D, Vector3 } from "three";
import { BaseCard } from "./cardtypes/basecard";
import { forceRender } from "~/game";
import { CardDimensions } from "~/objects/card";

let globalIdCounter = 0;
export class Stack {
  public object3D: Object3D | undefined;
  public id: number;
  public cards: BaseCard[] = [];
  constructor(public initialPosition: Vector3) {
    this.id = globalIdCounter++;
  }

  attach(newObject: Object3D) {
    this.object3D = newObject;
  }

  get position() {
    return this.object3D?.position!;
  }

  addCard(card: BaseCard) {
    this.cards.push(card);
    if (card.stack) {
      card.stack.removeCard(card);
    }
    card.stack = this;
    this.position.y = (this.cards.length * CardDimensions.depth) / 2;
    card.position.copy(this.position);
    card.position.y = this.cards.length * CardDimensions.depth;
    forceRender();
  }
  removeCard(card: BaseCard) {
    const index = this.cards.indexOf(card);
    if (index !== -1) {
      this.cards.splice(index, 1);
      this.position.y = (this.cards.length * CardDimensions.depth) / 2;
    }
    if (card.stack === this) {
      card.stack = undefined;
    }
    forceRender();
  }
}

export const stacks: Stack[] = [];

stacks.push(new Stack(new Vector3(0, 0, 0)));

// @ts-ignore
window.debug ??= {};
// @ts-ignore
window.debug.stacks = stacks;
