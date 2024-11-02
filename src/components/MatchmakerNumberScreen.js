import React, { useState } from 'react';

const MatchmakerNumberScreen = ({ nextStep, prevStep }) => {
  const [matchmakerContact, setMatchmakerContact] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="text-purple-500" onClick={prevStep}>Back</button>
          <button className="text-purple-500" onClick={nextStep}>Next</button>
        </div>
        <h1 className="text-2xl font-semibold mb-4">What's your matchmaker's phone number or email?</h1>
        <input
          type="text"
          placeholder="+923212342700"
          value={matchmakerContact}
          onChange={(e) => setMatchmakerContact(e.target.value)}
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

export default MatchmakerNumberScreen;