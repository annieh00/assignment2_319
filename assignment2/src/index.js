import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.js"
import Shopping from "./Shopping.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Shopping/>
    {/* <App /> */}
  </React.StrictMode>
);

