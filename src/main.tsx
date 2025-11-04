import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import './assets/index.css';
import MainLayout from './components/layout/main-layout.tsx';
import Home from './components/pages/home/home.tsx';
import LoginPage from './components/pages/login/login.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route element={<MainLayout/>}>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

    <Toaster />
  </>
)
