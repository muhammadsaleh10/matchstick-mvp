import React from 'react';

const ConfirmationScreen = ({ prevStep }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="text-purple-500" onClick={prevStep}>Back</button>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Registration Successful!</h1>
        <p>Thank you for registering. Your profile has been successfully created and is ready to be shared with matchmakers.</p>
        <div className="mt-4">
          <button className="bg-purple-500 text-white py-2 px-4 rounded" onClick={prevStep}>Go to Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;