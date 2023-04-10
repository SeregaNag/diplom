import { useEffect, useState } from "react";

const useFetchHistoryData = (hostIds, itemIds) => {
  const [data, setData] = useState([]);
  const authToken =
    "273d6c931078be77807d485d4eeb2dd5d2ca74cf2693db44f99f5159f6982815";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyResponse = await fetch(
          "http://134.17.16.108/api_jsonrpc.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              method: "history.get",
              params: {
                hostids: hostIds,
                output: "extend",
                history: 0,
                itemids: itemIds,
                sortfield: "clock",
                sortorder: "DESC",
                limit: 360,
              },
              auth: `${authToken}`,
              id: 1,
            }),
          }
        );
        const { result: historyData } = await historyResponse.json();
        setData(historyData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useFetchHistoryData;
