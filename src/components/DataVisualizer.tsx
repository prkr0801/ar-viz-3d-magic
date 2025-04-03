
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Maximize2, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface VisualizerProps {
  data: any[];
  vizType: string;
}

const Bar3D = ({ data }: { data: any[] }) => {
  // Ensure data values are properly parsed as numbers
  const values = data.map(item => {
    const val = parseFloat(item.value);
    return isNaN(val) ? 0 : val;
  });
  
  const maxValue = Math.max(...values, 1); // Prevent division by zero
  const normalizedValues = values.map(v => (v / maxValue) * 5); // Scale to max height of 5
  
  return (
    <group position={[0, 0, 0]}>
      {data.map((item, index) => {
        const value = normalizedValues[index] || 0;
        const xPos = index * 1.5 - (data.length - 1) * 0.75; // Center bars
        
        const colorMap = [
          new THREE.Color('#4361ee'),
          new THREE.Color('#3a0ca3'),
          new THREE.Color('#7209b7'),
          new THREE.Color('#f72585'),
          new THREE.Color('#4cc9f0')
        ];
        
        const color = colorMap[index % colorMap.length];
        const parsedValue = parseFloat(item.value);
        const displayValue = isNaN(parsedValue) ? '0' : parsedValue.toString();
        
        return (
          <group key={index} position={[xPos, value / 2, 0]}>
            <mesh>
              <boxGeometry args={[1, Math.max(value, 0.1), 1]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <Text
              position={[0, -value / 2 - 0.5, 0]}
              fontSize={0.3}
              color="#000000"
              anchorX="center"
              anchorY="top"
            >
              {item.label || `Item ${index + 1}`}
            </Text>
            <Text
              position={[0, value / 2 + 0.3, 0]}
              fontSize={0.3}
              color="#000000"
              anchorX="center"
              anchorY="bottom"
            >
              {displayValue}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

const Scatter3D = ({ data }: { data: any[] }) => {
  return (
    <group position={[0, 0, 0]}>
      {data.map((item, index) => {
        // Ensure proper parsing of numeric values
        const x = parseFloat(item.x);
        const y = parseFloat(item.y);
        const z = parseFloat(item.z);
        const size = parseFloat(item.size) || 0.5;
        
        // Use fallback values for NaN
        const xPos = isNaN(x) ? (Math.random() * 10 - 5) : x;
        const yPos = isNaN(y) ? (Math.random() * 10 - 5) : y;
        const zPos = isNaN(z) ? (Math.random() * 10 - 5) : z;
        
        const colorMap = [
          new THREE.Color('#4361ee'),
          new THREE.Color('#3a0ca3'),
          new THREE.Color('#7209b7'),
          new THREE.Color('#f72585'),
          new THREE.Color('#4cc9f0')
        ];
        
        const color = colorMap[index % colorMap.length];
        
        return (
          <mesh key={index} position={[xPos, yPos, zPos]}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial color={color} />
            {item.label && (
              <Html position={[0, size + 0.3, 0]}>
                <div className="bg-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  {item.label}
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
      {/* Coordinate axes for reference */}
      <group>
        <mesh position={[5, 0, 0]}>
          <boxGeometry args={[10, 0.05, 0.05]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[0.05, 10, 0.05]} />
          <meshStandardMaterial color="green" />
        </mesh>
        <mesh position={[0, 0, 5]}>
          <boxGeometry args={[0.05, 0.05, 10]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </group>
    </group>
  );
};

const Pie3D = ({ data }: { data: any[] }) => {
  // Normalize data for 3D pie chart - ensure proper parsing of values
  const values = data.map(item => {
    const val = parseFloat(item.value);
    return isNaN(val) ? 0 : val;
  });
  
  const total = values.reduce((sum, value) => sum + value, 0) || 1; // Prevent division by zero
  
  const colorMap = [
    new THREE.Color('#4361ee'),
    new THREE.Color('#3a0ca3'),
    new THREE.Color('#7209b7'),
    new THREE.Color('#f72585'),
    new THREE.Color('#4cc9f0')
  ];
  
  let startAngle = 0;
  
  return (
    <group rotation={[-Math.PI / 4, 0, 0]}>
      {data.map((item, index) => {
        const value = values[index] || 0;
        const percentage = value / total;
        const angle = percentage * Math.PI * 2;
        const endAngle = startAngle + angle;
        const color = colorMap[index % colorMap.length];
        
        // Calculate middle angle for label position
        const midAngle = startAngle + angle / 2;
        const labelX = Math.sin(midAngle) * 3;
        const labelZ = Math.cos(midAngle) * 3;
        
        // Create custom shape for pie slice
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.arc(0, 0, 2, startAngle, endAngle, false);
        shape.lineTo(0, 0);
        
        const extrudeSettings = {
          steps: 1,
          depth: 0.5,
          bevelEnabled: false
        };
        
        const slice = (
          <group key={index}>
            <mesh>
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {percentage > 0.05 && (
              <Text
                position={[labelX, 0.3, labelZ]}
                fontSize={0.3}
                color="#000000"
                anchorX="center"
                anchorY="middle"
              >
                {`${item.label || `Item ${index + 1}`} (${Math.round(percentage * 100)}%)`}
              </Text>
            )}
          </group>
        );
        
        startAngle = endAngle;
        return slice;
      })}
    </group>
  );
};

const Surface3D = ({ data }: { data: any[] }) => {
  // Create a surface plot from data points
  // For surface plots, we need proper coordinates
  
  // Determine if we have proper grid data
  const hasProperData = data.every(item => 
    !isNaN(parseFloat(item.x)) && 
    !isNaN(parseFloat(item.y)) && 
    !isNaN(parseFloat(item.z))
  );
  
  // Calculate grid dimensions based on data points
  const rows = Math.ceil(Math.sqrt(data.length));
  const cols = Math.ceil(data.length / rows);
  
  const WIDTH = 10;
  const HEIGHT = 10;
  const SEGMENTS = Math.max(rows, cols, 10); // Ensure enough segments
  
  // Create surface geometry
  const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, SEGMENTS, SEGMENTS);
  const vertices = geometry.attributes.position.array;
  
  // Modify vertices to create the surface
  for (let i = 0; i < vertices.length; i += 3) {
    const vx = vertices[i];
    const vz = vertices[i + 2];
    
    // Calculate height based on data or use a mathematical formula
    let vy = 0;
    
    if (hasProperData) {
      // Try to use actual data points if available
      const row = Math.floor((i / 3) / (SEGMENTS + 1));
      const col = (i / 3) % (SEGMENTS + 1);
      
      // Find the closest data point
      let closestDataPoint = null;
      let minDistance = Infinity;
      
      for (const point of data) {
        const px = parseFloat(point.x);
        const pz = parseFloat(point.z);
        
        if (!isNaN(px) && !isNaN(pz)) {
          const distance = Math.sqrt((vx - px) ** 2 + (vz - pz) ** 2);
          if (distance < minDistance) {
            minDistance = distance;
            closestDataPoint = point;
          }
        }
      }
      
      if (closestDataPoint && !isNaN(parseFloat(closestDataPoint.y))) {
        vy = parseFloat(closestDataPoint.y);
      } else {
        // Use a formula if no valid data point found
        vy = Math.sin(vx * 0.5) * Math.cos(vz * 0.5) * 2;
      }
    } else {
      // Use a formula if no valid data
      vy = Math.sin(vx * 0.5) * Math.cos(vz * 0.5) * 2;
    }
    
    vertices[i + 1] = vy;
  }

  // Update geometry
  geometry.computeVertexNormals();
  
  // Create a color attribute based on height
  const colors = new Float32Array(vertices.length);
  for (let i = 0; i < vertices.length; i += 3) {
    const height = vertices[i + 1];
    
    // Create a color gradient based on height
    const color = new THREE.Color();
    if (height < 0) {
      color.setRGB(0, 0, Math.abs(height) / 5);  // Blue for negative values
    } else {
      color.setRGB(0, height / 5, 0);  // Green for positive values
    }
    
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }
  
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  return (
    <group rotation={[-Math.PI / 4, 0, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial 
          color="#ffffff" 
          wireframe={false} 
          side={THREE.DoubleSide} 
          vertexColors={true}
        />
      </mesh>
    </group>
  );
};

// Main DataVisualizer component
const DataVisualizer: React.FC<VisualizerProps> = ({ data, vizType }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Data validation and preparation
  const validData = React.useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      toast.error("No valid data provided for visualization");
      return [];
    }
    
    // For each visualization type, ensure we have the required properties
    if (vizType === 'bar3d') {
      return data.map(item => ({
        label: String(item.label || `Item ${data.indexOf(item) + 1}`),
        value: parseFloat(item.value) || 0
      }));
    } else if (vizType === 'scatter3d') {
      return data.map(item => ({
        x: parseFloat(item.x) || 0,
        y: parseFloat(item.y) || 0,
        z: parseFloat(item.z) || 0,
        label: String(item.label || `Point ${data.indexOf(item) + 1}`),
        size: parseFloat(item.size) || 0.5
      }));
    } else if (vizType === 'pie3d') {
      return data.map(item => ({
        label: String(item.label || `Segment ${data.indexOf(item) + 1}`),
        value: parseFloat(item.value) || 0
      }));
    } else if (vizType === 'surface') {
      return data.map(item => ({
        x: parseFloat(item.x) || 0,
        y: parseFloat(item.y) || 0,
        z: parseFloat(item.z) || 0
      }));
    }
    
    return data;
  }, [data, vizType]);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(err => {
          toast.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const enableAR = () => {
    toast.info('AR functionality is available on compatible mobile devices. Please view on a mobile device with AR capabilities.');
  };

  const downloadImage = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `data-visualization-${vizType}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success('Image downloaded successfully!');
  };

  // Log data for debugging
  console.log('Visualization Data:', validData);
  console.log('Visualization Type:', vizType);

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>3D Data Visualization</CardTitle>
          <CardDescription>
            Interact with your data in 3D. Drag to rotate, scroll to zoom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            ref={containerRef} 
            className={`relative rounded-lg overflow-hidden ${isFullscreen ? 'w-screen h-screen' : 'w-full h-[500px]'}`}
          >
            <Canvas
              camera={{ position: [0, 2, 10], fov: 60 }}
              className="bg-gradient-to-b from-blue-50 to-purple-50"
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />
              
              {/* Render the appropriate visualization based on type */}
              {vizType === 'bar3d' && <Bar3D data={validData} />}
              {vizType === 'scatter3d' && <Scatter3D data={validData} />}
              {vizType === 'pie3d' && <Pie3D data={validData} />}
              {vizType === 'surface' && <Surface3D data={validData} />}
              
              <gridHelper args={[20, 20, '#888888', '#444444']} />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
              />
            </Canvas>
            
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white bg-opacity-70 backdrop-blur-sm"
                onClick={downloadImage}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white bg-opacity-70 backdrop-blur-sm"
                onClick={toggleFullscreen}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white bg-opacity-70 backdrop-blur-sm"
                onClick={enableAR}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualizer;
