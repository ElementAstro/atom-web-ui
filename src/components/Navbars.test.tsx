// src/components/Navbar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "./Navbars";
import { ThemeProvider } from "../context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";

describe("Navbar Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(
      <ThemeProvider initialTheme={theme}>
        <Router>{ui}</Router>
      </ThemeProvider>
    );
  };

  const mockOnLinkClick = jest.fn();
  const links = [
    { path: "/home", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  test("renders with default props", () => {
    renderWithTheme(<Navbar brand="MyBrand" links={links} />, "light");
    expect(screen.getByText("MyBrand")).toBeInTheDocument();
    links.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  test("calls onLinkClick when a link is clicked", () => {
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} onLinkClick={mockOnLinkClick} />,
      "light"
    );
    fireEvent.click(screen.getByText("Home"));
    expect(mockOnLinkClick).toHaveBeenCalledWith(links[0]);
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} customClass="custom-class" />,
      "light"
    );
    expect(screen.getByRole("navigation")).toHaveClass("custom-class");
  });

  test("renders with dropdown menu", () => {
    const dropdown = {
      label: "More",
      items: [
        { path: "/services", label: "Services" },
        { path: "/portfolio", label: "Portfolio" },
      ],
    };
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} dropdown={dropdown} />,
      "light"
    );
    fireEvent.click(screen.getByText("More"));
    dropdown.items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  test("renders with search functionality", () => {
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} search={true} />,
      "light"
    );
    expect(screen.getByPlaceholderText("搜索...")).toBeInTheDocument();
  });

  test("renders with user menu", () => {
    const userMenu = {
      items: [
        { path: "/profile", label: "Profile" },
        { path: "/logout", label: "Logout" },
      ],
    };
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} userMenu={userMenu} />,
      "light"
    );
    fireEvent.click(screen.getByRole("button", { name: /user/i }));
    userMenu.items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  test("renders with theme toggle", () => {
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} themeToggle={true} />,
      "light"
    );
    expect(screen.getByText("🌞")).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    renderWithTheme(<Navbar brand="MyBrand" links={links} />, "dark");
    expect(screen.getByRole("navigation")).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("renders with fixed position", () => {
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} fixed={true} />,
      "light"
    );
    expect(screen.getByRole("navigation")).toHaveClass("fixed w-full top-0");
  });

  test("renders with custom link class", () => {
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} customLinkClass="custom-link" />,
      "light"
    );
    expect(screen.getByText("Home")).toHaveClass("custom-link");
  });

  test("renders with custom dropdown class", () => {
    const dropdown = {
      label: "More",
      items: [
        { path: "/services", label: "Services" },
        { path: "/portfolio", label: "Portfolio" },
      ],
    };
    renderWithTheme(
      <Navbar
        brand="MyBrand"
        links={links}
        dropdown={dropdown}
        customDropdownClass="custom-dropdown"
      />,
      "light"
    );
    expect(screen.getByText("More").parentElement).toHaveClass(
      "custom-dropdown"
    );
  });

  test("renders with custom search class", () => {
    renderWithTheme(
      <Navbar
        brand="MyBrand"
        links={links}
        search={true}
        customSearchClass="custom-search"
      />,
      "light"
    );
    expect(screen.getByPlaceholderText("搜索...").parentElement).toHaveClass(
      "custom-search"
    );
  });

  test("renders with custom user menu class", () => {
    const userMenu = {
      items: [
        { path: "/profile", label: "Profile" },
        { path: "/logout", label: "Logout" },
      ],
    };
    renderWithTheme(
      <Navbar
        brand="MyBrand"
        links={links}
        userMenu={userMenu}
        customUserMenuClass="custom-user-menu"
      />,
      "light"
    );
    expect(screen.getByRole("button", { name: /user/i }).parentElement).toHaveClass(
      "custom-user-menu"
    );
  });

  test("renders with hover color", () => {
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} hoverColor="hover:text-red-500" />,
      "light"
    );
    expect(screen.getByText("Home")).toHaveClass("hover:text-red-500");
  });

  test("renders with active color", () => {
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} activeColor="text-red-500" />,
      "light"
    );
    fireEvent.click(screen.getByText("Home"));
    expect(screen.getByText("Home")).toHaveClass("text-red-500");
  });

  test("renders with disabled color", () => {
    renderWithTheme(
      <Navbar brand="MyBrand" links={links} disabledColor="text-gray-400" />,
      "light"
    );
    expect(screen.getByText("Home")).toHaveClass("text-gray-400");
  });

  test("renders with hover animation", () => {
    renderWithTheme(
      <Navbar
        brand="MyBrand"
        links={links}
        hoverAnimation="hover:scale-105 hover:shadow-neon"
      />,
      "light"
    );
    expect(screen.getByText("Home")).toHaveClass(
      "hover:scale-105 hover:shadow-neon"
    );
  });
});