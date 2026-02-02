
import { Speaker, ScheduleItem, TeamMember, Stat } from './types';
import { Mic, Coffee, Award, Users, Handshake, Milestone, Clock, Calendar } from 'lucide-react';

export const SPEAKERS: Speaker[] = [
    { name: 'Dr. Priya Sharma', title: 'AI Research Scientist', topic: '"The Future of AI in Healthcare"', image: 'https://picsum.photos/seed/priya/400/400' },
    { name: 'Rajesh Kumar', title: 'Social Entrepreneur', topic: '"Building Bridges: Technology for Rural India"', image: 'https://picsum.photos/seed/rajesh/400/400' },
    { name: 'Ananya Reddy', title: 'Climate Activist', topic: '"Youth Leading the Climate Revolution"', image: 'https://picsum.photos/seed/ananya/400/400' },
    { name: 'Dr. Vikram Patel', title: 'Neuroscientist', topic: '"Unlocking the Secrets of the Mind"', image: 'https://picsum.photos/seed/vikram/400/400' },
];

export const SCHEDULE: ScheduleItem[] = [
    { time: '09:00 AM', title: 'Registration & Welcome', description: 'Doors open for registration. Grab a coffee and network.', icon: Calendar },
    { time: '10:00 AM', title: 'Opening Ceremony', description: 'Official start of TEDxSRKR 2025.', icon: Milestone },
    { time: '10:30 AM', title: 'The Future of AI in Healthcare', description: 'Talk by Dr. Priya Sharma.', icon: Mic },
    { time: '11:15 AM', title: 'Building Bridges: Technology for Rural India', description: 'Talk by Rajesh Kumar.', icon: Mic },
    { time: '12:00 PM', title: 'Networking Lunch', description: 'Enjoy a catered lunch and connect with fellow attendees.', icon: Coffee },
    { time: '01:30 PM', title: 'Youth Leading the Climate Revolution', description: 'Talk by Ananya Reddy.', icon: Mic },
    { time: '02:15 PM', title: 'Unlocking the Secrets of the Mind', description: 'Talk by Dr. Vikram Patel.', icon: Mic },
    { time: '03:00 PM', title: 'Panel Discussion', description: 'All speakers discuss the future of innovation.', icon: Users },
    { time: '04:00 PM', title: 'Closing Ceremony & Awards', description: 'Concluding remarks and acknowledgements.', icon: Award },
];


export const TEAM: TeamMember[] = [
    // Leadership
    { name: 'Preethi Avula', role: 'Organizer & Head', image: 'https://picsum.photos/seed/preethi/200/200' },
    { name: 'Ashok Reddy', role: 'Mentor', image: 'https://picsum.photos/seed/ashok/200/200' },

    // Technical Team
    { name: 'Akash', role: 'Web Development Head', image: 'https://picsum.photos/seed/akash/200/200' },
    { name: 'Vivekananda', role: 'Technical Co-Lead', image: 'https://picsum.photos/seed/saikrishna/200/200' },
    { name: 'Aditya', role: 'Tech Support', image: 'https://picsum.photos/seed/harsha/200/200' },
    { name: 'Shaik saidani', role: 'Tech Support', image: 'https://picsum.photos/seed/harsha/200/200' },
    { name: 'Gayathri Devi', role: 'Tech Support', image: 'https://picsum.photos/seed/harsha/200/200' },

    // Content & Curation
    { name: 'Divya Sree', role: 'Content Head', image: 'https://picsum.photos/seed/divya/200/200' },
    { name: 'Ravi Teja', role: 'Curation Lead', image: 'https://picsum.photos/seed/ravi/200/200' },
    { name: 'Lakshmi Prasanna', role: 'Content Writer', image: 'https://picsum.photos/seed/lakshmi/200/200' },

    // Marketing & PR
    { name: 'Priya Singh', role: 'Marketing Head', image: 'https://picsum.photos/seed/priyasingh/200/200' },
    { name: 'Karthik Reddy', role: 'Social Media Manager', image: 'https://picsum.photos/seed/karthik/200/200' },
    { name: 'Sneha Patel', role: 'PR Coordinator', image: 'https://picsum.photos/seed/sneha/200/200' },

    // Design & Creative
    { name: 'Aditya Rao', role: 'Design Head', image: 'https://picsum.photos/seed/aditya/200/200' },
    { name: 'Meghana Reddy', role: 'Graphic Designer', image: 'https://picsum.photos/seed/meghana/200/200' },
    { name: 'Rohit Kumar', role: 'Video Editor', image: 'https://picsum.photos/seed/rohit/200/200' },

    // Operations & Logistics
    { name: 'Venkat Sai', role: 'Operations Head', image: 'https://picsum.photos/seed/venkat/200/200' },
    { name: 'Anjali Sharma', role: 'Logistics Coordinator', image: 'https://picsum.photos/seed/anjali/200/200' },
    { name: 'Naveen Kumar', role: 'Venue Manager', image: 'https://picsum.photos/seed/naveen/200/200' },

    // Sponsorship & Finance
    { name: 'Suresh Babu', role: 'Sponsorship Head', image: 'https://picsum.photos/seed/suresh/200/200' },
    { name: 'Kavya Reddy', role: 'Finance Manager', image: 'https://picsum.photos/seed/kavya/200/200' },
    { name: 'Manoj Krishna', role: 'Partnership Lead', image: 'https://picsum.photos/seed/manoj/200/200' },
];

export const STATS: Stat[] = [
    { value: 40, label: 'Years of Excellence', suffix: '+' },
    { value: 10, label: 'Alumni Network', suffix: 'K+' },
    { value: 1, label: 'NAAC Grade', suffix: 'A+' },
    { value: 50, label: 'Research Publications', suffix: '+' },
];
