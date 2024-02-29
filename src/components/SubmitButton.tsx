"use client";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

// TODO 2: ComponentProps
type Props = ComponentProps<"button"> & {
  children: string;
};

export function SubmitButton({ children, ...rest }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="bg-white p-4 rounded-lg border-spacing-2"
      type="submit"
      {...rest}
    >
      {children}
    </button>
  );
}
