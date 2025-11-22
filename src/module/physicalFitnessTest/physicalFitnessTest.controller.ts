import { GenericController } from "../../utility/genericController.helpers";
import { IPhysicalFitnessTest } from "./physicalFitnessTest.interface";
import physicalFitnessTest from "./physicalFitnessTest.model";

const PhysicalFitnessTestController = GenericController<IPhysicalFitnessTest>(physicalFitnessTest,
  {
    requireAuth: true,
    beforeCreate: (data, req) => {
      data.userId = req.user?._id;

      if (data.physicalFitness && Array.isArray(data.physicalFitness)) {
        data.physicalFitness = data.physicalFitness.map((item) => {
          if (item.date && typeof item.date === "string") {
            const [day, month, year] = item.date.split("/").map(Number);
            item.date = new Date(year + 2000, month - 1, day);
          }
          return item;
        })
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