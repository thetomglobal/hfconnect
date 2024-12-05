import { create } from 'zustand';
import { Member, FellowshipCenter, Church, MeetingReport } from '../types';
import { samplePastors, sampleFellowshipCenters } from './sampleData';

interface AppState {
  members: Member[];
  fellowshipCenters: FellowshipCenter[];
  churches: Church[];
  meetingReports: MeetingReport[];
  addMember: (member: Member) => void;
  assignFellowshipCenter: (memberId: string, centerId: string) => void;
  addMeetingReport: (report: MeetingReport) => void;
  getMeetingReports: (centerId: string) => MeetingReport[];
}

const church: Church = {
  id: '1',
  name: 'God\'s Chamber Global Ministries',
  mainAddress: 'Glory House, No. 3 Ajayi Road, Ogba, Lagos',
  location: { lat: 6.6273, lng: 3.3414 },
  fellowshipCenters: sampleFellowshipCenters,
  pastors: samplePastors,
};

// Update fellowship centers with their church reference
sampleFellowshipCenters.forEach(center => {
  center.church = church;
});

export const useStore = create<AppState>((set, get) => ({
  members: [],
  fellowshipCenters: sampleFellowshipCenters,
  churches: [church],
  meetingReports: [],
  
  addMember: (member) =>
    set((state) => ({
      members: [...state.members, member],
    })),
    
  assignFellowshipCenter: (memberId, centerId) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              fellowshipCenter: state.fellowshipCenters.find((c) => c.id === centerId),
            }
          : member
      ),
    })),

  addMeetingReport: (report) =>
    set((state) => ({
      meetingReports: [...state.meetingReports, report],
    })),

  getMeetingReports: (centerId) =>
    get().meetingReports.filter((report) => report.fellowshipCenterId === centerId),
}));