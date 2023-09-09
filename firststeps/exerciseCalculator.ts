interface exerciseValues {
  exerciseHours: number[];
  target: number;
}

interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Provided target must be a number!");

  const exerciseHours: number[] = [];
  for (let i = 3; i < args.length; i++) {
    const hours = Number(args[i]);
    if (isNaN(hours)) throw new Error("Provided hours must be numbers!");
    exerciseHours.push(Number(process.argv[i]));
  }

  return { exerciseHours, target };
};

const calculateExercises = (
  exerciseHours: number[],
  target: number
): ExerciseResults => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hour) => hour > 0).length;
  const average =
    exerciseHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const rating = Math.max(Math.min(Math.round((2 * average) / target), 3), 1);
  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = "insufficient, you need to put more effort";
      break;
    case 2:
      ratingDescription = "not too bad but could be better";
      break;
    default:
      ratingDescription = "brilliant, keep it going";
      break;
  }
  const success = average >= target;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { exerciseHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
