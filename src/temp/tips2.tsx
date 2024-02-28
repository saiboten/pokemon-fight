// Nye krav:
// disabled
// aria-disabled
// id
// tabIndex

type Props = {
  children: string;
  onClick: () => void;
};

function SubmitButton({ onClick, children }: Props) {
  return <button onClick={onClick}>{children}</button>;
}

export function ButtonUser() {
  const handleClick = () => console.log("knapp trykket");
  return <SubmitButton onClick={handleClick}>Hei</SubmitButton>;
}
