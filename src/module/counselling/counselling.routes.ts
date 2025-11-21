import express from "express";
import auth from "../../middleware/auth";
import CounselingController from "./counselling.controller";


const router = express.Router();

router.use(auth("User"));
router
  .route("/")
  .get(CounselingController.getAll)
  .post(CounselingController.create)


// router
//   .route("/:id")
//   .patch(AdminUserController.updateAdminUser)
//   .delete(AdminUserController.deleteAdminUser);

const CounselingRouter = router;
export default CounselingRouter;
