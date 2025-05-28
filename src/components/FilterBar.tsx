
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface FilterBarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  showAvailable: boolean;
  setShowAvailable: (value: boolean) => void;
  minPrice: number;
  maxPrice: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  priceRange,
  setPriceRange,
  showAvailable,
  setShowAvailable,
  minPrice,
  maxPrice
}) => {
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="px-2">
            <Slider
              defaultValue={priceRange}
              min={minPrice}
              max={maxPrice}
              step={0.5}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>£{priceRange[0].toFixed(2)}</span>
              <span>£{priceRange[1].toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="show-available" 
            checked={showAvailable}
            onCheckedChange={() => setShowAvailable(!showAvailable)}
          />
          <label htmlFor="show-available" className="text-sm font-medium">
            Only show available spots
          </label>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            setPriceRange([minPrice, maxPrice]);
            setShowAvailable(false);
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
