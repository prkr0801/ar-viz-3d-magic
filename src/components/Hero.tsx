
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Glasses, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="mesh-gradient py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                Visualize Your Data in Immersive 3D
              </h1>
              <p className="max-w-[600px] text-white text-opacity-90 md:text-xl">
                Turn your data into interactive 3D visualizations that you can explore in augmented and virtual reality.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/visualize">
                <Button className="bg-white text-primary hover:bg-white/90 flex gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Start Visualizing
                </Button>
              </Link>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 flex gap-2">
                <Glasses className="h-4 w-4" />
                Try a Demo
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[400px] perspective-[1000px] animate-float">
              <div className="absolute inset-0 glassmorphism rounded-xl overflow-hidden flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-r from-data-purple to-data-blue rounded-lg animate-spin-slow opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 relative">
                    <div className="absolute inset-0 bg-data-blue opacity-30 animate-pulse rounded-lg"></div>
                    <div className="absolute bottom-0 w-full h-1/2 bg-data-purple opacity-30 rounded-b-lg"></div>
                    <div className="absolute top-0 w-1/3 h-full left-1/3 bg-data-pink opacity-30 rounded-t-lg"></div>
                  </div>
                  <p className="text-white text-opacity-80 mt-4 text-sm">Interactive 3D Visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
