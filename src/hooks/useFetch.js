// src/hooks/useFetch.js
import { useState, useEffect, useRef } from "react";

const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const retryCount = options.retryCount || 3;
  const timeout = options.timeout || 10000;
  const abortController = useRef(new AbortController());

  useEffect(() => {
    const fetchData = async () => {
      let retries = retryCount;
      const fetchWithRetry = async () => {
        try {
          const { signal } = abortController.current;
          const response = await Promise.race([
            fetch(url, { ...options, signal }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), timeout)
            ),
          ]);
          if (!response.ok) throw new Error("Network response was not ok");
          const result = await response.json();
          setData(result);
        } catch (error) {
          if (retries > 0) {
            retries -= 1;
            fetchWithRetry();
          } else {
            setError(error);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchWithRetry();
    };

    fetchData();

    return () => {
      abortController.current.abort();
    };
  }, [url, ...dependencies]);

  return { data, loading, error };
};

export default useFetch;
