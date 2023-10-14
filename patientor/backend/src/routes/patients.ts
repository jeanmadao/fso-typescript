import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";
import { EntryWithoutId } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  res.send(
    patientService.getPatients().find((patient) => patient.id === req.params.id)
  );
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = req.body as EntryWithoutId;
    const returnedPatient = patientService.addEntry(req.params.id, newEntry);
    res.json(returnedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
