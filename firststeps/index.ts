import express from "express";
import calculateBmi, { parseBmiArguments } from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = parseBmiArguments(
      Number(req.query.height),
      Number(req.query.weight)
    );
    res.json({ height, weight, bmi: calculateBmi(height, weight) });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
      throw new Error("parameters missing");
    }
    if (
      isNaN(Number(target)) ||
      !Array.isArray(daily_exercises) ||
      daily_exercises.some((value) => isNaN(Number(value)))
    ) {
      throw new Error("malformatted parameters");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.send(calculateExercises(daily_exercises, target));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
