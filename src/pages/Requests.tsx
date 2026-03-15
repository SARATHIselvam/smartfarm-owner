import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, User, Tractor, MapPin, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Request } from '../types';

interface RequestsProps {
  requests: Request[];
  onUpdateStatus: (id: string, status: 'accepted' | 'declined') => void;
}

export default function Requests({ requests, onUpdateStatus }: RequestsProps) {
  const navigate = useNavigate();

  const urgentRequests = requests.filter(r => r.isUrgent);
  const recentRequests = requests.filter(r => !r.isUrgent);

  const handleApprove = (e: React.MouseEvent, id: string, farmerName: string) => {
    e.stopPropagation();
    onUpdateStatus(id, 'accepted');
    toast.success('Request Approved!', {
      description: `You have accepted the request from ${farmerName}.`,
    });
  };

  const handleDecline = (e: React.MouseEvent, id: string, farmerName: string) => {
    e.stopPropagation();
    onUpdateStatus(id, 'declined');
    toast.error('Request Declined', {
      description: `The request from ${farmerName} has been declined.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8f6]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#2f7f33]/10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#2f7f33]/10 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-slate-900" />
          </button>
          <h1 className="text-xl font-bold tracking-tight">eBooking Requests</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Emergency Section */}
        {urgentRequests.length > 0 && (
          <section className="px-4 pt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold flex items-center gap-2 text-red-600">
                <AlertCircle size={20} fill="currentColor" className="text-red-600" />
                Emergency Requests
              </h2>
              <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-600 rounded-full">Action Required</span>
            </div>
            <div className="space-y-4">
              {urgentRequests.map((req) => (
                <motion.div 
                  key={req.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white border-2 border-red-500/30 rounded-xl overflow-hidden shadow-sm cursor-pointer"
                  onClick={() => navigate(`/requests/${req.id}`)}
                >
                  <div className="p-4 flex gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold tracking-wider text-red-500 uppercase">URGENT • BREAKDOWN</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{req.farmerName}</h3>
                      <div className="flex flex-col gap-1 text-sm text-slate-600">
                        <p className="flex items-center gap-1">
                          <Tractor size={14} className="text-slate-400" />
                          {req.equipmentName}
                        </p>
                        <p className="flex items-center gap-1">
                          <MapPin size={14} className="text-slate-400" />
                          {req.location}
                        </p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        {req.status === 'accepted' ? (
                          <div className="flex-1 bg-green-50 text-[#2f7f33] py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                            <CheckCircle2 size={16} />
                            Accepted
                          </div>
                        ) : req.status === 'declined' ? (
                          <div className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                            <XCircle size={16} />
                            Denied
                          </div>
                        ) : (
                          <button 
                            onClick={(e) => handleApprove(e, req.id, req.farmerName)}
                            className="flex-1 bg-[#2f7f33] text-white py-2 rounded-lg text-sm font-bold shadow-sm shadow-[#2f7f33]/20 hover:opacity-90 transition-opacity"
                          >
                            Accept Now
                          </button>
                        )}
                      </div>
                    </div>
                    <div 
                      className="w-24 h-24 rounded-lg bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJKlJhXE5_UmGrVQZ6dH5u7HwtR-ctAWXa01NmPTdSOzTohWoGzGlhzxzVOrGctsQUf5ci7SI-dYBWx4lFaNJtHvEZuMVRfXIfZGog9t3P6VK-npyg-gHCeBZXCs3L3va_DCbcpjUawHTj8ciY1-KYjWohQb-EDmJWP1mWFTWTPuuwu3ay2smk4xS34JCQE5D_bOBQAXN0XsptOJymtMC8M7spIzvSNKR9hRH39kq-M3sa51LdDKw7V1fXsMPjkJZvhd9yWhLJvK0")` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Requests Section */}
        <section className="px-4 mt-8">
          <h2 className="text-lg font-bold mb-4">Recent Requests</h2>
          <div className="space-y-4">
            {recentRequests.map((req) => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl border border-[#2f7f33]/10 p-4 shadow-sm cursor-pointer"
                onClick={() => navigate(`/requests/${req.id}`)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#2f7f33]/10 flex items-center justify-center">
                      {req.farmerAvatar ? (
                        <img src={req.farmerAvatar} alt={req.farmerName} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User size={24} className="text-[#2f7f33]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{req.farmerName}</h3>
                      <p className="text-xs text-slate-500">Requested 2h ago</p>
                    </div>
                  </div>
                  {req.status === 'pending' && (
                    <span className="text-xs font-medium px-2 py-1 bg-[#2f7f33]/10 text-[#2f7f33] rounded-full">New</span>
                  )}
                  {req.status === 'accepted' && (
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-[#2f7f33] rounded-full">Accepted</span>
                  )}
                  {req.status === 'declined' && (
                    <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-600 rounded-full">Denied</span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm bg-slate-50 p-3 rounded-lg">
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold">Equipment</p>
                    <p className="font-semibold truncate">{req.equipmentName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold">Location</p>
                    <p className="font-semibold truncate">{req.location}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {req.status === 'accepted' ? (
                    <div className="flex-1 bg-green-50 text-[#2f7f33] py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} />
                      Accepted
                    </div>
                  ) : req.status === 'declined' ? (
                    <div className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                      <XCircle size={16} />
                      Denied
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={(e) => handleApprove(e, req.id, req.farmerName)}
                        className="flex-1 bg-[#2f7f33]/10 text-[#2f7f33] py-2 rounded-lg text-sm font-bold hover:bg-[#2f7f33]/20 transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={(e) => handleDecline(e, req.id, req.farmerName)}
                        className="flex-1 border border-slate-200 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
