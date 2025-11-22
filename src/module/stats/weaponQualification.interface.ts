import { Types } from "mongoose";
import { IRangeQualification } from "../track/track.interface";


export interface IWeaponQualification extends IRangeQualification {
  pass: boolean;
}

export type TWeaponQualificationUpdate = Partial<IWeaponQualification> & {
  _id: Types.ObjectId;
};
