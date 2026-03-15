import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Share2, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { toast, Toaster } from 'sonner';

export default function ReturnSuccess() {
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    toast.success(`${action} successful!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white items-center justify-center p-6 text-center">
      <Toaster position="top-center" />
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="mb-8"
      >
        <div className="size-32 bg-green-100 rounded-full flex items-center justify-center text-[#2f7f33] mx-auto mb-6">
          <CheckCircle2 size={80} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Return Successful!</h1>
        <p className="text-slate-500 max-w-xs mx-auto">The vehicle has been successfully returned and the booking is now marked as completed.</p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm space-y-4"
      >
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-500 text-sm">Earnings Added</span>
            <span className="text-2xl font-bold text-[#2f7f33]">+$120.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Transaction ID</span>
            <span className="font-bold">#TXN-99281</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleAction('Receipt download')}
            className="flex items-center justify-center gap-2 py-4 bg-slate-100 rounded-xl font-bold text-slate-700 hover:bg-slate-200 transition-colors active:scale-95 transition-transform"
          >
            <Download size={20} />
            Receipt
          </button>
          <button 
            onClick={() => handleAction('Sharing')}
            className="flex items-center justify-center gap-2 py-4 bg-slate-100 rounded-xl font-bold text-slate-700 hover:bg-slate-200 transition-colors active:scale-95 transition-transform"
          >
            <Share2 size={20} />
            Share
          </button>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-[#2f7f33] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#2f7f33]/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95 transition-transform"
        >
          Back to Dashboard
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  );
}
