import React, { useState } from "react";

// CardMedia Component
interface CardMediaProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
  rating?: number;
  active?: boolean;
  onActionClick?: () => void;
  progress?: number;
  badgeLabel?: string;
  customClass?: string;
  customHeaderClass?: string;
  customContentClass?: string;
  customFooterClass?: string;
  footer?: React.ReactNode;
  resizable?: boolean;
  onResize?: (width: number, height: number) => void;
  actions?: React.ReactNode;
  backgroundColor?: string;
  hideImageOnError?: boolean;
  errorMessage?: string;
}

function CardMedia({
  title = "Default Title",
  subtitle = "Default Subtitle",
  description = "Default description",
  imageSrc = "/static/images/default.jpeg",
  rating = 0,
  active: initialActive = false,
  onActionClick,
  progress = 0,
  badgeLabel = "",
  customClass = "",
  customHeaderClass = "",
  customContentClass = "",
  customFooterClass = "",
  footer,
  resizable = false,
  onResize,
  actions,
  backgroundColor = "white",
  hideImageOnError = true,
  errorMessage = "Image failed to load",
}: CardMediaProps) {
  const [active, setActive] = useState(initialActive);
  const [imageError, setImageError] = useState(false);

  const handleResize = (event: React.MouseEvent) => {
    if (onResize) {
      // Implement resize logic here
      onResize(event.clientX, event.clientY);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`max-w-sm border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${customClass}`}
      style={{ backgroundColor }}
    >
      {!imageError ? (
        <img
          className="w-full h-48 object-cover"
          src={imageSrc}
          alt={title}
          onError={handleImageError}
        />
      ) : (
        !hideImageOnError && (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-red-500">
            {errorMessage}
          </div>
        )
      )}
      <div className={`p-4 ${customHeaderClass}`}>
        <h2 className="text-xl font-bold">{title}</h2>
        <h3 className="text-lg text-gray-600">{subtitle}</h3>
        <p className="text-gray-700">{description}</p>
        {badgeLabel && <span className="badge">{badgeLabel}</span>}
      </div>
      <div className={`p-4 space-y-3 ${customContentClass}`}>
        <div className="rating">{rating} stars</div>
        <div
          className="progress-bar bg-blue-500 h-2 rounded"
          style={{ width: `${progress}%` }}
        ></div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={onActionClick}
        >
          Action
        </button>
        {actions && <div className="actions">{actions}</div>}
      </div>
      {footer && <div className={`p-4 ${customFooterClass}`}>{footer}</div>}
      {resizable && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
          onMouseDown={handleResize}
        ></div>
      )}
    </div>
  );
}

export default CardMedia;
