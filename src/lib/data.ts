import { Webinar, Participant } from './types';

export const mockWebinars: Webinar[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    date: '2024-04-15',
    time: '14:00',
    participants: 45,
    participantsData: [
      { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
      // Add more participants as needed
    ],
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    date: '2024-04-10',
    time: '15:30',
    participants: 120,
    status: 'live',
  },
  {
    id: '3',
    title: 'Building Scalable Applications',
    date: '2024-04-05',
    time: '10:00',
    participants: 89,
    status: 'completed',
  },
];

export const mockParticipants: Participant[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    webinarId: '1',
    joinDate: '2024-03-20',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    webinarId: '1',
    joinDate: '2024-03-21',
  },
];