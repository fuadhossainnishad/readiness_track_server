import { MailOptions } from "nodemailer/lib/json-transport";
import config from "../config";
import { transporter } from "./mailer.config";

export const sendMail = async (
  to: string,
  from: string,
  html: string,
): Promise<void> => {
  const mailOptions = {
    from: config.smtp_user,
    to,
    html,
  };

  try {
    await sendMailWithRetryLogic(mailOptions);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

interface SendQualificationReminderPayload {
  to: string;

  userName?: string;

  qualificationType: string;

  weaponName?: string;

  qualificationDate?: Date | string;
}

export const sendQualificationReminderMail = async (
  payload: SendQualificationReminderPayload,
): Promise<void> => {
  const formattedDate = payload.qualificationDate
    ? new Date(payload.qualificationDate).toDateString()
    : null;

  const html = `
      <div
        style="
          font-family: Arial, sans-serif;
          line-height: 1.7;
          color: #222;
        "
      >
        <h2>
          ${payload.qualificationType} Reminder
        </h2>

        <p>
          Hello ${payload.userName || "User"},
        </p>

        <p>
          This is a reminder that
          <strong>
            today is your
            ${payload.qualificationType.toLowerCase()}
          </strong>.
        </p>

        ${
          payload.weaponName
            ? `
          <p>
            <strong>Weapon:</strong>
            ${payload.weaponName}
          </p>
        `
            : ""
        }

        ${
          formattedDate
            ? `
          <p>
            <strong>Date:</strong>
            ${formattedDate}
          </p>
        `
            : ""
        }

        <p>
          Please make sure you are
          prepared and report on time.
        </p>

        <br />

        <p>
          Thank you.
        </p>
      </div>
    `;

  const mailOptions: MailOptions = {
    from: config.smtp_user,

    to: payload.to,

    subject: `${payload.qualificationType} Reminder`,

    html,
  };

  try {
    await sendMailWithRetryLogic(mailOptions);
  } catch (error) {
    console.error("Failed to send qualification reminder email:", error);

    throw error;
  }
};

const sendMailWithRetryLogic = async (
  mailOptions: MailOptions,
  retries: number = 3,
  delay: number = 1000,
) => {
  let attempts = 0;

  while (attempts < retries) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email has sent: ${info.messageId}`);
      return;
    } catch (error) {
      attempts++;
      if (attempts >= retries) {
        throw new Error(`Failed to send email after ${retries} attempts`);
      }
      console.error(
        `Attempt ${attempts} failed. Retrying in ${delay}ms...`,
        error,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
