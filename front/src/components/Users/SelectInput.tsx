import { useState } from "react";
import { Button, Input } from "@mui/joy";
import { Select } from "../ui/Select";
import { SelectTrigger } from "../ui/SelectTrigger";
import { SelectValue } from "../ui/SelectValue";
import { SelectItem } from "../ui/SelectItem";
import { SelectContent } from "../ui/SelectContent";

const SelectInput = () => {
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleAddOption = () => {
    console.log("Tentative d'ajout de l'option:", inputValue);
    if (inputValue.trim() && !options.includes(inputValue)) {
      setOptions([...options, inputValue]);
      console.log("Nouvelle liste d'options:", [...options, inputValue]);
    }
    setSelected(inputValue);
    console.log("Option sélectionnée:", inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col gap-2 w-64">
      <Select onValueChange={(value) => {
        setSelected(value);
        console.log("Option choisie dans le select:", value);
      }} value={selected}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
          <div className="p-2 border-t flex gap-2">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                console.log("Saisie en cours:", e.target.value);
              }}
              placeholder="Ajouter une option"
            />
            <Button onClick={handleAddOption}>Ajouter</Button>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
