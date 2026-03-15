import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, User, Phone, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Request } from '../types';

interface RequestDetailsProps {
  requests: Request[];
  onUpdateStatus: (id: string, status: 'accepted' | 'declined') => void;
}

export default function RequestDetails({ requests, onUpdateStatus }: RequestDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = requests.find(r => r.id === id) || requests[0];

  const handleApprove = () => {
    onUpdateStatus(request.id, 'accepted');
    toast.success('Request Approved!', {
      description: `You have accepted the request from ${request.farmerName}.`,
    });
  };

  const handleDecline = () => {
    onUpdateStatus(request.id, 'declined');
    toast.error('Request Declined', {
      description: `The request from ${request.farmerName} has been declined.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Request Details</h1>
      </header>

      <main className="p-4 pb-32">
        {/* Status Banner */}
        <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
          request.status === 'accepted' ? 'bg-green-50 text-[#2f7f33] border border-green-100' :
          request.status === 'declined' ? 'bg-red-50 text-red-700 border border-red-100' :
          request.isUrgent ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-[#2f7f33]/5 text-[#2f7f33] border border-[#2f7f33]/10'
        }`}>
          {request.status === 'accepted' ? <CheckCircle2 size={24} /> :
           request.status === 'declined' ? <XCircle size={24} /> :
           request.isUrgent ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
          <div>
            <p className="font-bold text-sm uppercase tracking-wider">
              {request.status === 'accepted' ? 'Request Accepted' :
               request.status === 'declined' ? 'Request Denied' :
               request.isUrgent ? 'Emergency Request' : 'Standard Request'}
            </p>
            <p className="text-xs opacity-80">
              {request.status === 'pending' ? 'Received Just Now' : `Status updated just now`}
            </p>
          </div>
        </div>

        {/* Equipment Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Requested Equipment</h3>
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-xl bg-slate-100 overflow-hidden">
              <img 
                alt="Equipment" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIPXscQRD9EfAQMtiqCggZXvQCEkI_su2tkcXIhdkWiCq3vGEpM6dBlboxqmVZ9Nsx9N0YuWLiJH54R2lKjn3n26M7wv3oPsoXTeGPyvAFWbWY6Igw-TCXOW7ORAC66fylgUgrGfhUKqSAzh740oA7hVFuCXw27igcuL1EPtdoQ8tSvO6eaUuAnwOqe4jjBp-urpMJOaXzB3gPqz5rmIJavTzs9vT7fcdqHt2KSFNfHo9p0t5jimmOzjFkWmTNYMd7NPxmGDuxxvc" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="font-bold text-lg">{request.equipmentName}</p>
              <p className="text-sm text-slate-500">Model: JD-5050D</p>
            </div>
          </div>
        </div>

        {/* Farmer Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Farmer Information</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-slate-200 overflow-hidden">
                <img 
                  alt="Farmer" 
                  className="w-full h-full object-cover" 
                  src={request.farmerAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXu9etPJTbmB8j2tuKAnRjvUxBE9UFXCM8PYOYk8zPt1iVH6uAw0fojICd4GzxxRPfSJJmoS5mwCVMQ-OdwpaY-TnIsC6QI_ovPVA_eyOG10trQbt9U31M1Ys3GlBTmQOIkBQDg4ChBE-Le9bgu0lvZLCMUJ-LzUqPIqMfX5iNjuEpY-jSHH7JXaRl_B8Zh2EuwuUyjVE1bDRkh-0AugxhfIaLCXCEgdHvzBpkI9G4UwOlt7QnGo6b4AaOexSfVEgKv99rq7wMo-aJo"} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-bold">{request.farmerName}</p>
                <div className="flex items-center gap-1 text-[#2f7f33]">
                  <CheckCircle2 size={12} fill="currentColor" className="text-white" />
                  <span className="text-[10px] font-bold uppercase">Verified Farmer</span>
                </div>
              </div>
            </div>
            <button className="p-3 bg-[#2f7f33]/10 rounded-full text-[#2f7f33]">
              <Phone size={20} />
            </button>
          </div>
        </div>

        {/* Schedule & Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-slate-50 rounded-lg text-[#2f7f33]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Date</p>
              <p className="font-bold">October 28, 2023</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-slate-50 rounded-lg text-[#2f7f33]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Time Slot</p>
              <p className="font-bold">08:00 AM - 12:00 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-slate-50 rounded-lg text-[#2f7f33]">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Location</p>
              <p className="font-bold">{request.location}</p>
              <p className="text-xs text-slate-400 mt-1">~4.2 km from your hub</p>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Message from Farmer</h3>
          <p className="text-sm text-slate-600 leading-relaxed italic">
            "Need the tractor for urgent harvesting in the north field. The soil is perfect today."
          </p>
        </div>
      </main>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex gap-4 max-w-md mx-auto z-50">
        {request.status === 'accepted' ? (
          <div className="w-full bg-green-50 text-[#2f7f33] font-bold py-4 rounded-xl flex items-center justify-center gap-2 border border-green-100">
            <CheckCircle2 size={24} />
            Request Accepted
          </div>
        ) : request.status === 'declined' ? (
          <div className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 border border-red-100">
            <XCircle size={24} />
            Request Denied
          </div>
        ) : (
          <>
            <button 
              onClick={handleDecline}
              className="flex-1 border-2 border-red-100 text-red-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition-colors active:scale-95"
            >
              <XCircle size={20} />
              Decline
            </button>
            <button 
              onClick={handleApprove}
              className="flex-[2] bg-[#2f7f33] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#2f7f33]/20 hover:opacity-90 transition-opacity active:scale-95"
            >
              <CheckCircle2 size={20} />
              Approve Request
            </button>
          </>
        )}
      </div>
    </div>
  );
}
