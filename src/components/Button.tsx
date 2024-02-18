export const Button = ({
  onClick,
  children,
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  type: "submit" | "button";
}) => {
  return (
    <button
      type={type}
      className="p-2 focus:ring border-2 rounded border-solid hover:bg-slate-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
