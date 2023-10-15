import { Male, Female, QuestionMark } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { Diagnosis, Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";
import patientService from "../../services/patients";
import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props {
  diagnoses: Diagnosis[];
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}
const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const match = useMatch("/patients/:id");
  useEffect(() => {
    const fetchPatient = async () => {
      if (match && match.params.id) {
        const patient = await patientService.get(match.params.id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [match]);
  if (!match || !match.params.id) return <h2>Error</h2>;
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

  const updatePatient = (updatedPatient: Patient) => {
    setPatient(updatedPatient);
  };

  return (
    <div>
      <h2>
        {patient.name} <SvgIcon component={genre} />
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <EntryForm id={match.params.id} updatePatient={updatePatient} />

      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
