/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Tractor, Calendar, ClipboardList, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Toaster } from 'sonner';
import { cn } from './utils';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Machinery from './pages/Machinery';
import Requests from './pages/Requests';
import Profile from './pages/Profile';
import BookingDetails from './pages/BookingDetails';
import VehicleDetails from './pages/VehicleDetails';
import AddVehicle from './pages/AddVehicle';
import LiveTracking from './pages/LiveTracking';
import VehicleReturned from './pages/VehicleReturned';
import ReportIssue from './pages/ReportIssue';
import ReturnSuccess from './pages/ReturnSuccess';
import EarningsAnalytics from './pages/EarningsAnalytics';
import RequestDetails from './pages/RequestDetails';
import { INITIAL_EQUIPMENT, MOCK_REQUESTS } from './mockData';
import { Equipment, Request } from './types';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/machinery', icon: Tractor, label: 'Machinery' },
    { path: '/bookings', icon: Calendar, label: 'Bookings' },
    { path: '/requests', icon: ClipboardList, label: 'Requests' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const hideNavPaths = ['/live-tracking', '/vehicle-returned', '/report-issue', '/return-success', '/add-vehicle', '/requests/'];
  const shouldHideNav = hideNavPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-slate-900 font-sans pb-20">
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative overflow-x-hidden">
        {children}
      </main>
      
      {!shouldHideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  isActive ? "text-[#2f7f33]" : "text-slate-400"
                )}
              >
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn("text-[10px] font-bold uppercase tracking-wider", isActive ? "font-bold" : "font-medium")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export default function App() {
  const [machinery, setMachinery] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('smartfarm_machinery');
    return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT;
  });

  const [requests, setRequests] = useState<Request[]>(() => {
    const saved = localStorage.getItem('smartfarm_requests');
    return saved ? JSON.parse(saved) : MOCK_REQUESTS;
  });

  useEffect(() => {
    localStorage.setItem('smartfarm_machinery', JSON.stringify(machinery));
  }, [machinery]);

  useEffect(() => {
    localStorage.setItem('smartfarm_requests', JSON.stringify(requests));
  }, [requests]);

  const addVehicle = (vehicle: Equipment) => {
    setMachinery(prev => [vehicle, ...prev]);
  };

  const updateVehicle = (updated: Equipment) => {
    setMachinery(prev => prev.map(v => v.id === updated.id ? updated : v));
  };

  const updateRequestStatus = (id: string, status: 'accepted' | 'declined') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard machinery={machinery} />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />
          <Route path="/machinery" element={<Machinery machinery={machinery} />} />
          <Route path="/machinery/:id" element={<VehicleDetails machinery={machinery} onUpdate={updateVehicle} />} />
          <Route path="/add-vehicle" element={<AddVehicle onAdd={addVehicle} />} />
          <Route path="/requests" element={<Requests requests={requests} onUpdateStatus={updateRequestStatus} />} />
          <Route path="/requests/:id" element={<RequestDetails requests={requests} onUpdateStatus={updateRequestStatus} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/live-tracking/:id" element={<LiveTracking />} />
          <Route path="/vehicle-returned/:id" element={<VehicleReturned />} />
          <Route path="/report-issue/:id" element={<ReportIssue />} />
          <Route path="/return-success" element={<ReturnSuccess />} />
          <Route path="/analytics" element={<EarningsAnalytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}
