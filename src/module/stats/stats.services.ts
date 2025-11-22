// const pipeline = [
//   {
//     $match: { userId: new Types.ObjectId(userId) }
//   },

//   // ===== MEDPRO =====
//   {
//     $lookup: {
//       from: "medpros",
//       localField: "userId",
//       foreignField: "userId",
//       as: "medpro"
//     }
//   },
//   {
//     $addFields: {
//       medproCompleted: {
//         $eq: [
//           {
//             $size: {
//               $setIntersection: [
//                 "$medpro.tests.type",
//                 [
//                   "vision",
//                   "immunization",
//                   "hearing",
//                   "dental",
//                   "dlc",
//                   "hiv",
//                   "pha",
//                   "dna"
//                 ]
//               ]
//             }
//           },
//           8
//         ]
//       }
//     }
//   },

//   // ===== FITNESS =====
//   {
//     $lookup: {
//       from: "physicalfitness",
//       localField: "userId",
//       foreignField: "userId",
//       as: "fitness"
//     }
//   },
//   {
//     $addFields: {
//       fitnessCompleted: { $gt: [{ $size: "$fitness.physicalFitness" }, 0] }
//     }
//   },

//   // ===== RANGE =====
//   {
//     $lookup: {
//       from: "rangequalifications",
//       localField: "userId",
//       foreignField: "userId",
//       as: "range"
//     }
//   },
//   {
//     $addFields: {
//       rangeCompleted: {
//         $gt: [
//           {
//             $size: {
//               $filter: {
//                 input: "$range",
//                 as: "r",
//                 cond: {
//                   $and: [
//                     { $gt: ["$$r.score", 0] },
//                     { $gt: [{ $size: "$$r.qualificationLevel" }, 0] }
//                   ]
//                 }
//               }
//             }
//           },
//           0
//         ]
//       }
//     }
//   },

//   // ===== WEAPON QUALIFICATION =====
//   {
//     $lookup: {
//       from: "weaponqualifications",
//       localField: "userId",
//       foreignField: "userId",
//       as: "weapon"
//     }
//   },
//   {
//     $addFields: {
//       weaponCompleted: {
//         $gt: [
//           {
//             $size: {
//               $filter: {
//                 input: "$weapon",
//                 as: "w",
//                 cond: { $eq: ["$$w.pass", true] }
//               }
//             }
//           },
//           0
//         ]
//       }
//     }
//   },

//   // ===== COUNSELING =====
//   {
//     $lookup: {
//       from: "counselings",
//       localField: "userId",
//       foreignField: "userId",
//       as: "counseling"
//     }
//   },
//   {
//     $addFields: {
//       counselingCompleted: { $gt: [{ $size: "$counseling" }, 0] }
//     }
//   },

//   // ===== ADMIN USER =====
//   {
//     $lookup: {
//       from: "adminusers",
//       localField: "userId",
//       foreignField: "userId",
//       as: "admin"
//     }
//   },
//   {
//     $addFields: {
//       adminCompleted: {
//         $cond: [
//           {
//             $and: [
//               { $eq: [{ $size: "$admin" }, 1] },
//               { $eq: ["$admin.lesCorrect", true] },
//               { $ne: ["$admin.vehicleRegistration", null] },
//               { $ne: ["$admin.vehicleInsurance", null] },
//               { $ne: ["$admin.educationMilitary", null] },
//               { $ne: ["$admin.educationCivilian", null] },
//               { $gt: ["$admin.volunteerHour", 0] }
//             ]
//           },
//           true,
//           false
//         ]
//       }
//     }
//   },

//   // ===== OVERALL COMPLETION PERCENTAGE =====
//   {
//     $addFields: {
//       totalCompleted: {
//         $size: {
//           $filter: {
//             input: [
//               "$medproCompleted",
//               "$fitnessCompleted",
//               "$rangeCompleted",
//               "$weaponCompleted",
//               "$counselingCompleted",
//               "$adminCompleted"
//             ],
//             as: "status",
//             cond: { $eq: ["$$status", true] }
//           }
//         }
//       },
//       totalCategories: 6
//     }
//   },
//   {
//     $addFields: {
//       completionPercentage: {
//         $multiply: [
//           { $divide: ["$totalCompleted", "$totalCategories"] },
//           100
//         ]
//       }
//     }
//   },

//   {
//     $project: {
//       medproCompleted: 1,
//       fitnessCompleted: 1,
//       rangeCompleted: 1,
//       weaponCompleted: 1,
//       counselingCompleted: 1,
//       adminCompleted: 1,
//       totalCompleted: 1,
//       completionPercentage: 1
//     }
//   }
// ];
