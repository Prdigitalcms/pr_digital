import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext'; // ✅ Correct import
import MainRoutes from './MainRoutes';
import './index.css';
import Marquee from './components/Marquee';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <AuthProvider>
        <ThemeProvider>
          <MainRoutes />
        </ThemeProvider>
      </AuthProvider>
    </>
  </StrictMode>
);
