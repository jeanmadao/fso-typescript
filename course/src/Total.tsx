interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  content: CourseParts[];
}

const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.content.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
