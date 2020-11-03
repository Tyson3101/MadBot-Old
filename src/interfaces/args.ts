import { argsType } from "./Argstype"; // Import syntax

export interface argsInterface {
  // Args Interface makes it easier to follow
  // Interface
  name: string;
  type: argsType | argsType[];
  required: boolean;
  description: string;
  example: string[];
  order: number;
}
