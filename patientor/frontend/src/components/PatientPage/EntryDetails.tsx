import { SvgIcon } from "@mui/material";
import {
  Diagnosis,
  Discharge,
  Entry,
  HealthCheckRating,
  SickLeave,
} from "../../types";
import {
  Favorite,
  Work,
  MedicalServices,
  LocalHospital,
} from "@mui/icons-material";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

interface HealthCheckDetailsProps {
  healthCheckRating: HealthCheckRating;
}

interface HospitalDetailsProps {
  discharge: Discharge;
}

interface OccupationalHealthcareDetailsProps {
  employerName: string;
  sickLeave?: SickLeave;
}

const HealthCheckDetails = ({ healthCheckRating }: HealthCheckDetailsProps) => {
  let color;
  switch (healthCheckRating) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "red";
      break;
  }
  const style = {
    color,
  };
  return (
    <div>
      <SvgIcon style={style} component={Favorite} />
    </div>
  );
};

const HospitalDetails = ({ discharge }: HospitalDetailsProps) => {
  return (
    <div>
      {discharge.criteria} - discharged on {discharge.date}
    </div>
  );
};

const OccupationalHealthcareDetails = ({
  employerName,
  sickLeave,
}: OccupationalHealthcareDetailsProps) => {
  return (
    <>
      <div>Employer: {employerName}</div>
      {sickLeave && (
        <div>
          SickLeave from {sickLeave?.startDate} to {sickLeave?.endDate}{" "}
        </div>
      )}
    </>
  );
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  let typeDetails;
  let typeLogo;
  switch (entry.type) {
    case "HealthCheck":
      typeDetails = (
        <HealthCheckDetails healthCheckRating={entry.healthCheckRating} />
      );
      typeLogo = MedicalServices;
      break;
    case "Hospital":
      typeDetails = <HospitalDetails discharge={entry.discharge} />;
      typeLogo = LocalHospital;
      break;
    case "OccupationalHealthcare":
      typeDetails = (
        <OccupationalHealthcareDetails
          employerName={entry.employerName}
          sickLeave={entry.sickLeave}
        />
      );
      typeLogo = Work;
      break;
  }
  const style = {
    border: "solid",
    borderWidth: "1px",
    borderRadius: "5px",
    margin: "10px 0px",
    padding: "10px 10px",
  };
  return (
    <div style={style}>
      <div>
        {entry.date} <SvgIcon component={typeLogo} />
      </div>
      <em>{entry.description}</em>
      <ul>
        {entry.diagnosisCodes?.map((diagnosisCode) => (
          <li key={diagnosisCode}>
            {diagnosisCode}{" "}
            {
              diagnoses.find((diagnosis) => diagnosis.code === diagnosisCode)
                ?.name
            }
          </li>
        ))}
      </ul>
      {typeDetails}
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default EntryDetails;
