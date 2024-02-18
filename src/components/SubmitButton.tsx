"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-white p-4 rounded-lg border-spacing-2"
      type="submit"
      aria-disabled={pending}
    >
      {children}
    </button>
  );
}
