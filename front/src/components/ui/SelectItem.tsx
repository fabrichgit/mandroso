import { useSelect } from "./Select";

interface SelectItemProps {
  children: string;
  value: string;
}

export const SelectItem = ({ children, value }: SelectItemProps) => {
  const { setSelectedValue } = useSelect();

  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => setSelectedValue(value)}
    >
      {children}
    </div>
  );
};
