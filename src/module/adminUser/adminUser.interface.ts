import { Types } from "mongoose";

export interface IAdminUser {
  userId: Types.ObjectId;
  lesCorrect: boolean;
  vehicleRegistration: string;
  vehicleInsurance: string;
  educationMilitary: string;
  educationCivilian: string;
  volunteerHour: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TAppointmentUpdate = Partial<IAdminUser> & {
  _id: Types.ObjectId;
};
