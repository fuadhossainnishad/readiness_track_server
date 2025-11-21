import { model, Model, Schema } from "mongoose";
import MongooseHelper from "../../utility/mongoose.helpers";
import { IAdminUser } from "./adminUser.interface";

const AdminUserSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lesCorrect: {
    type: Boolean,
    default: false,
  },
  vehicleRegistration: {
    type: String,
    default: "",
  },
  vehicleInsurance: {
    type: String,
    default: "",
  },
  educationMilitary: {
    type: String,
    default: "",
  },
  educationCivilian: {
    type: String,
    default: "",
  },
  volunteerHour: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

MongooseHelper.findExistence<IAdminUser>(AdminUserSchema);
MongooseHelper.applyToJSONTransform(AdminUserSchema);

const AdminUser: Model<IAdminUser> = model<IAdminUser>(
  "AdminUser",
  AdminUserSchema
);
export default AdminUser;
