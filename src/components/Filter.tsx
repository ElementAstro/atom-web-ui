// src/components/Filter.tsx
import React from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
  selectedCreator: string;
  setSelectedCreator: (creator: string) => void;
  resetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  selectedRating,
  setSelectedRating,
  selectedCreator,
  setSelectedCreator,
  resetFilters,
}) => {
  return (
    <div className="flex flex-wrap space-x-4">
      <Input
        type="text"
        placeholder="搜索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        customClass="border border-gray-300 p-2 rounded"
      />
      <Select
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value as string)}
        customStyles="border border-gray-300 p-2 rounded"
        options={[
          { value: "All", label: "所有类别" },
          { value: "Category 1", label: "类别 1" },
          { value: "Category 2", label: "类别 2" },
        ]}
      />
      <Select
        value={sortOrder}
        onChange={(value) => setSortOrder(value as string)}
        customStyles="border border-gray-300 p-2 rounded"
        options={[
          { value: "asc", label: "升序" },
          { value: "desc", label: "降序" },
        ]}
      />
      <Select
        value={selectedRating.toString()}
        onChange={(value) => setSelectedRating(parseInt(value as string))}
        customStyles="border border-gray-300 p-2 rounded"
        options={[
          { value: "1", label: "1 星" },
          { value: "2", label: "2 星" },
          { value: "3", label: "3 星" },
          { value: "4", label: "4 星" },
          { value: "5", label: "5 星" },
        ]}
      />
      <Input
        type="text"
        placeholder="创建者"
        value={selectedCreator}
        onChange={(e) => setSelectedCreator(e.target.value)}
        customClass="border border-gray-300 p-2 rounded"
      />
      <Button
        onClick={resetFilters}
        customClass="bg-gray-300 text-gray-800 px-4 py-2 rounded transition hover:bg-gray-400"
      >
        重置筛选
      </Button>
    </div>
  );
};

export default Filter;
