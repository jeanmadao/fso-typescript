import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import entryService from "./services/entries";
import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    entryService.getEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>
      <EntryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
      />
      <Entries diaryEntries={diaryEntries as DiaryEntry[]} />
    </div>
  );
};

export default App;
