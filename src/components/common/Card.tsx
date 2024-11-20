import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon?: ReactNode;
}

const StatsCard = ({ title, value, change, icon }: StatsCardProps) => {
  return (
    <div className="stats-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 font-medium">{title}</h3>
        {icon && (
          <div className="bg-gray-700 p-2 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      <div className="stats-value">{value}</div>
      <div className="stats-change">{change}</div>
    </div>
  );
};

export default StatsCard;
