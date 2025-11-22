import express from "express";
import auth from "../../middleware/auth";
import WeaponQualificationController from "./weaponQualification.controller";


const router = express.Router();

router.use(auth("User"));
router
  .route("/")
  .get(WeaponQualificationController.getAll)
  .post(WeaponQualificationController.create)


// router
//   .route("/:id")
//   .patch(AdminUserController.updateAdminUser)
//   .delete(AdminUserController.deleteAdminUser);

const WeaponQualificationRouter = router;
export default WeaponQualificationRouter;
