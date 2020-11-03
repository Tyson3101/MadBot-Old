import { argsType } from "./Argstype"; // Import syntax

export interface argsInterface {
  // Interface
  name: string;
  type: argsType | argsType[];
  required: boolean;
  description: string;
  example: string[];
  order: number;
}
