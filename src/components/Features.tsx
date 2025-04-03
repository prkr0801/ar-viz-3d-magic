
import React from 'react';
import { BarChart3, Box, Glasses, Upload, Layers, Laptop, RotateCw, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Upload className="h-6 w-6 text-data-purple" />,
    title: "Easy Data Import",
    description: "Import your CSV, JSON, or Excel data with a simple drag and drop interface."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-data-blue" />,
    title: "3D Visualizations",
    description: "Transform your data into interactive 3D charts, graphs, and models."
  },
  {
    icon: <Glasses className="h-6 w-6 text-data-pink" />,
    title: "AR/VR Support",
    description: "Explore your visualizations in augmented or virtual reality for immersive analysis."
  },
  {
    icon: <RotateCw className="h-6 w-6 text-data-orange" />,
    title: "Interactive Controls",
    description: "Rotate, zoom, and interact with your data in real-time for deeper insights."
  },
  {
    icon: <Layers className="h-6 w-6 text-data-green" />,
    title: "Multiple Chart Types",
    description: "Choose from bar charts, scatter plots, surface plots, and more in full 3D."
  },
  {
    icon: <Smartphone className="h-6 w-6 text-data-purple" />,
    title: "Mobile Compatible",
    description: "View and interact with your visualizations on any device, including AR on mobile."
  }
];

const Features = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Powerful Features</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Everything you need to transform your data into immersive 3D experiences
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-2 p-6 bg-card rounded-lg border shadow-sm">
              <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center bg-accent">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
