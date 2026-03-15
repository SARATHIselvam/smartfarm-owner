import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Download, TrendingUp, TrendingDown, ChevronRight, DollarSign, Clock, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { toast, Toaster } from 'sonner';

export default function EarningsAnalytics() {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    toast.success('Withdrawal request initiated!', {
      description: '$500.00 will be credited to your bank account within 24 hours.',
    });
  };

  const handleExport = () => {
    toast.info('Generating report...', {
      description: 'Your earnings report for October 2023 is being prepared.',
    });
    setTimeout(() => {
      toast.success('Report ready!', {
        description: 'Earnings_Report_Oct_23.pdf has been downloaded.',
      });
    }, 2000);
  };

  const handleCalendar = () => {
    toast('Select Date Range', {
      description: 'Custom date range selection is coming soon in the next update!',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Toaster position="top-center" />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Earnings & Analytics</h1>
        </div>
        <button 
          onClick={handleCalendar}
          className="p-2 hover:bg-slate-100 rounded-full"
        >
          <Calendar size={24} className="text-slate-600" />
        </button>
      </header>

      <main className="p-4 pb-24">
        {/* Total Earnings Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-3xl p-6 text-white mb-6 relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Earnings (This Month)</p>
            <div className="flex items-end gap-3 mb-4">
              <h2 className="text-4xl font-bold">$4,280.50</h2>
              <div className="flex items-center text-green-400 text-sm font-bold mb-1">
                <TrendingUp size={16} />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleExport}
                className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={14} />
                Export Report
              </button>
              <button 
                onClick={handleWithdraw}
                className="flex-1 bg-[#2f7f33] py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <DollarSign size={14} />
                Withdraw
              </button>
            </div>
          </div>
          {/* Abstract Background Pattern */}
          <div className="absolute -right-10 -bottom-10 size-40 bg-[#2f7f33]/20 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
              <Activity size={20} />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Bookings</p>
            <p className="text-xl font-bold text-slate-900">24</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="size-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-3">
              <Clock size={20} />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Avg. Hours/Day</p>
            <p className="text-xl font-bold text-slate-900">6.8h</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Earnings Trend</h3>
            <select className="text-xs font-bold text-[#2f7f33] bg-[#2f7f33]/5 px-2 py-1 rounded outline-none border-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between gap-2">
            {[40, 65, 45, 90, 55, 75, 60].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  className="w-full bg-[#2f7f33]/20 rounded-t-lg relative group"
                >
                  <div className="absolute inset-0 bg-[#2f7f33] rounded-t-lg scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
                </motion.div>
                <span className="text-[10px] font-bold text-slate-400">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Machinery */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900">Top Performing Machinery</h3>
            <button 
              onClick={() => navigate('/machinery')}
              className="text-[#2f7f33] text-sm font-bold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'John Deere Tractor', earnings: '$1,240', bookings: 12, trend: 'up' },
              { name: 'Mahindra Combine', earnings: '$980', bookings: 8, trend: 'up' },
              { name: 'Kubota Mini Excavator', earnings: '$750', bookings: 15, trend: 'down' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#2f7f33]">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.bookings} bookings this month</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{item.earnings}</p>
                  <div className={`flex items-center justify-end text-[10px] font-bold ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span>{item.trend === 'up' ? '+5%' : '-2%'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Recent Transactions</h3>
          <div className="space-y-1">
            {[
              { title: 'Booking #BK-9921', date: 'Oct 24, 2023', amount: '+$120.00', status: 'Completed' },
              { title: 'Booking #BK-9812', date: 'Oct 23, 2023', amount: '+$85.00', status: 'Completed' },
              { title: 'Withdrawal to Bank', date: 'Oct 22, 2023', amount: '-$500.00', status: 'Pending' },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-full flex items-center justify-center ${t.amount.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                    {t.amount.startsWith('+') ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.title}</p>
                    <p className="text-xs text-slate-500">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${t.amount.startsWith('+') ? 'text-green-600' : 'text-slate-900'}`}>{t.amount}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => toast.info('Transaction history is being loaded...')}
            className="w-full mt-4 py-3 text-slate-500 text-sm font-bold flex items-center justify-center gap-1 hover:text-[#2f7f33] transition-colors"
          >
            View Transaction History
            <ChevronRight size={16} />
          </button>
        </div>
      </main>
    </div>
  );
}
