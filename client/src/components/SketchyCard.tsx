import { ReactNode } from 'react';

interface SketchyCardProps {
  children: ReactNode;
  className?: string;
}

export default function SketchyCard({ children, className = '' }: SketchyCardProps) {
  return (
    <div 
      className={`bg-[#fefefe] rounded-xl p-6 ${className}`}
      style={{
        border: '3px solid #333',
        boxShadow: '4px 4px 8px rgba(0,0,0,0.3)',
        transform: `rotate(${Math.random() * 0.4 - 0.2}deg)`
      }}
    >
      {children}
    </div>
  );
}
