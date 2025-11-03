import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import './assets/index.css';
import MainLayout from './components/layout/main-layout.tsx';
import Home from './components/pages/home/home.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout/>}>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
