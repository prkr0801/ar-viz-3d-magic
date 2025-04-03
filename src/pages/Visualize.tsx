
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DataInputForm from '@/components/DataInputForm';
import DataVisualizer from '@/components/DataVisualizer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data for quick testing
const sampleData = {
  bar3d: [
    { label: "Product A", value: 42 },
    { label: "Product B", value: 78 },
    { label: "Product C", value: 35 },
    { label: "Product D", value: 62 },
    { label: "Product E", value: 91 }
  ],
  scatter3d: [
    { x: 1, y: 2, z: 3, label: "Point 1", size: 0.5 },
    { x: 2, y: 3, z: 1, label: "Point 2", size: 0.7 },
    { x: 3, y: 1, z: 2, label: "Point 3", size: 0.6 },
    { x: -2, y: -1, z: -3, label: "Point 4", size: 0.8 },
    { x: -1, y: -3, z: -2, label: "Point 5", size: 0.5 }
  ],
  pie3d: [
    { label: "Segment A", value: 30 },
    { label: "Segment B", value: 25 },
    { label: "Segment C", value: 15 },
    { label: "Segment D", value: 20 },
    { label: "Segment E", value: 10 }
  ]
};

const Visualize = () => {
  const [userData, setUserData] = useState<any[] | null>(null);
  const [vizType, setVizType] = useState<string>("bar3d");
  const [activeTab, setActiveTab] = useState<string>("input");
  
  const handleDataSubmit = (data: any[], type: string) => {
    setUserData(data);
    setVizType(type);
    setActiveTab("visualization");
  };
  
  const handleSampleDataSelect = (dataType: string) => {
    setUserData(sampleData[dataType as keyof typeof sampleData]);
    setVizType(dataType);
    setActiveTab("visualization");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-slate-50">
        <div className="container">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Data Visualizer</h1>
            <p className="text-muted-foreground md:text-lg">
              Transform your data into interactive 3D visualizations
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-screen-lg mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input Data</TabsTrigger>
              <TabsTrigger value="visualization" disabled={!userData}>Visualization</TabsTrigger>
            </TabsList>
            
            <TabsContent value="input" className="py-4">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>Try out the visualizer with sample data</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => handleSampleDataSelect("bar3d")}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Sample Bar Chart
                  </button>
                  <button 
                    onClick={() => handleSampleDataSelect("scatter3d")}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Sample Scatter Plot
                  </button>
                  <button 
                    onClick={() => handleSampleDataSelect("pie3d")}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Sample Pie Chart
                  </button>
                </CardContent>
              </Card>
              
              <DataInputForm onDataSubmit={handleDataSubmit} />
            </TabsContent>
            
            <TabsContent value="visualization" className="py-4">
              {userData ? (
                <DataVisualizer data={userData} vizType={vizType} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No data available for visualization. Please input your data first.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Visualize;
