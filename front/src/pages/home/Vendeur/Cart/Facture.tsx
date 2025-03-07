import { FileCheck } from "lucide-react";
import { FaTable } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { reactiveClass } from "../../../../utils/class";
import useStorage from "../../../../hook/useStorage";
import { useFactureStore } from "../../../../store/useFactureStore";
import { useCartStore } from "../../../../store/useCartStore";
import { useMemo } from "react";
import FactureList from "../../../../components/Cart/Facture/FactureList";

function Facture() {
    const { carts, getById: getByIdCart } = useCartStore();
    const { factures, setStatus } = useFactureStore((state) => ({
        factures: state.factures,
        setStatus: state.setStatus,
    }));

    const { setTab: setView, tab: view } = useStorage<'cards' | 'table'>('cards', 'fact');

    const factureList = useMemo(() => {
        return factures.map(fact => ({
            ...fact,
            carts: getByIdCart(fact.cartId)
        }));
    }, [carts, factures]);

    const handleSetStatus = (id: string) => {
        setStatus(id, "paye");
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-8 w-full">
                <div className="flex items-center pb-0">
                    <FileCheck className="h-5 w-5 text-sky-500 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-900">Factures</h1>
                </div>

                <div className="flex w-max p-1 bg-neutral-100 border rounded-lg mx-2">
                    <button
                        title="voir en tant que tableau"
                        onClick={() => setView("table")}
                        className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass('table', view, 'bg-white border', '')}`}
                    >
                        <FaTable />
                    </button>
                    <button
                        title="voir en tant que carte"
                        onClick={() => setView("cards")}
                        className={`text-sm h-max px-2 py-1 rounded-lg ${reactiveClass('cards', view, 'bg-white border', '')}`}
                    >
                        <MdOutlineDashboard />
                    </button>
                </div>
            </div>
            <FactureList view={view} factureList={factureList} handleSetStatus={handleSetStatus}/>
        </div>
    );
}

export default Facture;
