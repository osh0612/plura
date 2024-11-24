import { Hono } from "hono";
import { sendBatchEmail, sendEmail } from "@repo/mail";
import { mailBatchSchema, mailSchema } from "@repo/types";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

app
  .post("/send", zValidator("json", mailSchema), async (c) => {
    const { email, subject } = c.req.valid("json");
    const { data, error } = await sendEmail(email, subject);
    if (error) {
      return c.json(
        {
          message: "Email sent failed",
        },
        400,
      );
    }
    return c.json(
      {
        message: "Email sent successfully",
        data,
      },
      200,
    );
  })
  .get((c) => {
    return c.json({
      message: "mail api is alive",
      status: 200,
    });
  });

app
  .post("/send-batch", zValidator("json", mailBatchSchema), async (c) => {
    const { emails, subject } = c.req.valid("json");
    const { data, error } = await sendBatchEmail(emails, subject);
    if (error) {
      return c.json(
        {
          message: "Email sent failed",
        },
        400,
      );
    }
    return c.json(
      {
        message: "All Emails sent successfully",
        data,
      },
      200,
    );
  })
  .get((c) => {
    return c.json({
      message: "all mail api is alive",
      status: 200,
    });
  });

export default app;
