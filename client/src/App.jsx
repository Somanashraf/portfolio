import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Portfolio from './pages/Portfolio';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
