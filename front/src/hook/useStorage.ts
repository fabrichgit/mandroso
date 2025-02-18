import { useEffect, useRef, useState } from "react";

function useStorage(defaultValue: string | number) {
    const tabId = useRef(`Tab${Date.now()}`)
    const [tab, setTab] = useState(() => sessionStorage.getItem(tabId.current) || String(defaultValue));

    useEffect(() => {
        sessionStorage.setItem(tabId.current, tab);
    }, [tab]);

    return {tab, setTab}
}

export default useStorage
