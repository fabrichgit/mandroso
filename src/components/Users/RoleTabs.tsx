import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function RoleTabs({roles, setTab}: {roles: any[], setTab: React.Dispatch<React.SetStateAction<string>>}) {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center items-center relative w-full">
      {/* Bouton principal affichant le rôle sélectionné */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-3 bg-neutral-50 dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow-md"
      >
        <span className="font-medium">{selectedRole.label}</span>
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Liste déroulante */}
      {open && (
        <div className="absolute left-0 mt-52 w-max bg-neutral-50 dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow-md z-10 border">
          {roles
            ?.filter((role) => role.id !== selectedRole.id)
            .map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role);
                  setTab(role.id)
                  setOpen(false);
                }}
                className="block w-full text-left p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                {role.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
