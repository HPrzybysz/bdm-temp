import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '@/js/App';
import DataScopeButtons from './js/components/DataScopeButtons';
import '@/scss/index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DataScopeButtons />} />
          <Route path="yearly" element={<DataScopeButtons />} />
          <Route path="quarterly" element={<DataScopeButtons />} />
          <Route path="monthly" element={<DataScopeButtons />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
