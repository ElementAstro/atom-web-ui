// src/hooks/useFetch.ts
import { useState, useEffect, useRef, DependencyList } from "react";

interface FetchOptions extends RequestInit {
  retryCount?: number;
  timeout?: number;
}

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(
  url: string,
  options: FetchOptions = {},
  dependencies: DependencyList = []
): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
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
            new Promise<Response>((_, reject) =>
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
            setError(error as Error);
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