
import { Speaker, ScheduleItem, TeamCategory, Stat } from './types';
import { Mic, Coffee, Award, Users, Milestone, Calendar } from 'lucide-react';

// ============================================
// Admin Access Control
// ============================================

/**
 * Whitelist of Gmail addresses allowed to access the admin dashboard.
 * Only these emails can log in to /admin.
 * Add new admins by adding their Gmail to this array.
 */
export const ALLOWED_ADMIN_EMAILS: string[] = [
    'chandanivivek770@gmail.com',
    // Add more authorized admin emails below:
    // 'another.admin@gmail.com',
    // 'organizer@gmail.com',
];

export const SPEAKERS: Speaker[] = [
    { 
        id: 'priya-sharma',
        name: 'Dr. Priya Sharma', 
        title: 'AI Research Scientist', 
        topic: 'The Future of AI in Healthcare', 
        image: 'https://picsum.photos/seed/priya/400/400',
        bio: 'Dr. Priya Sharma is a leading AI researcher with over 15 years of experience in developing machine learning solutions for healthcare. She has published 50+ papers and holds patents in medical imaging AI.',
        talkDescription: 'In this groundbreaking talk, Dr. Sharma explores how artificial intelligence is revolutionizing healthcare—from early disease detection to personalized treatment plans. She shares real cases where AI has saved lives and discusses the ethical considerations we must address.',
        linkedin: 'https://linkedin.com/in/',
        instagram: 'https://instagram.com/',
        expertise: ['Artificial Intelligence', 'Healthcare', 'Machine Learning']
    },
    { 
        id: 'rajesh-kumar',
        name: 'Rajesh Kumar', 
        title: 'Social Entrepreneur', 
        topic: 'Building Bridges: Technology for Rural India', 
        image: 'https://picsum.photos/seed/rajesh/400/400',
        bio: 'Rajesh Kumar is a social entrepreneur who has connected over 500 villages to the digital world. His organization has empowered 100,000+ rural citizens with technology access and digital literacy.',
        talkDescription: 'Rajesh shares his decade-long journey of bringing technology to India\'s most remote villages. From solar-powered internet hubs to mobile learning centers, discover how simple innovations are transforming rural livelihoods.',
        linkedin: 'https://linkedin.com/in/',
        instagram: 'https://instagram.com/',
        expertise: ['Social Entrepreneurship', 'Rural Development', 'Digital Inclusion']
    },
    { 
        id: 'ananya-reddy',
        name: 'Ananya Reddy', 
        title: 'Climate Activist', 
        topic: 'Youth Leading the Climate Revolution', 
        image: 'https://picsum.photos/seed/ananya/400/400',
        bio: 'At just 22, Ananya Reddy has organized climate strikes across 50 cities and influenced policy changes at state and national levels. She founded Youth for Earth, a movement with 200,000 members.',
        talkDescription: 'Ananya delivers a powerful call to action, showcasing how young people are not waiting for permission to save the planet. She presents actionable strategies and proves that age is no barrier to creating massive change.',
        linkedin: 'https://linkedin.com/in/',
        instagram: 'https://instagram.com/',
        expertise: ['Climate Action', 'Youth Leadership', 'Environmental Policy']
    },
    { 
        id: 'vikram-patel',
        name: 'Dr. Vikram Patel', 
        title: 'Neuroscientist', 
        topic: 'Unlocking the Secrets of the Mind', 
        image: 'https://picsum.photos/seed/vikram/400/400',
        bio: 'Dr. Vikram Patel is a world-renowned neuroscientist whose research on consciousness and memory has been featured in Nature and Science. He leads the Brain Research Institute and has won numerous international awards.',
        talkDescription: 'Journey into the most complex structure in the known universe—the human brain. Dr. Patel reveals the latest discoveries about consciousness, memory formation, and what makes us uniquely human.',
        linkedin: 'https://linkedin.com/in/',
        instagram: 'https://instagram.com/',
        expertise: ['Neuroscience', 'Consciousness', 'Brain Research']
    },
];

