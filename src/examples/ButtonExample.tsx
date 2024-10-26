import React from "react";
import Button from "../components/Button";

const ButtonExample: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div className="p-4">
      <Button
        onClick={handleClick}
        variant="primary"
        size="medium"
        isLoading={false}
        disabled={false}
        ripple={true}
        icon="check"
        fullWidth={false}
        outline={false}
        gradient={true}
        ariaLabel="Primary Button"
        title="Click Me"
        type="button"
        customClass="my-custom-button"
        customIconClass="my-custom-icon"
      >
        Click Me
      </Button>
    </div>
  );
};

export default ButtonExample;