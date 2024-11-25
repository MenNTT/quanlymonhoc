import React, { useState } from 'react';
import '../../styles/admin/Lockup.css';

const Lookup: React.FC = () => {
    const [searchType, setSearchType] = useState('certificate');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
            // Implement your API call here
            // const response = await api.search(searchType, searchQuery);
            console.log('Searching for:', searchType, searchQuery);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="lookup-container">
            <section className="lookup-hero">
                <div className="container">
                    <h1>Tra cứu thông tin</h1>
                    <p>Kiểm tra chứng chỉ và thông tin học viên</p>
                </div>
            </section>

            <section className="lookup-section">
                <div className="container">
                    <div className="lookup-card">
                        <div className="lookup-tabs">
                            <button 
                                className={`tab-btn ${searchType === 'certificate' ? 'active' : ''}`}
                                onClick={() => setSearchType('certificate')}
                            >
                                <i className="fas fa-certificate"></i>
                                Tra cứu chứng chỉ
                            </button>
                            <button 
                                className={`tab-btn ${searchType === 'student' ? 'active' : ''}`}
                                onClick={() => setSearchType('student')}
                            >
                                <i className="fas fa-user-graduate"></i>
                                Tra cứu học viên
                            </button>
                        </div>

                        <form onSubmit={handleSearch} className="lookup-form">
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder={searchType === 'certificate' ? 
                                        "Nhập mã chứng chỉ..." : 
                                        "Nhập mã học viên..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" disabled={isLoading}>
                                    <i className="fas fa-search"></i>
                                    {isLoading ? 'Đang tìm...' : 'Tra cứu'}
                                </button>
                            </div>
                        </form>

                        <div className="lookup-info">
                            <div className="info-icon">
                                <i className="fas fa-info-circle"></i>
                            </div>
                            <div className="info-text">
                                <h3>Hướng dẫn tra cứu</h3>
                                <ul>
                                    <li>Mã chứng chỉ: ITL-XXXXXX</li>
                                    <li>Mã học viên: HV-XXXXXX</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Lookup;