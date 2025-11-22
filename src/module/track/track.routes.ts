import { Router } from "express";
import trackController from "./track.controller";
import auth from "../../middleware/auth";

const router = Router();

// GET /track/completion-status

router.get(
  "/status",
  auth('User'),
  trackController.getCompletionStatus
);

const TrackRouter = router;

export default TrackRouter;
