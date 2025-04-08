import { useState, useEffect } from "react";

function useSearchResults(fetcher, searchTerm, tagKey) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = `?${tagKey}=${searchTerm}`;
        const result = await fetcher(filters);
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return { data, isLoading };
}

export default useSearchResults;
