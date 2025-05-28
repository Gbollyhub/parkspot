
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  
  const handleToggle = () => {
    toggleTheme();
    toast({
      title: `${theme === 'light' ? 'Dark' : 'Light'} mode activated`,
      description: `Theme switched to ${theme === 'light' ? 'dark' : 'light'} mode.`,
      duration: 2000,
    });
  };
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className={cn(
        'rounded-full',
        theme === 'dark' ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 hover:text-white' : 'border-gray-200 bg-white hover:bg-gray-100',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-300" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-gray-700" />
      )}
    </Button>
  );
}
