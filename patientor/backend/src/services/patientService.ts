import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";
import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
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

const addEntry = (patientId: string, newEntryData: EntryWithoutId): Patient => {
  const id: string = uuid();
  const newEntry: Entry = {
    id,
    ...newEntryData,
  };
  const patient = patientsData.find((patient) => patient.id === patientId);
  if (patient) {
    patient.entries.push(newEntry);
    return patient;
  }
  throw new Error("Incorrent patient ID");
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
