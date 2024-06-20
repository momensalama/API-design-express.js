import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200);
  res.json({ message: "Hello World!" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

export default app;