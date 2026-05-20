import cron from "node-cron";
import { runQualificationReminderJob } from "../module/rangeQualification/rangeQualificationReminder.job";

export const initializeCronJobs = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Running qualification reminder cron...");

    try {
      await runQualificationReminderJob();
    } catch (error) {
      console.error("Qualification reminder cron failed:", error);
    }
  });
};
