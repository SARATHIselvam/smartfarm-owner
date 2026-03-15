import { useNavigate } from 'react-router-dom';
import { TrendingUp, LayoutDashboard, BarChart3, CalendarCheck, User, PlusCircle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Equipment } from '../types';

import { cn } from '../utils';

interface DashboardProps {
  machinery: Equipment[];
}

export default function Dashboard({ machinery }: DashboardProps) {
  const navigate = useNavigate();

  const activeFleetCount = machinery.length;
  const formattedFleetCount = activeFleetCount < 10 ? `0${activeFleetCount}` : activeFleetCount;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-6 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-[#2f7f33]/10 flex items-center justify-center overflow-hidden border-2 border-[#2f7f33]/20">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwK2DXnoe3lpGNFO_uMkr3u_jOO4vYe-zuM6khCCxTZSoQREcnTjb3E_gD5ItqCKbndnc-HfT9ncNdc_9gqbOhG8UEo1LFg8ZPf-xxzd9tET7TPswlvxD0mZtyNQlHIcywJEQ2FXKHMUY2zutCZ7Y-n_Md7aHFM6JuX-zrAupkv6r_RgEJpx-iOY0mVeuEcD9wCTEW4mjT1_a2imqE_ORdEoFI9O9IaqEB2Xtd7lMZnnPG6Sd3nEsrUrw_o4ZoMYvrrQkOZUaGPIs_" 
              alt="Profile"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Welcome back,</p>
            <h1 className="text-base font-bold text-slate-900 leading-tight">Harvest Farms Ltd.</h1>
          </div>
        </div>
      </header>

      {/* Earnings Overview */}
      <section className="px-4 py-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2f7f33] rounded-xl p-5 text-white shadow-lg shadow-[#2f7f33]/20"
          onClick={() => navigate('/analytics')}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Total Revenue</p>
              <h2 className="text-3xl font-bold mt-1 tracking-tight">$12,480.00</h2>
            </div>
            <div className="bg-white/20 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp size={14} />
              <span className="text-xs font-bold">+12.5%</span>
            </div>
          </div>
          <div className="flex gap-4 border-t border-white/10 pt-4">
            <div className="flex-1">
              <p className="text-white/80 text-[10px] uppercase font-bold">Active Fleet</p>
              <p className="text-lg font-bold">{formattedFleetCount} <span className="text-xs font-normal opacity-80">Units</span></p>
            </div>
            <div className="flex-1 border-l border-white/10 pl-4">
              <p className="text-white/80 text-[10px] uppercase font-bold">Next Payout</p>
              <p className="text-lg font-bold">Oct 24</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Actions Grid */}
      <section className="p-4 grid grid-cols-2 gap-4">
        {[
          { label: 'Manage Equipments', sub: `Manage ${activeFleetCount} machines`, icon: LayoutDashboard, color: 'text-[#2f7f33]', bg: 'bg-[#2f7f33]/10', path: '/machinery' },
          { label: 'Analytics', sub: 'Demand insights', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-100', path: '/analytics' },
          { label: 'Bookings', sub: '4 New requests', icon: CalendarCheck, color: 'text-blue-600', bg: 'bg-blue-100', path: '/bookings' },
          { label: 'Owner Profile', sub: 'Settings & Payouts', icon: User, color: 'text-purple-600', bg: 'bg-purple-100', path: '/profile' },
        ].map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(action.path)}
            className="aspect-square bg-white border border-slate-100 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-[#2f7f33] transition-colors cursor-pointer group"
          >
            <div className={cn("size-12 rounded-lg flex items-center justify-center transition-all group-hover:bg-[#2f7f33] group-hover:text-white", action.bg, action.color)}>
              <action.icon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{action.label}</h3>
              <p className="text-xs text-slate-500">{action.sub}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Add Button */}
      <div className="px-4 py-2">
        <button 
          onClick={() => navigate('/add-vehicle')}
          className="w-full h-16 bg-[#2f7f33] text-white rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-[#2f7f33]/20 hover:scale-[0.98] transition-transform font-bold text-lg"
        >
          <PlusCircle size={24} />
          Add New Machinery
        </button>
      </div>

      {/* Seasonal Recommendation */}
      <section className="px-4 py-6">
        <div className="relative overflow-hidden rounded-xl bg-slate-900 text-white p-6 min-h-[160px] flex flex-col justify-center">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgEeaf1DlFt_8uulWXWUamtAuG2I_mCgb5Re_1ebvpbwV6PJhArVbdtNfDTr4J6eJm1alf9vh_Y0JIqU0ihmSvSx-oahSS2-F5a1lqJJcTwWzvSvyEKPysjXzrxHktaGfzW1DpC3vvj3VaJQ7vIaMfcWWIvJV0-XlPkNz3qyU98CTetAMO6NZ5rowDE9awJyS7-laaKqnhjn7CKdt82KP41nANs-A112NoCIPp7fA5pWjkSqB5iv-1MNRpsrVc1aULTN62f1hW3Ng2" 
              alt="Wheat Season"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
          <div className="relative z-10 w-2/3">
            <span className="bg-[#2f7f33]/90 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Expert Tip</span>
            <h3 className="text-xl font-bold mt-2">Wheat Season Approaching</h3>
            <p className="text-slate-300 text-sm mt-1">Combine harvesters are seeing 40% higher demand in your region. List yours now.</p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Activities</h2>
          <button 
            onClick={() => navigate('/bookings')}
            className="text-[#2f7f33] text-sm font-bold active:scale-95 transition-transform"
          >
            See All
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="size-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <CheckCircle2 className="text-[#2f7f33]" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Booking Completed</p>
              <p className="text-xs text-slate-500">John D. • John Deere S780</p>
            </div>
            <p className="font-bold text-[#2f7f33]">+$450</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="size-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <Clock className="text-orange-500" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">New Service Request</p>
              <p className="text-xs text-slate-500">Massey Ferguson 8S • 2 Days</p>
            </div>
            <button 
              onClick={() => navigate('/requests')}
              className="bg-[#2f7f33] px-3 py-1 rounded text-[10px] text-white font-bold"
            >
              ACCEPT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
