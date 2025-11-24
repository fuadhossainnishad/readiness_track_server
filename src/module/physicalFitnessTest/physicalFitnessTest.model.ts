import { model, Model, Schema } from "mongoose";
import MongooseHelper from "../../utility/mongoose.helpers";
import { IPhysicalFitness, IPhysicalFitnessTest } from "./physicalFitnessTest.interface";

export const PhysicalFitnessSchema: Schema = new Schema<IPhysicalFitness>({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  pass: {
    type: Boolean,
    required: true,
  },
})

export const PhysicalFitnessTestSchema: Schema = new Schema<IPhysicalFitnessTest>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // physicalFitness: {
  //   type: PhysicalFitnessSchema,
  //   required: true,
  // },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
  { timestamps: true }).add(PhysicalFitnessSchema);

MongooseHelper.findExistence<IPhysicalFitnessTest>(PhysicalFitnessTestSchema);
MongooseHelper.applyToJSONTransform(PhysicalFitnessTestSchema);

const PhysicalFitnessTest: Model<IPhysicalFitnessTest> = model<IPhysicalFitnessTest>(
  "PhysicalFitnessTest",
  PhysicalFitnessTestSchema
);
export default PhysicalFitnessTest;
