import { NewPatient, NonSensitiveInfoPatient, Patient } from "../types";
import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";

const getNonSensitiveInfoPatients = (): NonSensitiveInfoPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatientData: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    id,
    ...newPatientData,
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveInfoPatients,
  addPatient,
};
