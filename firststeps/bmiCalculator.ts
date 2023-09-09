export interface bmiValues {
  height: number;
  weight: number;
}

type ReqQuery = { height?: string; weight?: string };

export const parseBmiArguments = (query: ReqQuery): bmiValues => {
  if (!query.height || !query.weight) throw new Error("Not enough arguments");

  const heightInt = Number(query.height);
  const weightInt = Number(query.weight);
  if (isNaN(Number(heightInt)) || isNaN(Number(weightInt)))
    throw new Error("Provided values must be numbers!");

  if (heightInt <= 0 || weightInt <= 0)
    throw new Error("Provided value must be absolutely positive");

  return { height: heightInt, weight: weightInt };
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III) ";
  }
};

// try {
//   const { height, weight } = parseBmiArguments(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong: ";
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
// }
//
export default calculateBmi;
