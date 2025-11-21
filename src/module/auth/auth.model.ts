import { model, Schema } from "mongoose";
import { IOtp } from "./auth.interface";
import MongooseHelper from "../../utility/mongoose.helpers";

// const isRequired = function (this: IUser): boolean {
//   return !!this.firstName;
// };
// const roleBasedRequired = function (this: IUser): boolean {
//   return this.role === 'User'
// }

// export const SignupSchema: Schema = new Schema<ISignup>({
//   firstName: {
//     type: String,
//     required: roleBasedRequired,
//   },
//   lastName: {
//     type: String,
//     required: isRequired,
//   },
//   mobile: {
//     type: String,
//     required: isRequired,
//   },
//   countryCode: {
//     type: String,
//     required: isRequired,
//   },
// }

// )

const OtpSchema = new Schema<IOtp>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [false, "User ID is not required"],
    },
    email: {
      type: String,
      required: [true, "Email is Not Required"],
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "0" },
    },
  },
  { timestamps: true }
);

MongooseHelper.applyToJSONTransform(OtpSchema);

const Otp = model<IOtp>("Otp", OtpSchema);
export default Otp;
