import express from "express";
import auth from "../../middleware/auth";
import AdminUserController from "./adminUser.controller";


const router = express.Router();

router.use(auth("User"));
router
  .route("/")
  .get(AdminUserController.getAllAdminUser)
  .post(AdminUserController.createAdminUser)


// router
//   .route("/:id")
//   .patch(AdminUserController.updateAdminUser)
//   .delete(AdminUserController.deleteAdminUser);

const AdminUserRouter = router;
export default AdminUserRouter;
