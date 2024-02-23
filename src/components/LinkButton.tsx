import Link from "next/link";

export function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className="border-4 border-green-200 rounded-lg bg-green-100 p-4 inline-block cursor-pointer"
      href={href}
    >
      {children}
    </Link>
  );
}
