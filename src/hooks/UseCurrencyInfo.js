import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = () => {
            fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
                .then((res) => res.json())
                .then((res) => setData(res[currency]))
                .catch((err) => console.error("Currency API error:", err));
        };

        fetchData(); 

        const interval = setInterval(fetchData, 60000); // fetch every 60s

        return () => clearInterval(interval); // clean up
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
