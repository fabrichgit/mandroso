import { useEffect, useState } from "react";
import { TableCommandeForm } from "../../../../../components/Founisseur/TableCommande/TableCommandeForm";
import { TableCommandeList } from "../../../../../components/Founisseur/TableCommande/TableCommandeList";
import { TableCommandeModal } from "../../../../../components/Founisseur/TableCommande/TableCommandeModal";
import {
  type TableCommande,
  useTableCommandeStore,
} from "../../../../../store/useTableCommandeStore";
import { usePPP } from "../../../../../hook/data";
import axios from "axios";
import { api, token } from "../../../../../constant";
import toast from "react-hot-toast";
import { TableCommandeDateInput } from "../../../../../components/Founisseur/TableCommande/TableCommandeDateInput";

interface Props {
  setActiveTab: React.Dispatch<
    React.SetStateAction<"commande" | "table" | "fournisseur" | "vendeur">
  >;
}

function TableCommande({ setActiveTab }: Props) {
  const { data, reFetch } = usePPP();
  const {
    tableCommande,
    setTables,
    editing,
    setEditing,
    edit,
    delete: dt,
  } = useTableCommandeStore();

  const [onCommande, setOn] = useState<
    {
      ppp_id: string;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    setTables(data);
  }, [data]);
  // const _ = useCommandeStore.getState().addMultiple

  const [selectedTable, setSelectedTable] = useState<TableCommande[]>([]);

  // const commander = () => {
  //     const c: Commande[] = Object.values(
  //         selectedTable.reduce((acc, tableCommande) => {
  //             if (!tableCommande.fournisseur || !tableCommande.product) return acc;

  //             const fournisseurId = tableCommande.fournisseur.id!;

  //             if (!acc[fournisseurId]) {
  //                 acc[fournisseurId] = {
  //                     id: tableCommande.id,
  //                     fournisseur: tableCommande.fournisseur,
  //                     product: [],
  //                     createdAt: tableCommande.createdAt.toString(),
  //                     status: "pending",
  //                 };
  //             }

  //             acc[fournisseurId].product?.push({
  //                 nom: tableCommande.product.name,
  //                 price: tableCommande.price ?? tableCommande.product.price ?? 0,
  //                 quantity: tableCommande.product.quantity,
  //             });

  //             return acc;
  //         }, {} as Record<string, Commande>)
  //     );

  //     console.log(c);

  // }

  const commander = async (d: string | Date) => {
    const data = {
      command_date: d,
      command_elements: onCommande,
    };

    await axios
      .post(api() + "/commands/multicommand", data, {
        headers: {
          Authorization: token(),
        },
      })
      .then(() => {
        // reFetch();
        toast.success("");
        setOn([]);
        setActiveTab("commande");
      })
      .catch(() => {
        toast.error("");
      });
  };

  return (
    <div className="w-full p-4">
      <div className="space-y-8">
        {onCommande?.length !== 0 ? (
          <TableCommandeDateInput
            onSubmit={(d) => commander(d)}
            isEditing={false}
          />
        ) : <TableCommandeForm onSubmit={reFetch} isEditing={false} />}

        <TableCommandeList
          onCommande={onCommande}
          setOn={setOn}
          commande={tableCommande}
          onEdit={setEditing}
          onDelete={dt}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
      </div>
      {editing && (
        <TableCommandeModal
          isOpen={!!editing}
          onClose={() => setEditing(null)}
          commande={editing}
          onSubmit={edit}
        />
      )}
    </div>
  );
}

export default TableCommande;
