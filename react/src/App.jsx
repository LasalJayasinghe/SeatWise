import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './router'; // Assuming this is your router.jsx file

function App() {
  return (
    <div className="App">
      {/* Wrap the Routes component with BrowserRouter */}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
