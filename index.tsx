import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function resetToTop() {
  if (window.location.hash) {
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search,
    );
  }
  window.scrollTo(0, 0);
}

resetToTop();
window.addEventListener('load', resetToTop);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

requestAnimationFrame(() => {
  resetToTop();
});
