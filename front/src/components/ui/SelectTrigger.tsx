import { ReactNode, useState } from "react";
import { useSelect } from "./Select";

export const SelectTrigger = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { selectedValue } = useSelect();

  return (
    <button
      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left"
      onClick={() => setOpen(!open)}
    >
      {selectedValue || "Sélectionner..."}
      {children}
      {/* {open && <SelectContent />} */}
    </button>
  );
};
