import { auth } from "@repo/auth";
import { Hono } from "hono";

const app = new Hono();

app.on(["POST", "GET"], "/**", (c) => {
  return auth.handler(c.req.raw);
});

export default app;
