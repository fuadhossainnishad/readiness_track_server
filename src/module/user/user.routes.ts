import express from "express";
import UserController from "./user.controller";
import { upload } from "../../middleware/multer/multer";
import { fileHandle } from "../../middleware/fileHandle";
import auth from "../../middleware/auth";

const router = express.Router();

router
  .route("/")
  .get(
    auth("User", "Admin"),
    //   validationRequest(AuthValidationSchema.playerSignUpValidation),
    UserController.getUser
  )
  .patch(
    auth("User", "Admin"),
    upload.fields([{ name: "photo", maxCount: 1 }]),
    fileHandle("photo"),
    //   validationRequest(AuthValidationSchema.playerSignUpValidation),
    UserController.updateUser
  ).delete(
    auth("User"),
    //   validationRequest(AuthValidationSchema.playerSignUpValidation),
    UserController.deleteUser
  );

const UserRouter = router;
export default UserRouter;
