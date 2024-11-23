export interface Course {
    id: string;
    name: string;
    description: string;
    feeAmount: number;
    currency: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    detail?: CourseDetail;
}

export interface CourseDetail {
    duration: string;
    prerequisites: string;
    objectives: string;
    detailedSyllabus: string;
    format: string;
} 