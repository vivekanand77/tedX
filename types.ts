
import { LucideIcon } from 'lucide-react';

export interface Speaker {
    name: string;
    title: string;
    topic: string;
    image: string;
}

export interface ScheduleItem {
    time: string;
    title:string;
    description: string;
    icon: LucideIcon;
}

export interface TeamMember {
    name: string;
    role: string;
    image: string;
}

export interface Stat {
    value: number;
    label: string;
    suffix: string;
}
