export interface Course {
    id: string;
    name: string;
    description: string;
    gradeId: string;
    instructorId: string;
    feeAmount: number;
    currency: string;
    createdAt: Date;
    updatedAt?: Date;
} 