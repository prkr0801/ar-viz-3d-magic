
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Cube3d, Glasses, Upload } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Cube3d className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">DataViz 3D</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/visualize" className="text-sm font-medium hover:text-primary transition-colors">
            Visualize
          </Link>
          <Link to="/gallery" className="text-sm font-medium hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link to="/docs" className="text-sm font-medium hover:text-primary transition-colors">
            Docs
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Import Data</span>
          </Button>
          <Button size="sm" className="hidden md:flex items-center gap-2 bg-gradient-data text-white">
            <Glasses className="h-4 w-4" />
            <span>Try AR/VR</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
