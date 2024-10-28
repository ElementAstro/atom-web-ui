// src/components/Cookie/index.tsx
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import { useTheme } from "../../context/ThemeContext"; // 导入 useTheme

const base64Encode = (str: string): string => {
  return btoa(encodeURIComponent(str));
};

const base64Decode = (str: string): string => {
  try {
    return decodeURIComponent(atob(str));
  } catch (e) {
    console.error("Failed to decode base64 string: ", str);
    return "[Invalid Base64]";
  }
};

interface Cookie {
  name: string;
  value: string;
}

const CookieManager = () => {
  const { theme } = useTheme(); // 使用主题上下文
  const [allCookies, setAllCookies] = useState<Cookie[]>([]);
  const [cookieResult, setCookieResult] = useState("");
  const [cookieName, setCookieName] = useState("");
  const [cookieValue, setCookieValue] = useState("");
  const [cookieExpiry, setCookieExpiry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const updateCookieList = () => {
    const cookies = document.cookie.split("; ").map((cookie) => {
      const [name, value] = cookie.split("=");
      try {
        return { name, value: base64Decode(value) };
      } catch (error) {
        return { name, value: "[Invalid Base64]" };
      }
    });
    setAllCookies(cookies);
  };

  const setCookie = (name: string, value: string, expiry: string) => {
    const expiryDate = expiry
      ? `;expires=${new Date(
          Date.now() + parseInt(expiry) * 1000
        ).toUTCString()}`
      : "";
    document.cookie = `${name}=${base64Encode(value)}${expiryDate}; path=/`;
    alert(`Cookie ${name} set!`);
    updateCookieList();
  };

  const getCookie = (name: string) => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name));
    if (cookie) {
      setCookieResult(`Value: ${base64Decode(cookie.split("=")[1])}`);
    } else {
      setCookieResult("Cookie not found!");
    }
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; max-age=0; path=/`;
    alert(`Cookie ${name} deleted!`);
    updateCookieList();
  };

  const clearAllCookies = () => {
    const cookies = document.cookie.split("; ");
    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0];
      document.cookie = `${cookieName}=; max-age=0; path=/`;
    });
    alert("All cookies deleted!");
    updateCookieList();
  };

  const searchCookies = (term: string) => {
    if (term) {
      const filteredCookies = allCookies.filter((cookie) =>
        cookie.name.includes(term)
      );
      setAllCookies(filteredCookies);
    } else {
      updateCookieList();
    }
  };

  const handleSetCookie = () => {
    if (cookieName && cookieValue) {
      setCookie(cookieName, base64Encode(cookieValue), cookieExpiry);
      setCookieName("");
      setCookieValue("");
      setCookieExpiry("");
    }
  };

  const handleGetCookie = () => {
    getCookie(cookieName);
    setCookieName("");
  };

  const handleSearch = () => {
    searchCookies(searchTerm);
  };

  useEffect(() => {
    updateCookieList();
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Cookie Manager</h1>
      <div className="p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Manage Cookies</h2>
        <Input
          type="text"
          placeholder="Cookie Name"
          customClass="block mb-2 w-full border-gray-300 rounded-md shadow-sm"
          value={cookieName}
          onChange={(e) => setCookieName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Cookie Value"
          customClass="block mb-2 w-full border-gray-300 rounded-md shadow-sm"
          value={cookieValue}
          onChange={(e) => setCookieValue(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Expiry (seconds)"
          customClass="block mb-4 w-full border-gray-300 rounded-md shadow-sm"
          value={cookieExpiry}
          onChange={(e) => setCookieExpiry(e.target.value)}
        />
        <div className="flex justify-between">
          <Button
            onClick={handleSetCookie}
            customClass="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Set Cookie
          </Button>
          <Button
            onClick={handleGetCookie}
            customClass="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Get Cookie
          </Button>
          <Button
            onClick={clearAllCookies}
            customClass="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear All Cookies
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Input
          type="text"
          placeholder="Search Cookies"
          customClass="block w-full border-gray-300 rounded-md shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleSearch}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold">All Cookies:</h2>
        <ul className="mt-2 text-gray-700">
          {allCookies.map((cookie, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>
                {cookie.name}: {cookie.value}
              </span>
              <Button
                onClick={() => deleteCookie(cookie.name)}
                customClass="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {cookieResult && (
        <p className="mt-4 text-center text-gray-700">{cookieResult}</p>
      )}
    </div>
  );
};

export default CookieManager;
