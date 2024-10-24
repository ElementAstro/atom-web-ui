// src/hooks/usePut.js
import { useState, useEffect, useRef } from "react";

const usePut = (url, body, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const retryCount = options.retryCount || 3;
  const timeout = options.timeout || 10000;
  const abortController = useRef(new AbortController());

  useEffect(() => {
    const putData = async () => {
      let retries = retryCount;
      const putWithRetry = async () => {
        try {
          const { signal } = abortController.current;
          const response = await Promise.race([
            fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                ...options.headers,
              },
              body: JSON.stringify(body),
              signal,
            }),
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
            putWithRetry();
          } else {
            setError(error);
          }
        } finally {
          setLoading(false);
        }
      };
      putWithRetry();
    };

    putData();

    return () => {
      abortController.current.abort();
    };
  }, [url, body, ...dependencies]);

  return { data, loading, error };
};

export default usePut;
