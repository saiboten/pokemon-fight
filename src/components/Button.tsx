export const Button = ({
  onClick,
  children,
  type = "button",
  disabled = false,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className="p-2 focus:ring border-2 rounded border-solid hover:bg-slate-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
