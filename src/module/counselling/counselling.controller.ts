import { GenericController } from "../../utility/genericController.helpers";
import { ICounseling } from "./counselling.interface";
import Counseling from "./counselling.model";

const CounselingController = GenericController<ICounseling>(Counseling,
  {
    requireAuth: true,
    beforeCreate: (data, req) => {
      data.userId = req.user?._id;

      if (data.date && typeof data.date === "string") {
        const [day, month, year] = data.date.split("/").map(Number);
        data.date = new Date(year + 2000, month - 1, day);
      }

      if (data.nextDate && typeof data.nextDate === "string") {
        const [day, month, year] = data.nextDate.split("/").map(Number);
        data.nextDate = new Date(year + 2000, month - 1, day);
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

export default CounselingController;