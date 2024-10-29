import { renderHook } from "@testing-library/react-hooks";
import usePut from "./usePut";

// src/hooks/usePut.test.ts

const mockFetch = jest.fn();

global.fetch = mockFetch;

describe("usePut", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() =>
      usePut("https://api.example.com/data", { key: "value" })
    );
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should fetch data successfully", async () => {
    const mockResponse = { id: 1, name: "Test" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      usePut("https://api.example.com/data", { key: "value" })
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle network errors", async () => {
    const mockError = new Error("Network response was not ok");
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      usePut("https://api.example.com/data", { key: "value" })
    );

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
      json: async () => ({ id: 1, name: "Test" }),
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      usePut("https://api.example.com/data", { key: "value" }, { retryCount: 1 })
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual({ id: 1, name: "Test" });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should respect the timeout option", async () => {
    jest.useFakeTimers();
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ ok: true, json: async () => ({ id: 1, name: "Test" }) }), 2000)
        )
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      usePut("https://api.example.com/data", { key: "value" }, { timeout: 1000 })
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
      usePut("https://api.example.com/data", { key: "value" })
    );

    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });
});