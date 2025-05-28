
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterChipsProps {
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ activeFilters, setActiveFilters }) => {
  const filterChips = [
    { id: 'available', label: 'Available' },
    { id: 'covered', label: 'Covered' },
    { id: 'ev-charging', label: 'EV Charging' },
    { id: 'garage', label: 'Garage' },
    { id: 'nearby', label: 'Within 5 min' }
  ];
  
  const toggleFilter = (filterId: string) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter(id => id !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-none flex items-center gap-2 mt-3 pb-1 pl-0.5 sm:flex-wrap sm:overflow-visible">
      <div className="flex space-x-2 sm:flex-wrap sm:gap-2">
        {filterChips.map((chip) => (
          <Button
            key={chip.id}
            variant={activeFilters.includes(chip.id) ? "default" : "outline"}
            size="sm"
            className="rounded-full flex-shrink-0"
            onClick={() => toggleFilter(chip.id)}
          >
            {chip.label}
          </Button>
        ))}
        
        <Button variant="ghost" size="sm" className="rounded-full flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterChips;
