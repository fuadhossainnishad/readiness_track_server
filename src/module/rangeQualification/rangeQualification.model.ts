import { model, Model, Schema } from "mongoose";
import MongooseHelper from "../../utility/mongoose.helpers";
import { MedproSchema } from "../track/track.model";
import { IRangeQualification, TQualificationLevel } from "./rangeQualification.interface";
import SchemaHelper from "../../utility/schema.helper";

export const RangeQualificationSchema: Schema = new Schema<IRangeQualification>({
  weaponName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  qualificationLevel: [{
    type: String,
    enum: Object.values(TQualificationLevel),
    required: true,
  }],
}).add(SchemaHelper.RemoveSchemaFields(MedproSchema, ["name"]));

MongooseHelper.findExistence<IRangeQualification>(RangeQualificationSchema);
MongooseHelper.applyToJSONTransform(RangeQualificationSchema);

const RangeQualification: Model<IRangeQualification> = model<IRangeQualification>(
  "RangeQualification",
  RangeQualificationSchema
);
export default RangeQualification;
