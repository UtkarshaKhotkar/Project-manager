import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 24, className = '' }) => {
  return (
    <div className={`flex-center ${className}`} style={{ minHeight: '200px' }}>
      <Loader2 size={size} className="animate-spin text-primary" />
    </div>
  );
};

export default LoadingSpinner;