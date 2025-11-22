import AuthRouter from "../module/auth/auth.routes";
import HealthRouter from "../module/health/health.routes";
import express from "express";
import UserRouter from "../module/user/user.routes";
import AdminRouter from "../module/admin/admin.routes";
import NotificationRouter from "../module/notification/notification.routes";
import SettingsRouter from "../module/settings/settings.routes";
import SubscriptionRouter from "../module/subscription/subscription.routes";
import TrackRouter from "../module/track/track.routes";
import AppointmentRouter from "../module/appointment/appointment.routes";
import PaymentRouter from "../module/payment/payment.routes";
import AdminUserRouter from "../module/adminUser/adminUser.routes";
import CounselingRouter from "../module/counselling/counselling.routes";
import RangeQualificationRouter from "../module/rangeQualification/rangeQualification.routes";
import WeaponQualificationRouter from "../module/weaponQualification/weaponQualification.routes";
import PhysicalFitnessTestRouter from "../module/physicalFitnessTest/physicalFitnessTest.routes";
import MedproRouter from "../module/medpro/medpro.routes";

const router = express.Router();

const moduleRoutes = [
  { path: "/health", route: HealthRouter },
  { path: "/auth", route: AuthRouter },
  { path: "/user", route: UserRouter },
  { path: "/admin", route: AdminRouter },
  { path: "/appointment", route: AppointmentRouter },
  { path: "/settings", route: SettingsRouter },
  { path: "/track", route: TrackRouter },
  { path: "/counseling", route: CounselingRouter },
  { path: "/adminUser", route: AdminUserRouter },
  { path: "/range-qualification", route: RangeQualificationRouter },
  { path: "/weapon-qualification", route: WeaponQualificationRouter },
  { path: "/physical-fitness", route: PhysicalFitnessTestRouter },
  { path: "/medpro", route: MedproRouter },
  { path: "/subscription", route: SubscriptionRouter },
  { path: "/payment", route: PaymentRouter },
  { path: "/notification", route: NotificationRouter },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));
export default router;
