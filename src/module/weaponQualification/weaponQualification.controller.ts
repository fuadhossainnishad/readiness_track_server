import { GenericController } from "../../utility/genericController.helpers";
import { IWeaponQualification } from "./weaponQualification.interface";
import WeaponQualification from "./weaponQualification.model";

const WeaponQualificationController = GenericController<IWeaponQualification>(WeaponQualification,
  {
    requireAuth: true,
    beforeCreate: (data, req) => {
      data.userId = req.user?._id;

      if (data.date && typeof data.date === "string") {
        const [day, month, year] = data.date.split("/").map(Number);
        data.date = new Date(year + 2000, month - 1, day);
      }
      return data;
    },
    filterQuery: (query, req) => {
      if (req.user) {
        query.userId = req.user._id;
      }
      return query;
    },
  }
)

export default WeaponQualificationController;