import React, { ChangeEvent } from "react";
import Button from "../Button"; // 使用项目中的 Button 组件
import Input from "../Input"; // 使用项目中的 Input 组件
import Select from "../Select"; // 使用项目中的 Select 组件

interface ItemFormProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  handleSubmit: () => void;
  editIndex: number | null;
}

const ItemForm: React.FC<ItemFormProps> = ({
  inputValue,
  setInputValue,
  priority,
  setPriority,
  handleSubmit,
  editIndex,
}) => {
  return (
    <div className="flex mb-4">
      <Input
        type="text"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        customClass="border border-gray-300 p-2 rounded mr-2 flex-1"
        placeholder="添加或编辑项目..."
      />
      <Select
        value={priority}
        onChange={(value: string | string[]) => setPriority(value as string)}
        customStyles="border border-gray-300 p-2 rounded mr-2"
        options={[
          { value: "普通", label: "普通" },
          { value: "高", label: "高" },
          { value: "低", label: "低" },
        ]}
      />
      <Button
        onClick={handleSubmit}
        customClass="bg-blue-500 text-white px-4 rounded"
      >
        {editIndex !== null ? "更新" : "添加"}
      </Button>
    </div>
  );
};

export default ItemForm;
