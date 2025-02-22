import { ReactNode } from "react";

export const SelectContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
      {children}
    </div>
  );
};
