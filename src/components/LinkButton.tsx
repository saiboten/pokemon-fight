import Link from "next/link";

export function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-4 rounded bg-white p-4 inline-block">
      <Link href={href}>{children}</Link>
    </div>
  );
}
