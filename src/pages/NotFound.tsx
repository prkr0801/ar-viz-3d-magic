
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Box, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Box className="mx-auto h-20 w-20 text-primary" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">404 - Page Not Found</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex justify-center">
          <Link to="/">
            <Button className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Want to visualize data in 3D? Try our data visualization tool!
          </p>
          <div className="mt-4">
            <Link to="/visualize">
              <Button variant="outline" className="text-primary">
                Go to Data Visualizer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
