import { NonSensitiveInfoPatient } from "../types";
import patientsData from "../../data/patients";

const getNonSensitiveInfoPatients = (): NonSensitiveInfoPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getNonSensitiveInfoPatients,
};
