import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Camera, ShieldCheck, Star, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_BOOKINGS } from '../mockData';

export default function VehicleReturned() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = MOCK_BOOKINGS.find(b => b.id === id) || MOCK_BOOKINGS[0];
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 flex items-center gap-4 border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Vehicle Return</h1>
      </header>

      <main className="flex-1 p-4 pb-32 overflow-y-auto">
        {/* Summary Card */}
        <div className="bg-[#2f7f33]/5 rounded-2xl p-6 mb-8 border border-[#2f7f33]/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="size-12 rounded-xl bg-white flex items-center justify-center text-[#2f7f33] shadow-sm">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Return Checklist</h2>
              <p className="text-sm text-slate-500">Please verify the vehicle condition</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Booking ID</span>
              <span className="font-bold">#BK-{booking.id}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Equipment</span>
              <span className="font-bold">{booking.equipmentName}</span>
            </div>
          </div>
        </div>

        {/* Condition Photos */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900">Vehicle Photos</h3>
            <span className="text-xs text-slate-400">Required (Min 2)</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
              <Camera size={32} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-400">Front View</span>
            </div>
            <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
              <Camera size={32} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-400">Side View</span>
            </div>
          </div>
        </div>

        {/* Condition Checklist */}
        <div className="mb-8 space-y-4">
          <h3 className="font-bold text-slate-900">Condition Checklist</h3>
          {[
            'No external body damage',
            'Engine and mechanics working fine',
            'Fuel/Battery level as expected',
            'Interior/Cabin is clean'
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <input type="checkbox" className="size-5 rounded border-slate-300 text-[#2f7f33] focus:ring-[#2f7f33]" />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </label>
          ))}
        </div>

        {/* Farmer Rating */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-900 mb-4">Rate Farmer Experience</h3>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => setRating(star)}
                className={cn(
                  "transition-all active:scale-90",
                  rating >= star ? "text-yellow-400" : "text-slate-200"
                )}
              >
                <Star size={40} fill="currentColor" />
              </button>
            ))}
          </div>
          <textarea 
            className="w-full mt-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#2f7f33] focus:border-transparent outline-none min-h-[100px]"
            placeholder="Any comments about the farmer or vehicle usage?"
          ></textarea>
        </div>

        {/* Report Issue Link */}
        <div 
          onClick={() => navigate(`/report-issue/${booking.id}`)}
          className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl cursor-pointer hover:bg-red-100 transition-colors mb-8"
        >
          <Info size={20} />
          <span className="text-sm font-bold">Found an issue or damage? Report it here</span>
        </div>
      </main>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100">
        <button 
          onClick={() => navigate('/return-success')}
          className="w-full bg-[#2f7f33] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#2f7f33]/20 hover:opacity-90 transition-opacity"
        >
          Confirm Return & Complete Booking
        </button>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
