import { GenericController } from "../../utility/genericController.helpers";
import { IMedpro } from "./medpro.interface";
import physicalFitnessTest from "./medpro.model";

const MedproController = GenericController<IMedpro>(physicalFitnessTest,
  {
    requireAuth: true,
    beforeCreate: (data, req) => {
      data.userId = req.user?._id;


      if (data.tests && Array.isArray(data.tests)) {
        data.tests = data.tests.map((item) => {
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

export default MedproController;