export const SCHEDULE: ScheduleItem[] = [
    { time: '09:00 AM', title: 'Registration & Welcome', description: 'Doors open for registration. Grab a coffee and network.', icon: Calendar },
    { time: '10:00 AM', title: 'Opening Ceremony', description: 'Official start of TEDxSRKR 2026.', icon: Milestone },
    { time: '10:30 AM', title: 'The Future of AI in Healthcare', description: 'Talk by Dr. Priya Sharma.', icon: Mic },
    { time: '11:15 AM', title: 'Building Bridges: Technology for Rural India', description: 'Talk by Rajesh Kumar.', icon: Mic },
    { time: '12:00 PM', title: 'Networking Lunch', description: 'Enjoy a catered lunch and connect with fellow attendees.', icon: Coffee },
    { time: '01:30 PM', title: 'Youth Leading the Climate Revolution', description: 'Talk by Ananya Reddy.', icon: Mic },
    { time: '02:15 PM', title: 'Unlocking the Secrets of the Mind', description: 'Talk by Dr. Vikram Patel.', icon: Mic },
    { time: '03:00 PM', title: 'Panel Discussion', description: 'All speakers discuss the future of innovation.', icon: Users },
    { time: '04:00 PM', title: 'Closing Ceremony & Awards', description: 'Concluding remarks and acknowledgements.', icon: Award },
];

