import { Types } from "mongoose";
import { IRangeQualification } from "../rangeQualification/rangeQualification.interface";

export interface IWeaponQualification extends IRangeQualification {
  pass: boolean;
}

export type TWeaponQualificationUpdate = Partial<IWeaponQualification> & {
  _id: Types.ObjectId;
};
