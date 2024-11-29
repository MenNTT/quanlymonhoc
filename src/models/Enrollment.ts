export interface Enrollment {
    id: string;
    accountId: string;  // email từ Account
    courseId: string;   // UUID từ Course
    enrollmentDate: Date;
    status: string;     // enrolled, completed, dropped
    grade?: string;
} 