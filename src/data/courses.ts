interface RecommendedCourse {
    id: number;
    title: string;
    image: string;
    instructor: string;
    price: number;
    rating: number;
    ratingCount: number;
}

export const RECOMMENDED_COURSES: RecommendedCourse[] = [
    {
        id: 3,
        title: "DevOps, CI/CD và Containers - Khóa Học Toàn Diện",
        image: "https://img-c.udemycdn.com/course/240x135/4738412_d761_3.jpg",
        instructor: "Hỏi Dân IT với Eric",
        price: 1999000,
        rating: 4.6,
        ratingCount: 285
    },
    // ... other courses
]; 