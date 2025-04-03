
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
  // Normalize data for visualization
  const values = data.map(item => typeof item.value === 'number' ? item.value : 0);
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
        
        return (
          <group key={index} position={[xPos, value / 2, 0]}>
            <mesh>
              <boxGeometry args={[1, value, 1]} />
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
              {item.value !== undefined ? item.value.toString() : '0'}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

const Scatter3D = ({ data }: { data: any[] }) => {
  // Normalize data for 3D scatter plot (requires x, y, z coordinates)
  return (
    <group position={[0, 0, 0]}>
      {data.map((item, index) => {
        const x = typeof item.x === 'number' ? item.x : (Math.random() * 10 - 5);
        const y = typeof item.y === 'number' ? item.y : (Math.random() * 10 - 5);
        const z = typeof item.z === 'number' ? item.z : (Math.random() * 10 - 5);
        
        const colorMap = [
          new THREE.Color('#4361ee'),
          new THREE.Color('#3a0ca3'),
          new THREE.Color('#7209b7'),
          new THREE.Color('#f72585'),
          new THREE.Color('#4cc9f0')
        ];
        
        const color = colorMap[index % colorMap.length];
        const size = item.size || 0.5;
        
        return (
          <mesh key={index} position={[x, y, z]}>
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
  // Normalize data for 3D pie chart
  const values = data.map(item => typeof item.value === 'number' ? item.value : 0);
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
  // Ideally data should have x, y, z values or be arranged in a grid
  
  // If we don't have proper grid data, create a simple surface
  const rows = Math.ceil(Math.sqrt(data.length));
  const cols = Math.ceil(data.length / rows);
  
  const WIDTH = 10;
  const HEIGHT = 10;
  const SEGMENTS = Math.max(rows, cols);
  
  // Create surface geometry
  const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, SEGMENTS, SEGMENTS);
  const vertices = geometry.attributes.position.array;
  
  // Modify vertices to create the surface
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const z = vertices[i + 2];
    
    // Calculate height based on data or use a mathematical formula
    let y = 0;
    
    // Try to use actual data points if available
    const row = Math.floor((i / 3) / (SEGMENTS + 1));
    const col = (i / 3) % (SEGMENTS + 1);
    const dataIndex = row * cols + col;
    
    if (dataIndex < data.length) {
      if (typeof data[dataIndex].y === 'number') {
        y = data[dataIndex].y;
      } else if (typeof data[dataIndex].value === 'number') {
        y = data[dataIndex].value;
      } else {
        // Use a formula if no valid data
        y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 2;
      }
    } else {
      // Use a formula if no data for this vertex
      y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 2;
    }
    
    vertices[i + 1] = y;
  }

  // Update geometry
  geometry.computeVertexNormals();
  
  return (
    <group rotation={[-Math.PI / 4, 0, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial 
          color="#4361ee" 
          wireframe={false} 
          side={THREE.DoubleSide} 
          vertexColors={true}
        />
      </mesh>
    </group>
  );
};

const DataVisualizer: React.FC<VisualizerProps> = ({ data, vizType }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
              {vizType === 'bar3d' && <Bar3D data={data} />}
              {vizType === 'scatter3d' && <Scatter3D data={data} />}
              {vizType === 'pie3d' && <Pie3D data={data} />}
              {vizType === 'surface' && <Surface3D data={data} />}
              
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
