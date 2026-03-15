import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Phone, Calendar, Clock, MapPin, History, Map as MapIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_BOOKINGS } from '../mockData';
import { toast, Toaster } from 'sonner';

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = MOCK_BOOKINGS.find(b => b.id === id) || MOCK_BOOKINGS[0];

  const handleAction = (action: string) => {
    if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: `Booking for ${booking.equipmentName}`,
          text: `Check out this booking for ${booking.equipmentName} by ${booking.farmerName}`,
          url: window.location.href,
        }).catch(() => {
          toast.error('Sharing failed');
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
      return;
    }
    
    if (action.startsWith('Calling')) {
      window.location.href = `tel:+919876543210`;
      return;
    }

    if (action === 'Map view') {
      const query = encodeURIComponent(booking.location);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
      return;
    }

    toast.info(`${action} feature coming soon!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f6f6]">
      <Toaster position="top-center" />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#f8f6f6] border-b border-slate-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Booking Details</h1>
        </div>
        <button onClick={() => handleAction('More options')} className="p-2 hover:bg-slate-100 rounded-full">
          <MoreVertical size={24} className="text-slate-500" />
        </button>
      </header>

      <main className="pb-24">
        {/* Equipment Card */}
        <div className="p-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4"
          >
            <div className="w-24 h-24 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
              <img 
                alt="Equipment" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIPXscQRD9EfAQMtiqCggZXvQCEkI_su2tkcXIhdkWiCq3vGEpM6dBlboxqmVZ9Nsx9N0YuWLiJH54R2lKjn3n26M7wv3oPsoXTeGPyvAFWbWY6Igw-TCXOW7ORAC66fylgUgrGfhUKqSAzh740oA7hVFuCXw27igcuL1EPtdoQ8tSvO6eaUuAnwOqe4jjBp-urpMJOaXzB3gPqz5rmIJavTzs9vT7fcdqHt2KSFNfHo9p0t5jimmOzjFkWmTNYMd7NPxmGDuxxvc" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#2f7f33] mb-1">Equipment</p>
                  <h2 className="text-lg font-bold">{booking.equipmentName}</h2>
                  <p className="text-sm text-slate-500">{booking.equipmentId}</p>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {booking.status}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Usage Tracker */}
        {booking.status === 'active' && (
          <div className="px-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
              <p className="text-sm font-medium text-slate-500 mb-4">Remaining Usage Duration</p>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle className="text-slate-100" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-[#2f7f33]" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="91.1" strokeWidth="8"></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold">{booking.usageRemaining}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">of {booking.usageTotal}</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate(`/live-tracking/${booking.id}`)}
                  className="flex items-center justify-center gap-2 bg-[#2f7f33] text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity active:scale-95 transition-transform"
                >
                  <MapIcon size={18} />
                  View Live
                </button>
                <button 
                  onClick={() => handleAction('View Logs')}
                  className="flex items-center justify-center gap-2 bg-[#2f7f33]/10 text-[#2f7f33] font-bold py-3 px-4 rounded-xl hover:bg-[#2f7f33]/20 transition-colors active:scale-95 transition-transform"
                >
                  <History size={18} />
                  Logs
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Farmer Details */}
        <div className="px-4 mb-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1 mb-3">Farmer Details</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img 
                  alt="Farmer" 
                  className="w-full h-full object-cover" 
                  src={booking.farmerAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuA9etPJTbmB8j2tuKAnRjvUxBE9UFXCM8PYOYk8zPt1iVH6uAw0fojICd4GzxxRPfSJJmoS5mwCVMQ-OdwpaY-TnIsC6QI_ovPVA_eyOG10trQbt9U31M1Ys3GlBTmQOIkBQDg4ChBE-Le9bgu0lvZLCMUJ-LzUqPIqMfX5iNjuEpY-jSHH7JXaRl_B8Zh2EuwuUyjVE1bDRkh-0AugxhfIaLCXCEgdHvzBpkI9G4UwOlt7QnGo6b4AaOexSfVEgKv99rq7wMo-aJo"} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-xs text-slate-500">Booked by</p>
                <p className="font-bold">{booking.farmerName}</p>
              </div>
            </div>
            <button 
              onClick={() => handleAction(`Calling ${booking.farmerName}`)}
              className="bg-[#2f7f33]/10 p-2.5 rounded-full text-[#2f7f33] hover:bg-[#2f7f33]/20 transition-colors active:scale-95 transition-transform"
            >
              <Phone size={20} />
            </button>
          </div>
        </div>

        {/* Booking Info */}
        <div className="px-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1 mb-3">Booking Information</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="p-2 bg-slate-50 rounded-lg text-[#2f7f33]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Date</p>
              <p className="font-bold">{booking.date}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="p-2 bg-slate-50 rounded-lg text-[#2f7f33]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Time Slot</p>
              <p className="font-bold">{booking.timeSlot}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="p-2 bg-slate-50 rounded-lg text-[#2f7f33]">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="font-bold">{booking.location}</p>
              <p onClick={() => handleAction('Map view')} className="text-sm text-slate-400 mt-1 cursor-pointer">View on Map</p>
            </div>
          </div>
        </div>

        <div className="p-4 mt-4">
          <button 
            onClick={() => navigate(`/vehicle-returned/${booking.id}`)}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-95 transition-transform"
          >
            Mark as Completed
          </button>
        </div>
      </main>
    </div>
  );
}
