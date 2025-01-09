import { Entity, EntityType } from "@/simulator/Entity";
import { type Position } from "@/simulator/Position";

export class Rock extends Entity {
  public static Destructible = false;
  public static Health = -1;

  public constructor(position: Position) {
    super(EntityType.Rock, Rock.Destructible, Rock.Health, position);
  }

  public getToken(): string {
    return "R";
  }
}
