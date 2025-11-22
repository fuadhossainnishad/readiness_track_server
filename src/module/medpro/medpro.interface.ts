import { Types } from "mongoose";

export enum TMedpro {
  vision = "vision",
  immunization = "immunization",
  hearing = "hearing",
  dental = "dental",
  dlc = "dlc",
  hiv = "hiv",
  pha = "pha",
  dna = "dna",
}
export interface IMedproTest {
  type: TMedpro;
  name: string;
  date: Date;
}

export interface IMedpro {
  userId: Types.ObjectId;
  tests: IMedproTest[]
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TPhysicalFitnessUpdate = Partial<IMedpro> & {
  _id: Types.ObjectId;
};
