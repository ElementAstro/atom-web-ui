// src/hooks/usePost.ts
import { useState, useEffect, useRef, DependencyList } from "react";

interface PostOptions extends RequestInit {
  retryCount?: number;
  timeout?: number;
}

interface PostResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const usePost = <T>(
  url: string,
  body: any,
  options: PostOptions = {},
  dependencies: DependencyList = []
): PostResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const retryCount = options.retryCount || 3;
  const timeout = options.timeout || 10000;
  const abortController = useRef(new AbortController());

  useEffect(() => {
    const postData = async () => {
      let retries = retryCount;
      const postWithRetry = async () => {
        try {
          const { signal } = abortController.current;
          const response = await Promise.race([
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...options.headers,
              },
              body: JSON.stringify(body),
              signal,
            }),
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
            postWithRetry();
          } else {
            setError(error as Error);
          }
        } finally {
          setLoading(false);
        }
      };
      postWithRetry();
    };

    postData();

    return () => {
      abortController.current.abort();
    };
  }, [url, body, ...dependencies]);

  return { data, loading, error };
};

export default usePost;