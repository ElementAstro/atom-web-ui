// SpeedDial.tsx
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

interface SpeedDialProps {
  ariaLabel: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  floating?: boolean;
  fabSize?: number;
  fabColor?: string;
  fabHoverColor?: string;
  iconRotateDeg?: number;
  animationDuration?: string;
  easing?: string;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnActionClick?: boolean;
}

const SpeedDialContainer = styled.div<{ floating: boolean }>`
  position: ${(props) => (props.floating ? "fixed" : "relative")};
  bottom: ${(props) => (props.floating ? "16px" : "auto")};
  right: ${(props) => (props.floating ? "16px" : "auto")};
  z-index: ${(props) => (props.floating ? 1000 : "auto")};
`;

const SpeedDialFab = styled.button<{
  fabSize: number;
  fabColor: string;
  fabHoverColor: string;
  iconRotateDeg: number;
  animationDuration: string;
  easing: string;
}>`
  background-color: ${(props) => props.fabColor};
  color: white;
  width: ${(props) => props.fabSize}px;
  height: ${(props) => props.fabSize}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform ${(props) => props.animationDuration}
    ${(props) => props.easing};

  &:hover {
    background-color: ${(props) => props.fabHoverColor};
    transform: rotate(${(props) => props.iconRotateDeg}deg);
  }
`;

const SpeedDialActions = styled.div<{
  open: boolean;
  direction: string;
  animationDuration: string;
  easing: string;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: opacity ${(props) => props.animationDuration}
      ${(props) => props.easing},
    transform ${(props) => props.animationDuration} ${(props) => props.easing};
  ${(props) =>
    props.direction === "up" &&
    css`
      bottom: 70px;
      right: 0;
      flex-direction: column-reverse;
      transform: ${props.open ? "translateY(0)" : "translateY(20px)"};
    `}
  ${(props) =>
    props.direction === "down" &&
    css`
      top: 70px;
      right: 0;
      flex-direction: column;
      transform: ${props.open ? "translateY(0)" : "translateY(-20px)"};
    `}
  ${(props) =>
    props.direction === "left" &&
    css`
      top: 0;
      right: 70px;
      flex-direction: row-reverse;
      transform: ${props.open ? "translateX(0)" : "translateX(20px)"};
    `}
  ${(props) =>
    props.direction === "right" &&
    css`
      top: 0;
      left: 70px;
      flex-direction: row;
      transform: ${props.open ? "translateX(0)" : "translateX(-20px)"};
    `}
`;

const SpeedDial: React.FC<SpeedDialProps> = ({
  ariaLabel,
  icon,
  children,
  direction = "up",
  floating = false,
  fabSize = 56,
  fabColor = "#6B46C1",
  fabHoverColor = "#5A3BB8",
  iconRotateDeg = 45,
  animationDuration = "0.3s",
  easing = "ease",
  onOpen,
  onClose,
  closeOnActionClick = true,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prev) => {
      const nextState = !prev;
      nextState ? onOpen?.() : onClose?.();
      return nextState;
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
      onClose?.();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
      onClose?.();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleActionClick = () => {
    if (closeOnActionClick) {
      setOpen(false);
      onClose?.();
    }
  };

  return (
    <SpeedDialContainer ref={containerRef} floating={floating}>
      <SpeedDialFab
        aria-label={ariaLabel}
        onClick={handleToggle}
        fabSize={fabSize}
        fabColor={fabColor}
        fabHoverColor={fabHoverColor}
        iconRotateDeg={iconRotateDeg}
        animationDuration={animationDuration}
        easing={easing}
      >
        {icon}
      </SpeedDialFab>
      <SpeedDialActions
        open={open}
        direction={direction}
        animationDuration={animationDuration}
        easing={easing}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement<any>, {
            onClick: handleActionClick,
          })
        )}
      </SpeedDialActions>
    </SpeedDialContainer>
  );
};

interface SpeedDialActionProps {
  icon: React.ReactNode;
  tooltipTitle: string;
  onClick: () => void;
  tooltipPosition?: "left" | "right" | "top" | "bottom";
  disabled?: boolean;
  tooltipColor?: string;
}

const SpeedDialActionButton = styled.button<{ disabled: boolean }>`
  background-color: white;
  color: #6b46c1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin: 8px;
  transition: transform 0.3s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) => (props.disabled ? "white" : "#f1f1f1")};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.1)")};
  }
`;

const Tooltip = styled.div<{ position: string; tooltipColor: string }>`
  position: absolute;
  background-color: ${(props) => props.tooltipColor};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000; /* 确保提示在按钮上方 */
  ${(props) =>
    props.position === "top" &&
    css`
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
    `}
  ${(props) =>
    props.position === "bottom" &&
    css`
      top: 120%;
      left: 50%;
      transform: translateX(-50%);
    `}
  ${(props) =>
    props.position === "left" &&
    css`
      right: 120%;
      top: 50%;
      transform: translateY(-50%);
    `}
  ${(props) =>
    props.position === "right" &&
    css`
      left: 120%;
      top: 50%;
      transform: translateY(-50%);
    `}
`;

const SpeedDialAction: React.FC<SpeedDialActionProps> = ({
  icon,
  tooltipTitle,
  onClick,
  tooltipPosition = "left",
  disabled = false,
  tooltipColor = "black",
}) => {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <SpeedDialActionButton onClick={onClick} disabled={disabled}>
        {icon}
      </SpeedDialActionButton>
      <Tooltip position={tooltipPosition} tooltipColor={tooltipColor}>
        {tooltipTitle}
      </Tooltip>
    </div>
  );
};

export { SpeedDial, SpeedDialAction };
