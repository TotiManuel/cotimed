import express from "express";
import cors from "cors";

import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cotimed-eta.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

app.use(routes);

app.get("/prueba", (_, res) => {
  res.json({
    ok: true,
    mensaje: "Backend funcionando"
  });
});

export default app;