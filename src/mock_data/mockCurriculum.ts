import { Course } from './mockCourses';
export interface Curriculum {
    id_curriculum: number;
    title: string;
    courses: Course[];
}

export const mockCurriculums: Curriculum[] = [
    { id_curriculum: 1, title: 'Microsoft Office', courses: [] },
    { id_curriculum: 2, title: 'Google Workspace', courses: [] },
    { id_curriculum: 3, title: 'Data Science', courses: [] },
    { id_curriculum: 4, title: 'Web Development', courses: [] },
    { id_curriculum: 5, title: 'Software Testing', courses: [] },
    { id_curriculum: 6, title: 'DevOps', courses: [] },
    { id_curriculum: 7, title: 'Networking', courses: [] },
    { id_curriculum: 8, title: 'Office Skills', courses: [] },
    { id_curriculum: 9, title: 'Design', courses: [] },
    { id_curriculum: 10, title: 'IT Certifications', courses: [] },
    { id_curriculum: 11, title: 'Digital Art', courses: [] },
    { id_curriculum: 12, title: 'Multimedia', courses: [] },
    { id_curriculum: 13, title: 'Frontend', courses: [] },
    { id_curriculum: 14, title: 'Digital Marketing', courses: [] },
    { id_curriculum: 15, title: 'Mobile Development', courses: [] }
];