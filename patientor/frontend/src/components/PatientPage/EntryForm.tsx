import { SyntheticEvent, useState } from "react";
import { EntryWithoutId, Patient } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";

interface Props {
  id: string;
  updatePatient: (updatedPatient: Patient) => void
}

const EntryForm = ({ id, updatePatient }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [type, setType] = useState<string>("HealthCheck");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(1);


  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newBaseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(', '),
    };

    let newEntry: EntryWithoutId;
    switch(type) {
      case "Hospital":
        newEntry = {
          ...newBaseEntry,
          type,
          discharge: {
            date: dischargeDate,
            criteria
          }
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          ...newBaseEntry,
          type,
          employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          }
        };
        break;
      default:
        newEntry = {
          ...newBaseEntry,
          type: "HealthCheck",
          healthCheckRating
        };
        break;
    }
    
    try {
      const returnedPatient = await patientService.addEntry(id, newEntry);
      updatePatient(returnedPatient);
      setError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const style = {
    border: "dashed",
    borderWidth: "1px",
    margin: "20px 0px",
    padding: "0px 10px 20px 10px"
  };
  return (
    <form style={style} onSubmit={submit}>
      <h2>New Entry</h2>
      {error && <p style={{color: "red"}}>{error}</p>}
      <div>
        <label>Description: </label>
        <input
          placeholder="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>
      <div>
        <label>Date: </label>
        <input 
          type="date"
          placeholder="Date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <div>
        <label>Specialist: </label>
        <input
          placeholder="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
      </div>
      <div>
        <label>Diagnosis codes: </label>
        <input
          placeholder="Diagnosis codes"
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
      </div>
      <div>
        <label>Entry Type: </label>
        <select 
          onChange={({ target }) => setType(target.value)}
        >
          <option value="HealthCheck">Health Check</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">Occupational Healthcare</option>
        </select>
      </div>
      {type === "HealthCheck" && <>
        <div>
          <label>HealthCheckRating: </label>
          <select onChange={({target}) => setHealthCheckRating(Number(target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={1}>5</option>
          </select>
        </div>
      </>
      }

      {type === "Hospital" && <>
        <div>
          <label>Discharge: </label>
        </div>
        <div>
          <label>Date: </label>
          <input 
            type="date"
            placeholder="Date"
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <label>Criteria: </label>
          <input
            placeholder="Criteria"
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
        </div>
      </>
      }

      {type === "OccupationalHealthcare" && <>
        <div>
          <label>Employer Name: </label>
          <input
            placeholder="Employer Name"
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
        </div>
        <div>
          <label>Sick Leave: </label>
          <div>
            <label>Start: </label>
            <input
              type="date"
              placeholder="start"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <label>End: </label>
            <input
              type="date"
              placeholder="end"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </div>
        </div>
      </>
      }
      <button>Submit</button>
    </form>
  );
};

export default EntryForm;