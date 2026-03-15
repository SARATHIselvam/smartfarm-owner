import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_BOOKINGS } from '../mockData';
import { BookingStatus } from '../types';

export default function Bookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = MOCK_BOOKINGS.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    const matchesSearch = booking.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         booking.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs: { id: BookingStatus | 'all', label: string }[] = [
    { id: 'active', label: 'Active' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-4 pt-6 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full">
              <ArrowLeft size={24} className="text-slate-600" />
            </button>
            <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          </div>
          <p className="text-slate-600 text-sm mb-4">View all current and upcoming equipment bookings.</p>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search equipment or farmer"
              className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#2f7f33] outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-6 overflow-x-auto no-scrollbar border-b border-slate-100">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-3 border-b-2 font-semibold text-sm whitespace-nowrap transition-colors",
                  activeTab === tab.id ? "border-[#2f7f33] text-[#2f7f33]" : "border-transparent text-slate-500"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        {/* Active Bookings Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#2f7f33] animate-pulse"></div>
            <h2 className="font-bold text-lg">
              {activeTab === 'active' ? `Active Bookings (${filteredBookings.length})` : 
               activeTab === 'upcoming' ? 'Upcoming Bookings' : 'Past Bookings'}
            </h2>
          </div>

          <div className="space-y-4">
            {filteredBookings.map((booking, i) => (
              <motion.div 
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{booking.equipmentName}</h3>
                    <p className="text-xs text-slate-500 mt-1 uppercase font-semibold tracking-wide">Booked by: {booking.farmerName}</p>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                    booking.status === 'active' ? "bg-[#2f7f33]/10 text-[#2f7f33]" :
                    booking.status === 'upcoming' ? "bg-blue-100 text-blue-600" :
                    "bg-slate-100 text-slate-500"
                  )}>
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={16} className="text-slate-400" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={16} className="text-slate-400" />
                    <span>{booking.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={16} className="text-[#2f7f33]" />
                    <span className="truncate">{booking.location}</span>
                  </div>
                </div>

                {booking.status === 'active' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                      className="bg-[#2f7f33] text-white text-sm font-semibold py-2.5 rounded-lg"
                    >
                      View Full Details
                    </button>
                    <button 
                      onClick={() => navigate(`/live-tracking/${booking.id}`)}
                      className="border border-[#2f7f33] text-[#2f7f33] text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1"
                    >
                      <Navigation size={14} /> Track Vehicle
                    </button>
                  </div>
                ) : booking.status === 'completed' ? (
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-50">
                    <span className="text-xs text-slate-500 italic">{booking.date}</span>
                    <span className="text-[#2f7f33] font-bold text-sm">₹{booking.earnings?.toLocaleString()} earned</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => navigate(`/bookings/${booking.id}`)}
                    className="w-full bg-slate-100 text-slate-700 text-sm font-semibold py-2.5 rounded-lg"
                  >
                    View Details
                  </button>
                )}
              </motion.div>
            ))}

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">No bookings found for this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
