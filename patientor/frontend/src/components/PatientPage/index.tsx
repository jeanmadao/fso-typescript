import { Male, Female, QuestionMark } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { Diagnosis, Patient } from "../../types";

interface Props {
  patient: Patient | null;
  diagnoses: Diagnosis[];
}
const PatientPage = ({ patient, diagnoses }: Props) => {
  if (!patient) return <h2>Patient not found</h2>;
  console.log(patient);
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
        <div key={entry.id}>
          <div>
            {entry.date} {entry.description}
          </div>
          <ul>
            {entry.diagnosisCodes?.map((diagnosisCode) => (
              <li key={entry.id + diagnosisCode}>
                {diagnosisCode}{" "}
                {
                  diagnoses.find(
                    (diagnosis) => diagnosis.code === diagnosisCode
                  )?.name
                }
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
