import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Activity, Battery, Fuel, ArrowLeft, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Equipment } from '../types';

import { cn } from '../utils';

interface MachineryProps {
  machinery: Equipment[];
}

export default function Machinery({ machinery }: MachineryProps) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Tractor', 'Harvester', 'Drone'];

  const filteredMachinery = machinery.filter(item => {
    if (activeFilter === 'All') return true;
    return item.type === activeFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8f6]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-white/80 backdrop-blur-md p-4 justify-between border-b border-[#2f7f33]/10">
        <div 
          onClick={() => navigate('/')}
          className="text-[#2f7f33] flex size-10 items-center justify-center rounded-lg bg-[#2f7f33]/10 cursor-pointer"
        >
          <ArrowLeft size={24} />
        </div>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">My Vehicles</h2>
        <div className="flex w-10 items-center justify-end">
          <button 
            onClick={() => navigate('/add-vehicle')}
            className="flex size-10 items-center justify-center rounded-lg bg-[#2f7f33] text-white shadow-lg shadow-[#2f7f33]/20"
          >
            <Plus size={24} />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white px-4 border-b border-[#2f7f33]/10 sticky top-[73px] z-40">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "flex flex-col items-center justify-center border-b-2 pb-3 pt-4 whitespace-nowrap transition-all",
                activeFilter === filter ? "border-[#2f7f33] text-[#2f7f33]" : "border-transparent text-slate-500"
              )}
            >
              <p className={cn("text-sm", activeFilter === filter ? "font-bold" : "font-semibold")}>
                {filter === 'All' ? 'All Fleet' : filter + 's'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Fleet List */}
      <main className="flex-1 p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredMachinery.map((item, i) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "flex flex-col rounded-xl border border-[#2f7f33]/10 bg-white shadow-sm overflow-hidden",
                item.status === 'maintenance' && "opacity-90"
              )}
            >
              <div 
                className="relative w-full aspect-[16/9] bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url("${item.image}")` }}
              >
                <div className="absolute top-3 right-3">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm",
                    item.status === 'available' ? "bg-green-500 text-white" :
                    item.status === 'booked' ? "bg-blue-500 text-white" :
                    "bg-orange-500 text-white"
                  )}>
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[#2f7f33] text-[10px] font-bold uppercase tracking-widest">{item.type}</p>
                    <h3 className="text-slate-900 text-lg font-bold">{item.name}</h3>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={14} />
                    <p className="text-xs font-medium">{item.location}</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    {item.type === 'Drone' ? <Battery size={14} /> : <Fuel size={14} />}
                    <p className="text-xs font-medium">
                      {item.type === 'Drone' ? `Battery: ${item.batteryLevel}%` : `Fuel Level: ${item.fuelLevel}%`}
                      {item.nextService && ` • Next Service: ${item.nextService}`}
                      {item.lastUsed && ` • Last used: ${item.lastUsed}`}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/machinery/${item.id}`)}
                  className="w-full flex cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#2f7f33] text-white text-sm font-bold shadow-sm active:scale-95 transition-transform"
                >
                  Manage Machine
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredMachinery.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">No {activeFilter.toLowerCase()}s found in your fleet.</p>
          </div>
        )}

        {/* Spacer for bottom nav */}
        <div className="h-20"></div>
      </main>
    </div>
  );
}
