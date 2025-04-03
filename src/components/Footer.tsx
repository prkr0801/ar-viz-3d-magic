
import React from 'react';
import { Box } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Box className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DataViz 3D</span>
            </div>
            <p className="text-zinc-400">
              Transform your data into immersive 3D visualizations with AR/VR support.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">3D Charts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AR Visualization</a></li>
              <li><a href="#" className="hover:text-white transition-colors">VR Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Import</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discord Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-400">© 2023 DataViz 3D. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
