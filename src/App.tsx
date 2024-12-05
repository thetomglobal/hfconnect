import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import Centers from './components/Centers';
import Schedule from './components/Schedule';
import Contact from './components/Contact';
import ChurchSelection from './components/ChurchSelection';
import BackgroundAnimation from './components/BackgroundAnimation';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import MembersList from './components/admin/MembersList';
import OfferingsList from './components/admin/OfferingsList';
import ReportsList from './components/admin/ReportsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="members" element={<MembersList />} />
          <Route path="offerings" element={<OfferingsList />} />
          <Route path="reports" element={<ReportsList />} />
        </Route>

        {/* Main Site Routes */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-black text-white relative">
              <BackgroundAnimation />
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<ChurchSelection />} />
                  <Route path="/register/:churchId" element={<Registration />} />
                  <Route path="/centers" element={<Centers />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;