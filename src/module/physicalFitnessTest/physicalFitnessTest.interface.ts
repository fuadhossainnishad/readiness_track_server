import { Types } from "mongoose";


export interface IPhysicalFitness {
  name: string;
  date: Date;
  pass: boolean;
}

export interface IPhysicalFitnessTest extends IPhysicalFitness {
  userId: Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TPhysicalFitnessUpdate = Partial<IPhysicalFitness> & {
  _id: Types.ObjectId;
};
