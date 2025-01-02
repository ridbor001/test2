import React from 'react';
import ReactDOM from 'react-dom/client';  // 使用 'react-dom/client'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // 创建 root 实例
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
