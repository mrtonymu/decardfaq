import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">DeCard FAQ 知识库</h1>
        <Card>
          <CardContent className="p-4">
            <Input placeholder="搜索问题..." className="mb-4" />
            <div className="space-y-4">
              {/* FAQ content will go here */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;