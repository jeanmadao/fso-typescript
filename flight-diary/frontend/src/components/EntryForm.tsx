import { useState } from "react";
import entryService from "../services/entries";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";

interface EntryFormProps {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const EntryForm = ({ diaryEntries, setDiaryEntries }: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiaryEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };
    const newEntry = await entryService.postEntry(newDiaryEntry);
    setDiaryEntries(diaryEntries.concat(newEntry));
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          <label>date</label>
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label>visibility</label>
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          <label>weather</label>
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          <label>comment</label>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button>add</button>
      </form>
    </div>
  );
};

export default EntryForm;
