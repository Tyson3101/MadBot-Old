import { argsType } from "./argstype"; // Import syntax

export interface args {
  // Interface
  name: string;
  type: argsType | argsType[];
  required: boolean;
  description: string;
  example: string[];
  order: number;
}
