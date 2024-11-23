import { ReactNode } from 'react';
import InstructorSidebar from './InstructorSidebar';
import '../styles/Admin.css'; // You can use the same styles or create a new one for instructors

interface InstructorLayoutProps {
  children: ReactNode;
}

const InstructorLayout = ({ children }: InstructorLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <InstructorSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default InstructorLayout; 