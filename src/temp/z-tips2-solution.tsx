import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  children: string;
};

export function SubmitButton({ children, ...rest }: Props) {
  return (
    <button type="submit" {...rest}>
      {children}
    </button>
  );
}

function ButtonUser() {
  const handleClick = () => console.log("knapp trykket");
  return (
    <SubmitButton disabled aria-disabled="true" onClick={handleClick}>
      Hei
    </SubmitButton>
  );
}
