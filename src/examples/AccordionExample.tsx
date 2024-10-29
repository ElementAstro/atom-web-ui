import React, { useState } from "react";
import { Accordion, AccordionItem } from "../components/Accordion";

const AccordionExample: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const handleToggle = (index: number) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  return (
    <div className="p-4">
      <Accordion
        onItemOpen={(index) => console.log(`Item ${index} opened`)}
        onItemClose={(index) => console.log(`Item ${index} closed`)}
        customClass="my-accordion"
        customItemClass="my-accordion-item"
        customTitleClass="my-accordion-title"
        customContentClass="my-accordion-content"
        multiOpen={true}
        defaultOpenIndex={0}
      >
        <AccordionItem
          title="Item 1"
          isOpen={openIndexes.includes(0)}
          onToggle={() => handleToggle(0)}
          customClass="bg-red-100"
          customTitleClass="text-red-500"
          customContentClass="text-red-700"
        >
          <p>This is the content of item 1.</p>
        </AccordionItem>
        <AccordionItem
          title="Item 2"
          isOpen={openIndexes.includes(1)}
          onToggle={() => handleToggle(1)}
          customClass="bg-green-100"
          customTitleClass="text-green-500"
          customContentClass="text-green-700"
        >
          <p>This is the content of item 2.</p>
        </AccordionItem>
        <AccordionItem
          title="Item 3"
          isOpen={openIndexes.includes(2)}
          onToggle={() => handleToggle(2)}
          customClass="bg-blue-100"
          customTitleClass="text-blue-500"
          customContentClass="text-blue-700"
        >
          <p>This is the content of item 3.</p>
        </AccordionItem>
        <AccordionItem
          title="Item 4"
          isOpen={openIndexes.includes(3)}
          onToggle={() => handleToggle(3)}
          customClass="bg-yellow-100"
          customTitleClass="text-yellow-500"
          customContentClass="text-yellow-700"
        >
          <p>This is the content of item 4.</p>
        </AccordionItem>
        <AccordionItem
          title="Item 5"
          isOpen={openIndexes.includes(4)}
          onToggle={() => handleToggle(4)}
          customClass="bg-purple-100"
          customTitleClass="text-purple-500"
          customContentClass="text-purple-700"
        >
          <p>This is the content of item 5.</p>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionExample;
