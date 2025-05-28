
import React from 'react';
import { format } from 'date-fns';

interface ResultsHeaderProps {
  spotsCount: number;
  selectedDate?: Date;
  selectedTime: string;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  spotsCount,
  selectedDate,
  selectedTime
}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 lg:border-b lg:border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
        {spotsCount} parking spots
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {selectedDate ? `For ${format(selectedDate, 'PP')} at ${selectedTime}` : 'Explore available parking in the area'}
      </p>
    </div>
  );
};

export default ResultsHeader;
