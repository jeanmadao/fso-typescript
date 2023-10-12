import { Male, Female, QuestionMark } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { Diagnosis, Patient } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
  patient: Patient | null;
  diagnoses: Diagnosis[];
}
const PatientPage = ({ patient, diagnoses }: Props) => {
  if (!patient) return <h2>Patient not found</h2>;
  let genre;
  switch (patient.gender) {
    case "male":
      genre = Male;
      break;

    case "female":
      genre = Female;
      break;

    default:
      genre = QuestionMark;
      break;
  }

  return (
    <div>
      <h2>
        {patient.name} <SvgIcon component={genre} />
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
