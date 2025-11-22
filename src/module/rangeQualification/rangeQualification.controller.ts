import { GenericController } from "../../utility/genericController.helpers";
import { IRangeQualification } from "./rangeQualification.interface";
import RangeQualification from "./rangeQualification.model";

const RangeQualificationController = GenericController<IRangeQualification>(RangeQualification,
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

export default RangeQualificationController;