import React, { useState } from 'react';

const VerificationScreen = ({ nextStep, prevStep }) => {
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="text-purple-500" onClick={prevStep}>Back</button>
          <button className="text-purple-500" onClick={nextStep}>Next</button>
        </div>
        <h1 className="text-2xl font-semibold mb-4">We have sent you a verification code</h1>
        <input
          type="text"
          placeholder="9894"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-b-2 border-black text-2xl py-2 w-full"
        />
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <button className="text-gray-500"><i className="fas fa-microphone"></i></button>
            <button className="text-gray-500"><i className="fas fa-keyboard"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationScreen;