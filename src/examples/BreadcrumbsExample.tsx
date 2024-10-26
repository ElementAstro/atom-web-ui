import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => <h1>Home</h1>;

const BreadcrumbsExample: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Category", link: "/category" },
    { label: "Subcategory", link: "/category/subcategory" },
    { label: "Item", link: null },
  ];

  const handleItemClick = (item: { label: string; link: string | null }) => {
    console.log(`Breadcrumb item clicked: ${item.label}`);
  };

  return (
    <div className="p-4">
      <Router>
        <Breadcrumbs
          items={breadcrumbItems}
          onItemClick={handleItemClick}
          variant="primary"
          separator=">"
          customClass="my-breadcrumbs"
          icon={<span>🔗</span>}
          tooltip="Breadcrumb"
          maxItems={4}
          responsive={true}
          showTooltip={true}
          tooltipPosition="top"
          animation="transform transition-transform duration-300 ease-in-out"
          showIcon={true}
          iconPosition="left"
          showProgress={true}
          progressColor="bg-blue-500"
          progressHeight="h-1"
        />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default BreadcrumbsExample;
