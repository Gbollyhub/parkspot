
import React from 'react';

interface MobileViewToggleProps {
  showMapOnMobile: boolean;
  setShowMapOnMobile: (show: boolean) => void;
}

const MobileViewToggle: React.FC<MobileViewToggleProps> = ({
  showMapOnMobile,
  setShowMapOnMobile
}) => {
  return (
    <div className="lg:hidden flex justify-center py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-muted/30 dark:bg-muted/10">
        <button
          onClick={() => setShowMapOnMobile(false)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            !showMapOnMobile ? 'bg-white dark:bg-gray-700 shadow-sm text-primary dark:text-primary-foreground' : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          List
        </button>
        <button
          onClick={() => setShowMapOnMobile(true)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            showMapOnMobile ? 'bg-white dark:bg-gray-700 shadow-sm text-primary dark:text-primary-foreground' : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          Map
        </button>
      </div>
    </div>
  );
};

export default MobileViewToggle;
