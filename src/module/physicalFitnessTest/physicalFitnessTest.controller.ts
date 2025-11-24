import { GenericController } from "../../utility/genericController.helpers";
import { IPhysicalFitnessTest } from "./physicalFitnessTest.interface";
import physicalFitnessTest from "./physicalFitnessTest.model";

const PhysicalFitnessTestController = GenericController<IPhysicalFitnessTest>(physicalFitnessTest,
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

export default PhysicalFitnessTestController;