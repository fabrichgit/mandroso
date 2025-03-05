import { useEffect, useRef, useState } from "react";

function useStorage<T extends (string | number) = any>(defaultValue: T, id?: string | number) {
    const tabId = useRef(`Tab${id || Date.now()}`)
    const [tab, setTab] = useState<T>(() => sessionStorage.getItem(tabId.current) as T || String(defaultValue) as T);

    useEffect(() => {
        sessionStorage.setItem(tabId.current, String(tab));
    }, [tab]);

    return {tab, setTab}
}

export default useStorage
