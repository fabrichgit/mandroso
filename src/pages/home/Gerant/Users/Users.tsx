import { useState } from "react";

const activeTab = "inline-flex text-nowrap bg-white px-4 rounded-lg shadow dark:bg-gradient-to-br dark:text-neutral-300 dark:from-gray-800 dark:to-gray-700";
const noActiveTab = "inline-flex text-nowrap px-4 dark:text-neutral-300";

function Users() {
    const [tab, setTab] = useState("");

    return (
        <div className="w-full">
            <aside className="w-full">
                <nav>
                    <div className="text-muted-foreground inline-flex h-14 items-center justify-center md:gap-4 gap-2 rounded-xl bg-neutral-50 dark:bg-gray-800 dark:border dark:border-gray-700 p-2 mb-6">
                        <button
                            onClick={() => setTab("banque")}
                            className={`group relative w-full flex items-center p-2
                  transition-all duration-200 cursor-pointer
                  ${tab === "banque" ? activeTab : noActiveTab}`}
                        >
                            {/* <CreditCardIcon className="md:mr-3 h-4 w-4" /> */}
                            <button className="hidden md:block font-medium">Banque</button>
                        </button>
                        <button
                            className={`group relative w-full flex items-center justify-center p-2
                  transition-all duration-200 cursor-pointer text-center
                  ${tab === "caisse" ? activeTab : noActiveTab}`}
                            onClick={() => setTab("caisse")}
                        >
                            {/* <WalletIcon className="md:mr-3 h-4 w-4" /> */}
                            <button className="hidden md:block font-medium text-center">Caisse</button>
                        </button>
                        <button
                            className={`group relative w-full flex items-center justify-center p-2
                  transition-all duration-200 cursor-pointer
                  ${tab === "mobile" ? activeTab : noActiveTab}`}
                            onClick={() => setTab("mobile")}
                        >
                            {/* <SmartphoneIcon className="md:mr-3 h-4 w-4" /> */}
                            <button className="hidden md:block font-medium">Mobile Banking</button>
                        </button>
                        <button
                            className={`group relative w-full flex items-center justify-end p-2
                  transition-all duration-200 cursor-pointer
                  ${tab === "autres" ? activeTab : noActiveTab}`}
                            onClick={() => setTab("autres")}
                        >
                            {/* <PiggyBankIcon className="md:mr-3 h-4 w-4" /> */}
                            <button className="hidden md:block font-medium">Autres</button>
                        </button>
                    </div>
                </nav>
            </aside>
        </div>
    )
}

export default Users
