import React from "react";
import SearchBox from "../components/SearchBox";

const SearchBoxExample: React.FC = () => {
  const handleSearch = (value: string) => {
    console.log("Search value:", value);
  };

  return (
    <div className="p-4">
      <SearchBox
        placeholder="搜索..."
        onSearch={handleSearch}
        suggestions={["Apple", "Banana", "Cherry", "Date", "Elderberry"]}
        customClass="my-custom-searchbox"
        customInputClass="my-custom-input"
        customIconClass="my-custom-icon"
        theme="light"
        tooltip="输入搜索内容"
        borderWidth="2"
        iconPosition="left"
        clearable={true}
        voiceInput={true}
        autoComplete={true}
        size="medium"
        ariaLabel="搜索框示例"
      />
    </div>
  );
};

export default SearchBoxExample;