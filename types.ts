
import { LucideIcon } from 'lucide-react';

export interface Speaker {
    name: string;
    title: string;
    topic: string;
    image: string;
}

export interface ScheduleItem {
    time: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    email?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    bio?: string;
    responsibilities?: string[];
    quote?: string;
    isLead?: boolean;
    isOpenPosition?: boolean;
}

export interface TeamCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
    featured?: boolean;
    members: TeamMember[];
}

export interface Stat {
    value: number;
    label: string;
    suffix: string;
}
