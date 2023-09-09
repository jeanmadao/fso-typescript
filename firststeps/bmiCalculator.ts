export interface bmiValues {
  height: number;
  weight: number;
}

export const parseBmiArguments = (
  height: number,
  weight: number
): bmiValues => {
  if (isNaN(Number(height)) || isNaN(Number(weight)))
    throw new Error("Must provide two numbers for height and weight");

  if (height <= 0 || weight <= 0)
    throw new Error("Provided value must be absolutely positive");

  return { height, weight };
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

export default calculateBmi;
