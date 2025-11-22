import { model, Model, Schema } from "mongoose";
import MongooseHelper from "../../utility/mongoose.helpers";
import { IWeaponQualification } from "./weaponQualification.interface";
import { RangeQualificationSchema } from "../rangeQualification/rangeQualification.model";

export const WeaponQualificationSchema: Schema = new Schema<IWeaponQualification>({
  pass: {
    type: Boolean,
    required: true,
  },
}).add(RangeQualificationSchema);

MongooseHelper.findExistence<IWeaponQualification>(WeaponQualificationSchema);
MongooseHelper.applyToJSONTransform(WeaponQualificationSchema);

const WeaponQualification: Model<IWeaponQualification> = model<IWeaponQualification>(
  "WeaponQualification",
  WeaponQualificationSchema
);
export default WeaponQualification;
