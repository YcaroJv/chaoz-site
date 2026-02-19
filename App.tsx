
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ModDetail } from './pages/ModDetail';
import { InstallationGuide } from './pages/InstallationGuide';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { Layout } from './components/Layout';
import { ModProvider } from './context/ModContext';

const App: React.FC = () => {
  return (
    <ModProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mod/:id" element={<ModDetail />} />
            <Route path="/como-instalar" element={<InstallationGuide />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </ModProvider>
  );
};

export default App;
