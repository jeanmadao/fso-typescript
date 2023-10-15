import { Diagnosis, Discharge, EntryWithoutId, Gender, HealthCheckRating, NewPatient, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect Ssn: " + ssn);
  }
  return ssn;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation: " + occupation);
  }
  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect description: " + description);
  }
  return description;
};

const isHealthCheckRating = (healthCheckRating: number): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect healthCheckRating: " + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !("criteria" in discharge) ||
    !isString(discharge.criteria)
  ) {
    throw new Error("Incorrect discharge: " + discharge);
  }
  return {
    date: parseDate(discharge.date),
    criteria: discharge.criteria
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave)
  ) {
    throw new Error("Incorrect sickLeave: " + sickLeave);
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
};
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const toNewPatient = (body: unknown): NewPatient => {
  if (!body || typeof body !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in body &&
    "dateOfBirth" in body &&
    "ssn" in body &&
    "gender" in body &&
    "occupation" in body
  ) {
    const newPatient: NewPatient = {
      name: parseName(body.name),
      dateOfBirth: parseDate(body.dateOfBirth),
      ssn: parseSsn(body.ssn),
      gender: parseGender(body.gender),
      occupation: parseOccupation(body.occupation),
      entries: [],
    };
    return newPatient;
  }

  throw new Error("Incorrect data: a field is missing");
};


const toNewEntry = (body: unknown): EntryWithoutId => {
  if (!body || typeof body !== "object") {
    throw new Error("Incorrect or missing data");
  }

  console.log("salut");
  let newTypeEntry;
  if ("type" in body) {
    switch(body.type) {
      case "HealthCheck":
        if ("healthCheckRating" in body) {
          newTypeEntry = {
            type: body.type,
            healthCheckRating: parseHealthCheckRating(body.healthCheckRating)
          };
          break;
        }
        throw new Error("Incorrect or missing data for type HealthCheck");
      case "Hospital":
        if ("discharge" in body) {
          newTypeEntry = {
            type: body.type,
            discharge: parseDischarge(body.discharge)
          };
          break;
        }
        throw new Error("Incorrect or missing data for type Hospital");
      case "OccupationalHealthcare":
        if ("employerName" in body) {
          newTypeEntry = {
            type: body.type,
            employerName: parseName(body.employerName),
          };
          if ("sickLeave" in body) {
            newTypeEntry = {
              ...newTypeEntry,
              sickLeave: parseSickLeave(body.sickLeave)
            };
          }
          break;
        }
        throw new Error("Incorrect or missing data for type OccupationalHealthcare");
      default:
        throw new Error("Incorrect or missing type");
    }
    if (
    "description" in body &&
    "date" in body &&
    "specialist" in body
    ) {
      let newEntry: EntryWithoutId = {
        description: parseDescription(body.description),
        date: parseDate(body.date),
        specialist: parseName(body.specialist),
        ...newTypeEntry
      };
      if ("diagnosisCodes" in body) {
        newEntry = {
          ...newEntry,
          diagnosisCodes: parseDiagnosisCodes(body.diagnosisCodes)
        };
      }
      return newEntry;
    }
    throw new Error("Incorrect or missing data");
  }
  throw new Error("Incorrect or missing data");
};

export default { toNewPatient, toNewEntry };