'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          onComplete={() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
          }} 
        />
      )}
      
      {/* Fade in content after loader exits */}
      <div 
        className={`transition-opacity duration-1000 ease-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  );
}
