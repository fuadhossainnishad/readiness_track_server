import { Types } from "mongoose";
import { TMedpro } from "../medpro/medpro.interface";
import User from "../user/user.model";

export type CompletionStatus = {
    medproCompleted: boolean;
    fitnessCompleted: boolean;
    rangeCompleted: boolean;
    weaponCompleted: boolean;
    counselingCompleted: boolean;
    adminCompleted: boolean;
    totalCompleted: number;
    completionPercentage: number; // 0-100 (2 decimals)
};

const REQUIRED_MEDPRO = Object.values(TMedpro); // array of medpro types
const TOTAL_CATEGORIES = 6;

const toObjectId = (id: string | Types.ObjectId) =>
    typeof id === "string" ? new Types.ObjectId(id) : id;

/**
 * Aggregation-based: computes completion status for the six categories
 * Single aggregate on the users collection (matching _id) and looking up related collections.
 */
const trackService = {
    getCompletionStatus: async (userId: string | Types.ObjectId): Promise<CompletionStatus> => {
        const _id = toObjectId(userId);
        const requiredMedproCount = REQUIRED_MEDPRO.length;

        const pipeline = [
            { $match: { _id: _id } },

            // lookups for each collection
            {
                $lookup: {
                    from: "medpros",
                    localField: "_id",
                    foreignField: "userId",
                    as: "medproDocs",
                },
            },
            {
                $lookup: {
                    from: "physicalfitnesstests",
                    localField: "_id",
                    foreignField: "userId",
                    as: "fitnessDocs",
                },
            },
            {
                $lookup: {
                    from: "rangequalifications",
                    localField: "_id",
                    foreignField: "userId",
                    as: "rangeDocs",
                },
            },
            {
                $lookup: {
                    from: "weaponqualifications",
                    localField: "_id",
                    foreignField: "userId",
                    as: "weaponDocs",
                },
            },
            {
                $lookup: {
                    from: "counselings",
                    localField: "_id",
                    foreignField: "userId",
                    as: "counselingDocs",
                },
            },
            {
                $lookup: {
                    from: "adminusers",
                    localField: "_id",
                    foreignField: "userId",
                    as: "adminDocs",
                },
            },

            // compute each completed boolean
            {
                $addFields: {
                    // medproCompleted: must have a medpro doc and that doc's tests must include all required types
                    medproTypesPresent: {
                        $reduce: {
                            input: {
                                $map: {
                                    input: "$medproDocs",
                                    as: "m",
                                    in: { $ifNull: ["$$m.tests.type", []] } // collect arrays of types (could be nested)
                                }
                            },
                            initialValue: [],
                            in: { $setUnion: ["$$value", "$$this"] }
                        }
                    }
                }
            },
            {
                $addFields: {
                    medproCompleted: {
                        $eq: [{ $size: "$medproTypesPresent" }, requiredMedproCount]
                    },

                    // fitnessCompleted: at least one physicalFitness entry exists (physicalFitness array length > 0)
                    fitnessCompleted: {
                        $gt: [
                            {
                                $reduce: {
                                    input: "$fitnessDocs",
                                    initialValue: 0,
                                    in: { $add: ["$$value", { $size: { $ifNull: ["$$this.physicalFitness", []] } }] }
                                }
                            },
                            0
                        ]
                    },

                    // rangeCompleted: at least one range doc with score > 0 and non-empty qualificationLevel
                    rangeCompleted: {
                        $gt: [
                            {
                                $size: {
                                    $filter: {
                                        input: "$rangeDocs",
                                        as: "r",
                                        cond: {
                                            $and: [
                                                { $gt: ["$$r.score", 0] },
                                                { $gt: [{ $size: { $ifNull: ["$$r.qualificationLevel", []] } }, 0] }
                                            ]
                                        }
                                    }
                                }
                            },
                            0
                        ]
                    },

                    // weaponCompleted: at least one weapon doc with pass === true
                    weaponCompleted: {
                        $gt: [
                            {
                                $size: {
                                    $filter: {
                                        input: "$weaponDocs",
                                        as: "w",
                                        cond: { $eq: ["$$w.pass", true] }
                                    }
                                }
                            },
                            0
                        ]
                    },

                    // counselingCompleted: at least one counseling doc exists (medpro part already included in counseling schema)
                    counselingCompleted: {
                        $gt: [{ $size: { $ifNull: ["$counselingDocs", []] } }, 0]
                    },

                    // adminCompleted: check admin doc exists and all required admin fields valid
                    adminCompleted: {
                        $let: {
                            vars: {
                                admin: { $arrayElemAt: ["$adminDocs", 0] }
                            },
                            in: {
                                $cond: [
                                    { $gt: [{ $size: { $ifNull: ["$adminDocs", []] } }, 0] },
                                    {
                                        $and: [
                                            { $eq: ["$$admin.lesCorrect", true] },
                                            { $gt: [{ $strLenCP: { $ifNull: ["$$admin.vehicleRegistration", ""] } }, 0] },
                                            { $gt: [{ $strLenCP: { $ifNull: ["$$admin.vehicleInsurance", ""] } }, 0] },
                                            { $gt: [{ $strLenCP: { $ifNull: ["$$admin.educationMilitary", ""] } }, 0] },
                                            { $gt: [{ $strLenCP: { $ifNull: ["$$admin.educationCivilian", ""] } }, 0] },
                                            { $gt: [{ $ifNull: ["$$admin.volunteerHour", 0] }, 0] }
                                        ]
                                    },
                                    false
                                ]
                            }
                        }
                    }
                }
            },

            // compute totals and percentage
            {
                $addFields: {
                    completedCount: {
                        $size: {
                            $filter: {
                                input: [
                                    "$medproCompleted",
                                    "$fitnessCompleted",
                                    "$rangeCompleted",
                                    "$weaponCompleted",
                                    "$counselingCompleted",
                                    "$adminCompleted"
                                ],
                                as: "s",
                                cond: { $eq: ["$$s", true] }
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    completionPercentage: {
                        $multiply: [{ $divide: ["$completedCount", TOTAL_CATEGORIES] }, 100]
                    }
                }
            },

            // project final shape
            {
                $project: {
                    _id: 0,
                    medproCompleted: 1,
                    fitnessCompleted: 1,
                    rangeCompleted: 1,
                    weaponCompleted: 1,
                    counselingCompleted: 1,
                    adminCompleted: 1,
                    completedCount: 1,
                    completionPercentage: { $round: ["$completionPercentage", 2] }
                }
            }
        ]; // end pipeline

        const res = await User.aggregate(pipeline).allowDiskUse(true).exec();
        // If user missing, return default false values
        if (!res || res.length === 0) {
            return {
                medproCompleted: false,
                fitnessCompleted: false,
                rangeCompleted: false,
                weaponCompleted: false,
                counselingCompleted: false,
                adminCompleted: false,
                totalCompleted: 0,
                completionPercentage: 0,
            };
        }

        const out = res[0];
        return {
            medproCompleted: Boolean(out.medproCompleted),
            fitnessCompleted: Boolean(out.fitnessCompleted),
            rangeCompleted: Boolean(out.rangeCompleted),
            weaponCompleted: Boolean(out.weaponCompleted),
            counselingCompleted: Boolean(out.counselingCompleted),
            adminCompleted: Boolean(out.adminCompleted),
            totalCompleted: typeof out.completedCount === "number" ? out.completedCount : 0,
            completionPercentage: typeof out.completionPercentage === "number" ? out.completionPercentage : 0,
        };
    },
};

export default trackService;
