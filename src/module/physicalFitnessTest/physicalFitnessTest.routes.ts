import express from "express";
import auth from "../../middleware/auth";
import PhysicalFitnessTestController from "./physicalFitnessTest.controller";


const router = express.Router();

router.use(auth("User"));
router
  .route("/")
  .get(PhysicalFitnessTestController.getAll)
  .post(PhysicalFitnessTestController.create)


// router
//   .route("/:id")
//   .patch(AdminUserController.updateAdminUser)
//   .delete(AdminUserController.deleteAdminUser);

const PhysicalFitnessTestRouter = router;
export default PhysicalFitnessTestRouter;
