import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Bell, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ServiceHeaderProps {
  title: string;
  color: string;
  actions?: React.ReactNode;
}

export function ServiceHeader({ title, color, actions }: ServiceHeaderProps) {
  return (
    <div className={cn("sticky top-0 z-40 w-full text-white shadow-md", color)}>
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold text-lg tracking-wide">{title}</h1>
        </div>
        <div className="flex items-center space-x-2">
          {actions}
          <button className="p-2 hover:bg-white/20 rounded-full">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-full">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
