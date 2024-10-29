import { renderHook, act } from "@testing-library/react-hooks";
import usePost from "./usePost";

// src/hooks/usePost.test.ts

const mockFetch = jest.fn();

global.fetch = mockFetch;

describe("usePost", () => {
  const url = "https://api.example.com/data";
  const body = { key: "value" };

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() => usePost(url, body));
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should fetch data successfully", async () => {
    const mockData = { success: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result, waitForNextUpdate } = renderHook(() => usePost(url, body));

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle network errors", async () => {
    const mockError = new Error("Network response was not ok");
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result, waitForNextUpdate } = renderHook(() => usePost(url, body));

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(mockError);
  });

  it("should retry on failure", async () => {
    const mockError = new Error("Network response was not ok");
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      usePost(url, body, { retryCount: 1 })
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual({ success: true });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should respect the timeout option", async () => {
    jest.useFakeTimers();
    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 2000)
        )
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      usePost(url, body, { timeout: 1000 })
    );

    jest.advanceTimersByTime(1000);

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(new Error("Request timed out"));

    jest.useRealTimers();
  });

  it("should abort the fetch request on unmount", async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, "abort");

    const { unmount } = renderHook(() => usePost(url, body));

    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });
});