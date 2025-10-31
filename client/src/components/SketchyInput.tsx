import { InputHTMLAttributes } from 'react';

interface SketchyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SketchyInput({ className = '', ...props }: SketchyInputProps) {
  return (
    <input
      className={`w-16 px-2 py-1 text-center border-2 border-[#333] rounded-lg bg-white font-bold focus:outline-none focus:shadow-[0_0_0_3px_rgba(45,27,105,0.2)] ${className}`}
      {...props}
    />
  );
}
