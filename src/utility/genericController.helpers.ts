import { Model } from "mongoose";
import catchAsync from "../utility/catchAsync";
import httpStatus from "http-status";
import AppError from "../app/error/AppError";
import sendResponse from "../utility/sendResponse";
import GenericService from "../utility/genericService.helpers";
import { idConverter } from "./idConverter";
import { Request, RequestHandler } from 'express';

interface ControllerOptions {
    requireAuth?: boolean;
    beforeCreate?: (data: Record<string, unknown>, req: Request) => unknown;
    beforeUpdate?: (data: Record<string, unknown>, req: Request) => unknown;
    filterQuery?: (query: Record<string, unknown>, req: Request) => Record<string, unknown>;
}

export const GenericController = <T>(
    Model: Model<T>,
    options: ControllerOptions = {}
) => {

    const create: RequestHandler = catchAsync(async (req, res) => {
        if (options.requireAuth && !req.user) {
            throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
        }

        let data = req.body.data;

        if (options.beforeCreate) {
            data = options.beforeCreate(data, req);
        }

        const result = await GenericService.insertResources<T>(Model, data);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: `Successfully created ${Model.modelName}`,
            data: result,
        });
    })

    const getAll: RequestHandler = catchAsync(async (req, res) => {
        let query: Record<string, unknown> = { ...req.query };

        if (options.filterQuery) {
            query = options.filterQuery(query, req);
        }

        const result = await GenericService.findAllResources<T>(
            Model,
            query,
            []
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: `Successfully retrieved ${Model.modelName} data`,
            data: result,
        });
    })

    const update: RequestHandler = catchAsync(async (req, res) => {
        if (options.requireAuth && !req.user) {
            throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
        }

        let data = req.body.data;

        if (options.beforeUpdate) {
            data = options.beforeUpdate(data, req);
        }

        const id = req.params.id;
        const objectId = await idConverter(id);

        const result = await GenericService.updateResources<T>(
            Model,
            objectId,
            data
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: `Successfully updated ${Model.modelName}`,
            data: result,
        });
    })

    const remove: RequestHandler = catchAsync(async (req, res) => {
        if (options.requireAuth && !req.user) {
            throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
        }

        const id = await idConverter(req.params.id);

        const result = await GenericService.deleteResources<T>(Model, id);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: `Successfully deleted ${Model.modelName}`,
            data: result,
        });
    })

    return { create, getAll, update, remove };
};
