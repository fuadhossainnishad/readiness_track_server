import { Types } from "mongoose";


export interface IPhysicalFitness {
  name: string;
  date: Date;
  pass: boolean;
}

export interface IPhysicalFitnessTest {
  userId: Types.ObjectId;
  physicalFitness: IPhysicalFitness[],
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TPhysicalFitnessUpdate = Partial<IPhysicalFitness> & {
  _id: Types.ObjectId;
};
