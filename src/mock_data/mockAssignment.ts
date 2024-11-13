export interface Assignment {
    id: number;
    title: string;
    dueDate: string;
    description: string;
    status: 'upcoming' | 'pastDue' | 'completed';
    files?: File[];
}