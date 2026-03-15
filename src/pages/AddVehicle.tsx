import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Map as MapIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Equipment } from '../types';
import { toast } from 'sonner';

interface AddVehicleProps {
  onAdd: (vehicle: Equipment) => void;
}

export default function AddVehicle({ onAdd }: AddVehicleProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    usageYears: '',
    vehicleNumber: '',
    rcNumber: '',
    location: '',
    pricePerHour: '',
    pricePerDay: '',
    status: 'available' as 'available' | 'booked' | 'maintenance',
    type: 'Tractor' as 'Tractor' | 'Harvester' | 'Drone'
  });

  const vehicleTypes = ['Tractor', 'Harvester', 'Drone'];

  const handleSave = () => {
    if (!formData.name || !formData.model || !formData.vehicleNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newVehicle: Equipment = {
      id: `EQ-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      name: formData.name,
      model: `${new Date().getFullYear() - (parseInt(formData.usageYears) || 0)} • ${formData.model}`,
      type: formData.type,
      image: `https://picsum.photos/seed/${formData.name.replace(/\s/g, '')}/400/300`,
      location: formData.location || 'Main Depot',
      status: formData.status,
      pricePerHour: parseFloat(formData.pricePerHour) || 0,
      pricePerDay: parseFloat(formData.pricePerDay) || 0,
      vehicleNumber: formData.vehicleNumber,
      rcNumber: formData.rcNumber,
      verified: true,
      fuelLevel: 100
    };

    onAdd(newVehicle);
    toast.success('Vehicle added successfully!');
    navigate('/machinery');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="flex items-center bg-white p-4 pb-2 sticky top-0 z-10 border-b border-[#2f7f33]/10">
        <button onClick={() => navigate(-1)} className="text-[#2f7f33] flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-[#2f7f33]/10 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 ml-2">Add New Vehicle</h2>
      </div>

      <div className="flex flex-col gap-6 p-4 pb-32">
        {/* Image Upload Section */}
        <div className="flex flex-col gap-3">
          <p className="text-slate-900 text-base font-bold leading-tight">Vehicle Photo</p>
          <div className="relative w-full aspect-video bg-[#2f7f33]/5 border-2 border-dashed border-[#2f7f33]/30 rounded-xl flex flex-col items-center justify-center gap-2 overflow-hidden cursor-pointer hover:bg-[#2f7f33]/10 transition-colors">
            <Camera size={40} className="text-[#2f7f33]" />
            <p className="text-[#2f7f33] text-sm font-medium">Upload Vehicle Image</p>
          </div>
        </div>

        {/* General Information Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#2f7f33] text-sm font-bold uppercase tracking-wider">Vehicle Information</h3>
          
          <div className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm font-medium">Vehicle Type</p>
            <div className="flex gap-2">
              {vehicleTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, type: type as any })}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                    formData.type === type 
                      ? "bg-[#2f7f33] text-white border-[#2f7f33]" 
                      : "bg-white text-slate-500 border-slate-200 hover:border-[#2f7f33]/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm font-medium">Equipment Name</p>
            <input 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="flex w-full rounded-xl text-slate-900 border border-[#2f7f33]/20 bg-white focus:border-[#2f7f33] focus:ring-1 focus:ring-[#2f7f33] h-14 placeholder:text-slate-400 px-4 text-base outline-none" 
              placeholder="e.g. John Deere Tractor"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm font-medium">Equipment Model Number</p>
            <input 
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="flex w-full rounded-xl text-slate-900 border border-[#2f7f33]/20 bg-white focus:border-[#2f7f33] focus:ring-1 focus:ring-[#2f7f33] h-14 placeholder:text-slate-400 px-4 text-base outline-none" 
              placeholder="e.g. 5050 D"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm font-medium">Vehicle Usage (Years)</p>
            <input 
              type="number"
              value={formData.usageYears}
              onChange={(e) => setFormData({ ...formData, usageYears: e.target.value })}
              className="flex w-full rounded-xl text-slate-900 border border-[#2f7f33]/20 bg-white focus:border-[#2f7f33] focus:ring-1 focus:ring-[#2f7f33] h-14 placeholder:text-slate-400 px-4 text-base outline-none" 
              placeholder="Example: 2"
            />
            <p className="text-slate-500 text-xs mt-0.5">Enter the number of years the vehicle has been used since purchase.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-slate-700 text-sm font-medium">Vehicle Number</p>
              <input 
                value={formData.vehicleNumber}
                onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                className="flex w-full rounded-xl text-slate-900 border border-[#2f7f33]/20 bg-white focus:border-[#2f7f33] focus:ring-1 focus:ring-[#2f7f33] h-14 placeholder:text-slate-400 px-4 text-base uppercase outline-none" 
                placeholder="ABC-1234"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-slate-700 text-sm font-medium">RC Number</p>
              <input 
                value={formData.rcNumber}
                onChange={(e) => setFormData({ ...formData, rcNumber: e.target.value })}
                className="flex w-full rounded-xl text-slate-900 border border-[#2f7f33]/20 bg-white focus:border-[#2f7f33] focus:ring-1 focus:ring-[#2f7f33] h-14 placeholder:text-slate-400 px-4 text-base uppercase outline-none" 
                placeholder="RC-7890"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm font-medium">Location</p>
            <div className="flex w-full items-stretch rounded-xl border border-[#2f7f33]/20 overflow-hidden">
              <input 
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="flex w-full border-none bg-white focus:ring-0 h-14 placeholder:text-slate-400 px-4 text-base outline-none" 
                placeholder="Select location"
              />
              <div className="text-[#2f7f33] flex bg-white items-center justify-center px-4">
                <MapIcon size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between p-4 bg-[#2f7f33]/5 rounded-xl border border-[#2f7f33]/10">
          <div className="flex flex-col">
            <p className="text-slate-900 font-bold">Status</p>
            <p className="text-slate-500 text-xs">Is this vehicle ready for booking?</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={formData.status === 'available'}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'available' : 'maintenance' })}
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2f7f33]"></div>
          </label>
        </div>

        {/* Pricing Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#2f7f33] text-sm font-bold uppercase tracking-wider">Pricing Details ($)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-slate-700 text-sm font-medium">Price per Hour</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input 
                  type="number"
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                  className="flex w-full rounded-xl pl-8 text-slate-900 border border-[#2f7f33]/20 bg-white focus:border-[#2f7f33] h-12 outline-none" 
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-slate-700 text-sm font-medium">Price per Day</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input 
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                  className="flex w-full rounded-xl pl-8 text-slate-900 border border-[#2f7f33]/20 bg-white focus:border-[#2f7f33] h-12 outline-none" 
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className="w-full bg-[#2f7f33] hover:bg-[#2f7f33]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#2f7f33]/20 transition-all active:scale-[0.98]"
        >
          Save Vehicle
        </button>
      </div>
    </div>
  );
}
