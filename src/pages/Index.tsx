
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Glasses, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const demoData = [
  { label: 'Energy', value: 85 },
  { label: 'Manufacturing', value: 65 },
  { label: 'Finance', value: 75 },
  { label: 'Healthcare', value: 90 },
  { label: 'Education', value: 60 }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Transform your data into immersive 3D visualizations in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-data-blue bg-opacity-10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-data-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Input Your Data</h3>
                <p className="text-muted-foreground">
                  Upload a CSV/JSON file or manually enter your data in the simple form interface.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-data-purple bg-opacity-10 flex items-center justify-center mb-4">
                  <Share2 className="h-8 w-8 text-data-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Choose Visualization</h3>
                <p className="text-muted-foreground">
                  Select from multiple 3D visualization types to best represent your data.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-data-pink bg-opacity-10 flex items-center justify-center mb-4">
                  <Glasses className="h-8 w-8 text-data-pink" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Explore in AR/VR</h3>
                <p className="text-muted-foreground">
                  Interact with your 3D visualization in the browser or view it in AR/VR for an immersive experience.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/visualize">
                <Button className="bg-gradient-data text-white px-8 py-6 text-lg rounded-lg">
                  Start Visualizing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Sample Visualization */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">See It In Action</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Preview how your data can be transformed into interactive 3D visualizations
              </p>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
                alt="3D Data Visualization Example" 
                className="rounded-lg shadow-xl max-w-full md:max-w-[800px] h-auto" 
              />
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/visualize">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                  Try with your own data
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
