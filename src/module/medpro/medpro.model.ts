import { model, Model, Schema } from "mongoose";
import MongooseHelper from "../../utility/mongoose.helpers";
import { IMedpro, IMedproTest, TMedpro } from './medpro.interface';

export const MedproTestSchema: Schema = new Schema<IMedproTest>({
  type: {
    type: String,
    enum: Object.values(TMedpro),
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
})

export const MedproSchema: Schema = new Schema<IMedpro>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tests: {
    type: [MedproTestSchema],
    required: true,
    validate: function (this: IMedpro) {
      return this.tests.length > 0;
    }

  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
  { timestamps: true });

MongooseHelper.findExistence<IMedpro>(MedproSchema);
MongooseHelper.applyToJSONTransform(MedproSchema);

const Medpro: Model<IMedpro> = model<IMedpro>(
  "Medpro",
  MedproSchema
);
export default Medpro;
