import { useState, useEffect, useRef } from "react";

type AutocompleteInputProps = {
    initialSuggestions?: string[];
    placeholder?: string;
    onAddSuggestion?: (newSuggestion: string) => void;
    onChange?: (value: string) => void;
    value?: string;
    className?: string;
};

export default function AutocompleteInput({
    initialSuggestions = [],
    placeholder = "Type something...",
    onAddSuggestion,
    onChange,
    value = "",
}: AutocompleteInputProps) {
    const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);
    const [input, setInput] = useState<string>(value);
    const [filtered, setFiltered] = useState<string[]>(initialSuggestions);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const inputRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInput(newValue);
        setFiltered(
            suggestions.filter((s) => s.toLowerCase().includes(newValue.toLowerCase()))
        );
        setShowSuggestions(true);
        if (onChange) {
            onChange(newValue);
        }
    };

    const handleSelect = (suggestion: string) => {
        setInput(suggestion);
        setShowSuggestions(false);
        if (onChange) {
            onChange(suggestion);
        }
    };

    const handleSubmit = () => {
        if (input.trim() && !suggestions.includes(input)) {
            const newSuggestions = [...suggestions, input];
            setSuggestions(newSuggestions);
            if (onAddSuggestion) {
                onAddSuggestion(input);
            }
        }
        setInput("");
        setShowSuggestions(false);
        if (onChange) {
            onChange("");
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={inputRef}>
            <form className="space-y-2">
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
            </form>
            {showSuggestions && filtered.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-40 overflow-auto">
                    {filtered.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
