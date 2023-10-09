import { useEffect, useState } from "react";
import axios from "axios";
import { DiaryEntry } from "./types";
import Entries from "./components/Entries";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaryEntries(response.data);
      });
  }, []);

  return (
    <div>
      <Entries diaryEntries={diaryEntries as DiaryEntry[]} />
    </div>
  );
};

export default App;
