import React from 'react';
import ReactDOM from 'react-dom/client';
import 'flowbite';
import './style.css';
import App from './app/App';
import { AgentsProvider } from './app/contragents/context/AgentsContext';              

const rootEl = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootEl);
root.render(<AgentsProvider> <App />
</AgentsProvider>);