import { AiFillCloseCircle } from "react-icons/ai";
import { User } from "../../api/auth";
import { Link } from "react-router-dom";
import { useStore_Users } from "../../store/data";
import useStorage from "../../hook/useStorage";
import { reactiveClass } from "../../utils/class";
import { activeTab, noActiveTab } from "../../pages/home/Gerant/Users/Users";
import UserStatistic from "./details/UserStatistic";
import UserListAcions from "./details/UserListAcions";
import { Maximize } from "lucide-react";
import resize from "../../utils/maximise";

function UserDetails({ idQuery }: { idQuery: string | null }) {
  const { tab, setTab } = useStorage<string>("", "user-details");
  const user: User | undefined = useStore_Users((u) => u.data).find(
    (u) => u.ID === idQuery
  );

  return (
    <div className="bg-white p-6 md:rounded-2xl md:shadow-2xl modal-field my-modal relative">
      {/* Bouton de fermeture */}
      <Link to="?" className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
        <AiFillCloseCircle size={24} />
      </Link>
      <button type="button" onClick={resize} className="maximise absolute top-4 right-4 text-gray-500 hover:text-gray-800" title="pleine ecran">
        <Maximize size={24} />
      </button>

      {/* Onglets */}
      <div className="flex justify-between border-b pb-2 mb-4">
        {["Info", "Suivi d'action", "Statistique"].map((label, index) => {
          const tabKey = index === 0 ? "" : index === 1 ? "action" : "stat";
          return (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={`flex-1 text-center p-2 font-medium ${reactiveClass(tabKey, tab, activeTab, noActiveTab)
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Contenu dynamique en fonction de l'onglet sélectionné */}
      <div className="space-y-4">
        {(() => {
          switch (tab) {
            case "":
              return (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Informations générales</h2>
                  <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                    <p><strong>Nom :</strong> {user?.Name || "Non renseigné"}</p>
                    <p><strong>Prénom :</strong> {user?.LastName || "Non renseigné"}</p>
                    <p><strong>Email :</strong> {user?.Email || "Non renseigné"}</p>
                    <p>
                      <strong>Disponible :</strong>
                      <span className={`ml-2 px-2 py-1 rounded ${user?.Available ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                        {user?.Available ? "Oui" : "Non"}
                      </span>
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold">Contacts</h2>
                  <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                    {user?.Contact && user.Contact.length > 0 ? (
                      user.Contact.map((contact, index) => (
                        <p key={index}><strong>Contact {index + 1} :</strong> {contact}</p>
                      ))
                    ) : (
                      <p>Aucun contact renseigné</p>
                    )}
                  </div>
                </div>
              );
            case "stat":
              return <UserStatistic user={user} idQuery={idQuery} />;
            case "action":
              return <UserListAcions />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

export default UserDetails;
