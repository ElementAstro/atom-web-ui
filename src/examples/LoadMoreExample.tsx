import React, { useState } from "react";
import LoadMore from "../components/LoadMore";
import { AiOutlinePlus } from "react-icons/ai";

const LoadMoreExample: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Loaded more items");
    }, 2000);
  };

  return (
    <div className="p-4">
      <LoadMore
        onClick={handleClick}
        loading={loading}
        icon={<AiOutlinePlus />}
        tooltip="点击加载更多"
        variant="primary"
        size="medium"
        theme="ocean"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        iconPosition="left"
        fullWidth={false}
        customClass="my-custom-load-more"
        customIconClass="my-custom-icon"
        customLoadingTextClass="my-custom-loading-text"
      />
    </div>
  );
};

export default LoadMoreExample;