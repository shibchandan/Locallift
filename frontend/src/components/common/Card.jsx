import React from 'react';

const Card = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div 
      className={`
        bg-white shadow rounded-lg overflow-hidden
        ${hoverable ? 'transition duration-200 hover:shadow-md hover:scale-[1.01]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Card header component
export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-3 bg-gray-50 border-b ${className}`}>
      {children}
    </div>
  );
};

// Card body component
export const CardBody = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-4 ${className}`}>
      {children}
    </div>
  );
};

// Card footer component
export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-3 bg-gray-50 border-t ${className}`}>
      {children}
    </div>
  );
};

export default Card;