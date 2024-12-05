export interface Member {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  membershipLevel: 'New' | 'Existing';
  street?: string;
  location: {
    lat: number;
    lng: number;
  };
  fellowshipCenter?: FellowshipCenter;
  church: Church;
  createdAt: string;
}

export interface FellowshipCenter {
  id: string;
  name: string;
  pastor: Pastor;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  streets: string[];
  whatsappGroup: string;
  church: Church;
  members: Member[];
}

export interface Pastor {
  id: string;
  name: string;
  phone: string;
  email: string;
  fellowshipCenters: FellowshipCenter[];
}

export interface Church {
  id: string;
  name: string;
  mainAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  fellowshipCenters: FellowshipCenter[];
  pastors: Pastor[];
}

export interface MeetingReport {
  id: string;
  date: string;
  fellowshipCenterId: string;
  attendanceCount: number;
  offeringAmount: number;
  notes?: string;
  offeringPaidStatus: boolean;
  offeringReceiptUrl?: string;
  createdAt: string;
  updatedAt: string;
}