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
      className="p-2 focus:ring border-4 rounded-xl border-solid hover:bg-slate-50 bg-lime-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
