import express from "express";
import AdminController from "./admin.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.delete(
  "/",
  auth('Admin'),
  //   validationRequest(AuthValidationSchema.playerSignUpValidation),
  AdminController.deleteAdmin
);
router.get(
  "/get_admin",
  //   validationRequest(AuthValidationSchema.playerSignUpValidation),
  AdminController.getAdmin
);

router.patch(
  "/update_admin",
  //   validationRequest(AuthValidationSchema.playerSignUpValidation),
  AdminController.updateAdmin
);


const AdminRouter = router;
export default AdminRouter;
