import React from 'react';
import './index.css'; // Import Tailwind styles if needed
import App from './App';
import { createRoot } from 'react-dom/client'; // Use createRoot from react-dom/client
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Find the root DOM element in your HTML
const container = document.getElementById('root');
const root = createRoot(container); // Create a root using React 18

// Render the App component
root.render(
    <BrowserRouter>
        <UserProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </UserProvider>
    </BrowserRouter>
);
