export const Button = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="p-2 focus:ring border-2 rounded border-solid hover:bg-slate-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
