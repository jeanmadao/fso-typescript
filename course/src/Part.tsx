import { CoursePart } from "./App";

interface PartProps {
  content: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  switch (props.content.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {props.content.name} {props.content.exerciseCount}
          </strong>
          <br />
          <em>{props.content.description}</em>
        </p>
      );
    case "group":
      return (
        <p>
          <strong>
            {props.content.name} {props.content.exerciseCount}
          </strong>
          <br />
          project exercises {props.content.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>
            {props.content.name} {props.content.exerciseCount}
          </strong>
          <br />
          <em>{props.content.description}</em>
          <br />
          submit to {props.content.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <strong>
            {props.content.name} {props.content.exerciseCount}
          </strong>
          <br />
          <em>{props.content.description}</em>
          <br />
          required skills: {props.content.requirements.join()}
        </p>
      );
    default:
      return assertNever(props.content);
  }
};

export default Part;
