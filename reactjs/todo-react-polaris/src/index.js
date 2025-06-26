import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './components/App/App';
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider i18n={en}>
            <App />
        </AppProvider>
    </React.StrictMode>
);
