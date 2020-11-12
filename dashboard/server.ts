import { config } from "dotenv";
config();
import * as shell from "shelljs";

// Copy all the view templates
shell.cp("-R", "dashboard/public", "dist/dashboard");
import express from "express";
import path from "path";
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
