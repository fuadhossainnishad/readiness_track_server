import { sendQualificationReminderMail } from "../../app/mailer/sendMail";
import User from "../user/user.model";
import WeaponQualification from "../weaponQualification/weaponQualification.model";
import RangeQualification from "./rangeQualification.model";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const shouldSendReminder = (createdAt: Date, reminderDays: number): boolean => {
  const reminderTime = new Date(createdAt).getTime() + reminderDays * DAY_IN_MS;

  return Date.now() >= reminderTime;
};

const processRangeQualifications = async () => {
  const qualifications = await RangeQualification.find({
    reminderSent: false,
  });

  for (const qualification of qualifications) {
    const shouldSend = shouldSendReminder(
      qualification.createdAt,
      qualification.reminderDays,
    );

    if (!shouldSend) {
      continue;
    }

    const user = await User.findById(qualification.userId);

    if (!user?.email) {
      continue;
    }

    await sendQualificationReminderMail({
      to: user.email,

      userName: user.userName || user.firstName,

      qualificationType: "Range Qualification",

      weaponName: qualification.weaponName,

      qualificationDate: qualification.date,
    });

    qualification.reminderSent = true;

    qualification.reminderSentAt = new Date();

    await qualification.save();
  }
};

const processWeaponQualifications = async () => {
  const qualifications = await WeaponQualification.find({
    reminderSent: false,
  });

  for (const qualification of qualifications) {
    const shouldSend = shouldSendReminder(
      qualification.createdAt,
      qualification.reminderDays,
    );

    if (!shouldSend) {
      continue;
    }

    const user = await User.findById(qualification.userId);

    if (!user?.email) {
      continue;
    }

    await sendQualificationReminderMail({
      to: user.email,

      userName: user.userName || user.firstName,

      qualificationType: "Weapon Qualification",

      weaponName: qualification.weaponName,

      qualificationDate: qualification.date,
    });

    qualification.reminderSent = true;

    qualification.reminderSentAt = new Date();

    await qualification.save();
  }
};

export const runQualificationReminderJob = async () => {
  await Promise.all([
    processRangeQualifications(),

    processWeaponQualifications(),
  ]);
};
