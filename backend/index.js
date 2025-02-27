import express from "express";
import { connection } from "./postgres/postgres.js";
import contactRoutes from "./view/routes.js";
import cors from "cors";
import path from "path";
const app = express();

app.use(cors());
app.use(express.json());

const _dirname = path.resolve();

app.use("/", contactRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) =>
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
);

app.listen(4000, () => {
  connection();
  console.log("server is running on port ", 4000);
});
