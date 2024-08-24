import React from 'react';
import MultiStepForm from './components/MultiStepForm';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Multi-Step Registration</h1>
        <MultiStepForm />
      </div>
    </div>
  );
};

export default App;
