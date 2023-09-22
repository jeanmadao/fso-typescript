import express from "express";
import diagnosisRouter from "./routes/diagnoses";
const app = express();
import cors from "cors";

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pang");
});

app.use("/api/diagnoses", diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
