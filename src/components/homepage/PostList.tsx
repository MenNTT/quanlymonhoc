// PostList.tsx
import React, { useState } from 'react';
import '../../styles/PostList.css';

interface Post {
    id: number;
    title: string;
    date: string;
    image: string; // Để lưu URL hình ảnh
    category: 'thong-tin' | 'thong-bao' | 'tin-tuc';
}

// Dữ liệu bài viết với hình ảnh placeholder
const postsData: Post[] = [
    // Thông tin (6 bài)
    { 
        id: 1, 
        title: 'Thông tin tuyển sinh khóa K299', 
        date: '2024-03-01', 
        image: '../../../public/carousel/298-EXCEL.png', 
        category: 'thong-tin' 
    },
    { 
        id: 2, 
        title: 'Lịch khai giảng các khóa học tháng 3/2024', 
        date: '2024-03-05', 
        image: '../../../public/carousel/lap-trinh-di-dong-da-nen-tang-flutter-k299.png', 
        category: 'thong-tin' 
    },
    { 
        id: 3, 
        title: 'Thông tin học bổng năm 2024', 
        date: '2024-03-10', 
        image: '../../../public/carousel/khai-giang-devops-k299.png', 
        category: 'thong-tin' 
    },
    { 
        id: 4, 
        title: 'Chương trình đào tạo mới - Data Science', 
        date: '2024-03-15', 
        image: '../../../public/carousel/data-science-machine-learning-certificate-khtn-k293.png', 
        category: 'thong-tin' 
    },
    { 
        id: 5, 
        title: 'Lộ trình học DevOps K299', 
        date: '2024-03-20', 
        image: '../../../public/carousel/computer-vision-deep-learning-k299.png', 
        category: 'thong-tin' 
    },
    { 
        id: 6, 
        title: 'Thông tin khóa học Flutter Mobile', 
        date: '2024-03-25', 
        image: '../../../public/carousel/299-thiet-ke-nang-cao.jpg', 
        category: 'thong-tin' 
    },

    // Thông báo (6 bài)
    { 
        id: 7, 
        title: 'Thông báo nghỉ lễ 30/4 - 1/5', 
        date: '2024-04-01', 
        image: '../../../public/carousel/299-canva-capcut.jpg', 
        category: 'thong-bao' 
    },
    { 
        id: 8, 
        title: 'Lịch thi cuối khóa K298', 
        date: '2024-04-05', 
        image: '../../../public/carousel/298-data-analysis.jpg', 
        category: 'thong-bao' 
    },
    { 
        id: 9, 
        title: 'Thông báo đóng học phí đợt 2/2024', 
        date: '2024-04-10', 
        image: '../../../public/carousel/298-EXCEL.png', 
        category: 'thong-bao' 
    },
    { 
        id: 10, 
        title: 'Lịch bảo vệ đồ án tốt nghiệp K297', 
        date: '2024-04-15', 
        image: '../../../public/carousel/kiem-thu-phan-mem-co-ban-tu-dong-k299.png', 
        category: 'thong-bao' 
    },
    { 
        id: 11, 
        title: 'Thông báo seminar công nghệ tháng 4', 
        date: '2024-04-20', 
        image: '../../../public/carousel/lap-trinh-di-dong-da-nen-tang-flutter-k299.png', 
        category: 'thong-bao' 
    },
    { 
        id: 12, 
        title: 'Lịch học bù tuần 15/4 - 21/4', 
        date: '2024-04-25', 
        image: '../../../public/carousel/khai-giang-devops-k299.png', 
        category: 'thong-bao' 
    },

    // Tin tức (6 bài)
    { 
        id: 13, 
        title: 'Sinh viên K296 giành giải nhất cuộc thi lập trình', 
        date: '2024-05-01', 
        image: '../../../public/carousel/data-science-machine-learning-certificate-khtn-k293.png', 
        category: 'tin-tuc' 
    },
    { 
        id: 14, 
        title: 'Hợp tác đào tạo với doanh nghiệp công nghệ', 
        date: '2024-05-05', 
        image: '../../../public/carousel/computer-vision-deep-learning-k299.png', 
        category: 'tin-tuc' 
    },
    { 
        id: 15, 
        title: 'Tổng kết cuộc thi AI Hackathon 2024', 
        date: '2024-05-10', 
        image: '../../../public/carousel/299-thiet-ke-nang-cao.jpg', 
        category: 'tin-tuc' 
    },
    { 
        id: 16, 
        title: 'Cựu sinh viên khởi nghiệp thành công', 
        date: '2024-05-15', 
        image: '../../../public/carousel/299-canva-capcut.jpg', 
        category: 'tin-tuc' 
    },
    { 
        id: 17, 
        title: 'Sự kiện công nghệ TechFest 2024', 
        date: '2024-05-20', 
        image: '../../../public/carousel/298-data-analysis.jpg', 
        category: 'tin-tuc' 
    },
    { 
        id: 18, 
        title: 'Workshop AI và Machine Learning', 
        date: '2024-05-25', 
        image: '../../../public/carousel/298-EXCEL.png', 
        category: 'tin-tuc' 
    }
];

const PostList: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('thong-tin');
    const [visiblePosts, setVisiblePosts] = useState<number>(6);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setVisiblePosts(6); // Reset số bài viết hiển thị khi chuyển tab
    };

    const loadMorePosts = () => {
        setVisiblePosts(prev => Math.min(prev + 3, postsData.filter(post => post.category === activeTab).length)); // Tăng số bài viết hiển thị
    };

    const filteredPosts = postsData.filter(post => post.category === activeTab);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center mb-3">
                <ul className="post-tabs d-flex list-unstyled mb-0">
                    <li className="post-tab-item">
                        <button 
                            className={`post-tab-link px-4 py-2 border-0 ${activeTab === 'thong-tin' ? 'active' : ''}`} 
                            onClick={() => handleTabClick('thong-tin')}
                        >
                            Thông tin
                        </button>
                    </li>
                    <li className="post-tab-item">
                        <button 
                            className={`post-tab-link px-4 py-2 border-0 ${activeTab === 'thong-bao' ? 'active' : ''}`} 
                            onClick={() => handleTabClick('thong-bao')}
                        >
                            Thông báo
                        </button>
                    </li>
                    <li className="post-tab-item">
                        <button 
                            className={`post-tab-link px-4 py-2 border-0 ${activeTab === 'tin-tuc' ? 'active' : ''}`} 
                            onClick={() => handleTabClick('tin-tuc')}
                        >
                            Tin tức
                        </button>
                    </li>
                </ul>
            </div>
            <div className="row">
                {filteredPosts.slice(0, visiblePosts).map(post => (
                    <div key={post.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={post.image} className="card-img-top" alt={post.title} />
                            <div className="card-body d-flex flex-column text-center">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">Ngày đăng: {post.date}</p>
                                <button className="btn btn-dark text-white w-100 mt-auto">Chi tiết</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {visiblePosts < filteredPosts.length && (
                <div className="text-center">
                    <button className="btn btn-secondary" onClick={loadMorePosts}>Xem thêm</button>
                </div>
            )}
        </div>
    );
};

export default PostList;