// Team organized by categories with comprehensive member data
export const TEAM_CATEGORIES: TeamCategory[] = [
    {
        id: 'organizing',
        name: 'Organizing Committee',
        icon: '👥',
        description: 'Leading TEDxSRKR with vision and dedication to bring ideas worth spreading.',
        featured: true,
        members: [
            {
                id: 'preethi',
                name: 'A. Preethi',
                role: 'Organizer',
                image: 'https://picsum.photos/seed/preethi/400/400',
                email: 'preethi@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                isLead: true,
                bio: 'Passionate about creating platforms for transformative ideas.',
                responsibilities: ['Overall event coordination', 'Strategic planning', 'Stakeholder management'],
                quote: 'Ideas have the power to change the world, one stage at a time.'
            },
            {
                id: 'gayatri',
                name: 'Y. Gayatri Devi',
                role: 'Co-Organizer',
                image: 'https://picsum.photos/seed/gayatri/400/400',
                email: 'gayatri@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                isLead: true,
                bio: 'Dedicated to excellence in event management and team coordination.',
                responsibilities: ['Operations management', 'Team coordination', 'Quality assurance'],
                quote: 'Every great achievement begins with the courage to try.'
            }
        ]
    },
    {
        id: 'curation',
        name: 'Content & Curation',
        icon: '📝',
        description: 'Crafting narratives that inspire. Our curation team selects speakers and shapes the ideas that will grace the TEDxSRKR stage.',
        featured: false,
        members: [
            {
                id: 'giresh',
                name: 'Y. Giresh',
                role: 'Curator',
                image: 'https://picsum.photos/seed/giresh/400/400',
                email: 'giresh@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                isLead: true,
                bio: 'Passionate about storytelling and identifying ideas worth spreading.',
                responsibilities: ['Speaker selection', 'Content development', 'Talk curation'],
                quote: 'The right idea at the right time can spark a movement.'
            }
        ]
    },
    {
        id: 'tech',
        name: 'Tech & Web Development',
        icon: '💻',
        description: 'Building the digital experience. Our tech team ensures seamless online engagement and platform functionality.',
        featured: false,
        members: [
            {
                id: 'vivekananda',
                name: 'Ch. Vivekananda',
                role: 'Lead Developer',
                image: 'https://picsum.photos/seed/vivekananda/400/400',
                email: 'vivekananda@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                isLead: true,
                bio: 'Frontend specialist with expertise in React and modern web technologies.',
                responsibilities: ['Frontend architecture', 'UI implementation', 'Team leadership'],
                quote: 'Code is poetry, and every line tells a story.'
            },
            {
                id: 'saidani',
                name: 'Sk. Saidani',
                role: 'Backend Developer',
                image: 'https://picsum.photos/seed/saidani/400/400',
                email: 'saidani@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                responsibilities: ['Server-side development', 'Database management', 'API integration']
            },
            {
                id: 'adithya',
                name: 'T. Adithya',
                role: 'Full Stack Developer',
                image: 'https://picsum.photos/seed/adithya/400/400',
                email: 'adithya@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                responsibilities: ['End-to-end development', 'System integration', 'Performance optimization']
            },
            {
                id: 'akash',
                name: 'V. Akash',
                role: 'UI/UX Developer',
                image: 'https://picsum.photos/seed/akash/400/400',
                email: 'akash@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                responsibilities: ['UI/UX design', 'Responsive implementation', 'User testing']
            }
        ]
    },
    {
        id: 'hospitality',
        name: 'Hospitality & Guest Management',
        icon: '🤝',
        description: 'Creating memorable experiences. Our hospitality team ensures every speaker and guest feels welcomed and valued.',
        featured: false,
        members: [
            {
                id: 'ashok',
                name: 'D. Ashok',
                role: 'Guest Coordinator',
                image: 'https://picsum.photos/seed/ashok/400/400',
                email: 'ashok@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                isLead: true,
                responsibilities: ['Guest coordination', 'Hospitality leadership', 'VIP management']
            },
            {
                id: 'venumadhav',
                name: 'J. Venu Madhav',
                role: 'Logistics Manager',
                image: 'https://picsum.photos/seed/venumadhav/400/400',
                email: 'venumadhav@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                responsibilities: ['Event logistics', 'Supply management', 'Vendor coordination']
            },
            {
                id: 'jaswanth',
                name: 'K. Jaswanth',
                role: 'Venue Coordinator',
                image: 'https://picsum.photos/seed/jaswanth/400/400',
                email: 'jaswanth@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                responsibilities: ['Venue setup', 'Space planning', 'On-site coordination']
            },
            {
                id: 'yaswanth',
                name: 'P. Yaswanth',
                role: 'Speaker Liaison',
                image: 'https://picsum.photos/seed/yaswanth/400/400',
                email: 'yaswanth@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                responsibilities: ['Speaker communication', 'Presentation support', 'Schedule coordination']
            },
            {
                id: 'yasaswini',
                name: 'V. Yasaswini',
                role: 'Registration Lead',
                image: 'https://picsum.photos/seed/yasaswini/400/400',
                email: 'yasaswini@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                responsibilities: ['Registration management', 'Attendee services', 'Check-in coordination']
            }
        ]
    },
    {
        id: 'media',
        name: 'Media & Communications',
        icon: '📢',
        description: 'Amplifying ideas worth spreading. Our media team crafts compelling stories and builds the buzz around TEDxSRKR.',
        featured: false,
        members: [
            {
                id: 'hemasri',
                name: 'K. Hema Sri',
                role: 'Communications Lead',
                image: 'https://picsum.photos/seed/hemasri/400/400',
                email: 'hemasri@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                isLead: true,
                bio: 'Strategic communications expert with a passion for storytelling.',
                responsibilities: ['Communications strategy', 'Media relations', 'Brand messaging'],
                quote: 'Stories connect us. Ideas inspire us. Together, we create change.'
            },
            {
                id: 'anjali',
                name: 'T. Anjali',
                role: 'Content Creator',
                image: 'https://picsum.photos/seed/anjali/400/400',
                email: 'anjali@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                responsibilities: ['Content creation', 'Speaker stories', 'Website content']
            },
            {
                id: 'charanakshit',
                name: 'M. Charan Akshit',
                role: 'Social Media Manager',
                image: 'https://picsum.photos/seed/charanakshit/400/400',
                email: 'charanakshit@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                twitter: 'https://twitter.com/',
                responsibilities: ['Social media strategy', 'Daily posting', 'Community engagement']
            },
            {
                id: 'maksudh',
                name: 'M. Maksudh',
                role: 'Graphic Designer',
                image: 'https://picsum.photos/seed/maksudh/400/400',
                email: 'maksudh@tedxsrkr.com',
                linkedin: 'https://linkedin.com/in/',
                instagram: 'https://instagram.com/',
                responsibilities: ['Graphic design', 'Video editing', 'Visual identity']
            }
        ]
    }
];

export const STATS: Stat[] = [
    { value: 40, label: 'Years of Excellence', suffix: '+' },
    { value: 10, label: 'Alumni Network', suffix: 'K+' },
    { value: 1, label: 'NAAC Grade', suffix: 'A+' },
    { value: 50, label: 'Research Publications', suffix: '+' },
];
