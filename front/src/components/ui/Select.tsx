import { createContext, useContext, useState, ReactNode } from "react";

interface SelectContextType {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

interface SelectProps {
  children: ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
}

export const Select = ({ children, onValueChange, value }: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange && onValueChange(newValue);
  };

  return (
    <SelectContext.Provider value={{ selectedValue, setSelectedValue: handleChange }}>
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
};

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelect must be used within a Select");
  }
  return context;
};
