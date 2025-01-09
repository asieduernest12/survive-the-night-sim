import { Entity, EntityType } from "@/simulator/Entity";
import { type Position } from "@/simulator/Position";

export class Box extends Entity {
  public static Destructible = true;
  public static Health = 1;

  public constructor(position: Position) {
    super(EntityType.Box, Box.Destructible, Box.Health, position);
  }

  public getToken(): string {
    return "B";
  }
}
