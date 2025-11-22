import express from "express";
import auth from "../../middleware/auth";
import RangeQualificationController from "./rangeQualification.controller";


const router = express.Router();

router.use(auth("User"));
router
  .route("/")
  .get(RangeQualificationController.getAll)
  .post(RangeQualificationController.create)


// router
//   .route("/:id")
//   .patch(AdminUserController.updateAdminUser)
//   .delete(AdminUserController.deleteAdminUser);

const RangeQualificationRouter = router;
export default RangeQualificationRouter;
