import { useSelect } from "./Select";

export const SelectValue = () => {
  const { selectedValue } = useSelect();

  return <span>{selectedValue || "Sélectionner..."}</span>;
};
