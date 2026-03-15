import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, MoreVertical, Edit, Calendar, MapPin, History, ChevronRight, BadgeCheck, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Equipment } from '../types';
import { toast, Toaster } from 'sonner';

interface VehicleDetailsProps {
  machinery: Equipment[];
  onUpdate: (updated: Equipment) => void;
}

export default function VehicleDetails({ machinery, onUpdate }: VehicleDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = machinery.find(e => e.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState<Equipment | null>(item || null);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-slate-500 mb-4">Vehicle not found</p>
        <button onClick={() => navigate('/machinery')} className="text-[#2f7f33] font-bold">Back to Machinery</button>
      </div>
    );
  }

  const handleSave = () => {
    if (editedItem) {
      onUpdate(editedItem);
      setIsEditing(false);
      toast.success('Vehicle details updated successfully');
    }
  };

  const handleAction = (action: string) => {
    if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: item.name,
          text: `Check out this ${item.name} (${item.model}) available on SmartFarm.`,
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

    if (action === 'Map view') {
      const query = encodeURIComponent(item.location);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
      return;
    }

    toast.info(`${action} feature coming soon!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Toaster position="top-center" />
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-white/80 backdrop-blur-md p-4 justify-between border-b border-[#2f7f33]/10">
        <button onClick={() => navigate(-1)} className="text-slate-900 flex size-10 items-center justify-center hover:bg-[#2f7f33]/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-slate-900 text-lg font-bold leading-tight flex-1 ml-2">Vehicle Details</h1>
        <div className="flex items-center gap-1">
          <button onClick={() => handleAction('Share')} className="flex size-10 items-center justify-center rounded-full hover:bg-[#2f7f33]/10 text-slate-900">
            <Share2 size={20} />
          </button>
          <button onClick={() => handleAction('More options')} className="flex size-10 items-center justify-center rounded-full hover:bg-[#2f7f33]/10 text-slate-900">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      <main className="flex-grow pb-24">
        {/* Hero Image Section */}
        <div className="p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#2f7f33]/5 shadow-md"
          >
            <img 
              alt={item.name} 
              className="w-full h-full object-cover" 
              src={item.image} 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Basic Info */}
        <div className="px-4 mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{item.name}</h2>
              <p className="text-[#2f7f33] font-semibold">{item.model}</p>
            </div>
            {item.verified && (
              <div className="flex items-center gap-1 bg-[#2f7f33]/10 px-2 py-1 rounded text-[#2f7f33] text-sm font-bold">
                <BadgeCheck size={16} />
                <span>Verified</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <button 
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-[#2f7f33] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm shadow-[#2f7f33]/30 active:scale-95 transition-transform"
            >
              <Edit size={18} />
              Edit Details
            </button>
            <button 
              onClick={() => navigate('/bookings')}
              className="flex-1 bg-white border border-[#2f7f33]/30 text-[#2f7f33] font-bold py-3 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Calendar size={18} />
              View Bookings
            </button>
          </div>
        </div>

        {/* Details List */}
        <div className="px-4 space-y-4 mb-8">
          <div className="bg-[#2f7f33]/5 rounded-xl p-4 grid grid-cols-2 gap-y-4">
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs font-medium uppercase">Vehicle Number</span>
              <span className="text-slate-900 font-bold">{item.vehicleNumber}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs font-medium uppercase">RC Number</span>
              <span className="text-slate-900 font-bold">{item.rcNumber}</span>
            </div>
            <div className="col-span-2 flex flex-col pt-2 border-t border-[#2f7f33]/10">
              <span className="text-slate-500 text-xs font-medium uppercase mb-1">Current Location</span>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#2f7f33]" />
                <span className="text-slate-900 font-medium">{item.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Details */}
        <div className="px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-900">Maintenance Details</h3>
            <button onClick={() => handleAction('Update Log')} className="text-[#2f7f33] text-sm font-bold">Update Log</button>
          </div>
          <div className="bg-white border border-[#2f7f33]/10 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 grid grid-cols-2 gap-4 border-b border-[#2f7f33]/5">
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-medium uppercase mb-1">Last Service</span>
                <span className="text-slate-900 font-bold text-sm">Engine Oil Change</span>
                <span className="text-[#2f7f33] text-xs font-medium">Oct 10, 2023</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-medium uppercase mb-1">Next Service Due</span>
                <span className="text-orange-600 font-bold text-sm">In 12 days</span>
                <span className="text-slate-500 text-xs">~45 operating hours</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-[#2f7f33]/10 flex items-center justify-center text-[#2f7f33]">
                    <History size={18} />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">Maintenance History</span>
                </div>
                <button onClick={() => handleAction('View all records')} className="text-[#2f7f33] text-sm font-bold flex items-center gap-1">
                  View All Records
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Management */}
        <div className="px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-900">Availability Management</h3>
            <button onClick={() => handleAction('Edit Schedule')} className="text-[#2f7f33] text-sm font-bold">Edit Schedule</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {/* Today */}
            <div className="min-w-[100px] bg-[#2f7f33] text-white p-3 rounded-xl flex flex-col items-center shadow-lg shadow-[#2f7f33]/20">
              <span className="text-xs opacity-80">Today</span>
              <span className="text-lg font-bold">24 Oct</span>
              <div className="mt-2 text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Available</div>
            </div>
            {/* Tomorrow */}
            <div className="min-w-[100px] bg-white border border-[#2f7f33]/20 p-3 rounded-xl flex flex-col items-center">
              <span className="text-xs text-slate-500">Tomorrow</span>
              <span className="text-lg font-bold text-slate-900">25 Oct</span>
              <div className="mt-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase">Booked</div>
            </div>
            {/* Day 3 */}
            <div className="min-w-[100px] bg-white border border-[#2f7f33]/20 p-3 rounded-xl flex flex-col items-center">
              <span className="text-xs text-slate-500">Wed</span>
              <span className="text-lg font-bold text-slate-900">26 Oct</span>
              <div className="mt-2 text-[10px] bg-[#2f7f33]/10 text-[#2f7f33] px-2 py-0.5 rounded-full font-bold">Available</div>
            </div>
          </div>
        </div>

        {/* Map View Placeholder */}
        <div className="px-4" onClick={() => handleAction('Map view')}>
          <div className="w-full h-40 bg-slate-200 rounded-xl relative overflow-hidden cursor-pointer">
            <img 
              alt="Map" 
              className="w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUCzGJg9yiHJKO1wGlc06CDF8N3JNuAbWTG3I1-cW085B2sQ2kqWWxcnwJNFjfo_KP3f3xvdV5-DGjRiqTCco8nstEiKUUAexvU3P0UZxiVVeYEyOXQLF1xR8rDFv5_RC7yYMd7pbuAK7Y-bDfhV2JaEFKyLFnTEnzOCGd90H4UXPgPedPNlawm2-swMw5ik9tmC538Rqb8Bxh2Kvd3NEuPo0nK9cE14g7pr-McTjZrpM9O2YX0Nk16FrFXis2UhvMbcmd4ThU8KcO" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#2f7f33] text-white p-2 rounded-full shadow-lg">
                <MapPin size={24} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Edit Vehicle</h3>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Vehicle Name</label>
                  <input 
                    type="text" 
                    value={editedItem?.name}
                    onChange={(e) => setEditedItem(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Model</label>
                  <input 
                    type="text" 
                    value={editedItem?.model}
                    onChange={(e) => setEditedItem(prev => prev ? { ...prev, model: e.target.value } : null)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    value={editedItem?.location}
                    onChange={(e) => setEditedItem(prev => prev ? { ...prev, location: e.target.value } : null)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Vehicle No.</label>
                    <input 
                      type="text" 
                      value={editedItem?.vehicleNumber}
                      onChange={(e) => setEditedItem(prev => prev ? { ...prev, vehicleNumber: e.target.value } : null)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">RC No.</label>
                    <input 
                      type="text" 
                      value={editedItem?.rcNumber}
                      onChange={(e) => setEditedItem(prev => prev ? { ...prev, rcNumber: e.target.value } : null)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={handleSave}
                  className="w-full bg-[#2f7f33] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#2f7f33]/20 active:scale-95 transition-transform"
                >
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
