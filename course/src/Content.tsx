interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  content: CourseParts[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.content.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
