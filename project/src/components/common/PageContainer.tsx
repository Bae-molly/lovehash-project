import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <main className={`min-h-screen pt-16 ${className}`}>
      {children}
    </main>
  );
};

export default PageContainer;