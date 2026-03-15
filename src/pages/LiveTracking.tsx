import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bell, Navigation, MapPin, Gauge, User, Clock, Sprout, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_BOOKINGS } from '../mockData';

export default function LiveTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = MOCK_BOOKINGS.find(b => b.id === id) || MOCK_BOOKINGS[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8f6]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Live Tracking</h1>
            <p className="text-[10px] font-bold text-[#2f7f33] uppercase tracking-widest">TRACTOR #8821</p>
          </div>
        </div>
        <button className="p-2 bg-slate-100 rounded-full relative">
          <Bell size={24} className="text-slate-600" />
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <main className="flex-1 relative flex flex-col">
        {/* Map Placeholder */}
        <div className="flex-1 bg-slate-200 relative overflow-hidden">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0gM8TZccnWsAh33ebExCb8J0AEem4efbHxarCKExgyPUSgb58RFZmOTc8XieFNnx_JrnVw6LL7g6SOY2w-Vr2Ws9jb8vzloyzXiXQkkrcaB5e2GP1_KDZ8V0Bq1qrFCuFZV2dkJZvcpUBfA0prqBqDnOaWLO6C53BXj3THZXsyAimokS9PIwcPvv6c1XjqRVwFu8pw2m0fdAGAbA9acjWpUl_eDmK4D6IClevkYw0P4-DJF363ma-hs9hQ0jnihkTDlzZFoYJnfNn" 
            alt="Map View"
            referrerPolicy="no-referrer"
          />
          
          {/* Vehicle Marker */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div className="bg-[#2f7f33] p-3 rounded-full shadow-xl border-4 border-white">
              <Sprout size={24} className="text-white" />
            </div>
            <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-lg border border-slate-100">
              <p className="text-[10px] font-bold whitespace-nowrap">Moving (15 km/h)</p>
            </div>
          </motion.div>

          {/* Map Controls */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            <button className="p-3 bg-white rounded-full shadow-lg text-slate-600 hover:bg-slate-50">
              <Navigation size={20} />
            </button>
            <button className="p-3 bg-white rounded-full shadow-lg text-slate-600 hover:bg-slate-50">
              <MapPin size={20} />
            </button>
          </div>
        </div>

        {/* Status Cards Overlay */}
        <div className="absolute top-[60%] left-0 right-0 px-4 flex gap-3 overflow-x-auto no-scrollbar pb-4">
          {[
            { label: 'STATUS', value: 'On Route', icon: CheckCircle, color: 'text-green-600' },
            { label: 'LOCATION', value: 'Plot 42B', icon: MapPin, color: 'text-[#2f7f33]' },
            { label: 'SPEED', value: '15 km/h', icon: Gauge, color: 'text-blue-600' },
          ].map((stat) => (
            <div key={stat.label} className="min-w-[120px] bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
              <div className={cn("mb-2", stat.color)}>
                <Navigation size={18} />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-sm font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Job Details Card */}
        <div className="px-4 pb-8 mt-auto">
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Active Job #4412</h2>
                <p className="text-sm text-slate-500">Harvesting Service</p>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">In Progress</span>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">FARMER</p>
                  <p className="text-sm font-bold">Robert Wilson</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">ETA</p>
                  <p className="text-sm font-bold">12 mins</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Sprout size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">WORK TYPE</p>
                  <p className="text-sm font-bold">Wheat Field</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">FARM</p>
                  <p className="text-sm font-bold">North Valley</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-500">Job Completion</p>
                <p className="text-xs font-bold text-[#2f7f33]">80%</p>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#2f7f33] h-full w-[80%]"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="bg-[#2f7f33] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#2f7f33]/20">
                <Navigation size={20} />
                View Route
              </button>
              <button className="border-2 border-[#2f7f33] text-[#2f7f33] font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                <Phone size={20} />
                Contact Farmer
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function CheckCircle(props: any) {
  return <Navigation {...props} />; // Placeholder
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
