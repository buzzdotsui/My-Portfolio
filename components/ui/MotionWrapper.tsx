import React from 'react';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

