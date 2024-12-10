export interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: number;
  participantsData: Participant[];
  status: 'upcoming' | 'live' | 'completed';
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  webinarId: string;
  joinDate: string;
}