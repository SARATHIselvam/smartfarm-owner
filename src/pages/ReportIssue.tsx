import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Camera, AlertTriangle, MessageSquare, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReportIssue() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 flex items-center gap-4 border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Report Issue</h1>
      </header>

      <main className="flex-1 p-4 pb-32 overflow-y-auto">
        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="text-red-600 shrink-0" size={24} />
          <div>
            <p className="text-red-800 font-bold text-sm">Damage or Technical Issue</p>
            <p className="text-red-600 text-xs mt-1">Please provide clear photos and details to help us process your claim or maintenance request.</p>
          </div>
        </div>

        {/* Issue Type */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Issue Category</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Body Damage', icon: ShieldAlert },
              { label: 'Engine Issue', icon: ShieldAlert },
              { label: 'Tire/Wheel', icon: ShieldAlert },
              { label: 'Other', icon: MessageSquare },
            ].map((type) => (
              <button key={type.label} className="flex flex-col items-center gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-red-200 hover:bg-red-50 transition-all group">
                <type.icon className="text-slate-400 group-hover:text-red-500" size={24} />
                <span className="text-xs font-bold text-slate-600 group-hover:text-red-700">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo Evidence */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Photo Evidence</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-100">
              <Camera size={24} className="text-slate-400" />
            </div>
            <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-100">
              <Camera size={24} className="text-slate-400" />
            </div>
            <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-100">
              <Camera size={24} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Description</h3>
          <textarea 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none min-h-[150px]"
            placeholder="Describe the issue in detail..."
          ></textarea>
        </div>

        {/* Urgency */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Urgency Level</h3>
          <div className="flex gap-3">
            {['Low', 'Medium', 'High'].map((level) => (
              <button key={level} className="flex-1 py-3 rounded-xl font-bold text-sm bg-slate-50 border border-slate-100 text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all">
                {level}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100">
        <button 
          onClick={() => navigate('/return-success')}
          className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 hover:opacity-90 transition-opacity"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}
