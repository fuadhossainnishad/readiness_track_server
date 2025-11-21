import httpStatus from "http-status";
import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import AppError from "../../app/error/AppError";
import sendResponse from "../../utility/sendResponse";
import GenericService from "../../utility/genericService.helpers";
import { idConverter } from "../../utility/idConverter";
// import NotificationServices from "../notification/notification.service";
import AdminUser from "./adminUser.model";
import { IAdminUser } from "./adminUser.interface";

const createAdminUser: RequestHandler = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated", "");
  }
  // const date = dateParse(req.body.data.date, req.body.data.time);
  // if (!date) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "Date/Time is required");
  // }

  req.body.data.userId = req.user?._id;
  const result = await GenericService.insertResources<IAdminUser>(
    AdminUser,
    req.body?.data
  );

  // await NotificationServices.sendNoification({
  //   ownerId: req.user?._id,
  //   key: "notification",
  //   data: {
  //     id: result.Subsciption?._id.toString(),
  //     message: `New subsciption added`,
  //   },
  //   receiverId: [req.user?._id],
  // });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "successfully added new AdminUser",
    data: result,
  });
});

// const getAdminUser: RequestHandler = catchAsync(async (req, res) => {
//   const { AdminUserId } = req.body.data;
//   console.log("AdminUserId: ", AdminUserId);

//   if (!AdminUserId) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       "AdminUser ID is required",
//       ""
//     );
//   }
//   const result = await GenericService.findResources<IAdminUser>(
//     AdminUser,
//     await idConverter(AdminUserId)
//   );
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "successfully retrieve AdminUser data",
//     data: result,
//   });
// });

const getAllAdminUser: RequestHandler = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated", "");
  }
  const query = {
    ...req.query,
    userId: req.user?._id,
  }
  const result = await GenericService.findAllResources<IAdminUser>(
    AdminUser,
    query,
    []
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully retrieve adminUser data",
    data: result,
  });
});

const updateAdminUser: RequestHandler = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated", "");
  }
  const id = req?.params.id;

  // const id =
  //   typeof rawId === "string"
  //     ? rawId
  //     : Array.isArray(rawId) && typeof rawId[0] === "string"
  //       ? rawId[0]
  //       : undefined;

  const result = await GenericService.updateResources<IAdminUser>(
    AdminUser,
    await idConverter(id),
    req.body.data
  );

  // await NotificationServices.sendNoification({
  //   ownerId: req.user?._id,
  //   key: "notification",
  //   data: {
  //     id: result.AdminUser?._id.toString(),
  //     message: `An AdminUser updated`,
  //   },
  //   receiverId: [req.user?._id],
  // });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully updated AdminUser ",
    data: result,
  });
});

const deleteAdminUser: RequestHandler = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated", "");
  }
  const { id } = req.params;
  const result = await GenericService.deleteResources<IAdminUser>(
    AdminUser,
    await idConverter(id)
  );

  // await NotificationServices.sendNoification({
  //   ownerId: req.user?._id,
  //   key: "notification",
  //   data: {
  //     message: `An AdminUser deleted`,
  //   },
  //   receiverId: [req.user?._id],
  // });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully deleted AdminUser",
    data: result,
  });
});

const AdminUserController = {
  createAdminUser,
  // getAdminUser,
  getAllAdminUser,
  updateAdminUser,
  deleteAdminUser,
};

export default AdminUserController;
