import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, User, CreditCard, Shield, Bell, HelpCircle, LogOut, ChevronRight, Camera, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Personal Information', sub: 'Name, Email, Phone' },
    { icon: CreditCard, label: 'Payment Methods', sub: 'Bank Accounts, UPI' },
    { icon: Shield, label: 'Security', sub: 'Password, 2FA' },
    { icon: Bell, label: 'Notifications', sub: 'Push, Email, SMS' },
    { icon: HelpCircle, label: 'Support & Help', sub: 'FAQs, Contact Us' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-full">
          <Settings size={24} className="text-slate-600" />
        </button>
      </header>

      <main className="pb-24">
        {/* Profile Hero */}
        <div className="bg-white p-6 mb-6 text-center border-b border-slate-100">
          <div className="relative inline-block mb-4">
            <div className="size-24 rounded-full bg-slate-200 border-4 border-white shadow-lg overflow-hidden">
              <img 
                alt="Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9etPJTbmB8j2tuKAnRjvUxBE9UFXCM8PYOYk8zPt1iVH6uAw0fojICd4GzxxRPfSJJmoS5mwCVMQ-OdwpaY-TnIsC6QI_ovPVA_eyOG10trQbt9U31M1Ys3GlBTmQOIkBQDg4ChBE-Le9bgu0lvZLCMUJ-LzUqPIqMfX5iNjuEpY-jSHH7JXaRl_B8Zh2EuwuUyjVE1bDRkh-0AugxhfIaLCXCEgdHvzBpkI9G4UwOlt7QnGo6b4AaOexSfVEgKv99rq7wMo-aJo" 
                referrerPolicy="no-referrer"
              />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-[#2f7f33] text-white rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-900">Johnathan Doe</h2>
            <BadgeCheck size={20} className="text-[#2f7f33]" />
          </div>
          <p className="text-slate-500 font-medium mb-4">SmartFarm Owner since 2021</p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900">12</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicles</p>
            </div>
            <div className="text-center border-x border-slate-100 px-8">
              <p className="text-xl font-bold text-slate-900">4.9</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900">842</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bookings</p>
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="px-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {menuItems.map((item, i) => (
              <button 
                key={i} 
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group"
              >
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-[#2f7f33]/10 group-hover:text-[#2f7f33] transition-colors">
                    <item.icon size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.sub}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
              </button>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <button className="w-full flex items-center gap-4 p-4 text-red-600 hover:bg-red-50 transition-colors">
              <div className="size-10 rounded-xl bg-red-50 flex items-center justify-center">
                <LogOut size={20} />
              </div>
              <span className="font-bold">Log Out</span>
            </button>
          </div>

          <div className="text-center pb-8">
            <p className="text-xs text-slate-400 font-medium">SmartFarm Owner App v2.4.1</p>
            <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-widest">© 2024 SmartFarm Tech Inc.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
