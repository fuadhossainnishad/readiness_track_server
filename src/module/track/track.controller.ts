import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import trackService from "./track.services";
import httpStatus from 'http-status';
import AppError from "../../app/error/AppError";

/**
 * GET /track/completion-status
 * Protected: uses req.user._id
 */
const getCompletionStatus = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
  }
  const userId = req.user?._id;
  if (!userId) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.BAD_REQUEST,
      message: `Error retrieving completion status`,
      data: "",
    });
  }

  const result = await trackService.getCompletionStatus(userId);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Completion status retrieved successfully",
    data: result,
  });
});

export default {
  getCompletionStatus,
};
