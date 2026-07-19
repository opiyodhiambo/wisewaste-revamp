import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: true })); // lock to your domain later
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_, res) => res.json({ ok: true }));

app.post("/api/request-pickup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      enquiryType,
      industry,
      containerSize,
      containerQty,
      frequency, // array: ["Once Per Week", ...]
      message,
    } = req.body || {};

    // Basic validation
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ ok: false, error: "Missing required fields." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,          // e.g. mail.yourdomain.co.ke
      port: Number(process.env.SMTP_PORT),  // 465 or 587
      secure: process.env.SMTP_PORT === "465", // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,        // e.g. info@yourdomain.co.ke
        pass: process.env.SMTP_PASS,
      },
    });

    // Optional but useful in dev
    // await transporter.verify();

    const to = process.env.MAIL_TO; // where you want requests to land (e.g. sales@domain)
    const from = process.env.MAIL_FROM || process.env.SMTP_USER;

    const subject = `Pickup Request — ${firstName} ${lastName} (${phone})`;

    const text = `
Request Pickup

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Enquiry Type: ${enquiryType || "-"}
Industry: ${industry || "-"}
Container Size: ${containerSize || "-"}
Quantity: ${containerQty || "-"}
Frequency: ${(frequency || []).join(", ") || "-"}

Message:
${message || "-"}
`.trim();

    await transporter.sendMail({
      from,
      to,
      replyTo: email, // so you can reply directly to the customer
      subject,
      text,
      html: text.replace(/\n/g, "<br/>"),
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API running on :${PORT}`));
