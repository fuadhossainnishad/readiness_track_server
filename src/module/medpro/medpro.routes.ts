import express from "express";
import auth from "../../middleware/auth";
import MedproController from "./medpro.controller";


const router = express.Router();

router.use(auth("User"));
router
  .route("/")
  .get(MedproController.getAll)
  .post(MedproController.create)


// router
//   .route("/:id")
//   .patch(AdminUserController.updateAdminUser)
//   .delete(AdminUserController.deleteAdminUser);

const MedproRouter = router;
export default MedproRouter;
