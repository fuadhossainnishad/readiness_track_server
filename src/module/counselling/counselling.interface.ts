import { Types } from "mongoose";
import { IMedpro } from "../track/track.interface";


export interface ICounseling extends IMedpro {
  nextDate: Date;
  counseledBy: string;
  notes: string;
}

export type TAppointmentUpdate = Partial<ICounseling> & {
  _id: Types.ObjectId;
};
