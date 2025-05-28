
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, LocateFixed } from 'lucide-react';

interface MapControlsProps {
    onLocateUser: () => void;
    onResetView: () => void;
    isLocating: boolean;
    theme: 'light' | 'dark';
}

const MapControls: React.FC<MapControlsProps> = ({
    onLocateUser,
    isLocating,
    theme
}) => {
    return (
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Button
                onClick={onLocateUser}
                disabled={isLocating}
                size="sm"
                className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'} shadow-md flex items-center gap-1`}
            >
                <LocateFixed size={16} />
                {isLocating ? "Locating..." : "Find My Location"}
            </Button>
        </div>
    );
};

export default MapControls;
