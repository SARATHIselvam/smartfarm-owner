export type BookingStatus = 'active' | 'upcoming' | 'completed' | 'pending';

export interface Booking {
  id: string;
  equipmentName: string;
  equipmentId: string;
  farmerName: string;
  farmerAvatar?: string;
  date: string;
  timeSlot: string;
  location: string;
  status: BookingStatus;
  earnings?: number;
  duration?: string;
  usageRemaining?: string;
  usageTotal?: string;
  lat?: number;
  lng?: number;
  speed?: string;
}

export interface Equipment {
  id: string;
  name: string;
  model: string;
  type: string;
  image: string;
  location: string;
  status: 'available' | 'booked' | 'maintenance';
  fuelLevel?: number;
  batteryLevel?: number;
  nextService?: string;
  lastUsed?: string;
  pricePerHour: number;
  pricePerDay: number;
  vehicleNumber: string;
  rcNumber: string;
  verified: boolean;
}

export interface Request {
  id: string;
  farmerName: string;
  farmerAvatar?: string;
  farmerType: string;
  rating: number;
  reviewsCount: number;
  memberSince: string;
  location: string;
  equipmentName: string;
  duration: string;
  distance: string;
  note?: string;
  isUrgent?: boolean;
  status?: 'pending' | 'accepted' | 'declined';
  breakdown?: {
    rentalFee: number;
    insurance: number;
    platformFee: number;
    total: number;
  };
}
