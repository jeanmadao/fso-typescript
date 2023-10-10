import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import entryService from "./services/entries";
import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";
import Notification from "./components/Notification";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState("");
  useEffect(() => {
    entryService.getEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>
      <Notification notification={notification} />
      <EntryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
        setNotification={setNotification}
      />
      <Entries diaryEntries={diaryEntries as DiaryEntry[]} />
    </div>
  );
};

export default App;
