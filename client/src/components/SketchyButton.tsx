import { ReactNode, ButtonHTMLAttributes } from 'react';

interface SketchyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function SketchyButton({ 
  children, 
  variant = 'secondary', 
  className = '',
  ...props 
}: SketchyButtonProps) {
  const baseStyles = "px-3 py-2 rounded-xl font-bold transition-transform";
  const borderStyles = "border-[3px] border-[#333]";
  
  const variantStyles = {
    primary: 'bg-pf-dark text-white',
    secondary: 'bg-[#F3F4F6] text-[#374151]',
    outline: 'bg-white text-pf-dark'
  };
  
  return (
    <button
      className={`${baseStyles} ${borderStyles} ${variantStyles[variant]} ${className}`}
      style={{
        boxShadow: '3px 3px 6px rgba(0,0,0,0.2)',
        transform: `rotate(${Math.random() * 0.2 - 0.1}deg)`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '5px 5px 10px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '3px 3px 6px rgba(0,0,0,0.2)';
      }}
      {...props}
    >
      {children}
    </button>
  );
}
