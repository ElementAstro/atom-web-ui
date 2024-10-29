import { renderHook, act } from "@testing-library/react-hooks";
import useFetch from "./useFetch";

// src/hooks/useFetch.test.ts

const mockFetch = jest.fn();

global.fetch = mockFetch;

describe("useFetch", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should fetch data successfully", async () => {
    const mockData = { id: 1, name: "Test" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

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

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(mockError);
  });

  it("should retry on failure", async () => {
    const mockData = { id: 1, name: "Test" };
    mockFetch
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://api.example.com/data", { retryCount: 1 })
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should respect the timeout option", async () => {
    jest.useFakeTimers();
    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 20000)
        )
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://api.example.com/data", { timeout: 1000 })
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

    const { unmount } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });
});
