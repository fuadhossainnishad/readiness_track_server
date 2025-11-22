import { Types } from "mongoose";
import { IMedpro } from "../track/track.interface";

export enum TQualificationLevel {
  marksman = "marksman",
  sharpshooter = "sharpshooter",
  expert = "expert",
}

export interface IRangeQualification extends Omit<IMedpro, "name"> {
  weaponName: string;
  score: number;
  qualificationLevel: TQualificationLevel;
}

export type TRangeQualificationUpdate = Partial<IRangeQualification> & {
  _id: Types.ObjectId;
};
