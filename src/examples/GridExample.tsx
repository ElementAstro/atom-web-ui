import React, { useState } from "react";
import Grid from "../components/Grid";

const GridExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    // 模拟数据获取
    const data = await new Promise<any[]>((resolve) =>
      setTimeout(
        () =>
          resolve([
            { title: "Item 1", description: "Description 1" },
            { title: "Item 2", description: "Description 2" },
            { title: "Item 3", description: "Description 3" },
            { title: "Item 4", description: "Description 4" },
            { title: "Item 5", description: "Description 5" },
          ]),
        2000
      )
    );
    setIsLoading(false);
    return data;
  };

  const handleItemHover = (item: any) => {
    console.log("Hovered over:", item);
  };

  const handleItemClick = (item: any) => {
    console.log("Clicked on:", item);
  };

  return (
    <div className="p-4">
      <Grid
        fetchData={fetchData}
        isLoading={isLoading}
        onItemHover={handleItemHover}
        onItemClick={handleItemClick}
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        gap={4}
        theme="light"
        tooltip="Click to interact"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<span>🔗</span>}
        itemsPerPage={2}
        searchPlaceholder="搜索..."
      />
    </div>
  );
};

export default GridExample;