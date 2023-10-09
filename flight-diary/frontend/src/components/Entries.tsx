import { DiaryEntry } from "../types";

interface EntryProps {
  diaryEntry: DiaryEntry;
}

interface EntriesProps {
  diaryEntries: DiaryEntry[];
}

const Entry = ({ diaryEntry }: EntryProps) => {
  return (
    <div>
      <h4>{diaryEntry.date}</h4>
      <div>visibility: {diaryEntry.visibility}</div>
      <div>weather: {diaryEntry.weather}</div>
    </div>
  );
};

const Entries = ({ diaryEntries }: EntriesProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.map((diaryEntry) => (
        <Entry key={diaryEntry.id} diaryEntry={diaryEntry} />
      ))}
    </div>
  );
};

export default Entries;
