import { FC, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { twMerge } from 'tailwind-merge';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  type?: AlertType;
  title?: string;
  message: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  duration?: number;
  animationPreset?: 'fade' | 'slide' | 'scale';
  className?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  closable?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const alertVariants: Record<AlertType, string> = {
  info: 'bg-blue-50 text-blue-800',
  success: 'bg-green-50 text-green-800', 
  warning: 'bg-yellow-50 text-yellow-800',
  error: 'bg-red-50 text-red-800'
};

const iconVariants: Record<AlertType, string> = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400'
};

const animationPresets: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 }
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
  }
};

export const Alert: FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  isOpen,
  onClose,
  duration = 5000,
  animationPreset = 'fade',
  className,
  icon,
  actions,
  closable = true,
  rounded = 'md',
  shadow = 'md'
}) => {
  const { theme } = useTheme();
  const roundedClass = `rounded-${rounded}`;
  const shadowClass = `shadow-${shadow}`;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="alert"
          aria-live="assertive"
          variants={animationPresets[animationPreset]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className={twMerge(
            `p-4 ${roundedClass} ${shadowClass}`,
            alertVariants[type],
            className
          )}
        >
          <div className="flex">
            {icon && (
              <div className={`flex-shrink-0 ${iconVariants[type]}`}>
                {icon}
              </div>
            )}
            
            <div className="ml-3">
              {title && (
                <h3 className="text-sm font-medium">{title}</h3>
              )}
              <div className="mt-2 text-sm">{message}</div>
              
              {actions && (
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    {actions}
                  </div>
                </div>
              )}
            </div>

            {closable && (
              <button
                type="button"
                onClick={handleClose}
                className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
