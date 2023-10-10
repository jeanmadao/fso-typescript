import { useState } from "react";
import entryService from "../services/entries";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";
import axios from "axios";

interface EntryFormProps {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const EntryForm = ({
  diaryEntries,
  setDiaryEntries,
  setNotification,
}: EntryFormProps) => {
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
    try {
      const newEntry = await entryService.postEntry(newDiaryEntry);
      setDiaryEntries(diaryEntries.concat(newEntry));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification(error.response!.data);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          <label>date</label>
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label>visibility </label>
          <label>great</label>
          <input type="radio" onChange={() => setVisibility("great")} />
          <label>good</label>
          <input type="radio" onChange={() => setVisibility("good")} />
          <label>ok</label>
          <input type="radio" onChange={() => setVisibility("ok")} />
          <label>poor</label>
          <input type="radio" onChange={() => setVisibility("poor")} />
        </div>
        <div>
          <label>weather </label>
          <label>sunny</label>
          <input type="radio" onChange={() => setWeather("sunny")} />
          <label>rainy</label>
          <input type="radio" onChange={() => setWeather("rainy")} />
          <label>cloudy</label>
          <input type="radio" onChange={() => setWeather("cloudy")} />
          <label>stormy</label>
          <input type="radio" onChange={() => setWeather("stormy")} />
          <label>windy</label>
          <input type="radio" onChange={() => setWeather("windy")} />
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
