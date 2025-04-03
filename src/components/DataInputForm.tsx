
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, FileJson, FileSpreadsheet, Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface DataInputFormProps {
  onDataSubmit: (data: any, vizType: string) => void;
}

const DataInputForm: React.FC<DataInputFormProps> = ({ onDataSubmit }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [jsonData, setJsonData] = useState('');
  const [csvData, setCsvData] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [vizType, setVizType] = useState('bar3d');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError(null);
      
      // Read file
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result as string;
        
        if (selectedFile.type === 'application/json') {
          setJsonData(result);
        } else if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
          setCsvData(result);
        }
      };
      
      reader.onerror = () => {
        setError('Error reading file');
      };
      
      if (selectedFile.type === 'application/json') {
        reader.readAsText(selectedFile);
      } else if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        reader.readAsText(selectedFile);
      } else {
        setError('Unsupported file type. Please upload JSON or CSV files.');
        setFile(null);
      }
    }
  };

  const parseData = () => {
    try {
      let parsedData;
      
      if (activeTab === 'upload' && file) {
        if (file.type === 'application/json' || file.name.endsWith('.json')) {
          parsedData = JSON.parse(jsonData);
        } else if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          // Simple CSV parsing logic (could be enhanced)
          const lines = csvData.split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          
          parsedData = lines.slice(1).map(line => {
            if (!line.trim()) return null; // Skip empty lines
            
            const values = line.split(',').map(v => v.trim());
            const rowData: Record<string, string | number> = {};
            
            headers.forEach((header, index) => {
              // Attempt to convert numeric values
              const value = values[index] || '';
              rowData[header] = isNaN(Number(value)) ? value : Number(value);
            });
            
            return rowData;
          }).filter(Boolean); // Remove null values
        }
      } else if (activeTab === 'json') {
        parsedData = JSON.parse(jsonData);
      } else if (activeTab === 'csv') {
        // Parse manual CSV input
        const lines = csvData.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        parsedData = lines.slice(1).map(line => {
          if (!line.trim()) return null;
          
          const values = line.split(',').map(v => v.trim());
          const rowData: Record<string, string | number> = {};
          
          headers.forEach((header, index) => {
            const value = values[index] || '';
            rowData[header] = isNaN(Number(value)) ? value : Number(value);
          });
          
          return rowData;
        }).filter(Boolean);
      } else {
        throw new Error('No data provided');
      }
      
      setError(null);
      onDataSubmit(parsedData, vizType);
      toast.success('Data processed successfully!');
    } catch (err) {
      console.error('Error parsing data:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse data');
      toast.error('Error processing data. Please check the format.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    parseData();
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Data Input</CardTitle>
          <CardDescription>
            Upload or paste your data to visualize it in 3D. Supported formats: JSON and CSV.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger value="json" className="flex items-center gap-2">
                  <FileJson className="h-4 w-4" />
                  JSON
                </TabsTrigger>
                <TabsTrigger value="csv" className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  CSV
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="py-4">
                <div className="grid w-full gap-4">
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
                    <Input
                      type="file"
                      id="fileUpload"
                      className="hidden"
                      accept=".json,.csv"
                      onChange={handleFileChange}
                    />
                    <Label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <span className="font-medium">Choose a file or drag and drop</span>
                      <span className="text-sm text-muted-foreground">JSON or CSV files (max 2MB)</span>
                    </Label>
                  </div>
                  {file && (
                    <div className="p-3 bg-accent rounded-md flex justify-between items-center">
                      <span>{file.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setFile(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="json" className="py-4">
                <div className="grid w-full gap-4">
                  <Label htmlFor="jsonData">Paste JSON Data</Label>
                  <Textarea
                    id="jsonData"
                    placeholder='[{"label": "Category A", "value": 30}, {"label": "Category B", "value": 50}]'
                    className="min-h-[200px] font-mono text-sm"
                    value={jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="csv" className="py-4">
                <div className="grid w-full gap-4">
                  <Label htmlFor="csvData">Paste CSV Data</Label>
                  <Textarea
                    id="csvData"
                    placeholder="label,value\nCategory A,30\nCategory B,50"
                    className="min-h-[200px] font-mono text-sm"
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 grid gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="vizType">Visualization Type</Label>
                <Select value={vizType} onValueChange={setVizType}>
                  <SelectTrigger id="vizType">
                    <SelectValue placeholder="Select visualization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar3d">3D Bar Chart</SelectItem>
                    <SelectItem value="scatter3d">3D Scatter Plot</SelectItem>
                    <SelectItem value="pie3d">3D Pie Chart</SelectItem>
                    <SelectItem value="surface">3D Surface</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            className="w-full bg-gradient-data text-white"
            disabled={
              (activeTab === 'upload' && !file) || 
              (activeTab === 'json' && !jsonData.trim()) || 
              (activeTab === 'csv' && !csvData.trim())
            }
          >
            Visualize Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataInputForm;
