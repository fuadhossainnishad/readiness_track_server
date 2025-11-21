import { model, Model, Schema } from "mongoose";
import MongooseHelper from "../../utility/mongoose.helpers";
import { MedproSchema } from "../track/track.model";
import { ICounseling } from "./counselling.interface";

export const CounselingSchema: Schema = new Schema({
  nextDate: {
    type: Date,
    required: true,
  },
  counseledBy: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
}).add(MedproSchema);

MongooseHelper.findExistence<ICounseling>(CounselingSchema);
MongooseHelper.applyToJSONTransform(CounselingSchema);

const Counseling: Model<ICounseling> = model<ICounseling>(
  "Counseling",
  CounselingSchema
);
export default Counseling;
