const userActions = [
  { id: 1, date: "2025-02-18 14:30", action: "Connexion", status: "Succès" },
  { id: 2, date: "2025-02-18 14:35", action: "Modification Profil", status: "Échoué" },
  { id: 3, date: "2025-02-18 15:00", action: "Ajout d'un produit", status: "Succès" },
  { id: 4, date: "2025-02-18 15:10", action: "Suppression d'un article", status: "Succès" },
];

const statusColors: Record<string, string> = {
  Succès: "text-green-600 bg-green-100",
  Échoué: "text-red-600 bg-red-100",
};

const UserListAcions = () => {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg">
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left border-b">Date</th>
              <th className="py-3 px-4 text-left border-b">Action</th>
              <th className="py-3 px-4 text-left border-b">Statut</th>
            </tr>
          </thead>
          <tbody>
            {userActions.map((action) => (
              <tr key={action.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{action.date}</td>
                <td className="py-3 px-4">{action.action}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[action.status]}`}
                  >
                    {action.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListAcions;
