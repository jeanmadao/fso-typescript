import { CoursePart } from "./App";
import Part from "./Part";

interface ContentProps {
  content: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.content.map((part) => (
        <Part key={part.name} content={part} />
      ))}
    </>
  );
};

export default Content;
